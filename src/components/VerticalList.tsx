import React, {useCallback, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import VerticalListItem from './VerticalListItem';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchNewsHeadLines,
  getCurrentPage,
  getHeadlinesStatus,
  selectAllHeadlines,
} from '../redux/newsHeadLinesSlice';
import {AppDispatch} from '../redux/store';

const VerticalList = ({navigation, article}: any) => {
  const renderItem = ({item}: any) => (
    <VerticalListItem navigation={navigation} article={item} />
  );

  return (
    <FlatList
      data={article}
      initialNumToRender={2}
      contentContainerStyle={styles.FlatListContainer}
      keyExtractor={(item, index) => index.toString()}
      bounces={true}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  FlatListContainer: {
    marginVertical: 10,
  },
});

export default VerticalList;
