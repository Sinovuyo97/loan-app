import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

export default function ApplyLoanScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");

  const handleApply = async () => {
    if (!amount || !duration) {
      return Alert.alert("Error", "Please fill all fields");
    }

    try {
      const response = await axios.post("http://YOUR_BACKEND_URL/api/loans/apply", {
        amount,
        duration,
      });

      Alert.alert("Success", "Loan application submitted!");
      router.push("/loans"); // Redirect to loan list
    } catch (err) {
      Alert.alert("Error", "Loan application failed");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Apply for a Loan</Text>
      
      <Text>Amount:</Text>
      <TextInput value={amount} onChangeText={setAmount} keyboardType="numeric" style={{ borderWidth: 1, marginBottom: 10 }} />

      <Text>Duration (Months):</Text>
      <TextInput value={duration} onChangeText={setDuration} keyboardType="numeric" style={{ borderWidth: 1, marginBottom: 10 }} />

      <Button title="Apply" onPress={handleApply} />
    </View>
  );
}
