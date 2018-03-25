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
import anim1 from "../assets/reliable.json";
import anim2 from "../assets/transparent.json";
import anim3 from "../assets/logo_intro.json";
import anim4 from "../assets/problem.json";

import Multisig from "../../contracts/Multisig.sol";

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
    const animation4 = lottie.loadAnimation({
      container: document.getElementById("anim4"), // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: anim4
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
            <Text style={styles.headerText}>NEW TERRAIN</Text>

            <Text style={styles.subtitleText}>
              A new solution to property managment on the Blockchain
            </Text>

            <View style={styles.button}>
              <RaisedButton
                onClick={this.login}
                label="Begin"
                labelColor="#531B93"
                labelStyle={{ font: "Avenir" }}
                buttonStyle={styles.button}
              />
            </View>
          </View>
        </div>

        <div className="container2">
          <div
            style={{ width: 100, height: 100, zIndex: 10000 }}
            id={"anim4"}
          />
          <Text style={styles.problemHeader}>The Problem</Text>
          <Text style={styles.problemSubtitle}>
            After Hurricane Maria wreaked havoc on the Commonwealth of Puerto
            Rico in September 2017, millions were left with damaged homes
            without power or water. The island’s entrenched property title
            management system meant that 52% of Puerto Ricans could not prove
            property ownership to insurers, federal agencies and banks - crucial
            in seeking disaster relief aid.
          </Text>
        </div>

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
      <div style={{ width: 300, height: 300 }} id={"anim" + index} />
      <Text style={styles.topicHeader}>{title}</Text>
      <Text style={styles.topicDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },
  topicHeader: {
    fontSize: 40,
    fontWeight: 100,
    font: "Avenir"
  },
  topicDescription: {
    fontSize: 30,
    fontWeight: 100,
    font: "Avenir"
  },
  problemContainer: {
    width: width,
    height: height,
    backgroundColor: "#fafafa",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 1000
  },
  problemHeader: {
    fontSize: 72,
    fontWeight: 100,
    font: "Avenir-Light",
    zIndex: 10000
  },
  problemSubtitle: {
    fontSize: 30,
    fontWeight: 100,
    margin: 75,
    lineHeight: 50,
    font: "Avenir-Light",
    zIndex: 10000,
    textAlign: "center"
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
    backgroundColor: "rgba(83,27,147,0.1)",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  pointContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
