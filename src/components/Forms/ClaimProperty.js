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

export default class ClaimProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null
    };
  }

  submitClaim = () => {};
  render() {
    return (
      <MuiThemeProvider>
        <View style={styles.pageContainer}>
          <Text style={styles.headerText}>File A Claim For Your Property</Text>
          <View style={styles.textFieldContainer}>
            <TextField
              underlineFocusStyle={styles.underline}
              floatingLabelStyle={styles.floatingLabel}
              hintText="Evan Stevens"
              errorText={this.state.nameError}
              fullWidth={true}
              floatingLabelText="Name"
              floatingLabelFixed={true}
              value={this.state.firstName}
              onChange={(event, value) => this.setState({ firstName: value })}
            />
            <TextField
              underlineFocusStyle={styles.underline}
              floatingLabelStyle={styles.floatingLabel}
              hintText="Evan Stevens"
              errorText={this.state.nameError}
              fullWidth={true}
              floatingLabelText="Name"
              floatingLabelFixed={true}
              value={this.state.firstName}
              onChange={(event, value) => this.setState({ lastName: value })}
            />
            <TextField
              underlineFocusStyle={styles.underline}
              floatingLabelStyle={styles.floatingLabel}
              hintText="Evan Stevens"
              errorText={this.state.nameError}
              fullWidth={true}
              floatingLabelText="Name"
              floatingLabelFixed={true}
              value={this.state.firstName}
              onChange={(event, value) => this.setState({ lastName: value })}
            />
            <TextField
              underlineFocusStyle={styles.underline}
              floatingLabelStyle={styles.floatingLabel}
              hintText="Evan Stevens"
              errorText={this.state.nameError}
              fullWidth={true}
              floatingLabelText="Name"
              floatingLabelFixed={true}
              value={this.state.firstName}
              onChange={(event, value) => this.setState({ lastName: value })}
            />
            <TextField
              underlineFocusStyle={styles.underline}
              floatingLabelStyle={styles.floatingLabel}
              hintText="Evan Stevens"
              errorText={this.state.nameError}
              fullWidth={true}
              floatingLabelText="Name"
              floatingLabelFixed={true}
              value={this.state.firstName}
              onChange={(event, value) => this.setState({ lastName: value })}
            />
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.submitClaim}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </MuiThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column"
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold"
  },
  textFieldContainer: {
    flex: 1,
    width: width / 2,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  submitButton: {
    width: width / 3,
    backgroundColor: "black",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  submitButtonText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white"
  }
});
