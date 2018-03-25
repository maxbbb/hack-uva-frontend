import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";

import Modal from "react-responsive-modal";
import AdvancedSearch from "./Modals/AdvancedSearch.js";

import { Tabs, Tab } from "material-ui";

const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} = require("react-google-maps");
const {
  SearchBox
} = require("react-google-maps/lib/components/places/SearchBox");
const {
  StandaloneSearchBox
} = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const { height, width } = Dimensions.get("window");
import Auth from "../auth.js";
const auth = new Auth();

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Snackbar from "material-ui/Snackbar";
import TextField from "material-ui/TextField";

import lottie from "lottie-web";
import Navbar from "../components/Navbar.js";

export default class SearchHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      modalIsOpen: false
    };
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  _renderProperties = properties => {
    return properties.map(property => {
      return (
        // return property card here
        <PropertyCard address={property.address} />
      );
    });
  };

  render() {
    return (
      <MuiThemeProvider>
        <View>
          <Navbar />

          <Tabs>
            <Tab label="List Search">
              <PlacesWithStandaloneSearchBox />
              <ScrollView>
                {this._renderProperties(this.state.properties)}
              </ScrollView>
            </Tab>
            <Tab label="Map Search">
              <MapWithASearchBox />
            </Tab>
          </Tabs>
          {/* <button onClick={this.openModal}>Open modal</button> */}
        </View>
        <Modal open={this.state.modalIsOpen} onClose={this.closeModal}>
          <AdvancedSearch />
        </Modal>
      </MuiThemeProvider>
    );
  }
}

const PropertyCard = ({ address }) => {
  return (
    <View>
      <Text>{address}</Text>
    </View>
  );
};

const MapWithASearchBox = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: height * 0.85 }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        bounds: null,
        center: {
          lat: 18.422941,
          lng: -66.060647
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter()
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = {
            lat: 18.422941,
            lng: -66.060647
          };

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location
          }));
          const nextCenter = _.get(
            nextMarkers,
            "0.position",
            this.state.center
          );

          this.setState({
            center: nextCenter,
            markers: nextMarkers
          });
          // refs.map.fitBounds(bounds);
        }
      });
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
      //   controlPosition={100}
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`
        }}
      />
    </SearchBox>
    {props.markers.map((marker, index) => (
      <Marker key={index} position={marker.position} />
    ))}
  </GoogleMap>
));

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();

          this.setState({
            places
          });
        }
      });
    }
  }),
  withScriptjs
)(props => (
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search Titles"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: width,
          marginTop: 10,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`
        }}
      />
    </StandaloneSearchBox>
    <ol>
      {props.places.map(
        ({ place_id, formatted_address, geometry: { location } }) => (
          <li key={place_id}>
            {formatted_address}
            {" at "}
            ({location.lat()}, {location.lng()})
          </li>
        )
      )}
    </ol>
  </div>
));

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const styles = StyleSheet.create({
  modal: {}
});
