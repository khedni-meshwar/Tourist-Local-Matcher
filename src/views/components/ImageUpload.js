import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";


function ImageUpload(props){
return(<TouchableOpacity
            style={styles.imageContainer}>
            <Image source={props.source} />
        </TouchableOpacity>
);

}
const styles = StyleSheet.create({
    imageContainer: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:100,
        height:100,
        backgroundColor:'#fff',
        borderRadius:50,
    },
  });
  
  export default ImageUpload;
  