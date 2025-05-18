import { Stack } from 'expo-router';

export default function BookingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="details" />
    </Stack>
  );
}