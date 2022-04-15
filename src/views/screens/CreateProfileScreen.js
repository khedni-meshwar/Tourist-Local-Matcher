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
} from "react-native";

const { width, height } = Dimensions.get("window");

import COLORS from "../../consts/colors";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton"
import Carousel from "pinar";
import { doc, addDoc, collection, Timestamp } from "firebase/firestore"; 
// import db from "../../../firebase";
import { getFirestore } from "firebase/firestore";

const db = getFirestore();


const CreateProfileScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [carousel, setCarousel] = useState(null);

  const goToNextSlide = () => {
    if (carousel !== null) {
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

  return (
    <View style={styles.rootView}>
      <StatusBar backgroundColor={COLORS.primary} />
      <Carousel
        showsControls={false}
        ref={(c) => {
          setCarousel(c);
        }}
      >
        <View style={styles.root}>
          <SafeAreaView style={styles.safeRoot}>
            <Text>Let's create your profile...</Text>
            <Text style={styles.headerTitle}>What should we call you?</Text>
            <Text style={styles.subtitle}>
              Your name will be shown to other users on the app.
            </Text>
            <Text style={styles.inputDesc}>First Name</Text>
            <CustomInput
              placeholder="First Name"
              value={firstName}
              setValue={setFirstName}
            />
            <Text style={styles.inputDesc}>Last Name</Text>
            <CustomInput
              placeholder="Last Name"
              value={lastName}
              setValue={setLastName}
            />
            <CustomButton text= "Test DB" onPress={insertUserToDB}/>
          </SafeAreaView>
        </View>
        <View style={styles.root}>
          <SafeAreaView style={styles.safeRoot}>
            <Text style={styles.headerTitle}>When were you born?</Text>
            <Text style={styles.subtitle}>
              This information is kept private but will be used to match you
              with others.
            </Text>
          </SafeAreaView>
        </View>
        <View style={styles.root}>
          <SafeAreaView style={styles.safeRoot}>
            <Text style={styles.headerTitle}>Where are you from?</Text>
            <Text style={styles.subtitle}>
              Your location helps us direct you to the right places.
            </Text>
          </SafeAreaView>
        </View>
        <View style={styles.root}>
          <SafeAreaView style={styles.safeRoot}>
            <Text style={styles.headerTitle}>Customize your profile.</Text>
            <Text style={styles.subtitle}>
              Help others know more about you by adding a bio and profile
              picture. You can always skip and come back later.
            </Text>
          </SafeAreaView>
        </View>
        <View style={styles.root}>
          <SafeAreaView style={styles.safeRoot}>
            <Text style={styles.headerTitle}>What are your interests?</Text>
            <Text style={styles.subtitle}>
              Choose between 3 to 5 interests for optimal recommendations.
            </Text>
          </SafeAreaView>
        </View>
      </Carousel>
      {/* <View style = {{
        paddingLeft: "10%",
        paddingRight: "10%",
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        backgroundColor: COLORS.white}}>
        {carousel !== null && carousel.index >= Number(4) ? (
          <View style={{ height: 50 }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.replace("LoginScreen")}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: COLORS.white,
                }}
              >
                GET STARTED
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.btn,
                {
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  backgroundColor: "transparent",
                },
              ]}
              onPress={goToPrevSlide}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: COLORS.primary,
                }}
              >
                BACK
              </Text>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={goToNextSlide}
              style={styles.btn}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: COLORS.white,
                }}
              >
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 10,
    textAlign: "left",
    lineHeight: 23,
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
});

export default CreateProfileScreen;
