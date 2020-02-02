// API Options
const CLIENT_ID = "302212346830-ds9p1ef0bch3fpcterj5cgjpeqfon3mb.apps.googleusercontent.com";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/youtube.readonly";

const authorizeButton = document.getElementsByClassName('google-account');
const signoutButton = document.getElementsByClassName('google-account-logout');

const defaultChannel = "techguyweb"

// Load auth2 library
function handleClinetLoad(){
    gapi.load('client:auth2', initClient);
}

// Initialize API client library and set up sign in listeners
function initClient(){
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope:SCOPES,
        immediate:false
    }).then(() => {
        console.log(gapi.auth2)
        // Listen for sign in state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        //Handle initial signin state
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

       /*  authorizeButton.onClick = handleAuthClick(); */

        $(document).on('click',".google-account",handleAuthClick);
        /* signoutButton.onClick = handleSignoutClick(); */
    });
}

// Update UI sign in changes
function updateSigninStatus(isSignedIn){

    if(isSignedIn){
        authorizeButton.style.display = "none";
        $(".api-test").style("display","block")
        getChannel(defaultChannel);
    }else{
        authorizeButton.style.display = "block";
    }

}

// Handle Login
function handleAuthClick(){
    alert('hi')
    /* gapi.auth2.getAuthInstance().signIn(); */
}

// Handle Logout
function handleSigniutClick(){
    gapi.auth2.getAuthInstance().signOut();
}

// Get channel from API
function getChannel(chanel){
    console.log(chanel);
}