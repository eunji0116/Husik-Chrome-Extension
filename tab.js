var date, hr, min, sec, timeFormat24;

// Display time and dates

function showClock() {
    date = new Date();
    hr_24 = date.getHours();
    hr_12 = date.getHours();
    min = date.getMinutes();
    var ampm = "AM"
    
    if(hr_12 == 0){
        hr_12 = 12;
    }
  
    if(hr_12 > 12){
        hr_12 = hr_12 - 12;
        ampm = "PM";
    }

    min = (min < 10) ? "0" + min : min;

    var time_24 = hr_24 + ":" + min;
    var time_12 = hr_12 + ":" + min + " " + ampm;

    var clock_el = document.getElementById("clock");
    
    // retain same time format 
    if (JSON.parse(localStorage.getItem(timeFormat24))) {
        clock_el.innerHTML = time_24;
    } else {
        clock_el.innerHTML = time_12;
    }
    clock_el.addEventListener("click", function() {
        if (JSON.parse(localStorage.getItem(timeFormat24))) {
            clock_el.innerHTML = time_12;
            localStorage.setItem(timeFormat24, false);s
        } else {
            clock_el.innerHTML = time_24;
            localStorage.setItem(timeFormat24, true);
        }
    });
}
showClock();
setInterval(function(){
    showClock();
 },1000);

var date_el = document.getElementById("date");

function showDate() {
    date = new Date();
    var month = date.getMonth()
    var months = ["January","February","March","April","May","June",
        "July","August","September","October","November","December"];
    var day = date.getDate();
    var year = date.getFullYear();

    var today = day + " " + months[month] + " " + year;

    date_el.innerHTML = today;
    showDay(today);
}

function showDay(today) {
    date = new Date();
    var days = ["Sunday","Monday","Tuesday","Wednesday",
                "Thursday","Friday","Saturday"];
    
    date_el.addEventListener("mouseover", function() {
        $("#date").html("It's " + days[date.getDay()]);
    });
    date_el.addEventListener("mouseout", function() {
        $("#date").html(today);
    });
}

var input_el = document.getElementById("myInput");
var list = document.querySelector("#list");
var ul_el = document.getElementById("list");

// Create a new todo list 
function newTodo() {
    var input = input_el.value;
    var ul_el = document.getElementById("list");
    var li_el = document.createElement("li");
    li_el.appendChild(document.createTextNode(input));
    ul_el.appendChild(li_el);
    document.getElementById("myInput").value = "";
    var span = document.createElement("SPAN");
    var closeTxt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(closeTxt);
    li_el.appendChild(span);
    store();
    removeTodo();
}

input_el.onkeyup = function(e) {
    if (e.keyCode == 13 && input_el.value != "") {
        newTodo();
    }
};

function checkedTodo() {
    list.addEventListener("click", function(e) {
        if(e.target.tagName == 'LI') {
            e.target.classList.toggle("checked");
            store();
        };
    }, false);
}

function removeTodo() {
    var close = document.getElementsByClassName("close");
    for (var i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            this.parentElement.style.display = "none";
            store();
        }
    }
}

function store() {
    localStorage.tasks = list.innerHTML;
}

function getData() {
    var storedData = localStorage.tasks;
    if (storedData) {
        list.innerHTML = storedData;
        removeTodo();
    }
}

showDate();
checkedTodo();
getData();