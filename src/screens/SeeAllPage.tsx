import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';
import React, {memo} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import {COLORS, Images} from '../constants/theme';
import {formatDate} from '../common/common';
import SeeAllPagesItem from '../components/SeeAllPagesItem';

const SeeAllPage = ({navigation, route}: any) => {
  const {top} = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const {data_H} = route.params;

  const handleNaigation = () => {
    navigation.pop();
  };

  const getItem = (data: any, index: number) => data[index];

  const renderItem = (item: any) => {
    if (!item.imageUrl || !item.title || !item.description) {
      return null;
    }

    const date = formatDate(item.publishedAt);

    return <SeeAllPagesItem item={item} date={date} />;
  };

  return (
    <View style={[{flex: 1, paddingTop}]}>
      {/**Header*/}
      <View
        style={{
          height: moderateScale(50),
          marginHorizontal: moderateScale(20),
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={handleNaigation}
          activeOpacity={0.6}
          style={{
            flex: 1,
            padding: 5,
          }}>
          <Image
            style={{
              height: moderateScale(20),
              width: moderateScale(20),
            }}
            source={Images.backarrow}
            tintColor={'black'}
          />
        </TouchableOpacity>
        <Text
          style={{
            flex: 2,
            color: COLORS.primary,
            fontSize: 20,
            fontFamily: 'Nunito-SemiBold',
            fontWeight: '700',
          }}>
          Hot Updates
        </Text>
      </View>
      {/**Body*/}
      <View
        style={{flex: 1, marginTop: 10, marginHorizontal: moderateScale(20)}}>
        <VirtualizedList
          data={data_H}
          initialNumToRender={4}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
          getItemCount={data => data.length}
          getItem={getItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}} // Add padding to the bottom
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    height: moderateScale(20),
    width: moderateScale(20),
    shadowColor: '#000', // Shadow color
    shadowOpacity: 0.4, // Shadow opacity
    shadowOffset: {width: 2, height: 2}, // Shadow offset
    shadowRadius: 2, // Shadow radius
    backgroundColor: COLORS.transparent, // Set a solid background color
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(SeeAllPage);
