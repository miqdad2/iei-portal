import { Link } from "expo-router";
import { Text, View } from "react-native";
import { tokens, routes24 } from "@iei/ui";

export default function Index() {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: tokens.color.paper }}>
      <Text style={{ fontSize: 22, color: tokens.color.navy }}>
        Engineering excellence, bridging India &amp; Kuwait
      </Text>
      <Text>{routes24.length} sections — same tokens as web.</Text>
      <Link href="/events">Events</Link>
      <Link href="/jobs">Jobs</Link>
      <Link href="/my">Members area</Link>
    </View>
  );
}
