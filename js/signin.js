function signin() {
    var email = document.getElementById("email").value;
    var pw = document.getElementById("pw").value;
    firebase.auth().signInWithEmailAndPassword(email, pw).catch(function(error) {
        // TODO Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
            fail;
        } else if (errorCode != null) {
            alert(errorMessage);
            fail;
        }
    });
    window.location.replace("main/feed.html");
}