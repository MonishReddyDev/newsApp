import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {act} from 'react';
import {data} from '../constants/data';
import CategoryItem from './CategoryItem';

const Categories = ({activeCategory, handleActiveCategory}: any) => {
  return (
    <FlatList
      data={data.categories}
      contentContainerStyle={styles.flatListContainier}
      showsHorizontalScrollIndicator={false}
      horizontal
      keyExtractor={item => item}
      renderItem={({item, index}) => {
        return (
          <CategoryItem
            isActive={activeCategory == item}
            handleActiveCategory={handleActiveCategory}
            title={item}
            index={index}
          />
        );
      }}
    />
  );
};
const styles = StyleSheet.create({
  flatListContainier: {
    gap: 10,
  },
});

export default Categories;
