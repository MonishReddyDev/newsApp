import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale, scale} from 'react-native-size-matters';
import {COLORS, Images} from '../constants/theme';
import FastImage from 'react-native-fast-image';
import FastImageComponent from '../components/FastImageComponent';

const NewsDetails = ({route, navigation}: any) => {
  const {article} = route.params;

  // Remove the pattern from the string
  let pattern = /\s*\[\+\d+\s*chars\]/;
  let content = article.content?.replace(pattern, '');

  const navigationHandler = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      {/**Image */}
      <View style={styles.ImageContainer}>
        <FastImageComponent style={styles.image} item={article.imageUrl} />
        <TouchableOpacity
          onPress={navigationHandler}
          activeOpacity={0.6}
          style={styles.navigation}>
          <Image
            source={Images.backarrow}
            tintColor={COLORS.black}
            style={styles.backarrow}
          />
        </TouchableOpacity>
      </View>
      {/**Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.author}>{article.author}</Text>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.description}>{article.description}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ImageContainer: {
    height: moderateScale(400),
  },
  image: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    gap: 15,
    marginTop: 15,
  },
  author: {
    fontSize: scale(14),
    fontFamily: 'ArbutusSlab-Regular',
    color: COLORS.darkgray,
    fontWeight: '700',
  },
  title: {
    fontSize: scale(18),
    fontFamily: 'ArbutusSlab-Regular',
    color: COLORS.black,
    fontWeight: '800',
  },
  description: {
    fontSize: scale(12),
    fontFamily: 'Nunito-Regular',
    color: COLORS.black,
    fontWeight: '600',
  },
  content: {
    fontSize: scale(12),
    fontFamily: 'Nunito-Regular',
    color: COLORS.black,
    fontWeight: '600',
  },
  navigation: {
    height: moderateScale(20),
    width: moderateScale(20),
    position: 'absolute',
    top: moderateScale(80),
    left: moderateScale(20),
    right: 0,
    bottom: 0,
  },
  backarrow: {
    height: '100%',
    width: '100%',
  },
});
export default NewsDetails;
