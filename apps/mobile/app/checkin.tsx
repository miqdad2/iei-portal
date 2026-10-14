import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

/** EC check-in — camera scan preferred; manual Member ID fallback. Posts attendance. */
export default function Checkin() {
  const [id, setId] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Event check-in (EC only)</Text>
      <Text>Camera: Expo Camera + MLKit in next step (needs HTTPS + permission).</Text>
      <TextInput value={id} onChangeText={setId} placeholder="IEI-KW-256" />
      <Button title="Check in" onPress={() => setMsg(id ? `Preview — would verify ${id} + insert attendance.` : "Enter Member ID")} />
      {msg && <Text>{msg}</Text>}
    </View>
  );
}
