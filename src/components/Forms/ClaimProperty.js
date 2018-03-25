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
import RaisedButton from "material-ui/RaisedButton";

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
          <View style={styles.textFieldContainer}>
            <Text style={styles.headerText}>
              File A Claim For Your Property
            </Text>

            <TextField
              underlineFocusStyle={styles.underline}
              floatingLabelStyle={styles.floatingLabel}
              hintText="Ricardo Rose"
              errorText={this.state.nameError}
              fullWidth={true}
              floatingLabelText="Buyer Name"
              floatingLabelFixed={true}
              value={this.state.firstName}
              onChange={(event, value) => this.setState({ firstName: value })}
            />
            <TextField
              underlineFocusStyle={styles.underline}
              floatingLabelStyle={styles.floatingLabel}
              hintText="Jose Lopez"
              errorText={this.state.nameError}
              fullWidth={true}
              floatingLabelText="Seller Name"
              floatingLabelFixed={true}
              value={this.state.firstName}
              onChange={(event, value) => this.setState({ lastName: value })}
            />
            <TextField
              underlineFocusStyle={styles.underline}
              floatingLabelStyle={styles.floatingLabel}
              hintText="3850 Fieldcrest"
              errorText={this.state.nameError}
              fullWidth={true}
              floatingLabelText="Address"
              floatingLabelFixed={true}
              value={this.state.firstName}
              onChange={(event, value) => this.setState({ lastName: value })}
            />
            <TextField
              underlineFocusStyle={styles.underline}
              floatingLabelStyle={styles.floatingLabel}
              hintText="$100,000"
              errorText={this.state.nameError}
              fullWidth={true}
              floatingLabelText="Price"
              floatingLabelFixed={true}
              value={this.state.firstName}
              onChange={(event, value) => this.setState({ lastName: value })}
            />
            <TextField
              underlineFocusStyle={styles.underline}
              floatingLabelStyle={styles.floatingLabel}
              hintText="2540ft"
              errorText={this.state.nameError}
              fullWidth={true}
              floatingLabelText="Square Feet"
              floatingLabelFixed={true}
              value={this.state.firstName}
              onChange={(event, value) => this.setState({ lastName: value })}
            />

            <View style={{ margin: 50 }}>
              <RaisedButton
                label="Submit"
                labelColor="#531B93"
                labelStyle={{ font: "Avenir" }}
                buttonStyle={styles.button}
                onClick={this.submitClaim}
              />
            </View>
          </View>
        </View>
      </MuiThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column"
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    font: "Avenir",
    margin: 50
  },
  textFieldContainer: {
    flex: 1,
    width: width / 2,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    margin: 100,
    padding: 25,
    borderRadius: 5,
    shadowColor: "rgba(0, 0, 0, 0.6)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2
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
  },
  button: {
    marginTop: 25,
    width: width / 3,
    alignSelf: "flex-start",
    backgroundColor: "purple",
    marginBottom: 100
  }
});
