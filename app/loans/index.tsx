import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

export default function LoanListScreen() {
  const router = useRouter();
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get("http://YOUR_BACKEND_URL/api/loans/my-loans");
        setLoans(res.data);
      } catch (err) {
        Alert.alert("Error", "Could not fetch loans");
      }
    };

    fetchLoans();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Loans</Text>
      
      <FlatList
        data={loans}
        keyExtractor={(item: any) => item._id}
        renderItem={({ item }: any) => (
          <TouchableOpacity onPress={() => router.push(`/loans/details?id=${item._id}`)}>
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text>Amount: ${item.amount}</Text>
              <Text>Status: {item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      
      <TouchableOpacity onPress={() => router.push("/loans/apply")} style={{ marginTop: 20 }}>
        <Text style={{ color: "blue" }}>Apply for a Loan</Text>
      </TouchableOpacity>
    </View>
  );
}
