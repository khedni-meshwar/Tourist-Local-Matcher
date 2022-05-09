import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import COLORS from "../../consts/colors";
import CustomButton from "../components/CustomButton";
import Carousel from "pinar";
import { doc, addDoc, collection, Timestamp } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import CountryPicker from "react-native-country-picker-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import values from "../../consts/values";
import { Platform } from "expo-modules-core";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const db = getFirestore();
const storage = getStorage();

const CreateProfileScreen = ({ navigation }) => {
  const [carousel, setCarousel] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState(null);
  const [dobModalVisible, setDOBModalVisible] = useState(false);
  const [countryCode, setCountryCode] = useState("LB");
  const [callingCode, setCallingCode] = useState("961");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [interests, setInterests] = useState([]);

  const [imgURI, setImageURI] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [remoteURL, setRemoteURL] = React.useState("");
  const [error, setError] = React.useState(null);
  const [type, setType] = useState(null);

  const goToNextSlide = () => {
    if (carousel) carousel.scrollToNext();
  };

  const goToPrevSlide = () => {
    if (carousel) carousel.scrollToPrev();
  };

  const createAccountObject = () => {
    handleCloudImageUpload();

    let account = {
      firstName,
      lastName,
      dob,
      bio,
      image, // here its still a local uri path, you can use expo FileSystem or MediaLibary to do get an image out of it or array buffer or whatever
      interests: interests.map((interest) => interest.name),
      countryCode,
      type
    };

    console.log(account);

    addDoc(collection(db, "users"), account);

    navigation.navigate("MainScreen");
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
          nested: "foo",
        },
      },
    };
    addDoc(collection(db, "users"), docData);
  };

  const renderInterests = (interest) => {
    return (
      <View
        key={interest.id}
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 5,
          alignItems: "center",
        }}
      >
        <BouncyCheckbox
          fillColor={COLORS.primary}
          onPress={(isChecked) => {
            if (isChecked) {
              interests.push(interest);
            } else {
              interests.splice(
                interests.findIndex((i) => i.id === interest.id),
                1
              );
            }
            setInterests(interests);
          }}
        />
        <Text style={{ fontWeight: "300", color: COLORS.primaryAlternate }}>
          {interest.name}
        </Text>
      </View>
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageURI(result.uri);
    }
  };

  const getBlobFromUri = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    return blob;
  };

  const manageFileUpload = async (
    fileBlob,
    { onStart, onProgress, onComplete, onFail }
  ) => {
    console.log("hi");
    const imgName = "img-" + new Date().getTime();

    const storageRef = ref(storage, `users/${imgName}.jpg`);

    console.log("uploading file", imgName);

    // Create file metadata including the content type
    const metadata = {
      contentType: "image/jpeg",
    };

    // Trigger file upload start event
    onStart && onStart();
    const uploadTask = uploadBytes(storageRef, fileBlob);

    uploadTask.then(
      (snapshot) => {
        console.log("Uploaded a blob or file!");
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      },
      (error) => {},
      () => {}
    );
  };

  const handleLocalImageUpload = async () => {
    const fileURI = await pickImage();

    if (fileURI) {
      setImageURI(fileURI);
    }
  };

  const onStart = () => {
    setIsUploading(true);
  };

  const onProgress = (progress) => {
    setProgress(progress);
  };
  const onComplete = (fileUrl) => {
    setRemoteURL(fileUrl);
    setIsUploading(false);
    setImageURI(null);
  };

  const onFail = (error) => {
    setError(error);
    setIsUploading(false);
  };
  const handleCloudImageUpload = async () => {
    if (!imgURI) return;

    let fileToUpload = null;

    const blob = await getBlobFromUri(imgURI);

    await manageFileUpload(blob, { onStart, onProgress, onComplete, onFail });
  };

  const onSelectCountry = (country) => {
    const { cca2, callingCode } = country;
    setCountryCode(cca2);
    setCallingCode(callingCode[0]);
  };

  const storeType = async (value) => {
    try {
      await AsyncStorage.setItem("@type", value);
    } catch (e) {
      // saving error
    }
  };

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
          <View style={{ flex: 4 }}>
            <Text style={styles.normalText}>Before we get started...</Text>
            <Text style={[styles.headerTitle, { marginBottom: 10 }]}>
              How do you want to use the app?
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.secondary,
                padding: 50,
                borderRadius: 15,
                color: "white",
              }}
              onPress={() => {
                setType("tourist");
                storeType("tourist");
                goToNextSlide();
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 20, color: COLORS.secondaryAlternate }}
                >
                  I am visiting Lebanon
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.secondary,
                padding: 50,
                borderRadius: 15,
                color: "white",
                marginTop: 20,
                fontSize: 40,
              }}
              onPress={() => {
                setType("resident");
                storeType("resident");
                goToNextSlide();
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 20, color: COLORS.secondaryAlternate }}
                >
                  I want to meet tourists
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.root}>
          <View style={{ flex: 4 }}>
            <View style={styles.header}>
              <Text style={styles.normalText}>
                Let's create your profile...
              </Text>
              <Text style={[styles.headerTitle, { marginBottom: 10 }]}>
                What should we call you?
              </Text>
              <Text style={styles.subtitle}>
                Your name will be shown to other users on the app
              </Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.inputDesc}>First Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g: John"
                onChangeText={(val) => setFirstName(val)}
                placeholderTextColor={COLORS.secondaryAlternate}
              />
              <Text style={styles.inputDesc}>Last Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g: Smith"
                onChangeText={(val) => setLastName(val)}
                placeholderTextColor={COLORS.secondaryAlternate}
              />
            </View>
          </View>
          <CustomButton text="Next" onPress={goToNextSlide} />
        </View>

        <View style={styles.root}>
          <View style={{ flex: 4, width: "100%" }}>
            <Text style={styles.headerTitle}>When were you born?</Text>
            <Text style={[styles.subtitle, { marginBottom: 10 }]}>
              This information is kept private but will be used to match you
              with others.
            </Text>
            {Platform.OS === "ios" ? (
              <DateTimePicker
                display="default"
                style={{ width: "70%" }}
                value={dob ?? new Date()}
                onChange={(_event, date) => setDOB(new Date(date))}
              />
            ) : (
              <CustomButton
                text={dob ? dob.toDateString() : "Date Of Birth"}
                onPress={() => setDOBModalVisible(true)}
              />
            )}
            {dobModalVisible && (
              <DateTimePicker
                value={dob ?? new Date()}
                mode="calendar"
                display="default"
                onChange={(event, date) => {
                  if (event.type == "set") setDOB(date);
                  else setDOBModalVisible(false);
                }}
              />
            )}
          </View>
          <CustomButton text="Next" onPress={goToNextSlide} />
        </View>

        <View style={styles.root}>
          <View style={{ flex: 4, width: "100%" }}>
            <Text style={styles.headerTitle}>Where are you from?</Text>
            <Text style={[styles.subtitle, { marginBottom: 20 }]}>
              Your location helps us direct you to the right places.
            </Text>
            <View
              style={{
                width: "100%",
                backgroundColor: COLORS.secondary,
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 5,
                justifyContent: "center",
              }}
            >
              <CountryPicker
                withFilter
                countryCode={countryCode}
                withFlag
                withCountryNameButton
                withAlphaFilter={false}
                withCurrencyButton={false}
                onSelect={onSelectCountry}
              />
            </View>
          </View>
          <CustomButton text="Next" onPress={goToNextSlide} />
        </View>

        <View style={styles.root}>
          <View style={{ flex: 4, width: "100%" }}>
            <Text style={styles.headerTitle}>Customize your Profile</Text>
            <Text style={[styles.subtitle, { marginBottom: 30 }]}>
              Help others know more about you by adding a profile picture. You
              can always skip and come back later.
            </Text>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={pickImage}
            >
              <Image style={styles.imageContainer} source={{ uri: imgURI }} />
            </TouchableOpacity>
          </View>
          <CustomButton text="Next" onPress={goToNextSlide} />
        </View>

        <View style={styles.root}>
          <View style={{ flex: 4, width: "100%" }}>
            <Text style={styles.headerTitle}>Add a Biography</Text>
            <Text style={[styles.subtitle, { marginBottom: 15 }]}>
              Express who you are by writing a small biography about yourself.
              You can always skip and come back later.
            </Text>
            <TextInput
              style={{
                borderRadius: 20,
                height: 200,
                width: "100%",
                backgroundColor: COLORS.secondary,
                borderRadius: 5,
                padding: 10,
              }}
              placeholder="Use 200 characters to express who you are"
              placeholderTextColor={COLORS.secondaryAlternate}
              multiline={true}
              numberOfLines={7}
              onChangeText={(text) => setBio(text)}
              value={bio}
            />
          </View>
          <CustomButton text="Next" onPress={goToNextSlide} />
        </View>

        <View style={styles.root}>
          <View style={{ flex: 4 }}>
            <Text style={styles.headerTitle}>What are your interests?</Text>
            <Text style={[styles.subtitle, { marginBottom: 10 }]}>
              Choose between up to 5 interests for optimal recommendations.
            </Text>
            {values.interests.map(renderInterests)}
          </View>
          <CustomButton text="Finish" onPress={createAccountObject} />
        </View>
      </Carousel>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 10,
  },
  rootView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: COLORS.white,
  },
  root: {
    paddingVertical: 150,
    paddingHorizontal: 40,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: COLORS.white,
  },
  safeRoot: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: COLORS.white,
  },
  normalText: {
    color: COLORS.primaryAlternate,
    fontSize: 22,
    fontWeight: "300",
    textAlign: "left",
  },
  headerTitle: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "left",
  },
  subtitle: {
    color: COLORS.primaryAlternate,
    fontSize: 16,
    fontWeight: "300",
    textAlign: "left",
    lineHeight: 23,
  },
  instructions: {
    color: COLORS.primaryAlternate,
    fontSize: 16,
    textAlign: "left",
    lineHeight: 23,
    marginBottom: 50,
    marginLeft: 30,
  },
  inputDesc: {
    color: COLORS.primary,
    fontWeight: "500",
    fontSize: 18,
    textAlign: "left",
  },
  title: {
    color: COLORS.primaryAlternate,
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
    backgroundColor: COLORS.secondary,
    borderRadius: 3,
    paddingHorizontal: 15,
    marginVertical: 10,
    height: 40,
    justifyContent: "center",
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: COLORS.light,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});

export default CreateProfileScreen;
