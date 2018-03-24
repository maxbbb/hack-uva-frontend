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
  }
});
