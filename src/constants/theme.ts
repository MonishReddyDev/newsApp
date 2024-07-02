export const COLORS = {
  // base colors
  primary: '#FF3A44', //
  secondary: '#0080FF', //
  tertiary: '#FFE600', //

  // colors
  black: '#1E1F20',
  white: '#FFFFFF',

  lightGray: '#F5F5F6',
  lightGray2: '#F6F6F7',
  lightGray3: '#EFEFF1',
  lightGray4: '#F8F8F9',
  transparent: 'transparent',
  darkgray: '#898C95',
};

export const fontWeight = {
  medium: '500',
  semiBold: '600',
  bold: '700',
};

export const Images = {
  welcomeImage: require('../assets/Images/welcomeIcon.png'),
  SearchIcon: require('../assets/icons/searchIcon.png'),
  SearchIcon2: require('../assets/icons/search.png'),
  bellIcon: require('../assets/icons/bellIcon.png'),
  arrowForward: require('../assets/icons/arrowForward.png'),
  notificationIcon: require('../assets/icons/NotificationIcon.png'),
  backarrow: require('../assets/icons/arrowback.png'),
};

const appTheme = {COLORS, Images, fontWeight};
export default appTheme;
