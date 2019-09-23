function loadView(view) {
    var xhttp = new XMLHttpRequest();
    var viewPath = view;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("Content").innerHTML = this.responseText;
        }
    };
    if (viewPath == 'chat') {
        xhttp.open("GET", "views/chat.html", true);
        xhttp.send();
    } else if (viewPath == 'profile') {
        xhttp.open("GET", "views/profile.html", true);
        xhttp.send();
    } else {
        xhttp.open("GET", "views/home.html", true);
        xhttp.send();
    }
}