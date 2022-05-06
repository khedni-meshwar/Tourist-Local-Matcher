import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ImagePickerExample() {
  const [image, setImage] = useState("src/assets/images/User_icon-cp.svg.png");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <TouchableOpacity  onPress={pickImage}>
      {<Image style={styles.imageContainer} source={{uri: image}} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems:'center',
      marginLeft: '20%',
      marginBottom: '20%',
      justifyContent:'center',
      alignSelf: 'center',
      width:200,
      height:200,
      backgroundColor:'#fff',
      borderRadius:100,
  },
});