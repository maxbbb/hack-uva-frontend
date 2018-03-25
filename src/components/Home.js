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

export default class Home extends Component {
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

        <div style={{ width: width, height: height }}>
          <div
            style={{
              zIndex: 10,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start"
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>Terreno Nuevo</Text>
            </View>
          </div>
        </div>
      </div>
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
