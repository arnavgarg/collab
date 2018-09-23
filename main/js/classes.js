const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

const email = firebase.auth().currentUser.email;
const teachRef =  db.collection('teachers').where("email", "==", email).get();

function generateCode() {
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var numbers = "0123456789";

    var code = "";
    for (var i = 0; i < 6; i++) {
        if (i == 1 || i == 3) {
            code += letters[Math.floor(Math.random() * 26)];
        } else {
            code += numbers[Math.floor(Math.randon() * 10)];
        }
    }
    return code;
}

function createClass() {
    var code = generateCode();
    while (true) {
        db.collection('classes').doc(code).get().then((snapshot) => {
            if (!snapshot.exists) break;
        });
        code = generateCode();
    }

    var name = "test";
    db.collection('classes').doc(code).set({
        name: name,
        teacher: teachRef
    });
}

function getAllClassNames(email) {
    var names = [];
    db.collection('classes').where("teacher", "==", teachRef).get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            names.push(doc.data().name);
        });
        return names;
    });
}

renderClassMenu() {
    var names = getAllClassNames(email);
    var nav = document.getElementById("vertical-nav");
    for (var i = 0; i < names.length; i++) {
        var item = document.createElement("a");
        item.id = "item";
        var p = document.createElement("p");
        p.innerHTML = names[i];
        item.appendChild(p);
        nav.appendChild(item);
    }
}
