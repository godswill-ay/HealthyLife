import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { loginUser } from "@/src/storage/auth";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function onLogin() {
    setMsg("");
    const res = await loginUser({ email, password });
    if (!res.ok) return setMsg(res.error);
    router.replace("/(tabs)");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {msg ? <Text style={styles.error}>{msg}</Text> : null}

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="you@example.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="••••"
        style={styles.input}
      />

      <TouchableOpacity onPress={onLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Link href="/register" style={styles.link}>
        New here? Create an account
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff", justifyContent: "center", gap: 10 },
  title: { fontSize: 28, fontWeight: "900", color: "#111827" },
  label: { fontWeight: "700", color: "#111827" },
  input: { borderWidth: 1, borderColor: "#d1d5db", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
  button: { marginTop: 10, borderRadius: 12, paddingVertical: 12, backgroundColor: "#111827" },
  buttonText: { color: "#fff", fontWeight: "800", textAlign: "center" },
  link: { marginTop: 12, color: "#2563eb", fontWeight: "800" },
  error: { color: "#b91c1c", fontWeight: "800" },
});
