import {Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/theme';
import Animated, {FadeInRight} from 'react-native-reanimated';

const CategoryItem = ({title, index, isActive, handleActiveCategory}: any) => {
  const color = isActive ? COLORS.white : COLORS.black;
  const backgroundColor = isActive ? COLORS.primary : COLORS.white;

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(1000)
        .springify()
        .damping(14)}>
      <Pressable
        onPress={() => handleActiveCategory(isActive ? null : title)}
        style={[styles.Container, {backgroundColor}]}>
        <Text style={[styles.Text, {color}]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 1,
    borderColor: COLORS.lightGray4,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderCurve: 'continuous',
  },
  Text: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
    fontWeight: '600',
  },
});

export default CategoryItem;
