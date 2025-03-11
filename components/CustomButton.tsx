import { Pressable, Text, StyleSheet } from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export function CustomButton({ title, onPress, disabled = false}: CustomButtonProps) {
  return (
    // ボタン長押しと非活性のスタイル
    <Pressable onPress={onPress} style={({ pressed }) => [
      styles.button,
      pressed && styles.buttonPressed,
      disabled && styles.buttonDisabled,
    ]}
    disabled={disabled}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#2E9B51',
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});