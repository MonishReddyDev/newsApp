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
import VerticalListItem from './VerticalListItem';

const VerticalList = ({navigation, isLoading, article}: any) => {
  // console.log(article);
  const renderItem = ({item}: any) => (
    <VerticalListItem navigation={navigation} article={item} />
  );
  // console.log('VerticalList:', article.length);

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
          bounces={true}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  FlatListContainer: {},
});

export default VerticalList;
