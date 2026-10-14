import { Text, View } from "react-native";

/** Digital member card — QR = verify URL #{memberId}?s={cardSig}; cached offline after first open. */
export default function Card() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>IEI Member Card (QR)</Text>
      <Text>Verify: /verify/IEI-KW-256?s=… (HMAC, ported from Portal.java cardSig).</Text>
    </View>
  );
}
