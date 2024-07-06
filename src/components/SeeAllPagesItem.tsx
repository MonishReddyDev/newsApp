import {View, Text, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {COLORS} from '../constants/theme';
import FastImageComponent from './FastImageComponent';
import {scale} from 'react-native-size-matters';

const SeeAllPagesItem = ({item, date}: any) => {
  return (
    <View style={{marginVertical: 10}}>
      {/**Image */}
      <View style={styles.container}>
        <FastImageComponent
          item={item.imageUrl}
          style={{height: '100%', width: '100%', alignSelf: 'center'}}
        />
      </View>
      {/**Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.author}>
          {item.author !== null ? item.author : 'CBC News'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    height: 120,
    width: '100%',
    borderWidth: 0,
    borderRadius: 10,
    overflow: 'hidden',
    gap: 10,
  },
  contentContainer: {
    gap: 10,
  },
  date: {
    fontWeight: '500',
    fontFamily: 'Nunito-Light',
    fontSize: scale(12),
    color: COLORS.darkgray,
  },
  title: {
    fontSize: 14,
    fontFamily: 'ArbutusSlab-Regular',
    color: COLORS.black,
    fontWeight: '700',
  },
  description: {
    fontSize: scale(14),
    fontWeight: '300',
    color: COLORS.black,
    fontFamily: 'Nunito-Regular',
  },
  author: {
    fontFamily: 'Nunito-Bold',
    fontSize: scale(12),
    color: COLORS.black,
  },
});

export default memo(SeeAllPagesItem);
