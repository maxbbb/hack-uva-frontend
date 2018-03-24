import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
  Dimensions
} from "react-native";
import backgroundImage from "../assets/background.jpg";
const { height, width } = Dimensions.get("window");

export default class Home extends Component {
  render() {
    return (
      <View style={styles.pageContainer}>
        <NavBar />
        <ImageBackground
          style={styles.backgroundImage}
          source={backgroundImage}
        >
          <Text style={styles.headerText}>Puerto Ricoooo</Text>
        </ImageBackground>
      </View>
    );
  }
}

const NavBar = () => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.navbarText}>Home</Text>
      <Text style={styles.navbarText}>Login</Text>
      <Text style={styles.navbarText}>Signup</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },
  backgroundImage: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontSize: 72,
    color: "black",
    zIndex: 1000,
    fontWeight: "bold"
  },
  navbar: {
    backgroundColor: "#FAFAFA",
    width: width,
    height: height / 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  navbarText: {
    fontSize: 24,
    color: "black",
    marginLeft: 30,
    marginRight: 20
  }
});
