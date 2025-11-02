import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { ClipPath, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface AnimatedWaterDropProps {
  size?: number;
  percentage?: number;
}

export function AnimatedWaterDrop({ size = 200, percentage = 50 }: AnimatedWaterDropProps) {
  // Animation values for the two wave layers
  const wave1Anim = useRef(new Animated.Value(0)).current;
  const wave2Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // First wave animation (6 seconds total - slower)
    const wave1Animation = Animated.loop(
      Animated.sequence([
        Animated.timing(wave1Anim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(wave1Anim, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // Second wave animation (8 seconds total - slower, offset)
    const wave2Animation = Animated.loop(
      Animated.sequence([
        Animated.timing(wave2Anim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(wave2Anim, {
          toValue: 0,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    wave1Animation.start();
    wave2Animation.start();

    return () => {
      wave1Animation.stop();
      wave2Animation.stop();
    };
  }, [wave1Anim, wave2Anim]);

  // Calculate water level based on percentage (adjusted for 217 height viewBox)
  const fillPercentage = Math.min(Math.max(percentage, 0), 100);
  const waterLevel = 217 - (fillPercentage / 100) * 150;

  // Interpolate wave translations - longer travel distance with vertical movement
  const wave1TranslateX = wave1Anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -25, 0],
  });

  const wave1TranslateY = wave1Anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -8, 0],
  });

  const wave2TranslateX = wave2Anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 25, 0],
  });

  const wave2TranslateY = wave2Anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 6, 0],
  });

  // No need for scale anymore since we're using the exact viewBox

  return (
    <View style={[styles.container, { width: size, height: size * 1.45 }]}>
      <Svg
        width={size}
        height={size * 1.45}
        viewBox="0 0 150 217"
      >
        <Defs>
          {/* Clip path for water drop shape - exact from your design */}
          <ClipPath id="dropClip">
            <Path d="M75.0778 0.258789L75.4537 0.447266C75.4071 0.540497 75.3592 0.633542 75.3121 0.727539C82.0042 14.0916 92.6836 34.8171 106.407 53.9316C111.681 61.2772 121.576 74.3048 130.084 88.9922C138.581 103.663 145.753 120.086 145.501 134.232C145.416 146.558 141.772 165.034 131.099 180.445C120.471 195.792 102.886 208.073 75.0065 208.22V208.224C74.9221 208.224 74.8378 208.222 74.7535 208.222C74.6693 208.222 74.585 208.224 74.5006 208.224V208.22C46.6209 208.073 29.0359 195.792 18.4078 180.445C7.73535 165.034 4.09134 146.558 4.00647 134.232C3.75391 120.086 10.926 103.663 19.4235 88.9922C27.9309 74.3047 37.8265 61.2772 43.1002 53.9316C56.8234 34.8172 67.5019 14.0916 74.194 0.727539C74.147 0.633673 74.0999 0.540368 74.0533 0.447266L74.4283 0.258789C74.4718 0.172011 74.5161 0.0861292 74.5592 0L74.7535 0.0966797L74.9479 0C74.9909 0.0859999 75.0344 0.172142 75.0778 0.258789Z" />
          </ClipPath>

          {/* Water gradient */}
          <LinearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#5BA3D8" stopOpacity="1" />
            <Stop offset="100%" stopColor="#4A8FC8" stopOpacity="1" />
          </LinearGradient>

          {/* Background gradient - lighter blue */}
          <LinearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#D4EAF7" stopOpacity="1" />
            <Stop offset="100%" stopColor="#C0DFF5" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {/* Background drop shape - light blue */}
        <Path
          d="M75.0778 0.258789L75.4537 0.447266C75.4071 0.540497 75.3592 0.633542 75.3121 0.727539C82.0042 14.0916 92.6836 34.8171 106.407 53.9316C111.681 61.2772 121.576 74.3048 130.084 88.9922C138.581 103.663 145.753 120.086 145.501 134.232C145.416 146.558 141.772 165.034 131.099 180.445C120.471 195.792 102.886 208.073 75.0065 208.22V208.224C74.9221 208.224 74.8378 208.222 74.7535 208.222C74.6693 208.222 74.585 208.224 74.5006 208.224V208.22C46.6209 208.073 29.0359 195.792 18.4078 180.445C7.73535 165.034 4.09134 146.558 4.00647 134.232C3.75391 120.086 10.926 103.663 19.4235 88.9922C27.9309 74.3047 37.8265 61.2772 43.1002 53.9316C56.8234 34.8172 67.5019 14.0916 74.194 0.727539C74.147 0.633673 74.0999 0.540368 74.0533 0.447266L74.4283 0.258789C74.4718 0.172011 74.5161 0.0861292 74.5592 0L74.7535 0.0966797L74.9479 0C74.9909 0.0859999 75.0344 0.172142 75.0778 0.258789Z"
          fill="url(#bgGradient)"
        />

        {/* Clipped water with waves */}
        <G clipPath="url(#dropClip)">
          {/* Main water fill with wave - higher curves, much wider, with vertical movement */}
          <AnimatedPath
            d={`M-40 ${waterLevel} Q20 ${waterLevel - 20}, 75 ${waterLevel} Q130 ${waterLevel + 20}, 190 ${waterLevel} L190 217 L-40 217 Z`}
            fill="url(#waterGradient)"
            // @ts-expect-error - style prop works at runtime for AnimatedPath
            style={{
              transform: [{ translateX: wave1TranslateX }, { translateY: wave1TranslateY }],
            }}
          />

          {/* Darker blue wave overlay - higher curves, much wider, with vertical movement */}
          <AnimatedPath
            d={`M-40 ${waterLevel + 5} Q10 ${waterLevel - 12}, 45 ${waterLevel + 5} Q80 ${waterLevel + 22}, 110 ${waterLevel + 5} Q145 ${waterLevel - 10}, 190 ${waterLevel + 5} L190 217 L-40 217 Z`}
            fill="#1E5A8E"
            opacity="0.5"
            // @ts-expect-error - style prop works at runtime for AnimatedPath
            style={{
              transform: [{ translateX: wave2TranslateX }, { translateY: wave2TranslateY }],
            }}
          />
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

