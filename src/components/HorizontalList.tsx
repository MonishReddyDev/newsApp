import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {moderateScale, scale} from 'react-native-size-matters';
import {COLORS} from '../constants/theme';
import HorizontalListItem from './HorizontalListItem';

const HorizontalList = ({isLoading, article, navigation}: any) => {
  // console.log(article);
  const renderItem = ({item}: any) => (
    <HorizontalListItem navigation={navigation} article={item} />
  );

  return (
    <View>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  FlatListContainer: {
    gap: scale(7),
  },
});

export default HorizontalList;
