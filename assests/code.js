// Your web app's Firebase configuration
$(document).ready(function(){
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

  firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//Mement Stuff
var currentTime = moment().format();
console.log("Current Time: " + currentTime);

//Button var
const newLocal = "#submit";

//Button function
$(newLocal).on("click", function () {
  event.preventDefault();
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var trainTimes = moment($("#trainTimes").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequency").val().trim();


  var newtrain = {
    train: trainName,
    destination: destination,
    first: trainTimes,
    frequency: frequency
  };

  
  //Pushing to the database
  database.ref().push(newtrain);
  console.log(newtrain.train);
  console.log(newtrain.destination);
  console.log(newtrain.first);
  console.log(newtrain.frequency);
  $("#trainName").val("");
  $("#destination").val("");
  $("#trainTimes").val("");
  $("#frequency").val("");
});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  var trainName = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var trainTimes = childSnapshot.val().first;
  var frequency = childSnapshot.val().frequency;


  fisrtTrainTimeConversion = moment(trainTimes, "hh:mm a").subtract(1, "years")
  currentTime = moment().format("HH:mm a")
  trainTimeDifference = moment().diff(moment(fisrtTrainTimeConversion), "minutes")
  timeLeft = trainTimeDifference % frequency
  minAway = frequency - timeLeft
  nextArrival = moment().add(minAway, "minutes").format("hh:mm a")

  $("#current-emp > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minAway +"</td></tr>")
  /*var trainTimeConverted = moment(trainTimes, "HH:mm");
  var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
  console.log(timeDifference);
  var frequencyMinutes = childSnapshot.val().frequency;
  console.log("Frequency Minutes: " + frequencyMinutes);
  var minutesAway = Math.abs(timeDifference % frequencyMinutes);
  console.log("Minutes Away: " + minutesAway);
  var nextArrival = moment(currentTime).add(minutesAway, "minutes").format("hh:mm A");
  console.log("Next Arrival: " + nextArrival);
  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");*/
})
})

/*// Initialize Firebase
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
  });

  table.append(row);
      
$("#submit").on("click", function(event){
  event.preventDefault();

  // YOUR TASK!!!
  // Code in the logic for storing and retrieving the most recent user.
  // Don't forget to provide initial data to your Firebase database.
  trainData.name = $("#name").val().trim();
  trainData.destination = $("#destination").val().trim();
  trainData.frequency = $("#frequency").val().trim();
  trainData.startTime = $("#start").val().trim();

  // Code for the push
  dataRef.ref().push({

    name: trainData.name,
    destination: trainData.destination,
    frequency: trainData.frequency,
    startTime: trainData.startTime
  })
})
// Firebase watcher + initial loader HINT: .on("value")
ref.on("child_added", function(snapshot) {
    let table = $("#newrow");
    let row = $("<tr>")
    let data = $("<td>")

    let now = moment(new Date());
    let start = moment(snapshot.val().start);
    //let duration = moment.duration(now.diff(start));
    //let months = Math.floor(duration.asMonths());

    row.append(
        $("<td>").text(snapshot.val().name),
        $("<td>").text(snapshot.val().destination),
        $("<td>").text(snapshot.val().start),
        //$("<td>").text(months),
        //$("<td>").text(`$${snapshot.val().rate}`),
        //$("<td>").text(`$${months * snapshot.val().rate}`)
        );
    table.append(row);
        
    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});*/


//======================================================================

//Firebase stuff
