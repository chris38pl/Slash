// API Options
const CLIENT_ID = "302212346830-ds9p1ef0bch3fpcterj5cgjpeqfon3mb.apps.googleusercontent.com";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
const SCOPES = ["https://www.googleapis.com/auth/youtube.readonly","https://www.googleapis.com/auth/userinfo.profile"];

const authorizeButton = document.getElementById('google-account');
const signoutButton = document.getElementById('google-account-logout');

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
        scope:SCOPES[1],
        immediate:false
    }).then(() => {
        // Listen for sign in state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        //Handle initial signin state
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

       /*  authorizeButton.onClick = handleAuthClick(); */

        $(document).on('click',".google-account",handleAuthClick);
        $(document).on('click',"#google-account-logout",handleSignoutClick);
        /* signoutButton.onClick = handleSignoutClick; */
    });
}

// Update UI sign in changes
function updateSigninStatus(isSignedIn,googleUser){
    if(isSignedIn){
        $( "#SignInForm" ).css("display","none");
        $( ".form-group" ).css("display","none");
        $( "#SignOutForm" ).css("display","block");
        $( ".auth" ).css("max-width","60vw");
        $( "#welcome" ).css("display","block");
        
        gapi.client.load('oauth2', 'v2', function() {
            gapi.client.oauth2.userinfo.get().execute(function(resp) {
                $( "#user-hello" ).html(resp.name)
                $( "#sign-in-to" ).css("display","none")
                
            })
          });

        getChannel(defaultChannel);
    }else{
        $( "#SignInForm" ).css("display","block");
        $( ".form-group" ).css("display","block");
        $( "#SignOutForm" ).css("display","none");
        $( "#sign-in-to" ).css("display","block");
        $( ".auth" ).css("max-width","30vw");
        $( "#welcome" ).css("display","none");
        animateThunder();
    }

}

// Handle Login
function handleAuthClick(){
    gapi.auth2.getAuthInstance().signIn();
}

// Handle Logout
function handleSignoutClick(){
    gapi.auth2.getAuthInstance().signOut();
}

// Get channel from API
function getChannel(chanel){
    console.log(chanel);
}