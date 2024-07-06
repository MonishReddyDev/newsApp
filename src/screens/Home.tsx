// Home.js
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, Images} from '../constants/theme';
import {moderateScale} from 'react-native-size-matters';
import Categories from '../components/Categories';
import Search from '../components/Search';
import HorizontalList from '../components/HorizontalList';
import VerticalList from '../components/VerticalList';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchNews,
  getNewsStatus,
  selectAllArticles,
} from '../redux/newsfetchSlice';
import {
  fetchNewsHeadLines,
  getHeadlinesStatus,
  selectAllHeadlines,
} from '../redux/newsHeadLinesSlice';
import {AppDispatch} from '../redux/store';
import navigationStrings from '../constants/navigationStrings';
import {debounce} from 'lodash';

const Home = ({navigation}: any) => {
  const {top} = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const searchInputRef = useRef<TextInput | null>(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Redux State management
  const dispatch = useDispatch<AppDispatch>();
  const reduxArticles = useSelector(selectAllArticles);
  const reduxHeadlineArticles = useSelector(selectAllHeadlines);
  const isLoading = useSelector(getNewsStatus);
  const isLoadingHeadlines = useSelector(getHeadlinesStatus);

  useEffect(() => {
    dispatch(fetchNewsHeadLines({q: 'usa', pageSize: 10, page: 1}));
    dispatch(fetchNews({q: 'india', pageSize: 10, page: 1}));
  }, [dispatch]);

  const handleActiveCategory = (cat: string) => {
    setActiveCategory(cat);
    clearSearch();
    dispatch(fetchNews({q: cat, pageSize: 10}));
    dispatch(fetchNewsHeadLines({q: cat, pageSize: 10}));
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    console.log('Search text:', text);
    if (text.length > 2) {
      setActiveCategory(null);
      dispatch(fetchNews({q: text, pageSize: 10}));
    } else if (text === '') {
      setActiveCategory(null);
      searchInputRef?.current?.clear();
      dispatch(fetchNews({q: 'india', pageSize: 10}));
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  const clearSearch = () => {
    setSearch('');
    searchInputRef?.current?.clear();
  };

  const sections = [
    {
      id: 1,
      title: 'Search Bar',
      data: ['Search'],
      renderItem: () => (
        <Search
          searchInputRef={searchInputRef}
          handleTextDebounce={handleTextDebounce}
        />
      ),
    },
    {
      id: 2,
      title: 'Latest News Section',
      data: ['LatestNewsSection'],
      renderItem: () => (
        <View style={styles.latestNewsContainer}>
          <Text style={styles.latestNewsTxt}>Latest News</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(navigationStrings.SEEALL, {
                reduxHeadlineArticles,
              })
            }
            style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={styles.seeAllText}>See All</Text>
            <Image
              source={Images.arrowForward}
              style={{
                width: moderateScale(20),
                height: moderateScale(20),
              }}
              tintColor={COLORS.secondary}
            />
          </TouchableOpacity>
        </View>
      ),
    },
    {
      id: 3,
      title: 'Latest News',
      data: ['articles'],
      renderItem: () => (
        <View style={styles.LatestNewsListContainer}>
          {isLoading ? (
            <View>
              <Text>Loading...</Text>
            </View>
          ) : (
            <HorizontalList article={reduxArticles} navigation={navigation} />
          )}
        </View>
      ),
    },
    {
      id: 4,
      title: 'Categories',
      data: ['Categories'],
      renderItem: () => (
        <View style={{flexDirection: 'row'}}>
          <Categories
            activeCategory={activeCategory}
            handleActiveCategory={handleActiveCategory}
          />
        </View>
      ),
    },
    {
      id: 5,
      title: 'VerticalList',
      data: ['articlesHeadlines'],
      renderItem: () => (
        <View style={{marginVertical: 15}}>
          {isLoadingHeadlines ? (
            <View>
              <Text>Loading...</Text>
            </View>
          ) : (
            <VerticalList
              article={reduxHeadlineArticles}
              navigation={navigation}
            />
          )}
        </View>
      ),
    },
  ];

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item + index}
      renderItem={({section}) => section.renderItem()}
      contentContainerStyle={[styles.container, {paddingTop}]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(20),
  },
  latestNewsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  LatestNewsListContainer: {
    height: moderateScale(220),
    width: '100%',
    padding: 5,
    marginBottom: 15,
    justifyContent: 'center',
  },
  latestNewsTxt: {
    fontFamily: 'Nunito-SemiBold',
    fontWeight: 'bold',
    fontSize: 20,
    color: COLORS.black,
  },
  seeAllText: {
    fontFamily: 'Nunito-SemiBold',
    fontWeight: '400',
    fontSize: 14,
    color: COLORS.secondary,
  },
  filterContainer: {
    borderWidth: 1,
    borderColor: COLORS.lightGray4,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
    fontWeight: '600',
  },
});

export default Home;
