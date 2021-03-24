import axios from "axios";
const instance = axios.create({
    // baseURL: 'http://localhost:5001/clone-529d0/us-central1/api' //the API (cloud function) URL, local API endpoint
    baseURL: 'https://us-central1-clone-529d0.cloudfunctions.net/api' //the API (cloud function) URL, local API endpoint

// Final firebase app deployment
// firebase deploy --only functions //need to cd functions !!
// after that I grab new API on dashboard in firebase.com and paste it here
});

export default instance;