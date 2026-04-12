import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { logoutUser } from "@/src/storage/auth";

export default function LogoutScreen() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await logoutUser();
      router.replace("/login");
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Logging out…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  text: { fontWeight: "800", color: "#111827" },
});
