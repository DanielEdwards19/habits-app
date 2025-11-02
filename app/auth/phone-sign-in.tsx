import { AnimatedWaterDrop } from '@/components/AnimatedWaterDrop';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PhoneSignIn() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { signInWithPhoneNumber } = useAuth();

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  // Handle login
  function handleAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
      router.replace('/(tabs)/home');
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function handleSignInWithPhoneNumber(phoneNumber: string) {
    try {
      setError('');
      const confirmation = await signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (err: any) {
      console.error('Phone sign in error:', err);
      setError(err.message || 'Failed to send verification code');
    }
  }

  async function confirmCode() {
    if (!confirm) return;
    
    try {
      setError('');
      await confirm.confirm(code);
      // User is signed in, handleAuthStateChanged will navigate
    } catch (error) {
      console.log('Invalid code.');
      setError('Invalid code. Please try again.');
    }
  }

  if (!confirm) {
    return (
      <ThemedView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Animated Water Drop */}
            <View style={styles.logoContainer}>
              <AnimatedWaterDrop size={150}/>
            </View>

            <ThemedText type="title" style={styles.title}>Build Habits.</ThemedText>
            <ThemedText type="title" style={styles.title}>Give Water</ThemedText>
            <ThemedText type="default" style={styles.subtitle}>
              Enter your phone number to get started
            </ThemedText>
            
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.text,
                }
              ]}
              placeholder="Enter Your Mobile Number"
              placeholderTextColor={colorScheme === 'dark' ? '#666' : '#999'}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              autoCapitalize="none"
            />
            
            {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
            
            <Pressable
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={() => handleSignInWithPhoneNumber(phoneNumber)}
            >
              <ThemedText
                type="defaultSemiBold"
                lightColor="#FFFFFF"
                darkColor="#FFFFFF"
              >
                Get Started
              </ThemedText>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Animated Water Drop */}
          <View style={styles.logoContainer}>
            <AnimatedWaterDrop size={150} />
          </View>

          <ThemedText type="title" style={styles.title}>Enter Code</ThemedText>
          <ThemedText type="default" style={styles.subtitle}>
            Enter the verification code sent to {phoneNumber}
          </ThemedText>
          
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
                color: colors.text,
              }
            ]}
            placeholder="Enter Code"
            placeholderTextColor={colorScheme === 'dark' ? '#666' : '#999'}
            value={code}
            onChangeText={text => setCode(text)}
            keyboardType="number-pad"
            maxLength={6}
          />
          
          {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
          
          <Pressable
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => confirmCode()}
          >
            <ThemedText
              type="defaultSemiBold"
              lightColor="#FFFFFF"
              darkColor="#FFFFFF"
            >
              Confirm Code
            </ThemedText>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.lg,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: Spacing.xl,
    opacity: 0.7,
    textAlign: 'center',
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: Spacing.md,
  },
  button: {
    width: '100%',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  helperText: {
    marginTop: Spacing.lg,
    opacity: 0.6,
    fontSize: 14,
    textAlign: 'center',
  },
});

