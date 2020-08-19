import firebase from 'firebase';

const config ={
    apiKey: "AIzaSyDHG-csEyaYXJj8C-8BjFIwgprE5_ekT1c",
    authDomain: "techquiz-e2525.firebaseapp.com",
    databaseURL: "https://techquiz-e2525.firebaseio.com",
    projectId: "techquiz-e2525",
    storageBucket: "techquiz-e2525.appspot.com",
    messagingSenderId: "419845666106",
    appId: "1:419845666106:web:e56585a8b766caefc08c03",
    measurementId: "G-78FRVD627G"

};

const fire = firebase.initializeApp(config); //initialize firebase
export default fire;