import { Fonts } from "@/src/core/theme";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    function toLogin() {
      router.push('/login');
    }

    toLogin();
  }, [])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontFamily: Fonts?.sansXB }}>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
