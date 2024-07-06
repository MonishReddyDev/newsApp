import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../constants/theme';
import navigationStrings from '../constants/navigationStrings';
import FastImageComponent from './FastImageComponent';

const HorizontalListItem = ({article, navigation}: any) => {
  // console.log(article);
  if (!article.imageUrl || !article.title || !article.description) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate(navigationStrings.NEWSDETAILS, {article})
      }>
      <FastImageComponent style={styles.image} item={article.imageUrl} />

      <View style={styles.overlay}>
        <Text style={styles.authorText}>
          by {article.author !== null ? article.author : 'CBC News'}
        </Text>
        <Text style={styles.titleText}>{article.title}</Text>
        <Text style={styles.descriptionText}>{article.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 10,
    height: moderateScale(200),
    width: moderateScale(300),
  },
  image: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust opacity (0.4 is 40% opacity)
    padding: moderateScale(10),
    justifyContent: 'flex-end',
  },
  authorText: {
    color: COLORS.white,
    fontSize: moderateScale(10),
    fontFamily: 'Nunito-ExtraBold',
  },
  titleText: {
    color: COLORS.white,
    fontSize: moderateScale(14), // Corrected font size
    fontWeight: 'bold',
    fontFamily: 'Nunito-Bold',
    marginTop: moderateScale(5),
  },
  descriptionText: {
    color: COLORS.white, // Use COLORS.white for consistency
    fontSize: moderateScale(12),
    fontFamily: 'Nunito-Regular',
    marginTop: moderateScale(5),
  },
});

export default memo(HorizontalListItem);
