(document.onload = function() {
  //Materialize plugin
  //Side Navigation
  const sidenav = document.querySelector('.sidenav');
  M.Sidenav.init(sidenav, {});

  //Slider
  const slider = document.querySelector('.slider');
  M.Slider.init(slider, {
    indicators: false,
    height: 500,
    transition: 500,
    interval:6000
  });

  // Gallery Zoom
  const mb = document.querySelectorAll('.materialboxed');
  M.Materialbox.init(mb, {});

  //Bootstrap UI
  //Modals
  $('#planTrip').click(function(){
    $('#firstModal').modal('show');
  });

  $('#nextModal').click(function(){
    $('#firstModal').modal('hide');
    //gets charge value for vehicle
    getCharge();
    //calculate hire cost
    calcHireCost();
    $('#secondModal').modal('show');
  });

  $('#resultModal').click(function(){
    $('#secondModal').modal('hide');
    //gets trip distance
    getDistance();
    //calculate number of charges
    calcChargeNum();
    //output info to DOM
    output();
    $('#thirdModal').modal('show');
  });


  // get all the required elements from the DOM
    var form = document.getElementById("vehicle-select");
    var seats = document.getElementById("seats");
    var days = document.getElementById("days");
    var vehicleType = document.getElementById("vehicle");
    var result = document.getElementById("result");
    // var submit = document.getElementById("submit-button");
    var motorbikeOption = document.getElementById("motorbike");
    var smallCarOption = document.getElementById("small-car");
    var largeCarOption = document.getElementById("large-car");
    var motorhomeOption = document.getElementById("motor-home");

    // set up form capture variables
    var seatsString;
    var daysString;
    var numSeats;
    var numDays;
    var departure = document.getElementById("departure");
    var destination = document.getElementById("destination");


    // Output vehicle options based on user options
    function checkVehicleAllowed(){

    if (numDays < 3 && numSeats === 1){
        clearVehicles();
        motorbikeOption.style.display="block";
        smallCarOption.style.display="block";
      }

	  else if (numDays < 6 && numSeats === 1){
        clearVehicles();
		    motorbikeOption.style.display="block";
        smallCarOption.style.display="block";
        largeCarOption.style.display="block";
      }

	  else if (numDays === 1 && numSeats === 2){
        clearVehicles();
        smallCarOption.style.display="block";
      }

    else if (numDays < 11 && numSeats === 1){
        clearVehicles();
        smallCarOption.style.display="block";
        largeCarOption.style.display="block";
      }

	  else if (numDays > 2 && numDays < 11 && numSeats === 2){
        clearVehicles();
        smallCarOption.style.display="block";
        largeCarOption.style.display="block";
		    motorhomeOption.style.display="block";
      }

    else if (numDays > 2 && numDays < 11 && numSeats < 6 && numSeats > 1){
        clearVehicles();
        largeCarOption.style.display="block";
        motorhomeOption.style.display="block";
      }

    else if (numDays === 2 && numSeats === 2){
        clearVehicles();
        smallCarOption.style.display="block";
		    motorhomeOption.style.display="block";
      }

    else if (numDays > 1 && numSeats > 1) {
        clearVehicles();
        motorhomeOption.style.display="block";
      }

	  else{
		  clearVehicles();
	  }

      }//checkVehicleAllowed ends

    // Hides unavailable vehicle options
    function clearVehicles(){
      motorbikeOption.style.display="none";
      smallCarOption.style.display="none";
      largeCarOption.style.display="none";
      motorhomeOption.style.display="none";
    }

    // Event listener for passenger form
    seats.onchange = function(){
      seatsString = seats.value;
      numSeats = parseInt(seatsString);
      checkVehicleAllowed();
    };

    // Event listener for days form
    days.onchange = function(){
      daysString = days.value;
      numDays = parseInt(daysString);
      checkVehicleAllowed();
    };

    //enables next button to become selectable if vehicle choice is chosen
	   vehicleType.onchange = function(){
       if (vehicleType.value != "0") {
         $("#nextModal").prop("disabled", false);
       }
		 else{
			 $("#nextModal").prop("disabled", true);
  		 }
     };

  //event listener that enables next button when departure and destination have both been chosen
   departure.onchange = function(){
      if (departure.value != "0" &&  destination.value != "0") {
        $("#resultModal").prop("disabled", false);
      }
 		 else{
 			 $("#resultModal").prop("disabled", true);
 		 }
  //prevents selecting same location for departure and destination
     blockLocation();
  };
  //event listener that enables next button when departure and destination have both been chosen
	  destination.onchange = function(){
     if (departure.value != "0" &&  destination.value != "0") {
       $("#resultModal").prop("disabled", false);
     }
		 else{
			 $("#resultModal").prop("disabled", true);
		 }
     //prevents selecting same location for departure and destination
     blockLocation();
   };

   //This Gets the Charge value based on vehicle selected
   function getCharge(){
     if (vehicleType.value == motorbikeOption.id){
       selectedVehicle = vehicles.motorbike;
       tripCharge = vehicles.motorbike.charge;
     }
     else if (vehicleType.value == smallCarOption.id){
       selectedVehicle = vehicles.smallCar;
       tripCharge = vehicles.smallCar.charge;
     }
     else if (vehicleType.value == largeCarOption.id){
       selectedVehicle = vehicles.largeCar;
       tripCharge = vehicles.largeCar.charge;
     }
     else {
       selectedVehicle = vehicles.motorhome;
       tripCharge = vehicles.motorhome.charge;
     }
   }

   //This blocks location if it is the same destination and departure place
   function blockLocation(){
     // Departure Variables
     var depAuck = document.getElementById("dep-auck");
     var depTaup = document.getElementById("dep-taup");
     var depWell = document.getElementById("dep-well");

     // Destination Variables
     var destAuck = document.getElementById("dest-auck");
     var destTaup = document.getElementById("dest-taup");
     var destWell = document.getElementById("dest-well");

     if (departure.value == depAuck.id){
       // shows available locations
       showLocation();
       destAuck.style.display="none";
       departureLocation = "Auckland";
     }
     else if (departure.value == depTaup.id){
       showLocation();
       destTaup.style.display = "none";
       departureLocation = "Taupo";
     }
     else if (departure.value == depWell.id){
       showLocation();
       destWell.style.display = "none";
       departureLocation = "Wellington";
     }
     else if (destination.value == destAuck.id){
       showLocation();
       depAuck.style.display = "none";
       destinationLocation = destAuck.id;
     }
     else if (destination.value == destTaup.id){
       showLocation();
       depTaup.style.display = "none";
       destinationLocation = destTaup.id;
     }
     else if (destination.value == destWell.id){
       showLocation();
       depWell.style.display = "none";
       destinationLocation = destWell.id;
     }
     else {
       showLocation();
     }
     //shows location options
     function showLocation(){
       destAuck.style.display="block";
       destTaup.style.display="block";
       destWell.style.display="block";
       depAuck.style.display="block";
       depTaup.style.display="block";
       depWell.style.display="block";
     }

     }

   //This gets the distance value based on the destination and departure select
   function getDistance(){
    if (departure.value == "dep-auck" && destination.value == "dest-taup" || departure.value == "dep-taup" && destination.value == "dest-auck"){
      tripDistance = distance.taupAuck;
    }
    else if (departure.value == "dep-well" && destination.value == "dest-taup" || departure.value == "dep-taup" && destination.value == "dest-well"){
      tripDistance = distance.wellTaup;
    }
    else if (departure.value == "dep-well" && destination.value == "dest-auck" || departure.value == "dep-auck" && destination.value == "dest-well"){
      tripDistance = distance.auckWell;
    }
  }

  // This calculates the number of times you need to charge for each trip
  function calcChargeNum(){
    chargeNum = tripCharge * (tripDistance / 100);
    chargeNumRounded = Math.ceil(chargeNum);
  }

  // This calculates the hire cost for the trip
  function calcHireCost(){
    daysString = days.value;
    numDays = parseInt(daysString);
    hireCost = (selectedVehicle.cost) * numDays;
  }

  // This outputs the trip details to the DOM
  function output(){
    $("#output-distance").text("Distance: "+tripDistance+"km");
    $("#output-vehicle").text("Your Chosen Vehicle: " + selectedVehicle.name);
    $("#output-days").text("Days Travelling: " + days.value);
    $("#output-charges").text("Charges Needed: " + chargeNumRounded);
    $("#output-total").text("Total Cost: $" + hireCost);
  }

}());
