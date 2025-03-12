import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

type FormData = {
  title: string;
  body: string;
};

export default function NewPostScreen() {
  const { control, handleSubmit, reset, formState:{errors}, } = useForm<FormData>({defaultValues: { title: "", body: "" }});
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, userId: 1 }),
        }
      );

      if (response.ok) {
        Alert.alert("投稿完了", "データが送信されました！");
        reset();
        router.push("/(tabs)/apiData");
      } else {
        Alert.alert("エラー", "データの送信に失敗しました");
      }
    } catch {
      Alert.alert("エラー", "ネットワークエラーが発生しました");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>新規投稿</Text>

      <Text style={styles.label}>タイトル:</Text>
      <Controller
        control={control}
        name="title"
        defaultValue=""
        rules={{ required: "タイトルは必須です" }}
        render={({ field: { onChange, value } }) => (
          <>
          <TextInput
            style={styles.input}
            placeholder="タイトルを入力"
            value={value}
            onChange={onChange}
          />
          {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}
          </>
        )}
      />

      <Text style={styles.label}>本文:</Text>
      <Controller
        control={control}
        name="body"
        defaultValue=""
        rules={{ required: "本文は必須です" }}
        render={({ field: { onChange, value } }) => (
          <>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="本文を入力"
            value={value}
            onChange={onChange}
          />
          {errors.body && <Text style={styles.error}>{errors.body.message}</Text>}
          </>
        )}
      />

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <Button title="送信" onPress={handleSubmit(onSubmit)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 12,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
});
