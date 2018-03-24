import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-primitives";
import backgroundImage from "../assets/background.jpg";

export default class Home extends Component {
  render() {
    return (
      <View>
        <Image style={styles.backgroundImage} source={backgroundImage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },
  backgroundImage: {
    flex: 1
  }
});
