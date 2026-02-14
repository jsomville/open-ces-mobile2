import React, { useRef, useState } from 'react';
import { Animated, PanResponder, View, Text, StyleSheet, ViewStyle } from 'react-native';

import type { ViewProps } from 'react-native';

interface SlidingButtonProps extends ViewProps {
  onConfirm?: () => void;
}

const SlidingButton: React.FC<SlidingButtonProps> = ({
  style,
  onConfirm,
  ...rest
}) => {
  // Default values
  const width = 300;
  const height = 60;
  const borderRadius = 30;
  const backgroundColor = '#e0e0e0';
  const sliderColor = '#4caf50';
  const label = 'Slide to confirm';
  const labelColor = '#333';
  const [confirmed, setConfirmed] = useState(false);
  const pan = useRef(new Animated.Value(0)).current;
  const maxSlide = width - height;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 5,
      onPanResponderMove: (_, gestureState) => {
        if (!confirmed) {
          let newX = Math.max(0, Math.min(gestureState.dx, maxSlide));
          pan.setValue(newX);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > maxSlide * 0.9) {
          Animated.timing(pan, {
            toValue: maxSlide,
            duration: 150,
            useNativeDriver: false,
          }).start(() => {
            setConfirmed(true);
            onConfirm && onConfirm();
          });
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View
      style={[
        styles.container,
        { width, height, borderRadius, backgroundColor },
        style,
      ]}
      {...rest}
    >
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.slider,
          {
            width: height,
            height,
            borderRadius,
            backgroundColor: sliderColor,
            transform: [{ translateX: pan }],
          } as ViewStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
  },
  label: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    zIndex: 1,
  },
  slider: {
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default SlidingButton;
