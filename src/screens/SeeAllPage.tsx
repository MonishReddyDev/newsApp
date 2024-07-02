import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import {COLORS, Images} from '../constants/theme';
import {formatDate} from '../common/common';

const SeeAllPage = ({navigation, route}: any) => {
  const {top} = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const {headLines} = route.params;

  const handleNaigation = () => {
    navigation.pop();
  };

  const getItem = (data: any, index: number) => data[index];

  const renderItem = (item: any) => {
    if (!item.imageUrl || !item.title || !item.description) {
      return null;
    }

    const date = formatDate(item.publishedAt);

    return (
      <View style={{marginVertical: 10}}>
        {/**Image */}
        <View
          style={{
            marginBottom: 10,
            height: 120,
            width: '100%',
            borderWidth: 0,
            borderRadius: 10,
            overflow: 'hidden',
            gap: 10,
          }}>
          <Image
            source={{uri: item.imageUrl}}
            style={{height: '100%', width: '100%'}}
          />
        </View>
        {/**Content */}
        <View style={{gap: 10}}>
          <View>
            <Text
              style={{
                fontWeight: '500',
                fontFamily: 'Nunito-Light',
                fontSize: 12,
                color: COLORS.darkgray,
              }}>
              {date}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'ArbutusSlab-Regular',
                color: COLORS.black,
                fontWeight: '700',
              }}>
              {item.title}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '300',
                color: COLORS.black,
                fontFamily: 'Nunito-Regular',
              }}>
              {item.description}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'Nunito-Bold',
                fontSize: 12,
                color: COLORS.black,
              }}>
              {item.author !== null ? item.author : 'CBC News'}
            </Text>
          </View>
        </View>
      </View>
    );
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
          <View>
            <Image
              style={{
                height: moderateScale(20),
                width: moderateScale(20),
              }}
              source={Images.backarrow}
              tintColor={'black'}
            />
          </View>
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
          data={headLines}
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

export default SeeAllPage;
