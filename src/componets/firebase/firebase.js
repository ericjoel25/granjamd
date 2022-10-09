import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAZNu2zV6_M7blzz06D726dk2xr7P5m2fg",
  authDomain: "chat-4a12e.firebaseapp.com",
  databaseURL: "https://chat-4a12e-default-rtdb.firebaseio.com",
  projectId: "chat-4a12e",
  storageBucket: "chat-4a12e.appspot.com",
  messagingSenderId: "31855232195",
  appId: "1:31855232195:web:a688f6a2b8c7a2eb81ce76",
  measurementId: "G-N2BM9SFNR2"
  };
  
  // Initialize Firebase
  export default  initializeApp(firebaseConfig);