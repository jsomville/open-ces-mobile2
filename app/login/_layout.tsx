import { Stack } from 'expo-router';

const LoginLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Login",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default LoginLayout;