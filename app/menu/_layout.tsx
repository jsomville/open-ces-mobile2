import { Stack } from "expo-router";

const MenuLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "All Menu",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="transactions"
        options={{
          title: "Transactions",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="send"
        options={{
          title: "Send",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="recieve"
        options={{
          title: "Receive",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="pay"
        options={{
          title: "Pay",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="user"
        options={{
          title: "User",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="scan"
        options={{
          title: "Scan",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="topup"
        options={{
          title: "Top-up",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="more"
        options={{
          title: "More",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="linkThisApp"
        options={{
          title: "Link to this App",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="oneTransaction"
        options={{
          title: "Transaction Details",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="contacts"
        options={{
          title: "Contacts",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="merchant"
        options={{
          title: "Merchants",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default MenuLayout;
