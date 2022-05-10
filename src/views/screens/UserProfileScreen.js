import React from "react";
import { StyleSheet, View, Text, Pressable, Button,  SafeAreaView, Image, ScrollView } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import COLORS from "../../consts/colors";

const auth = getAuth();

export default function UserProfileScreen({ route, navigation }) {
  const { matchedUser } = route.params;
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>

        </View>

        <View style={{ alignSelf: "center" }}>
            <View style={styles.profileImage}>
                <Image source={{ uri: matchedUser.image}} style={styles.image} resizeMode="center"></Image>
            </View>

        </View>

        <View style={styles.infoContainer}>
            <Text style={[styles.text, { color:COLORS.primaryAlternate, fontWeight: "200", fontSize: 36 }]}>{matchedUser.firstName + " " + matchedUser.lastName}</Text>
            <Text style={[styles.text, { color: COLORS.secondaryAlternate, fontSize: 20 }]}>{matchedUser.bio}</Text>
        </View>

        <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 24 }]}>23</Text>
                <Text style={[styles.text, styles.subText, {color:COLORS.primaryAlternate, fontSize: 16}]}>Age</Text>
            </View>
            <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                <Text style={[styles.text, { fontSize: 24 }]}>{matchedUser.countryCode}</Text>
                <Text style={[styles.text, styles.subText, {color:COLORS.primaryAlternate, fontSize: 16}]}>Nationality</Text>
            </View>
            <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 24 }]}>Resident</Text>
                <Text style={[styles.text, styles.subText, {color:COLORS.primaryAlternate, fontSize: 16}]}>Type</Text>
            </View>
        </View>

        <View style={{ marginTop: 32 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.mediaImageContainer}>
                    <Image source={require("../../assets/images/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
                </View>
                <View style={styles.mediaImageContainer}>
                    <Image source={require("../../assets/images/media2.jpg")} style={styles.image} resizeMode="cover"></Image>
                </View>
                <View style={styles.mediaImageContainer}>
                    <Image source={require("../../assets/images/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
                </View>
            </ScrollView>
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
  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#52575D",
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF"
},

image: {
    flex: 1,
    height: undefined,
    width: undefined
},
titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
    marginLeft: "85%"
},
subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
},
profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden"
},
dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
},
active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10
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
    justifyContent: "center"
},
infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16
},
statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32
},
statsBox: {
    alignItems: "center",
    flex: 1
},
mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10
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
    shadowOpacity: 1
},
recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10
},
recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16
},
activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20
}
});

