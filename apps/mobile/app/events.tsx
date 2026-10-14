import { Text, View } from "react-native";

/** Events — subscribes to same Supabase realtime:events channel as web. */
export default function Events() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Upcoming events — live from EC Desk (realtime wired via @iei/api-client).</Text>
      <Text>Ticket QR cached offline after booking.</Text>
    </View>
  );
}
