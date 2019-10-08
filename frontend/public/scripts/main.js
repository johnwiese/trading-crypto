/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// Signs-in Friendly Chat.
function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

// Signs-out of Friendly Chat.
function signOut() {
  // Sign out of Firebase.
  firebase.auth().signOut();
}

// Initiate firebase auth.
function initFirebaseAuth() {
  // Listen to auth state changes.
  firebase.auth().onAuthStateChanged(authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
  return firebase.auth().currentUser.displayName;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!firebase.auth().currentUser;
}


// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  
    if (user) { // User is signed in!
    // Get the signed-in user's profile pic and name.
    console.log("ggg");
    doStripeStuff(user);
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();

    // Set the user's profile pic and name.
    userPicElement.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
    userNameElement.textContent = userName;

    // Show user's profile and sign-out button.
    userNameElement.removeAttribute('hidden');
    userPicElement.removeAttribute('hidden');
    signOutButtonElement.removeAttribute('hidden');

    // Hide sign-in button.
    signInButtonElement.setAttribute('hidden', 'true');

    // We save the Firebase Messaging Device token and enable notifications.
    //saveMessagingDeviceToken();
  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    console.log("kkk");
    doStripeStuff(user);
    userNameElement.setAttribute('hidden', 'true');
    userPicElement.setAttribute('hidden', 'true');
    signOutButtonElement.setAttribute('hidden', 'true');

    // Show sign-in button.
    signInButtonElement.removeAttribute('hidden');
  }
}


// Resets the given MaterialTextField.
function resetMaterialTextfield(element) {
  element.value = '';
  element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
}

 function doStripeStuff(user){
  
  var x = document.getElementsByTagName("script");
  if(user !== null){ 
    console.log("usersignin");  
    var stripe_already_added = false;
    /* for (var i=0; i< x.length; i++){
        if (x[i].src == "https://js.stripe.com/v3/"){
            // ... do not add header again
            stripe_already_added = true;           
        } 
    } */
    
    var content = document.getElementsByClassName("sr-main")[0];
    var parent = content.parentNode;
    if (content !== parent.firstChild){
      var parent = content.parentNode;
      parent.insertBefore(content, parent.firstChild);  
      document.getElementsByClassName("sr-main")[0].style.position = "relative";
      document.getElementsByClassName("sr-main")[0].style.right = "0px";
      document.getElementsByClassName("sr-main")[0].style.height = "450px";
      document.getElementsByClassName("sr-main")[0].style.margin = "20px";

      document.getElementsByClassName("sr-main")[0].style.visibility = "visible";
      //document.getElementById("chart").style.visibility = "visible";
    }
  } else {
    if (user == null){ 
      var content = document.getElementById("chart");
      var parent = content.parentNode;
      parent.insertBefore(content, parent.firstChild);  
      document.getElementsByClassName("sr-main")[0].style.position = "absolute";
      document.getElementsByClassName("sr-main")[0].style.right = "-1000px";
      document.getElementsByClassName("sr-main")[0].style.visibility = "hidden";
      document.getElementById("chart").style.visibility = "visible";  
    }         
  }
}


function addStripeDiv(){
  function addElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}
}



// Template for messages.
var MESSAGE_TEMPLATE =
    '<div class="message-container">' +
      '<div class="spacing"><div class="pic"></div></div>' +
      '<div class="message"></div>' +
      '<div class="name"></div>' +
    '</div>';

// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}

// A loading image URL.
var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

// Delete a Message from the UI.
function deleteMessage(id) {
  var div = document.getElementById(id);
  // If an element for that message exists we delete it.
  if (div) {
    div.parentNode.removeChild(div);
  }
}



// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
  }
}

// Checks that Firebase has been imported.
checkSetup();

// Shortcuts to DOM Elements.

var userPicElement = document.getElementById('user-pic');
var userNameElement = document.getElementById('user-name');
var signInButtonElement = document.getElementById('sign-in');
var signOutButtonElement = document.getElementById('sign-out');
var signInSnackbarElement = document.getElementById('must-signin-snackbar');

// Saves message on form submit.
//messageFormElement.addEventListener('submit', onMessageFormSubmit);
signOutButtonElement.addEventListener('click', signOut);
signInButtonElement.addEventListener('click', signIn);


// initialize Firebase
initFirebaseAuth();

// Remove the warning about timstamps change. 
var firestore = firebase.firestore();
var settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// We load currently existing chat messages and listen to new ones.
//loadMessages();
