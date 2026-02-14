import React, { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, View, Text, ViewStyle } from 'react-native';

import type { LayoutChangeEvent, ViewProps } from 'react-native';
import globalStyles from '../globalStyles';

interface SlidingButtonProps extends ViewProps {
  onConfirm?: () => void;
}

const label = 'Slide to confirm';

const SlidingButton: React.FC<SlidingButtonProps> = ({
  style,
  onConfirm,
  onLayout,
  ...rest
}) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const maxSlideRef = useRef(0);

  const [confirmed, setConfirmed] = useState(false);
  const confirmedRef = useRef(false);
  const onConfirmRef = useRef(onConfirm);
  const pan = useRef(new Animated.Value(0)).current;
  

  useEffect(() => {
    onConfirmRef.current = onConfirm;
  }, [onConfirm]);

  useEffect(() => {
    maxSlideRef.current = Math.max(containerWidth - containerHeight, 0);
    pan.setValue(0);
    confirmedRef.current = false;
    setConfirmed(false);
  }, [containerWidth, containerHeight, pan]);

  const handleLayout = (event: LayoutChangeEvent) => {
    onLayout?.(event);
    setContainerWidth(event.nativeEvent.layout.width);
    setContainerHeight(event.nativeEvent.layout.height);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 5,
      onPanResponderMove: (_, gestureState) => {
        if (!confirmedRef.current) {
          const maxSlide = maxSlideRef.current;
          if (maxSlide <= 0) {
            return;
          }
          let newX = Math.max(0, Math.min(gestureState.dx, maxSlide));
          pan.setValue(newX);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const maxSlide = maxSlideRef.current;
        if (maxSlide <= 0) {
          return;
        }
        if (gestureState.dx > maxSlide * 0.9) {
          Animated.timing(pan, {
            toValue: maxSlide,
            duration: 150,
            useNativeDriver: false,
          }).start(() => {
            confirmedRef.current = true;
            setConfirmed(true);
            onConfirmRef.current?.();
            Animated.spring(pan, {
              toValue: 0,
              useNativeDriver: false,
            }).start(() => {
              confirmedRef.current = false;
              setConfirmed(false);
            });
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
        globalStyles.slideButtonContainer,
        style,
      ]}
      onLayout={handleLayout}
      {...rest}
    >
      <Text style={[globalStyles.slideButtonLabel]}>{label}</Text>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          globalStyles.slideButtonSlider,
          {
            width: containerHeight,
            height: containerHeight,
            transform: [{ translateX: pan }],
          } as ViewStyle,
        ]}
      />
    </View>
  );
};

export default SlidingButton;
