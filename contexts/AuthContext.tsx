import { ThemedView } from '@/components/themed-view';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  signInWithPhoneNumber: (phoneNumber: string) => Promise<FirebaseAuthTypes.ConfirmationResult>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Disable app verification for testing IMMEDIATELY (before any auth operations)
if (__DEV__) {
  auth().settings.appVerificationDisabledForTesting = true;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (loading) setLoading(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleSignInWithPhoneNumber = async (phoneNumber: string) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    return confirmation;
  };

  const signOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithPhoneNumber: handleSignInWithPhoneNumber, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

