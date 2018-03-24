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
      firstName: null
    };
  }

  submitClaim = () => {};
  render() {
    return (
      <MuiThemeProvider>
        <View style={styles.pageContainer}>
          <TextField
            underlineFocusStyle={styles.underline}
            floatingLabelStyle={styles.floatingLabel}
            hintText="Evan Stevens"
            errorText={this.state.nameError}
            fullWidth={true}
            floatingLabelText="Name"
            floatingLabelFixed={true}
            value={this.state.firstName}
            onChange={(event, value) => this.setState({ name: value })}
          />
        </View>
      </MuiThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    width: width / 2,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
