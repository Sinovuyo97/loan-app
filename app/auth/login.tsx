import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://YOUR_BACKEND_URL/api/auth/login", {
        email,
        password,
      });
      Alert.alert("Success", "Logged in!");
      router.push("/loans"); // Navigate to loans page
    } catch (err) {
      Alert.alert("Error", "Invalid credentials");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10 }} />
      
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 10 }} />
      
      <Button title="Login" onPress={handleLogin} />
      <Text onPress={() => router.push("/auth/register")}>Don't have an account? Register</Text>
    </View>
  );
}
