import { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";

export default function LoanDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loan, setLoan] = useState<any>(null);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const res = await axios.get(`http://YOUR_BACKEND_URL/api/loans/${id}`);
        setLoan(res.data);
      } catch (err) {
        Alert.alert("Error", "Could not fetch loan details");
      }
    };

    fetchLoanDetails();
  }, [id]);

  const handleRepay = async () => {
    try {
      await axios.post(`http://YOUR_BACKEND_URL/api/loans/${id}/repay`, { amountPaid: 50 }); // Example repayment
      Alert.alert("Success", "Payment made successfully!");
      router.replace("/loans"); // Refresh loan list
    } catch (err) {
      Alert.alert("Error", "Payment failed");
    }
  };

  if (!loan) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Loan Details</Text>
      <Text>Amount: ${loan.loan.amount}</Text>
      <Text>Duration: {loan.loan.duration} months</Text>
      <Text>Status: {loan.loan.status}</Text>
      <Text>Remaining Balance: ${loan.outstandingBalance}</Text>

      <Button title="Make Payment" onPress={handleRepay} />
    </View>
  );
}
