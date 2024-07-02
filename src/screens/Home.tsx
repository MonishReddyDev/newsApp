import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SectionList,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, Images} from '../constants/theme';
import {moderateScale} from 'react-native-size-matters';
import Categories from '../components/Categories';
import {apiCall, headLinesApicall} from '../API/Api';
import {debounce} from 'lodash';
import HorizontalList from '../components/HorizontalList';
import VerticalList from '../components/VerticalList';
import navigationStrings from '../constants/navigationStrings';

const imageSize = moderateScale(40);

const Home = ({navigation}: any) => {
  const {top} = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const searchInputRef = useRef<TextInput | null>(null);
  const [articles, setArticle] = useState([]);
  const [headLines, setHeadLines] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const modalRef = useRef<any>(null);

  const handleActiveCategory = (cat: string) => {
    setActiveCategory(cat);
    clearSearch();
    setArticle([]);
    FetchNews({q: cat, pageSize: 10});
  };

  useEffect(() => {
    FetchHeadLines();
  }, []);

  useEffect(() => {
    FetchNews();
  }, [searchInputRef]);

  const handleSearch = (text: any) => {
    setSearch(text);
    setisLoading(true);
    if (text.length > 2) {
      setArticle([]);
      setActiveCategory(null);
      FetchNews({q: text, pageSize: 10});
    } else if (text === '') {
      setArticle([]);
      setActiveCategory(null);
      searchInputRef?.current?.clear();
      FetchNews({q: 'India', pageSize: 10});
    }
  };

  const hanldeTextDebounce = useCallback(debounce(handleSearch, 400), []);

  const FetchHeadLines = async (params = {q: 'us', pageSize: 10}) => {
    setisLoading(true);
    try {
      const response = await headLinesApicall(params);
      if (response.success) {
        const articles = response.data.articles;
        // console.log(articles);
        //Set the articles array  in an array State
        const filteredData = articles.map(
          (
            item: {
              urlToImage: any;
              title: any;
              description: any;
              author: any;
              publishedAt: any;
              content: any;
            },
            index: any,
          ) => ({
            publishedAt: item.publishedAt,
            imageUrl: item.urlToImage,
            title: item.title,
            description: item.description,
            author: item.author,
            id: index,
            content: item.content,
          }),
        );
        setHeadLines(filteredData);
      } else {
        console.error('API call failed:', response.msg);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setisLoading(false);
  };

  const FetchNews = async (params = {q: 'india', pageSize: 10}) => {
    setisLoading(true);
    try {
      const response = await apiCall(params);
      if (response.success) {
        const articles = response.data.articles;
        //Set the articles array  in an array State
        const filteredData = articles.map(
          (
            item: {
              urlToImage: any;
              title: any;
              description: any;
              author: any;
              content: string;
            },
            index: any,
          ) => ({
            id: index,
            imageUrl: item.urlToImage,
            title: item.title,
            description: item.description,
            author: item.author,
            content: item.content,
          }),
        );

        setArticle(filteredData);
      } else {
        console.error('API call failed:', response.msg);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setisLoading(false);
  };

  const clearSearch = () => {
    setSearch('');
    searchInputRef?.current?.clear();
  };

  const handlePresentModalPress = useCallback(() => {
    modalRef.current?.present();
  }, []);

  const sections = [
    {
      id: 1,
      title: 'Search Bar',
      data: ['Search'],
      renderItem: () => (
        <View style={styles.SearchSection}>
          <View style={styles.SearchInputField}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                style={{
                  flex: 1,
                  padding: moderateScale(3),
                  color: COLORS.black,
                }}
                // value={search}
                ref={searchInputRef}
                onChangeText={hanldeTextDebounce}
                placeholder="What is the news today..."
                placeholderTextColor={COLORS.darkgray}
              />
              <TouchableOpacity style={{borderWidth: 0}} activeOpacity={0.6}>
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
              navigation.navigate(navigationStrings.SEEALL, {headLines})
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
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <HorizontalList article={articles} navigation={navigation} />
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
      data: ['articles'],
      renderItem: () => (
        <View
          style={{
            marginVertical: 15,
          }}>
          {isLoading ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) : (
            <VerticalList navigation={navigation} article={headLines} />
          )}
        </View>
      ),
    },
  ];

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item + index}
      renderItem={({section}: any) => section.renderItem()}
      contentContainerStyle={[styles.container, {paddingTop}]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(20), //Main Container margin
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
  SearchIcon: {
    width: moderateScale(30),
    height: moderateScale(30),
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
  SearchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  seeAllText: {
    fontFamily: 'Nunito-SemiBold',
    fontWeight: '400',
    fontSize: 14,
    color: COLORS.secondary,
  },
  filterCtainer: {
    borderWidth: 1,
    borderColor: COLORS.lightGray4,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderCurve: 'continuous',
  },
  filterText: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
    fontWeight: '600',
  },
});

export default Home;
