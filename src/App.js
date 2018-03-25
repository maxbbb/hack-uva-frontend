import React, { Component } from "react";
import SimpleStorageContract from "../build/contracts/Multisig.json";
import getWeb3 from "./utils/getWeb3";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import firebase from "./firebase.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
  BrowserRouter as Router,
  withRouter,
  Link,
  Route,
  Switch
} from "react-router-dom";

import Home from "./components/Home.js";
import SearchHome from "./components/SearchHome.js";
import ClaimProperty from "./components/Forms/ClaimProperty.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storageValue: 0,
      web3: null
    };
  }

  componentDidMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        console.log(results, "results");
        this.setState({
          web3: results.web3
        });

        // Instantiate contract once web3 provided.

        this.instantiateContract();
      })
      .catch(() => {
        console.log("Error finding web3.");
      });
  }

  instantiateContract = () => {
    console.log("contract instantiated");
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = "../contracts/Multisig.sol";
    const simpleStorage = contract(SimpleStorageContract);
    simpleStorage.setProvider(this.state.web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance;

    // Get accounts.
    console.log("eth");
    this.state.web3.eth.getAccounts((error, accounts) => {
      console.log(error, accounts, "get accounts");
      simpleStorage
        .deployed()
        .then(instance => {
          simpleStorageInstance = instance;

          // Stores a given value, 5 by default.
          console.log("success");
          console.log(
            simpleStorageInstance.submitApplication("kalsdjfa", "lakjsdflkj")
          );

          return simpleStorageInstance.set(5, { from: accounts[0] });
        })
        .then(result => {
          // Get the value from the contract to prove it worked.
          return simpleStorageInstance.get.call(accounts[0]);
        })
        .then(result => {
          // Update state with the result.
          return this.setState({ storageValue: result.c[0] });
        });
    });
  };

  render() {
    return (
      // <div className="App">
      //   <nav className="navbar pure-menu pure-menu-horizontal">
      //     <a href="#" className="pure-menu-heading pure-menu-link">
      //       Truffle Box
      //     </a>
      //   </nav>

      //   <main className="container">
      //     <div className="pure-g">
      //       <div className="pure-u-1-1">
      //         <h1>Good to Go!</h1>
      //         <p>Your Truffle Box is installed and ready.</p>
      //         <h2>Smart Contract Example</h2>
      //         <p>
      //           If your contracts compiled and migrated successfully, below will
      //           show a stored value of 5 (by default).
      //         </p>
      //         <p>
      //           Try changing the value stored on <strong>line 59</strong> of
      //           App.js.
      //         </p>
      //         <p>The stored value is: {this.state.storageValue}</p>
      //       </div>
      //     </div>
      //   </main>
      // </div>
      <MuiThemeProvider>
        <Router>
          <Switch>
            <Route exact path="/home" component={SearchHome} />
            <Route exact path="/claim" component={ClaimProperty} />
            <Route component={Home} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
