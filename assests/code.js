let name = $("#name")
let destination = $("#destination")
let submit = $("#submit")
let startTime = $("#start")
let frequency = $("#frequency")

// Your web app's Firebase configuration
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAgcJRNmMnskExKtBZVvbct7yRdezqSmyQ",
  authDomain: "trainscheduler-f3e50.firebaseapp.com",
  databaseURL: "https://trainscheduler-f3e50.firebaseio.com",
  projectId: "trainscheduler-f3e50",
  storageBucket: "trainscheduler-f3e50.appspot.com",
  messagingSenderId: "64165825466",
  appId: "1:64165825466:web:71c521f51c90ad28932b83",
  measurementId: "G-TZL7D8H5GK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database();
let ref = database.ref();

submit.on("click", function(e){
    e.preventDefault();
    ref.push({
        name: name.val(),
        destination: destination.val(),
        start: startTime.val(),
        frequency: frequency.val()
    })
    console.log(name.val(),)
    name.val("")
    destination.val("")
    startTime.val("")
    frequency.val("")
})

// Firebase watcher + initial loader HINT: .on("value")
ref.on("child_added", function(snapshot) {
    let table = $("#newrow");
    let row = $("<tr>")
    let data = $("<td>")

    // Current Time
    var currentTime = moment();
    // Converting the time given from user input
    var startTimeConverted = moment(snapshot.val().startTime, "HH:mm").subtract(1, "years");
    console.log(startTimeConverted)
    // Declaring the difference in time
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");
    console.log(moment())
    console.log(startTimeConverted)
    console.log(diffTime)
    // The remanding time between now and the next train
    var tRemainder = diffTime % snapshot.val().frequency;
    console.log(tRemainder)
    // Time in mins till next train
    var tMinutesTillTrain = snapshot.val().frequency - tRemainder;
    // The exact time till next train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");


    //let duration = moment.duration(now.diff(start));
    //let months = Math.floor(duration.asMonths());

  row.append(
    $("<td>").text(snapshot.val().name),
    $("<td>").text(snapshot.val().destination),
    $("<td>").text(snapshot.val().frequency),
    $("<td>").text(moment(nextTrain).format("hh:mm")),
    $("<td>").text(tMinutesTillTrain)
    //$("<td>").text(months),
    //$("<td>").text(`$${snapshot.val().rate}`),
    //$("<td>").text(`$${months * snapshot.val().rate}`)
);

table.append(row);
      
// Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

