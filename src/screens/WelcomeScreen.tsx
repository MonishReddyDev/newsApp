import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import appTheme, {Images} from '../constants/theme';
import {moderateScale} from 'react-native-size-matters';
import Animated, {FadeInDown} from 'react-native-reanimated';

const imageSize = moderateScale(250);
const WelcomeScreen = ({navigation}: any) => {
  const navigateToHome = () => {
    navigation.navigate('Home'); // Replace 'Home' with your actual screen name in the navigator
  };
  useEffect(() => {
    setTimeout(() => {
      navigateToHome();
    }, 3000);
  });

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeInDown.duration(1000).springify()}
        style={styles.animatedContainer}>
        <Image
          source={Images.welcomeImage}
          style={{
            width: imageSize,
            height: imageSize,
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeScreen;
