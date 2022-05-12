import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Button,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  style,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signOut } from "firebase/auth";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

const auth = getAuth();
const db = getFirestore();

const { width } = Dimensions.get("screen");

export default function ProfileScreen({ navigation }) {
  const [currentSignedInUserObject, setCurrentSignedInUserObject] = useState(
    {}
  );
  const [places, setPlaces] = useState(null);
  const [favoritePlaces, setFavoritePlaces] = useState([]);
  const onPressHandler = () => {
    navigation.navigate("MatchingScreen");
  };

  async function fetchMainUser() {
    const userSnapshot = await getDocs(
      query(
        collection(db, "users"),
        where("authId", "==", auth.currentUser.uid)
      )
    );
    await userSnapshot.forEach(async (doc) => {
      await setCurrentSignedInUserObject({ id: doc.id, ...doc.data() });
      setFavoritePlaces(currentSignedInUserObject.favorites);
    });
    await getLocations();
  }

  useEffect(async () => {
    await fetchMainUser();
  }, []);

  useEffect(async () => {
    await getLocations();
  }, [favoritePlaces]);

  async function getLocations() {
    let locations = [];
    const q = query(
      collection(db, "locations"),
      where("__name__", "in", currentSignedInUserObject.favorites)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      locations.push(doc.data());
    });
    setPlaces(locations);
    console.log(locations);
  }

  const clearLoginData = async () => {
    try {
      await AsyncStorage.setItem("@userId", null);
    } catch (e) {
      // saving error
    }
  };

  const onSignOutPress = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    clearLoginData();
    navigation.navigate("LoginScreen");
  };

  const Card = ({ place }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("DetailsScreen", place)}
      >
        <ImageBackground
          style={styles.cardImage}
          source={{ uri: place.mainPhoto }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {place.name}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon name="place" size={20} color={COLORS.white} />
              <Text style={{ marginLeft: 5, color: COLORS.white }}>
                {place.location}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Icon name="star" size={20} color={COLORS.white} />
              <Text style={{ marginLeft: 5, color: COLORS.white }}>5.0</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <Ionicons
            name="log-out-outline"
            size={35}
            color="#52575D"
            onPress={onSignOutPress}
          ></Ionicons>
        </View>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={{ uri: currentSignedInUserObject.image }}
              style={styles.image}
              resizeMode="center"
            ></Image>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "500", fontSize: 36 }]}>
            {currentSignedInUserObject.firstName +
              " " +
              currentSignedInUserObject.lastName}
          </Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
            {currentSignedInUserObject.bio}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>23</Text>
            <Text style={[styles.text, styles.subText]}>Age</Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {
                borderColor: COLORS.secondaryAlternate,
                borderLeftWidth: 1,
                borderRightWidth: 1,
              },
            ]}
          >
            <Text style={[styles.text, { fontSize: 24 }]}>
              {currentSignedInUserObject.countryCode}
            </Text>
            <Text style={[styles.text, styles.subText]}>Nationality</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>
              {currentSignedInUserObject.type}
            </Text>
            <Text style={[styles.text, styles.subText]}>Type</Text>
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Favorite Places</Text>
          <FlatList
            contentContainerStyle={{ paddingLeft: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={places}
            renderItem={({ item }) => <Card place={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#52575D",
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
    marginLeft: "85%",
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  edit: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: "hidden",
    borderRadius: 10,
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
});
