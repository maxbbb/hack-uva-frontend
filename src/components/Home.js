import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from "react-native";
import backgroundImage from "../assets/background.jpg";
const { height, width } = Dimensions.get("window");
import Auth from "../auth.js";
const auth = new Auth();

export default class Home extends Component {
  login = () => {
    auth.login();
  };

  render() {
    return (
      <View style={styles.pageContainer}>
        <NavBar login={this.login} />
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

const NavBar = ({ login }) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.navbarText}>Home</Text>
      <TouchableOpacity onPress={login}>
        <View>
          <Text style={styles.navbarText}>Login</Text>
        </View>
      </TouchableOpacity>
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
