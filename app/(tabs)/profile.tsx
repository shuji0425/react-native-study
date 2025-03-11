import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function ProfileScreen() {
  const [name, setName] = useState('');

  // アプリ起動時に保存された名前を取得
  useEffect(() => {
    const loadName = async () => {
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) {
        setName(storedName);
      }
    };
    loadName();
  }, []);

  // ユーザー名を保存
  const saveName = async (text: string) => {
    setName(text);
    await AsyncStorage.setItem('userName', text);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      {/* ユーザー名入力フォーム */}
      <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={saveName} />

      {/* 入力された名前を表示 */}
      {name ? <Text style={styles.nameText}>Hello, {name}!</Text> : null}

      {/* 名前をリセットするボタン */}
      <Button title="Reset Name" onPress={() => saveName('')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#34C759",
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
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
    marginTop: 10,
  }
})