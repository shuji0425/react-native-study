import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Stack } from "expo-router";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function ApiDataDetailScreen() {
  // URLのidを取得
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch error");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: "詳細情報",
        headerLeft: () => (
          <TouchableOpacity style={styles.headerBackButton} onPress={() => router.replace("/(tabs)/apiData")}>
            <Text style={styles.headerBackText}>{"←"}</Text>
          </TouchableOpacity>
        )
       }} />
      <Text style={styles.title}>{post?.title}</Text>
      <Text style={styles.body}>{post?.body}</Text>

      {/* 編集ボタン */}
      <Button title="編集" onPress={() => router.push(`/apiData/${id}/edit`)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 20,
  },
  headerBackButton: {
    marginLeft: 10,
    padding: 5,
  },
  headerBackText: {
    fontSize: 24,
    color: "black",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
});
