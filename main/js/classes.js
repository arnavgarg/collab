const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

var teacherName, UID;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("user signed in")
        UID = firebase.auth().currentUser.uid      
        teachRef =  db.collection('teachers').doc(UID).get().then((doc) => {
            teacherName = doc.data().first + " " + doc.data().last;
        });

        renderClassMenu();
    } else {
        console.log("user not signed in")
    }
});

function generateCode() {
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var numbers = "0123456789";

    var code = "";
    for (var i = 0; i < 6; i++) {
        if (i == 1 || i == 3) {
            code += letters[Math.floor(Math.random() * 26)];
        } else {
            code += numbers[Math.floor(Math.random() * 10)];
        }
    }
    return code;
}

function createClass(name) {
    var code = generateCode();
    var exists = true;    
    db.collection('classes').doc(code).get().then((snapshot) => {
        if (!snapshot.exists) {
            // doesn't exist, proceed
            console.log(code);
            db.collection('classes').doc(code).set({
                title: name,
                teacherName: teacherName,
                teacher: UID
            });
        } else {
            createClass(name);
        }
    });  
}

function newClassClicked() {
    var name = prompt("Enter Class Name");
    createClass(name);
}

function renderClassMenu() {
    var names = new Array(0);
    db.collection('classes').where("teacher", "==", UID).get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            names.push(doc.data().title);
        });
        
        if (names == null) {
            console.log("NULL");
            return;
        };
        var nav = document.getElementById("vertical-nav");
        for (var i = 0; i < names.length; i++) {
            console.log(names[i]);
            var item = document.createElement("a");
            item.id = "item";
            var p = document.createElement("p");
            p.innerHTML = names[i];
            item.appendChild(p);
            nav.appendChild(item);
        }
    });
}
