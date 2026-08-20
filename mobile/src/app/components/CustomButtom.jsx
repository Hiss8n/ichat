import { Pressable, Text, StyleSheet } from "react-native";

export default function CustomButton({
  title = "Button",
  onPress,
  color = "#6FAF45",
  textColor = "#FFFFFF",
  size ="medium",
  radius = 12,
  disabled = false,
}) {
  const sizes = {
    small: {
      paddingVertical: 10,
      paddingHorizontal: 18,
      fontSize: 14,
    },
    medium: {
      paddingVertical: 14,
      paddingHorizontal: 24,
      fontSize: 16,
    },
    large: {
      paddingVertical: 17,
      paddingHorizontal: 28,
      fontSize: 18,
    },
  };

  const currentSize = sizes[size] || sizes.medium;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: disabled ? "#BDBDBD" : color,
          borderRadius: radius,
          paddingVertical: currentSize.paddingVertical,
          paddingHorizontal: currentSize.paddingHorizontal,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            fontSize: currentSize.fontSize,
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontWeight: "600",
  },
});