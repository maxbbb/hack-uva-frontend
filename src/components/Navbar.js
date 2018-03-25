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
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import { Link } from "react-router-dom";

const { height, width } = Dimensions.get("window");

const NavBar = ({ login }) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.logoText}>NEW TERRAIN</Text>

      <View style={{ flexDirection: "row" }}>
        <View style={styles.button}>
          
          <Link to="/claim">
            <RaisedButton
              label="Lawyer Validation"
              labelColor="#531B93"
              labelStyle={{ font: "Avenir" }}
              buttonStyle={styles.button}
            />
          </Link>
        </View>

        <View style={styles.button}>
          <RaisedButton
            label="Manager Validation"
            labelColor="#531B93"
            labelStyle={{ font: "Avenir" }}
            buttonStyle={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#531B93",
    width: width,
    height: height / 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logoText: {
    fontSize: 17,
    color: "white",
    marginLeft: 30,
    marginRight: 20,
    font: "Avenir",
    fontWeight: 50
  },
  navbarText: {
    fontSize: 17,
    color: "black",
    marginLeft: 30,
    marginRight: 20
  },
  button: {
    width: width / 6,
    marginRight: 20
  }
});
