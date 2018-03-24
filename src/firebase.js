import firebase from "firebase";
var config = {
  apiKey: "AIzaSyBOriyaw-hAZtgiAYbv_w9rKCGGt1GyZqY",
  authDomain: "puerto-rico-hackuva.firebaseapp.com",
  databaseURL: "https://puerto-rico-hackuva.firebaseio.com",
  projectId: "puerto-rico-hackuva",
  storageBucket: "",
  messagingSenderId: "545292851306"
};
var fire = firebase.initializeApp(config);
export default fire;
