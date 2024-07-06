import React from 'react';
import FastImage from 'react-native-fast-image';

const FastImageComponent = ({item, style}: any) => {
  return (
    <FastImage
      source={{
        uri: item,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
      style={style}
    />
  );
};

export default FastImageComponent;
