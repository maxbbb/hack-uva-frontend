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
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Snackbar from "material-ui/Snackbar";
import TextField from "material-ui/TextField";
import lottie from "lottie-web";
import anim from "../../assets/search_ask_loop.json";

export default class AdvancedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const animation = lottie.loadAnimation({
      container: document.getElementById("lottie"), // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: anim
    });

    animation.play();
  }

  render() {
    return (
      <View>
        <div style={{ width: 100, height: 100 }} id="lottie" />
        <Text style={{ fontSize: 40, color: "black" }}>advanced search</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
