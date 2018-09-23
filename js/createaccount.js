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
            alert(errorCode + ": " + errorMessage); 
            fail;
        }

        firebase.auth().signInWithEmailAndPassword(email, pw).catch(function(error) {
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
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("user signed in")      
            var uid = firebase.auth().currentUser.uid;
            const db = firebase.firestore();
            console.log("reach");
            db.settings({timestampsInSnapshots: true});
            db.collection('teachers').doc(uid).set({
                first: first,
                last: last,
                email: email
            });
            window.location.replace("main/feed.html");
        } else {
            console.log("user not signed in")
        }
    });
}