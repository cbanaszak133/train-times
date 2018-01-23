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

  	var newRef = database.ref().push()
  	console.log(newRef.key);

  	var newTrain = {
  		trainName: trainName,
  		destination: destination,
  		firstTrainTime: firstTrainTime,
  		frequency: frequency,
  		id: newRef.key
  	};

 
  	newRef.set(newTrain);
  	

  	


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

	var tTillArrival = frequency - tRemainder;

	var nextTrain = moment().add(tTillArrival, "minutes");
	console.log(nextTrain);

	var edit = "Edit";
	var d = "Delete";

	var assetKey = childSnapshot.val().id;

	console.log(assetKey);
	



	$("#train-table > tbody").append("<tr id='"+ assetKey +"'><td>" + trainName + "</td><td>" + destination + "</td><td>" +
		frequency + "</td><td>" +  nextTrain.format("hh:mm A") + "</td><td>" + tTillArrival + "</td><td>" +
		"<button class='editbtn'>" + edit + "</button></td>" + "<td><button class='delete'>" + d + "</button></td></tr>");

});

$(document).on("click",'.editbtn', function () {
	console.log("Hello!");
          var currentTD = $(this).parents('tr').find('td');
          if ($(this).html() == 'Edit') {                  
              $.each(currentTD, function () {
                  $(this).prop('contenteditable', true)
              });
          } else {
             $.each(currentTD, function () {
                  $(this).prop('contenteditable', false)
              });
          }

          $(this).html($(this).html() == 'Edit' ? 'Save' : 'Edit')

});

$(document).on("click", ".delete", function(){
	var $row = $(this).closest('tr');
	var id = $row.attr('id');
	console.log(id);
	database.ref().child(id).remove()

	$row.remove();
});




	

 



