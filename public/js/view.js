// $(document).ready(function(){

        // });

// function getCookie(name) {
//     var value = "; " + document.cookie;
//     var parts = value.split("; " + name + "=");
//     if (parts.length == 2) return parts.pop().split(";").shift();
// }

// function check_connect(){
//     connect = getCookie("LoggedIn");
    
//     if (connect == undefined) {
//         window.location.href = "login.html";
//     } else {
//         $.post( "../scripts/show_movie.py", JSON.stringify({ "cookie": connect }))
//         .done(function( data ) {
//             myObj = JSON.parse(data);
            
//             if (myObj.ok == false){
//                 window.location.href = "login.html";
//             }

//         });
//     }
// }


function show() {
    $.get("show_a_video", function(result){
        data = JSON.parse(result);
        if (data.ok == true) {
            (function(){
                let url ="movies/"+data.video;
                let player = dashjs.MediaPlayer().create();
                player.initialize(document.querySelector("#videoPlayer"), url, true);
            })();
            stop_refresh();
        }
    });
}


// function myHandler(e) {
//     alert(3000);
// }
// let el = document.getElementById('video');
// if (el) {
//     el.addEventListener('ended', myHandler, false);
// }

// $("#video1").on("ended", function() {
//     console.log("you finish");
//     $(".overlay").show();
//     $("#movie").hide();
//     interval = setInterval(show, 3000);
// });

var interval;
function set_refresh() {
    interval = setInterval(show, 3000);
}

function stop_refresh() {
    clearInterval(interval);
}

$(document).ready(function(){
    set_refresh();
});

