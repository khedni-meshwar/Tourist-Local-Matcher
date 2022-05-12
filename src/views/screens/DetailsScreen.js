import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Pressable
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import {
  doc,
  addDoc,
  collection,
  Timestamp,
  getFirestore,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

const DetailsScreen = ({ navigation, route }) => {
  const place = route.params;
  const [favPressed, setFavPressed] = useState(false);
   const [currentSignedInUserObject, setCurrentSignedInUserObject] = useState(
     {}
   );
  const handlePress = async () => {
    console.log(place.id);
    setFavPressed(true); 

    await setDoc(
      doc(db, "users", currentSignedInUserObject.id),
      {
        favorites: arrayUnion(place.id),
      },
      { merge: true }
    );
  }

    async function fetchMainUser() {
      const userSnapshot = await getDocs(
        query(
          collection(db, "users"),
          where("authId", "==", auth.currentUser.uid)
        )
      );
      userSnapshot.forEach(async (doc) => {
        await setCurrentSignedInUserObject({ id: doc.id, ...doc.data() });
      });
    }

    useEffect(async () => {
      await fetchMainUser();
    }, []);

  useEffect(() => {
    console.log("FavPressed: " + favPressed);

  }, [favPressed]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground style={{ flex: 0.7 }} source={{ uri: place.mainPhoto }}>
        <View style={style.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
          <Icon name="more-vert" size={28} color={COLORS.white} />
        </View>
        <View style={style.imageDetails}>
          <Text
            style={{
              width: "70%",
              fontSize: 30,
              fontWeight: "bold",
              color: COLORS.white,
              marginBottom: 20,
            }}
          >
            {place.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Icon name="star" size={30} color={COLORS.orange} />
            <Text
              style={{ color: COLORS.white, fontWeight: "bold", fontSize: 20 }}
            >
              {place.averageRating}
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View style={style.detailsContainer}>
        <Pressable style={style.iconContainer} onPress={handlePress}>
          <Icon name={favPressed? "favorite":"favorite-border"} color={favPressed? COLORS.red: "black"} size={30} />
        </Pressable>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Icon name="place" size={28} color={COLORS.primary} />
          <Text
            style={{
              marginLeft: 5,
              fontSize: 20,
              fontWeight: "bold",
              color: COLORS.primary,
            }}
          >
            {place.location}
          </Text>
        </View>
        <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 20 }}>
          About the trip
        </Text>
        <Text style={{ marginTop: 10, lineHeight: 22, fontSize:15 }}>{place.description}</Text>
      </View>
      
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  bookNowBtn: {
    height: 50,
    width: 150,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  iconContainer: {
    height: 60,
    width: 60,
    position: "absolute",
    top: -30,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    top: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.3,
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  imageDetails: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 30,
  },
  footer: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default DetailsScreen;
