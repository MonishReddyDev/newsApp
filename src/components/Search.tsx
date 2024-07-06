// Search.js
import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {COLORS, Images} from '../constants/theme';
import {moderateScale} from 'react-native-size-matters';

const imageSize = moderateScale(40);

const Search = ({searchInputRef, handleTextDebounce}: any) => {
  return (
    <View style={styles.SearchSection}>
      <View style={styles.SearchInputField}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            ref={searchInputRef}
            onChangeText={text => {
              console.log('TextInput onChangeText:', text);
              handleTextDebounce(text);
            }}
            placeholder="What is the news today..."
            placeholderTextColor={COLORS.darkgray}
          />
          <TouchableOpacity style={styles.searchButton} activeOpacity={0.6}>
            <Image
              resizeMode="contain"
              source={Images.SearchIcon2}
              style={styles.SearchIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity>
        <Image source={Images.notificationIcon} style={styles.SearchIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  SearchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  SearchInputField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: imageSize,
    width: '90%',
    borderRadius: 30,
    padding: 10,
    backgroundColor: '#fff',
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    flex: 1,
    padding: moderateScale(3),
    color: COLORS.black,
  },
  searchButton: {
    borderWidth: 0,
  },
  SearchIcon: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
});

export default Search;
