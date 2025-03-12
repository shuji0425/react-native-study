import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TextInput, Button, View, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  title: string;
  body: string;
}

export default function EditPostScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { control, handleSubmit, setValue, reset, formState:{errors} } = useForm<FormData>({defaultValues: {title: "", body: "" }});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPostData = async() =>{
      if (id) {
        setLoading(true);
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await response.json();
        setValue("title", data.title);
        setValue("body", data.body);
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id, setValue]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch (
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        Alert.alert("成功", "投稿が更新されました！");
        reset();
        router.replace(`/apiData/${id}`);
      } else {
        Alert.alert("エラー", "投稿の更新に失敗しました");
      }
    } catch {
      Alert.alert("エラー", "ネットワークエラーが発生しました");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>投稿編集</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <>
          <Text>タイトル:</Text>
          <Controller control={control} name="title" defaultValue="" rules={{ required: "タイトルは必須です" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} placeholder="タイトルを入力" value={value} onChangeText={onChange} />
          )}
          />

          <Text>本文:</Text>
          <Controller control={control} name="body" defaultValue="" rules={{ required: "本文は必須です" }}
          render={({ field: {onChange, value }}) => (
            <TextInput style={[styles.input, styles.textArea]} placeholder="本文を入力" multiline value={value} onChangeText={onChange}
            />
          )}
          />

          <Button title="更新" onPress={handleSubmit(onSubmit)} />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginVertical: 8,
  },
  textArea: {
    height: 100,
  },
});