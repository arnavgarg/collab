function createAccount() {
    var first = document.getElementById("firstname").value;
    var last = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var pw = document.getElementById("pw").value;

    firebase.auth().createUserWithEmailAndPassword(email, pw).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // TODO handle error
        if (error) {
            console.log(errorCode + ": " + errorMessage); 
        }  else {
            console.log("Success"); 
        }
    });

    const db = firebase.firestore();
    db.settings({timestampsInSnapshots: true});
    db.collection('teachers').add({
        first: first,
        last: last,
        email: email
    });
}