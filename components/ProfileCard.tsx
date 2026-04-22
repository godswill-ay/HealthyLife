import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProfileCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Load profile
  useEffect(() => {
    const loadProfile = async () => {
      // Try primary key
      let data = await AsyncStorage.getItem("userProfile");

      // Fallback: check if another key was used during registration
      if (!data) {
        data = await AsyncStorage.getItem("user");
      }

      if (data) {
        const parsed = JSON.parse(data);
        setName(parsed.name || "");
        setEmail(parsed.email || "");
      }
    };

    loadProfile();
  }, []);

  // Save profile
  const handleSave = async () => {
    const updated = { name, email };
    await AsyncStorage.setItem("userProfile", JSON.stringify(updated));
    setIsEditing(false);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Profile</Text>

      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />

          <View style={styles.row}>
            <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsEditing(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.text}>Name: {name}</Text>
          <Text style={styles.text}>Email: {email}</Text>

          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.edit}>Edit Profile</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    padding: 20,
    backgroundColor: "#f9fafb",
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 6,
  },
  edit: {
    color: "#2563eb",
    marginTop: 10,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  saveBtn: {
    backgroundColor: "#111827",
    padding: 10,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancel: {
    color: "#6b7280",
  },
});
