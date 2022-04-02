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

const slides = [
  {
    type: "PersonalDetails", // full name
    title: "What should we call you?",
    description: "Your name will be shown to other users on the app.",
  },
  {
    type: "BirthdayDetails", // birthday
    title: "When were you born?",
    description:
      "This information is kept private but will be used to match you with others.",
  },
  {
    type: "LocationDetails", // country, city,
    title: "Where are you from?",
    description: "Your location helps us direct you to the right places.",
  },
  {
    type: "ProfileDetails", // photo and bio
    title: "Customize your profile.",
    description:
      "Help others know more about you by adding a bio and profile picture. You can always skip and come back later.",
  },
  {
    type: "InterestDetails", //list of interests to check
    title: "What are your interests?",
    description: "Choose between 3 to 5 interests for optimal recommendations.",
  },
];

const Slide = ({ item }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  switch (item.type) {
    case "PersonalDetails":
      return (
        <SafeAreaView style={styles.root}>
          <Text style={styles.headerTitle}>{item?.title}</Text>
          <Text style={styles.subtitle}>{item?.description}</Text>
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
        </SafeAreaView>
      );
    case "BirthdayDetails":
        return (
          <View style={styles.root}>
            <Text style={styles.headerTitle}>{item?.title}</Text>
            <Text style={styles.subtitle}>{item?.description}</Text>
          </View>
        );
    case "LocationDetails":
      return (
        <View style={styles.root}>
          <Text style={styles.headerTitle}>{item?.title}</Text>
          <Text style={styles.subtitle}>{item?.description}</Text>
        </View>
      );
    case "ProfileDetails":
      return (
        <View style={styles.root}>
          <Text style={styles.headerTitle}>{item?.title}</Text>
          <Text style={styles.subtitle}>{item?.description}</Text>
        </View>
      );
    case "InterestDetails":
      return (
        <View style={styles.root}>
          <Text style={styles.headerTitle}>{item?.title}</Text>
          <Text style={styles.subtitle}>{item?.description}</Text>
        </View>
      );
    default:
      return null;
  }
};

const CreateProfileScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const goToPreviousSlide = () => {
    const nextSlideIndex = currentSlideIndex - 1;
    if (nextSlideIndex != -1) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        {/* Indicator container */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.primary,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex == slides.length - 1 ? (
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
                onPress={goToPreviousSlide}
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
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.75 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: "20%",
    paddingLeft: "10%",
    paddingRight: "20%",
    paddingBottom: "35%",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    resizeMode: "contain",
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
