import firebase from 'firebase';

const config ={
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""

};

const fire = firebase.initializeApp(config); //initialize firebase
export default fire;