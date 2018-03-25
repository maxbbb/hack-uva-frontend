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

import RaisedButton from "material-ui/RaisedButton";
import backgroundImage from "../assets/background.jpg";
const { height, width } = Dimensions.get("window");
import "./Home.css";
import Auth from "../auth.js";
const auth = new Auth();
import lottie from "lottie-web";
import anim1 from "../assets/search_ask_loop.json";
import anim2 from "../assets/search_ask_loop.json";
import anim3 from "../assets/search_ask_loop.json";

export default class Home extends Component {
  componentDidMount() {
    const animation1 = lottie.loadAnimation({
      container: document.getElementById("anim1"), // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: anim1
    });
    const animation2 = lottie.loadAnimation({
      container: document.getElementById("anim2"), // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: anim2
    });
    const animation3 = lottie.loadAnimation({
      container: document.getElementById("anim3"), // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: anim3
    });
  }

  login = () => {
    auth.login();
  };

  render() {
    return (
      <div>
        <div className="container">
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>NEW TERRANE</Text>

            <Text style={styles.subtitleText}>
              A new solution to property managment on the Blockchain
            </Text>

            <View style={styles.button}>
              <RaisedButton
                label="Begin"
                labelColor="#531B93"
                labelStyle={{ font: "Avenir" }}
                buttonStyle={styles.button}
              />
            </View>
          </View>
        </div>
        <View style={styles.problemContainer}>
          <Text style={styles.problemHeader}>The Problem</Text>
          <Text>
            asldfkajsdlfkajdsf alsdkjf alsdkf jalsdkfja dflakjdf alskdfjas
            ldfasd
          </Text>
        </View>

        <View style={styles.informationContainer}>
          <Topic
            animation={anim1}
            title={"Reliable"}
            description="my ass"
            index={1}
          />
          <Topic
            animation={anim2}
            title="Transparent"
            description="my ass"
            index={2}
          />
          <Topic
            animation={anim3}
            title="Inclusive"
            description="my ass"
            index={3}
          />
        </View>
      </div>
    );
  }
}

const Topic = ({ title, description, animation, index }) => {
  return (
    <View style={styles.pointContainer}>
      <div style={{ width: 100, height: 100 }} id={"anim" + index} />
      <Text>{title}</Text>
      <Text>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },
  problemContainer: {
    width: width,
    height: height,
    backgroundColor: "#fafafa",
    justifyContent: "space-around",
    alignItems: "center"
  },
  problemHeader: {
    fontSize: 72,
    fontWeight: 100,
    font: "Avenir-Light"
  },
  backgroundImage: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    flex: 1,
    zIndex: 10,
    margin: 150,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    width: width / 2
  },
  headerText: {
    fontSize: 100,
    color: "white",
    zIndex: 1000,
    font: "Avenir-Light",
    fontWeight: 75,
    marginTop: 50
  },

  subtitleText: {
    fontSize: 40,
    color: "white",
    zIndex: 1000,
    font: "Avenir-Light",
    fontWeight: 75
  },
  button: {
    marginTop: 25,
    width: width / 6,
    alignSelf: "flex-start",
    backgroundColor: "purple"
  },
  informationContainer: {
    width: width,
    height: height,
    backgroundColor: "#fafafa",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  pointContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
