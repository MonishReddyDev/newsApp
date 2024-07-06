import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';

import HorizontalListItem from './HorizontalListItem';

const HorizontalList = ({article, navigation}: any) => {
  // console.log(article);
  const renderItem = ({item}: any) => (
    <HorizontalListItem navigation={navigation} article={item} />
  );

  return (
    <FlatList
      data={article}
      initialNumToRender={4}
      contentContainerStyle={styles.FlatListContainer}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      bounces={true}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  FlatListContainer: {
    gap: scale(7),
  },
});

export default HorizontalList;
