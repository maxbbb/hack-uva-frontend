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

const { height, width } = Dimensions.get("window");

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

export default NavBar;

const styles = StyleSheet.create({
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
