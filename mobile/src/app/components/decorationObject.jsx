import { View, StyleSheet } from "react-native";

export default function Cactus({ color ="#096c37", size = 150,opacity=0.5,position="relative",top=20,left=10 }) {
  const width = size * 0.45;
  const armWidth = size * 0.22;

  return (
    <View
      style={[
        styles.container,
        {
          height: size * 1.3,
          width: size,
          opacity:opacity,
          position:'relative',
          top:top,
          left:left,
       
        },
      ]}
    >
      {/* Main cactus */}
      <View
        style={[
          styles.main,
          {
            backgroundColor: color,
            width,
            height: size,
            borderRadius: width / 2,
          },
        ]}
      />

      {/* Left arm */}
      <View
        style={[
          styles.leftArm,
          {
            backgroundColor: color,
            width: armWidth,
            height: size * 0.5,
            borderRadius: armWidth / 2,
            left: size * 0.08,
            top: size * 0.4,
          },
        ]}
      />

      {/* Right arm */}
      <View
        style={[
          styles.rightArm,
          {
            backgroundColor: color,
            width: armWidth,
            height: size * 0.55,
            borderRadius: armWidth / 2,
            right: size * 0.08,
            top: size * 0.25,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
  },

  main: {
    position: "absolute",
    bottom: 0,
  },

  leftArm: {
    position: "absolute",
  },

  rightArm: {
    position: "absolute",
  },
});