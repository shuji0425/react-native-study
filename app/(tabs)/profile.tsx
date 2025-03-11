import { CustomButton } from "@/components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, useColorScheme } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const colorScheme = useColorScheme();

  // アプリ起動時に保存された名前を取得
  useEffect(() => {
    const loadName = async () => {
      const storedName = await AsyncStorage.getItem("userName");
      if (storedName) {
        setName(storedName);
      }
    };
    loadName();
  }, []);

  // ユーザー名を保存
  const saveName = async (text: string) => {
    setName(text);
    await AsyncStorage.setItem("userName", text);
  };

  return (
    <View
      style={colorScheme === "dark" ? styles.darkContainer : styles.container}
    >
      <Text style={styles.title}>Profile Page</Text>
      {/* ユーザー名入力フォーム */}
      <TextInput
        style={colorScheme === "dark" ? styles.darkTitle : styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={saveName}
      />

      {/* 入力された名前を表示 */}
      {name ? (
        <Text
          style={colorScheme === "dark" ? styles.darkNameText : styles.nameText}
        >
          Hello, {name}!
        </Text>
      ) : null}

      {/* 名前をリセットするボタン */}
      <CustomButton title="Reset Name" onPress={() => saveName("")} disabled={!name} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  darkContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#34C759",
    marginBottom: 20,
  },
  darkTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0DBD8B",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#34C759",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    color: "#000",
  },
  darkInput: {
    width: "100%",
    height: 40,
    borderColor: "#0DBD8B",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    color: "#FFF",
    backgroundColor: "#333",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
    marginTop: 10,
  },
  darkNameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DDD",
    marginTop: 10,
  },
});
