import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {formatDate} from '../common/common';
import navigationStrings from '../constants/navigationStrings';

const VerticalListItem = ({navigation, article}: any) => {
  if (!article.imageUrl || !article.title || !article.description) {
    return null;
  }
  // console.log('VerticalListItem');

  const date = formatDate(article.publishedAt);
  const navigationHandler = () => {
    navigation.navigate(navigationStrings.NEWSDETAILS, {article});
  };
  return (
    <TouchableOpacity
      onPress={navigationHandler}
      activeOpacity={0.7}
      style={styles.container}>
      <Image
        source={{
          uri: article.imageUrl,
        }}
        style={styles.Image}
      />
      <View style={styles.overlay}>
        <View style={{flex: 1}}>
          <Text style={styles.Heading}>{article.title}</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.AutherAndDate}>
            {article.author !== null ? article.author : 'CBC News'}
          </Text>
          <Text style={styles.AutherAndDate}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 10,
    height: moderateScale(120),
    marginBottom: 10,
  },
  Image: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust opacity (0.4 is 40% opacity)
    padding: moderateScale(10),
    justifyContent: 'flex-end',
  },
  Heading: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'ArbutusSlab-Regular',
  },
  AutherAndDate: {
    fontSize: 12,
    fontFamily: 'Nunito-Bold',
    color: 'white',
  },
});

export default VerticalListItem;
