import React from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import App from "./App.js";

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", { rootTag: document.getElementById("root") });
