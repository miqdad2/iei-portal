import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { civilId } from "@iei/validations";

/** Member sign-in — Civil ID validation shared with web via @iei/validations. */
export default function My() {
  const [id, setId] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Members area — Civil ID</Text>
      <TextInput value={id} onChangeText={setId} placeholder="200012345678" keyboardType="numeric" />
      <Button
        title="Sign in"
        onPress={() => {
          const r = civilId.safeParse(id.trim());
          setMsg(r.success ? "Preview only — Supabase Auth next." : "Civil ID must be 12 digits");
        }}
      />
      {msg && <Text>{msg}</Text>}
    </View>
  );
}
