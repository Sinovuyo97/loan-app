import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://YOUR_BACKEND_URL/api/auth/register", {
        fullName,
        email,
        password,
      });

      Alert.alert("Success", "Account created!");
      router.push("/auth/login"); // Navigate to login page
    } catch (err) {
      Alert.alert("Error", "Registration failed");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Full Name:</Text>
      <TextInput value={fullName} onChangeText={setFullName} style={{ borderWidth: 1, marginBottom: 10 }} />
      
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10 }} />
      
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 10 }} />
      
      <Button title="Register" onPress={handleRegister} />
      <Text onPress={() => router.push("/auth/login")}>Already have an account? Login</Text>
    </View>
  );
}
