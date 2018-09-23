function signin() {
    var email = document.getElementById("email").value;
    var pw = document.getElementById("pw").value;
    firebase.auth().signInWithEmailAndPassword(email, pw).catch(function(error) {
        // TODO Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if (error) {
            console.log(error.code + ": " + error.message);
        }
    });
}