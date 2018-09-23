const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

function classSelected(id) {
    selected = id;
    var feed = document.getElementById("feed");
    document.getElementById("new_message").innerHTML = '<input id="newmessage" type="text" placeholder="Enter message">';
    feed.innerHTML = "";

    db.collection('feed').where('class', '==', id).get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            var div = document.createElement('div');
            div.id = "post";
            div.className = "ui segment";

            var content = document.createElement('p');
            content.innerHTML = doc.data().content;
            var time = document.createElement('p');
            time.innerHTML = doc.data().timestamp;

            div.appendChild(content);
            div.appendChild(time);
            feed.appendChild(div);
        });
    });
}

function newMessage() {
    var input = document.getElementById("newmessage");
    db.collection('feed').add({
        class: id,
        content: input.value,
        timestamp: new Date().getTime()
    });
    location.reload();
}