import React, { useState } from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";

const { width, height } = Dimensions.get("window");

import COLORS from "../../consts/colors";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton"
import Carousel from "pinar";
import { doc, addDoc, collection, Timestamp } from "firebase/firestore"; 
// import db from "../../../firebase";
import { getFirestore } from "firebase/firestore";
import 
Modal from "react-native-modal-datetime-picker";
import CountryPicker from 'react-native-country-picker-modal';
import DateTimePicker from "react-native-modal-datetime-picker";
import ImageUpload from "../components/ImageUpload";
import ImagePickerExample from "../components/ImagePickerExample";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import interests from "../../../interests";


const db = getFirestore();


const CreateProfileScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [carousel, setCarousel] = useState(null);
  const [visible, setVisible] = useState(false);
  const [countryCode, setCountryCode] = useState('LB');
  const [callingCode, setCallingCode] = useState('961');
  const [infoValid, setInfoValid] = useState(false);
  const [bio, setBio] = useState("");
  const [colorBorder, setColorBorder] = useState("gray");
  const [isSelected, setSelection]=useState(false);

  const [image, setImg]=useState();
  const [data, setData]=useState([]);



  
  const onSelect = (country) => {
    console.log('country', country);
    const {cca2, callingCode} = country;
    setCountryCode(cca2);
    setCallingCode(callingCode[0]);
  }

  const selectCountry = (val) => {
    setState({country: val});
  }
  
  const selectRegion = (val) => {
    setState({region: val});
  }

  const goToNextSlide = () => {
    // if (carousel !== null && firstName != '' && lastName != '') {
      if(carousel !== null){
        carousel.scrollToNext();
      }
  };

  const goToPrevSlide = () => {
    if (carousel !== null) {
      carousel.scrollToPrev();
    }
  };

  const insertUserToDB = () => {
    const docData = {
    stringExample: "Hello!",
    booleanExample: true,
    numberExample: 3.14159265,
    dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
    arrayExample: [5, true, "hello"],
    nullExample: null,
    objectExample: {
        a: 5,
        b: {
            nested: "foo"
        }
    }
  };
  addDoc(collection(db, "users"), docData);

  }

  const showDatePicker = () => {
    setVisible(true);
  };
 
  const hideDatePicker = () => {
    setVisible(false);
  };
 
  const handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    hide
    ();
  };


  const renderInterests = (interest) => {
      return (
        <View  key={interest.id} style={{display: "flex", flexDirection: "row", padding: 10, flex:10}}>
          <BouncyCheckbox  fillColor={COLORS.primary} onPress={(isChecked) => {console.log("HIIII")}} />
          <Text>{interest.name}</Text>
        </View>
        );
  }

  return (
    <View style={styles.rootView}>
      <StatusBar backgroundColor={COLORS.primary} />
      <Carousel
        scrollEnabled={true}
        showsControls={false}
        ref={(c) => {
          setCarousel(c);
        }}
      >
        <View style={styles.root}>
          <SafeAreaView style={styles.safeRoot}>
            <View style={styles.header}>
              <Text>Let's create your profile...</Text>
              <Text style={styles.headerTitle}>What should we call you?</Text>
            </View>
            <View style={{marginBottom: 100}}>
              <Text style={styles.subtitle}>
                Your name will be shown to other users on the app.
              </Text>
              <Text style={styles.inputDesc}>First Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="First Name"
                onChangeText={(val) => setFirstName(val)}
              />
              <Text style={styles.inputDesc}>Last Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Last Name"
                onChangeText={(val) => setLastName(val)}
              />
            </View>
            {/* <CustomButton text= "Test DB" onPress={insertUserToDB}/> */}
            <CustomButton text = "Next" onPress={goToNextSlide} />
          </SafeAreaView>
        </View>
        <View style={styles.root}>
          <SafeAreaView style={styles.safeRoot}>
            <Text style={styles.headerTitle}>When were you born?</Text>
            <Text style={styles.subtitle}>
              This information is kept private but will be used to match you
              with others.
            </Text>
            <CustomButton text="Show DatePicker" onPress={showDatePicker} />
            <DateTimePicker
              isVisible={visible}
              onConfirm={handleDatePicked}
              onCancel={hideDatePicker}
        />
        <Text style={{marginBottom: 265}}/>
          <CustomButton text = "Next" onPress={goToNextSlide} />
          </SafeAreaView>
        </View>
        <View style={styles.root}>
          <SafeAreaView style={styles.safeRoot}>
            <Text style={styles.headerTitle}>Where are you from?</Text>
            <Text style={styles.subtitle}>
              Your location helps us direct you to the right places.
            </Text>
            <CountryPicker
              style={{justifyContent: 'center'}}
              withFilter
              countryCode={countryCode}
              withFlag
              withCountryNameButton
              withAlphaFilter={false}
              withCurrencyButton={false}
              onSelect={onSelect}
              containerButtonStyle={{
                alignItems: 'center',
                marginLeft: 100,
                marginBottom: 100
              }}
            />
            <Text style={[styles.instructions, {marginBottom: 200}]}>Press on the flag to select a country</Text>
            <CustomButton text = "Next" onPress={goToNextSlide}/>
          </SafeAreaView>
        </View>
        <View style={styles.root}>
          <SafeAreaView style={styles.safeRoot}>
            <Text style={styles.headerTitle}>Customize your profile.</Text>
            <Text style={styles.subtitle}>
              Help others know more about you by adding a bio and profile
              picture. You can always skip and come back later.
            </Text>
            <ImagePickerExample />
            <TextInput
              style={{borderColor:colorBorder, borderWidth: 2.0, minWidth: "100%", borderRadius: 20, display: "flex", textAlign:"left"}}
              placeholder="Insert Bio..."
              multiline={true}
              numberOfLines={7}
              onChangeText={(text) => setBio(text)}
              value={bio}
              />
            <CustomButton text = "Next" onPress={goToNextSlide}/>
          </SafeAreaView>
        </View>
        <View style={styles.root}>
          <SafeAreaView style={styles.safeRoot}>
            <Text style={styles.headerTitle}>What are your interests?</Text>
            <Text style={styles.subtitle}>
              Choose between 3 to 5 interests for optimal recommendations.
            </Text>
            {interests.map(renderInterests)}
            <CustomButton text = "Finish" onPress={() => navigation.navigate("MainScreen")}/>
          </SafeAreaView>
        </View>
      </Carousel>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 50
  },
  rootView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: COLORS.white,
  },
  root: {
    paddingTop: "20%",
    paddingBottom: "20%",
    paddingLeft: "10%",
    paddingRight: "10%",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: COLORS.white,
  },
  safeRoot: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "left",
  },
  subtitle: {
    color: COLORS.dark,
    fontSize: 16,
    textAlign: "left",
    lineHeight: 23,
    marginBottom: 50
  },
  instructions: {
    color: COLORS.dark,
    fontSize: 16,
    textAlign: "left",
    lineHeight: 23,
    marginBottom: 50,
    marginLeft: 30
  },
  inputDesc: {
    color: COLORS.dark,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "left",

  },
  title: {
    color: COLORS.dark,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    maxWidth: "70%",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: "grey",
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 10,
    padding: 8,
    marginTop: 10,
    marginBottom: 10,
    width: 315
  }
});

export default CreateProfileScreen;
