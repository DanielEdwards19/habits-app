import { useAuth } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';

export default function IndexScreen() {
  const { user } = useAuth();

  // Redirect based on auth state
  if (user) {
    return <Redirect href="/screens/home" />;
  }

  return <Redirect href="/auth/phone-sign-in" />;
}
