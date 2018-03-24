import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";

const { height, width } = Dimensions.get("window");
import Auth from "../auth.js";
const auth = new Auth();

export default class SearchHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: []
    };
  }

  _renderProperties = properties => {
    return properties.map(property => {
      return (
        // return property card here
        <View />
      );
    });
  };

  render() {
    return (
      <View>
        <Text>Search Page</Text>
        <ScrollView>{this._renderProperties(this.state.properties)}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
