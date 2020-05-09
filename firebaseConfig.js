import firebase from 'firebase';
import 'firebase/firestore'

// Firebase init
const config = {
    apiKey: "AIzaSyCghebwF0erkIKZVawPlJKXbZmeIUmE2Ok",
    authDomain: "vuegram-44440.firebaseapp.com",
    databaseUrl: "https://vuegram-44440.firebaseio.com",
    projectId: "vuegram-44440",
    storeageBucket: "vuegram-44440.appspot.com",
    messagingSenderID: "64578538653",
    appId: "1:64578538653:web:dcd8853ba88794b2ebd874",
    measurementId: "G-YL5ND8F2T6"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser

// firebase collections
const usersCollection = db.collection('users');
// const postsCollection = db.collection('posts');
// const commentsCollection = db.collection('comments');
// const likesCollection = db.collection('likes');

export {
    db,
    auth,
    currentUser,
    usersCollection
    // postsCollection,
    // commentsCollection,
    // likesCollection
}
