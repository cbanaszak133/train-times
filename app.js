var config = {
    apiKey: "AIzaSyBxVtd_ODknduDsB-xmdG1gbWTFpgCZGW8",
    authDomain: "traintime-db.firebaseapp.com",
    databaseURL: "https://traintime-db.firebaseio.com",
    projectId: "traintime-db",
    storageBucket: "traintime-db.appspot.com",
    messagingSenderId: "446154548790"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on("click", function(){
  	event.preventDefault();

  	var trainName = $("#trainName").val().trim();
  	var destination = $("#destination").val().trim();
  	var firstTrainTime = $("#firstTrainTime").val().trim();
  	var frequency = $("#frequency").val().trim();

  	var newTrain = {
  		trainName: trainName,
  		destination: destination,
  		firstTrainTime: firstTrainTime,
  		frequency: frequency
  	};

  	database.ref().push(newTrain);

  	


	});

  database.ref().on("child_added", function(childSnapshot) {
  	var trainName = childSnapshot.val().trainName;
  	var destination = childSnapshot.val().destination;
  	var firstTrainTime = childSnapshot.val().firstTrainTime;

  	console.log(firstTrainTime);

  	var frequency = Number(childSnapshot.val().frequency);
  	console.log(frequency);

  	
  	var diffTime = moment().diff(moment(firstTrainTime, "hh:mm"), "minutes");
  	console.log(diffTime);

  	var tRemainder = diffTime % frequency;

  	var tToAdd = frequency - tRemainder;

  	var nextTrain = moment().add(tToAdd, "minutes");
  	console.log(nextTrain);


  	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  		frequency + "</td><td>" +  nextTrain.format("hh:mm A") + "</td><td>" + tToAdd);



  });


 



