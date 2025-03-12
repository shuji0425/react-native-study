import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator, StyleSheet, Pressable } from "react-native";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function ApiDataScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // データ取得
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      setPosts(data);
      setLoading(false);
    })
    .catch((err: unknown) => {
      setError("Failed to fetch data:"); // エラーハンドリング
      setLoading(false);
    });
  }, []); // 空の依存配列で初回の異実行

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="##0000ff" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    )
  }

  return (
    <FlatList data={posts} renderItem={({ item }) => (
      <Pressable onPress={() => router.push(`../apiData/${item.id}`)} style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.body}</Text>
      </Pressable>
    )}
    keyExtractor={(item) => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  }
})