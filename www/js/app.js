var shift, getMyLocation, initAutoComplete, pushAddr2Box, fivePlugs, toastMe, messenger, deleteCard, editAddress;
var shareIneedApp, selectAccessory, updateAccQty, chooseCard, choosePrice, chooseSize;
// Dom7
var $$ = Dom7;


// Init App
var app = new Framework7({
  name : 'Ineed',
  id: 'org.ineedapp.Ineed',
  root: '#app',
  theme: 'auto',
  language: 'en',
  routes: routes
});

var mainView = app.views.create('.view-main', {
  url : './main.html',
  name : 'main',
  iosSwipeBack : false,
  router : true
});

toastMe = function(toastMessage){

    var toastMe = app.toast.create({
    text: toastMessage,
    position: 'center',
    closeTimeout: 2000,
  });

    toastMe.open();

}

editAddress = function(addressSerialNo, theAddressName, theAddressDetails){

    var editThisAddress = {

      addressSerialNo : addressSerialNo,
      theAddressName : theAddressName,
      theAddressDetails : theAddressDetails

    }
    editThisAddress = JSON.stringify(editThisAddress);
    window.localStorage.setItem("edit_this_address", editThisAddress);
    mainView.router.navigate("/editaddress/");
}


deleteCard = function(cardSerialNo){
  toastMe("Deleting Card...");
  
    app.request.post('https://nairasurvey.com/hub/delete_card.php', 
            {

             "card_serial" : cardSerialNo

           },
             function (data) {

                if (data == "delete successful") {

                  toastMe(data);
                  mainView.router.refreshPage();
                }
                else{

                  toastMe("Unable to delete Card");

                }

             },
             function () {

                toastMe("Unable to delete Card");

             });

}

messenger = function(theMessage, theChannel, theEmail, thePhone, theSubject){

  app.request.post('https://nairasurvey.com/hub/messenger.php', 
            {
             "the_message" : theMessage,
             "the_channel" : theChannel,
             "the_email" : theEmail,
             "the_phone" : thePhone,
             "the_subject" : theSubject
           },
             function (data) {

                if (data == "Message Sent!") {

                  toastMe(data);
                  
                }
                else{

                    toastMe("Unable to send message. Try again later");
                    console.log(data);
                    
                }

            }, function(){
                                 
                  toastMe("Network Error, Try again later");
                    
            });
}


        fivePlugs = function(){

             var ac6 = app.actions.create({
            grid: true,
            buttons: [
              [
                {
                  text: 'Gas and Accessories',
                  icon: '<a href="/choosegas/"><img src="imgs/cylinder.png" style="max-width:40%;display: block; margin:0 auto;"/></a>'
                },
                {
                  text: 'Food',
                  icon: '<a href="/food/"><img src="imgs/food.png" style="max-width:80%;display: block; margin:0 auto;"/></a>'
                },
                {
                  text: 'Delivery',
                  icon: '<a href="/newdelivery/"><img src="imgs/courier.png" style="max-width:100%;display: block; margin:0 auto;"/></a>'
                },
                {
                  text: 'Stores',
                  icon: '<a href="/stores/"><img src="imgs/store.png" style="max-width:80%;display: block; margin:0 auto;"/></a>'
                },
              
                {
                  text: 'Tara',
                  icon: '<a href="/tara/"><img src="imgs/talk_services.png" style="max-width:100%;display: block; margin:0 auto;"/></a>'
                },
                {
                  text: 'Other Services',
                  icon: '<a href="/others/"><img src="imgs/handy.png" style="max-width:40%;display: block; margin:0 auto;"/></a>'
                }
              ]
            ]
          });

              ac6.open();
        }


document.addEventListener("deviceready", deviceIsReady, false);



function deviceIsReady(){
StatusBar.styleLightContent();
StatusBar.backgroundColorByHexString("#ededed");


shareIneedApp = function(theRefCode){

// this is the complete list of currently supported params you can pass to the plugin (all optional)
var options = {

  message: 'Order whatever you need on Ineed: Register and use referral code ' + theRefCode, // not supported on some apps (Facebook, Instagram)
  subject: 'Ineed App', // fi. for email
  files: [], // an array of filenames either locally or remotely
  url: 'https://play.google.com/store/apps/details?id=com.blueportalcompany.ineed',
  chooserTitle: 'Share via', // Android only, you can override the default share sheet title,
};

var onSuccess = function(result) {
  console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
  console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
};

var onError = function(msg) {
  console.log("Sharing failed with message: " + msg);
};

window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);

}




 




  var onMapSuccess = function (position) {

      Latitude = position.coords.latitude;
      Longitude = position.coords.longitude;


      var myPosition = {
        lat : Latitude,
        lng : Longitude
      }

      //Now get street address from coords


      var geocoder = new google.maps.Geocoder().geocode({'location': myPosition}, function(results, status) {

            window.localStorage.setItem("my_delivery_address", results[0].formatted_address);
      });



      myPosition = JSON.stringify(myPosition);
      window.localStorage.setItem("my_delivery_address_coords", myPosition);


        }


        function onMapError(error, moveToPage) {

          toastMe("Unable to get your Location");
          setTimeout(function(){

              mainView.router.navigate("/" + moveToPage + "/");
              toastMe("Please enter your delivery addaress");

          }, 1500);
          
        }
    
    
      getMyLocation = function(moveToPage){
        navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, { enableHighAccuracy: true, timeout : 30000, maximumAge : 3000 });
      }


        




        

  

  document.addEventListener("backbutton", function (){
    
    var currentPage = mainView.router.currentRoute.name;
    
    //Re-route to Dashboard
    if(currentPage == "dashboard" || currentPage == "slides" || currentPage == "login" || currentPage == "signup" || currentPage == "signupoptions"){

        navigator.app.exitApp();
    }
    else if(currentPage == "addresses" || currentPage == "wallet" || currentPage == "verifyphone"){

      mainView.router.navigate("/settings/");

    }
    else if(currentPage == "gasmap" || currentPage == "gasaccmap" || currentPage == "settings"){

      mainView.router.navigate("/dashboard/");

    }

    else{

      mainView.router.back();

    }

    

}, false);



}















shift = function(shiftItem, theKeyCode){



      var split2Number = shiftItem.split("-");
      var theRealNumber = parseInt(split2Number[1]);
      var shift2Me = 0;

        
        
        var key = theKeyCode;

        if( key == 8 || key == 46 ){

          if(shiftItem != 'otp-1'){
            
            shift2Me = parseInt(theRealNumber - 1);
            $$("#otp-" + shift2Me).focus();
            
          }

        }else{
          
          if(shiftItem != 'otp-6'){
            
            shift2Me = parseInt(theRealNumber + 1);
            $$("#otp-" + shift2Me).focus();
            
          }
          

        }

    }







$$(document).on('page:init', '.page[data-name="slides"]', function (e){

  app.swiper.create('.swiper-container');
  var swiper = app.swiper.get('.swiper-container');

          $$(".next-btn").on("click", function(){

            swiper.slideNext();

          });

});



/* Greenie defined functions */









$$(document).on('page:init', '.page[data-name="enterrefcode"]', function (e){

    $$("#save-ref-code").on("click", function(){

        
        if ($$("#input-ref-code").val().trim() == "" || $$("#input-ref-code").val().trim() == " ") {

              toastMe("Please enter a valid code");

        }
        else{

        $$("#save-ref-code").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);

        // check if user exists inside database
        app.request.post("https://nairasurvey.com/hub/check_ref.php", 
          {
            
            "ref_code" : $$("#input-ref-code").val(),
            "referred" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial
          
          },function(data){

            if (data == "ref solved") {

                mainView.router.navigate("/dashboard/");
            }
            else{

                toastMe(data);
                $$("#save-ref-code").html("Continue").prop("disabled", false);

            }

        }, function(){

          toastMe("Network Error. Try Again Later");

        });

        }

    });

});








$$(document).on('page:init', '.page[data-name="enterotp"]', function (e){

   $$("#resend-btn").hide();

    function runTimer(){

    var timer = 60;
    var countDown = window.setInterval(function(){
        timer = timer - 1;
        $$("#countdown-btn").text("00 : " + timer);
        if (timer == 0) { window.clearInterval(countDown); 
            $$("#countdown-btn").hide();
            $$("#resend-btn").show();
        }
        
    },1000);
  }

  runTimer();

      
    $$("#otp-1").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-1", key);
      },50);
      
      
    });


    $$("#otp-2").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-2", key);
      },50);
      
      
    });


    $$("#otp-3").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-3", key);
      },50);
      
      
    });


    $$("#otp-4").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-4", key);
      },50);
      
      
    });


    $$("#otp-5").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-5", key);
      },50);
      
      
    });


    $$("#otp-6").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-6", key);
      },50);
      
      
    });


    



    $$("#resend-btn").click(function(){

      $$("#countdown-btn").show();
      $$("#resend-btn").hide();
      runTimer();
      toastMe("Sending OTP...");
      messenger("Hello, your OTP for Ineed is " + JSON.parse(window.localStorage.getItem("buyer_details")).email_otp + " <br>Regards, Ineed Team", "email", JSON.parse(window.localStorage.getItem("buyer_details")).email, JSON.parse(window.localStorage.getItem("buyer_details")).phone, "Ineed OTP Request");

    });



    
    



  $$("#finalise-reg-btn").click(function(){

    $$("#finalise-reg-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
    var buildUpOTP = $$("#otp-1").val() + $$("#otp-2").val() + $$("#otp-3").val() + $$("#otp-4").val() + $$("#otp-5").val() + $$("#otp-6").val();


      if (buildUpOTP == JSON.parse(window.localStorage.getItem("buyer_details")).email_otp) {
        
        //OTP correct
        $$("#finalise-reg-btn").html("Continue").prop("disabled", false);
        setTimeout(function(){mainView.router.navigate("/enterrefcode/");}, 2500);


          //Activate user account via email
          app.request.post('https://nairasurvey.com/hub/activate_account.php', 
            {

             "user_serial" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
             "the_channel" : "email",

           },
             function (data) {

              console.log(data);

                if (data == "user activated") {


                  messenger("Hello, " + JSON.parse(window.localStorage.getItem("buyer_details")).full_name + ", <br>You are welcome to Ineed. Explore for more features", "email", JSON.parse(window.localStorage.getItem("buyer_details")).email, JSON.parse(window.localStorage.getItem("buyer_details")).phone, "Welcome to Ineed!");



                }else{

                  toastMe("Unable to activate account. Try again Later");

                }

            }, function(){
                                 
                  toastMe("Network Error, Try again later");
                    
            });



      }
      else{

          toastMe("Invalid OTP");
          $$("#finalise-reg-btn").html("Continue").prop("disabled", false);
          $$(".otp-field").addClass("shake")
          setTimeout(function(){
            $$(".otp-field").removeClass("shake");
          },1000);
      }
      
  });


 
   
});




$$(document).on('page:init', '.page[data-name="signup"]', function (e){




          $$("#signup-form").submit(function(e){

          $$("#signup-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
            

            app.request.post('https://nairasurvey.com/hub/registration.php', 
            {
             "full_name" : $$("#full-name").val(),
             "email" : $$("#email").val(),
             "phone" : $$("#phone").val(),
             "password" : $$("#password").val()
           },
             function (data) {

              var splitData = data.split(" ");
              if (splitData[0] == "Successful") {

                  var buyerDetails = {

                    "full_name" : $$("#full-name").val(),
                     "email" : $$("#email").val(),
                     "phone" : $$("#phone").val(),
                     "buyer_serial" : splitData[1],
                     "email_otp" : splitData[2],
                     "phone_otp" : splitData[3],
                     "referral_code" : splitData[4]

                    }

                    buyerDetails = JSON.stringify(buyerDetails);
                    window.localStorage.setItem("buyer_details", buyerDetails);

                    setTimeout(function(){
                      mainView.router.navigate("/enterotp/");
                    },2000);
              }
              else{

                  toastMe("Unable to complete registration. Try again Later");
                  console.log(data);
                  $$("#signup-btn").html("<i class='icon f7-icons'>person_round</i>&nbsp;Create account").prop("disabled", false);

              }

            }, function(){
              
                    
                    toastMe("Network Error, Try again later");
                    $$("#signup-btn").html("<i class='icon f7-icons'>person_round</i>&nbsp;Create account").prop("disabled", false);

            });

          });



          

});








$$(document).on('page:init', '.page[data-name="dashboard"]', function (e){

  $$(".coming-soon").click(function(){
    toastMe("Coming soon...");
  });

  
    



        $$('.ac-6').on('click', function () {
         fivePlugs();
      });

      $$("#dashboard-search").click(function(){

          //mainView.router.navigate("/search/");
          toastMe("Coming soon...");

      });

      $$("#preview-full-name").text(JSON.parse(window.localStorage.getItem("buyer_details")).full_name);

});





$$(document).on('page:init', '.page[data-name="share"]', function (e){


      var smooth = window.localStorage.getItem("buyer_details");
      smooth = JSON.parse(smooth);
      smooth = smooth.referral_code;

      $$("#share-code-span").text(smooth);

      $$("#share-btn").click(function(){
        shareIneedApp(smooth);
      });
      

});







$$(document).on('page:init', '.page[data-name="gasmap"]', function (e){

  $$("#second-card").hide();

  
  

  function findMe(){

  $$("#place-my-delivery-address").text(window.localStorage.getItem("my_delivery_address"));
  myPoz = window.localStorage.getItem("my_delivery_address_coords");
  myPoz = JSON.parse(myPoz);


  var lagos = new google.maps.LatLng(6.5244, 3.3792);
  var mapOptions = {
    zoom:15,
    center: lagos,
    mapTypeControl : false,
    fullscreenControl: false
  }
  var map = new google.maps.Map(document.getElementById('the-map'), mapOptions);


  var infowindow = new google.maps.InfoWindow({
      content: "Your Delivery Address"
    });

  var startIcon = {
    url : "imgs/delivery_address.png",
    scaledSize: new google.maps.Size(50, 50)
   }


   marker = new google.maps.Marker({

    map: map,
    animation: google.maps.Animation.DROP,
    position:  new google.maps.LatLng(myPoz.lat, myPoz.lng),
    icon : startIcon

  });

   map.setCenter({lat : myPoz.lat, lng : myPoz.lng});
   marker.setMap(map);
   infowindow.open(map, marker);
  
         
  }



    if (!window.localStorage.getItem("my_delivery_address_coords")) {

    	setTimeout(function(){

    		getMyLocation();
    		setTimeout(function(){
    			findMe();	
    		}, 1500);
    		

    	}, 3000);
    }
    else{

    	setTimeout(function(){

    		findMe();

    	}, 3000);
    	
    }



    $$("#detect-current-location").click(function(){

      toastMe("Getting your current location...");

      getMyLocation();
        setTimeout(function(){
          findMe(); 
        }, 1500);

    });







    $$("#set-delivery-address-btn").click(function(){

        if ($$("#place-my-delivery-address").text() == "&nbsp;") {

          app.dialog.alert("Please enter a valid delivery address");

        }
        else{

        toastMe("Finding Gas Sellers....");
         $$("#set-delivery-address-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
         app.request.post('https://nairasurvey.com/hub/fetch_gas_sellers.php', 
            
               function (data) {
              
              data = JSON.parse(data);
              console.log(data);


              var allSellerAddresses = data;

              var conjureAddressesLength = [];
              var conjureAddressesLength2 = [];

              for (var i = 0; i < data.length; i++) {

               
                 
                 var thsiStoreAddress = data[i]['store_address'];

                 var service = new google.maps.DistanceMatrixService();
                  service.getDistanceMatrix(
                    {
                      origins: [window.localStorage.getItem("my_delivery_address")],
                      destinations: [thsiStoreAddress],
                      travelMode: 'DRIVING',
                      avoidHighways: false,
                      avoidTolls: true,
                    }, callback);

                  var theDistance, theDuration;

                  if (i == (data.length - 1)) {
                    setTimeout(function(){
                      evaluateDistances();
                    }, 12000);
                      
                  }

                

                  function callback(response, status) {
                    
                    if (status == 'OK') {
                      var origins = response.originAddresses;
                      var destinations = response.destinationAddresses;

                      for (var i = 0; i < origins.length; i++) {
                        var results = response.rows[i].elements;
                        for (var j = 0; j < results.length; j++) {
                          var element = results[j];
                          theDistance = element.distance.text;
                          theDuration = element.duration.text;
                          var from = origins[i];
                          var to = destinations[j];

                            var splitDistance = theDistance.split(" ");
                            conjureAddressesLength.push(parseInt(splitDistance[0]));
                            conjureAddressesLength2.push(parseInt(splitDistance[0]));
                            
                          
                        }
                      }


                    }

                    else{

                        mainView.router.navigate("/choosegas/");
                        console.log("Unable to get Sellers. Try Later");
                      

                    }
                  }


                 
                  
                

              }//end of for loop



              


              function evaluateDistances(){

                console.log(conjureAddressesLength);
                console.log(conjureAddressesLength2);

              //Now get the nearest seller
             
              var sortSellers = conjureAddressesLength.sort(function(a, b){return a - b});
              var nearestSeller = sortSellers[0];

              selectedSeller = allSellerAddresses[conjureAddressesLength2.indexOf(nearestSeller)];
              console.log("The selected seller is ", selectedSeller);

              $$("#gas-store-name-span").text(selectedSeller.seller_name);
              $$("#gas-store-address-span").text(selectedSeller.store_address);
              $$("#gas-store-rating").text(selectedSeller.rating);


              var cylinderSizeBuyerWants = window.localStorage.getItem("selected_cylinder_size");
              $$("#gas-size-span").text(cylinderSizeBuyerWants);
              

            

              $$("#gas-order-total-price").html("<img src='imgs/ripple.gif' style='max-width:50px;'>");

              thisItemPrice = parseInt(selectedSeller[cylinderSizeBuyerWants]);

              var totalGasPrice = (parseInt(thisItemPrice)) * (parseInt($$("#gas-qty").val()));
              $$("#gas-order-total-price").html("NGN " + totalGasPrice);
              window.localStorage.setItem("total_gas_order", totalGasPrice);



             updateGasQty = function(){

              $$("#gas-order-total-price").html("<img src='imgs/ripple.gif' style='max-width:30px;'>");
              $$("#place-gas-order-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
              setTimeout(function(){

                  var totalGasPrice = (parseInt(thisItemPrice)) * (parseInt($$("#gas-qty").val()));
                    $$("#gas-order-total-price").html("NGN " + totalGasPrice);
                    window.localStorage.setItem("total_gas_order", totalGasPrice);

              $$("#place-gas-order-btn").html("Place Order&nbsp;<i class='icon f7-icons'>arrow_right</i>").prop("disabled", false);     
              }, 2000);
              
              

              }

             




              //Now get estimated delivery time

              var service = new google.maps.DistanceMatrixService();
                  service.getDistanceMatrix(
                    {
                      origins: [window.localStorage.getItem("my_delivery_address")],
                      destinations: [selectedSeller.store_address],
                      travelMode: 'DRIVING',
                      avoidHighways: false,
                      avoidTolls: true,
                    }, callback);

                  var theDistance, theDuration;


                   function callback(response, status) {
                    
                    if (status == 'OK') {
                      var origins = response.originAddresses;
                      var destinations = response.destinationAddresses;

                      for (var i = 0; i < origins.length; i++) {
                        var results = response.rows[i].elements;
                        for (var j = 0; j < results.length; j++) {
                          var element = results[j];
                          theDistance = element.distance.text;
                          theDuration = element.duration.text;
                          var from = origins[i];
                          var to = destinations[j];

                            $$("#gas-edt-span").text(theDuration);
                            $$("#gas-distance-span").text(theDistance);
                            var splitTheDistance = theDistance.split(" ");
                            var theRealDistance = splitTheDistance[0];
                            window.localStorage.setItem("distance_to_delivery", theRealDistance);
                            
                          
                        }
                      }


                    }

                    else{

                      console.log("Unable to get Estimated Delivery Time. Try Later");
                      

                    }
                  }



               $$("#first-card").hide();
                $$("#second-card").show();
                $$("#set-delivery-address-btn").html("Set Delivery Address&nbsp;<i class='icon f7-icons'>arrow_right</i>").prop("disabled", false);
                 
            }

           

               }, 
               function (data) {

                  toastMe("Unable to fetch sellers. Network error");
                  $$("#set-delivery-address-btn").html("Set Delivery Address&nbsp;<i class='icon f7-icons'>arrow_right</i>").prop("disabled", false);

               });


        }
    });
  


      $$("#back-2-set-addr").click(function(){
          $$("#first-card").show();
          $$("#second-card").hide();
      });





      $$("#place-gas-order-btn").click(function(){

        //build accessory order
        var fullGasOrder = {
          "buyer" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
          "seller" : selectedSeller.seller_sn,
          "cylinder_size" : window.localStorage.getItem("selected_cylinder_size"),
          "item_qty" : $$("#gas-qty").val(),
          "delivery_address" : window.localStorage.getItem("my_delivery_address"),
          "item_price" : thisItemPrice,
          "total_price" : window.localStorage.getItem("total_gas_order")

        }
        window.localStorage.setItem("full_gas_order", JSON.stringify(fullGasOrder));


        $$(this).html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
        setTimeout(function(){
          mainView.router.navigate("/paypagegas/");
        }, 2500);

      });







});







$$(document).on('page:init', '.page[data-name="manualaddress"]', function (e){

        var input = document.getElementById('manual-address-field');
        var options = {  types: ['address'],  componentRestrictions: {country: "ng"}};
        autocomplete = new google.maps.places.Autocomplete(input, options);

    



  function geocodeMe(){
        var isRunning = false;
        var inputField = document.getElementById("manual-address-field");
        

        if (isRunning) {
            return;
          }
          isRunning = true;

          // Address -> latitude,longitude
          plugin.google.maps.Geocoder.geocode({
            "address": inputField.value
          }, function(results) {

            if (results.length) {

                window.localStorage.setItem("my_delivery_address_coords", JSON.stringify(results[0].position));


            } else {
              isRunning = false;
            }

          });
        
      }



     

    

      $$("#confirm-delivery-address-btn").click(function(){

        var addressField = $$("#manual-address-field").val();

        if (addressField.trim() == "") {
          app.dialog.alert("Please enter a valid address");
        }
        else{
              $$("#confirm-delivery-address-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
              window.localStorage.setItem("my_delivery_address", addressField);
              geocodeMe();
              setTimeout(function(){
              mainView.router.navigate("/gasmap/");
            },4000);
        }
        
          
      })




      pushAddr2Box = function(theAddress){

         $$("#manual-address-field").focus().val(theAddress);
      }





      app.request.post('https://nairasurvey.com/hub/quick_address_load.php', 
            {

             "user_serial" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
             

           },
             function (data) {

                  $$("#saved-addr-container").html(data);
             }, 
             function (data) {

                toastMe("Unable to fetch addresses. Network error");

             });








});








$$(document).on('page:init', '.page[data-name="manualaddressacc"]', function (e){

    
var input = document.getElementById('manual-address-field');
var options = {  types: ['address'],  componentRestrictions: {country: "ng"}};
autocomplete = new google.maps.places.Autocomplete(input, options);


  function geocodeMe(){
        var isRunning = false;
        var inputField = document.getElementById("manual-address-field");
        

        if (isRunning) {
            return;
          }
          isRunning = true;

          var geocoder = new google.maps.Geocoder().geocode({'address': inputField.value}, function(results, status) {

                   
                   if (results.length) {

                      pushGeocode =  results[0].geometry.location;
                       console.log(pushGeocode);
                       var my_address_coords = {
                        lat : results[0].geometry.location.lat(),
                        lng : results[0].geometry.location.lng(),
                       }

                        window.localStorage.setItem("my_delivery_address_coords", JSON.stringify(my_address_coords));
                        mainView.router.navigate("/gasaccmap/");

                    } else {
                      isRunning = false;
                    }                     
          });
        
      }




    

      $$("#confirm-delivery-address-btn").click(function(){

        var addressField = $$("#manual-address-field").val();

        if (addressField.trim() == "") {
          app.dialog.alert("Please enter a valid address");
        }
        else{
              $$("#confirm-delivery-address-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
              window.localStorage.setItem("my_delivery_address", addressField);
              geocodeMe();
              setTimeout(function(){
              mainView.router.navigate("/mappage/");
            },4000);
        }
        
          
      });


       pushAddr2Box = function(theAddress){

         $$("#manual-address-field").focus().val(theAddress);
      }




      app.request.post('https://nairasurvey.com/hub/quick_address_load.php', 
            {

             "user_serial" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
             

           },
             function (data) {

                  $$("#saved-addr-container").html(data);
             }, 
             function (data) {

                toastMe("Unable to fetch addresses. Network error");

             });



});









$$(document).on('page:init', '.page[data-name="gasaccmap"]', function (e){





  $$("#second-card").hide();



  var accessoryList = ['valve change', 'cooker repair', 'hose', 'regulator', 'installation', 'leakages'];
  var accessoryImagesList = ['valve.png', 'stove.png', 'hose.png', 'regulator.png', 'cooker.png', 'leak.png'];
  

  function findMe(){

  $$("#place-my-delivery-address").text(window.localStorage.getItem("my_delivery_address"));
  myPoz = window.localStorage.getItem("my_delivery_address_coords");
  myPoz = JSON.parse(myPoz);


  var lagos = new google.maps.LatLng(6.5244, 3.3792);
  var mapOptions = {
    zoom:15,
    center: lagos,
    mapTypeControl : false,
    fullscreenControl: false
  }
  var map = new google.maps.Map(document.getElementById('the-map'), mapOptions);


  var infowindow = new google.maps.InfoWindow({
      content: "Your Delivery Address"
    });

  var startIcon = {
    url : "imgs/delivery_address.png",
    scaledSize: new google.maps.Size(50, 50)
   }


   marker = new google.maps.Marker({

    map: map,
    animation: google.maps.Animation.DROP,
    position:  new google.maps.LatLng(myPoz.lat, myPoz.lng),
    icon : startIcon

  });

   map.setCenter({lat : myPoz.lat, lng : myPoz.lng});
   marker.setMap(map);
   infowindow.open(map, marker);
  
         
  }



    if (!window.localStorage.getItem("my_delivery_address_coords")) {

      setTimeout(function(){

        getMyLocation("manualaddressacc");
        setTimeout(function(){
          findMe(); 
        }, 1500);
        

      }, 3000);
    }
    else{

      setTimeout(function(){
        findMe();
      }, 3000);
      
    }



    $$("#detect-current-location").click(function(){

      toastMe("Fetching your current location...");

      getMyLocation("manualaddressacc");
        setTimeout(function(){
          findMe(); 
        }, 1500);

    });


    //get price for each item on store
              var thisItemPrice = 0;
              var selectedSeller = "";




    $$("#set-acc-delivery-address-btn").click(function(){

        if ($$("#place-my-delivery-address").text() == "&nbsp;") {

          app.dialog.alert("Please enter a valid delivery address");

        }
        else{

        toastMe("Finding Gas Sellers....");
         $$("#set-acc-delivery-address-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
         app.request.post('https://nairasurvey.com/hub/fetch_gas_sellers.php', 
            
               function (data) {
              
              data = JSON.parse(data);
              console.log(data);


              var allSellerAddresses = data;

              var conjureAddressesLength = [];
              var conjureAddressesLength2 = [];

              for (var i = 0; i < data.length; i++) {

               
                 
                 var thsiStoreAddress = data[i]['store_address'];

                 var service = new google.maps.DistanceMatrixService();
                  service.getDistanceMatrix(
                    {
                      origins: [window.localStorage.getItem("my_delivery_address")],
                      destinations: [thsiStoreAddress],
                      travelMode: 'DRIVING',
                      avoidHighways: false,
                      avoidTolls: true,
                    }, callback);

                  var theDistance, theDuration;

                  if (i == (data.length - 1)) {
                    setTimeout(function(){
                      evaluateDistances();
                    }, 12000);
                      
                  }

                

                  function callback(response, status) {
                    
                    if (status == 'OK') {
                      var origins = response.originAddresses;
                      var destinations = response.destinationAddresses;

                      for (var i = 0; i < origins.length; i++) {
                        var results = response.rows[i].elements;
                        for (var j = 0; j < results.length; j++) {
                          var element = results[j];
                          theDistance = element.distance.text;
                          theDuration = element.duration.text;
                          var from = origins[i];
                          var to = destinations[j];

                            var splitDistance = theDistance.split(" ");
                            conjureAddressesLength.push(parseInt(splitDistance[0]));
                            conjureAddressesLength2.push(parseInt(splitDistance[0]));
                            
                          
                        }
                      }


                    }

                    else{
                      toastMe("Unable to get Sellers. Try Later");
                      console.log("Unable to get Sellers. Try Later");
                      mainView.router.navigate("/choosegas/");
                      

                    }
                  }


                 
                  
                

              }//end of for loop



              


              function evaluateDistances(){

                console.log(conjureAddressesLength);
                console.log(conjureAddressesLength2);

              //Now get the nearest seller
             
              var sortSellers = conjureAddressesLength.sort(function(a, b){return a - b});
              var nearestSeller = sortSellers[0];

              selectedSeller = allSellerAddresses[conjureAddressesLength2.indexOf(nearestSeller)];
              console.log("The selected seller is ", selectedSeller);

              $$("#acc-store-name-span").text(selectedSeller.seller_name);
              $$("#acc-store-address-span").text(selectedSeller.store_address);
              $$("#acc-store-rating").text(selectedSeller.rating);


              var accessoryBuyerWants = window.localStorage.getItem("acc_type_purchase");
              var accessoryBuyerWantsIndex = accessoryList.indexOf(accessoryBuyerWants);
              var accessoryImagesDisplay = accessoryImagesList[accessoryBuyerWantsIndex];

              $$("#acc-name-span").text(accessoryBuyerWants).css({
                "font-weight" : "bold", "text-transform" : "capitalize"
              });
              $$("#acc-image").prop("src", "imgs/" + accessoryImagesDisplay);

              $$("#acc-order-total-price").html("<img src='imgs/ripple.gif' style='max-width:50px;'>");

              thisItemPrice = parseInt(selectedSeller[accessoryBuyerWants]);

              var totalAccPrice = (parseInt(selectedSeller[accessoryBuyerWants])) * (parseInt($$("#acc-qty").val()));
              $$("#acc-order-total-price").html("NGN " + totalAccPrice);
              window.localStorage.setItem("total_gas_accessory_order", totalAccPrice);



             updateAccQty = function(){
             	$$("#acc-order-total-price").html("<img src='imgs/ripple.gif' style='max-width:30px;'>");
             	$$("#place-acc-order-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
             	setTimeout(function(){

             			var totalAccPrice = (parseInt(selectedSeller[accessoryBuyerWants])) * (parseInt($$("#acc-qty").val()));
              			$$("#acc-order-total-price").html("NGN " + totalAccPrice);
              			window.localStorage.setItem("total_gas_accessory_order", totalAccPrice);

             	$$("#place-acc-order-btn").html("Place Order&nbsp;<i class='icon f7-icons'>arrow_right</i>").prop("disabled", false); 		
             	}, 2000);
             	
             	

              }

             




              //Now get estimated delivery time

              var service = new google.maps.DistanceMatrixService();
                  service.getDistanceMatrix(
                    {
                      origins: [window.localStorage.getItem("my_delivery_address")],
                      destinations: [selectedSeller.store_address],
                      travelMode: 'DRIVING',
                      avoidHighways: false,
                      avoidTolls: true,
                    }, callback);

                  var theDistance, theDuration;


                   function callback(response, status) {
                    
                    if (status == 'OK') {
                      var origins = response.originAddresses;
                      var destinations = response.destinationAddresses;

                      for (var i = 0; i < origins.length; i++) {
                        var results = response.rows[i].elements;
                        for (var j = 0; j < results.length; j++) {
                          var element = results[j];
                          theDistance = element.distance.text;
                          theDuration = element.duration.text;
                          var from = origins[i];
                          var to = destinations[j];

                            $$("#acc-edt-span").text(theDuration);
                            $$("#acc-distance-span").text(theDistance);
                            var splitTheDistance = theDistance.split(" ");
                            var theRealDistance = splitTheDistance[0];
                            window.localStorage.setItem("distance_to_delivery", theRealDistance);
                            
                          
                        }
                      }


                    }

                    else{

                      console.log("Unable to get Estimated Delivery Time. Try Later");
                      

                    }
                  }



               $$("#first-card").hide();
                $$("#second-card").show();
                $$("#set-acc-delivery-address-btn").html("Set Delivery Address&nbsp;<i class='icon f7-icons'>arrow_right</i>").prop("disabled", false);
                 
            }

           

               }, 
               function (data) {

                  toastMe("Unable to fetch sellers. Network error");
                  $$("#set-acc-delivery-address-btn").html("Set Delivery Address&nbsp;<i class='icon f7-icons'>arrow_right</i>").prop("disabled", false);

               });


        }
    });
  


      $$("#back-2-set-addr").click(function(){
          $$("#first-card").show();
          $$("#second-card").hide();
      });




      $$("#place-acc-order-btn").click(function(){

        //build accessory order
        var fullAccessoryOrder = {
          "buyer" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
          "seller" : selectedSeller.seller_sn,
          "item_name" : window.localStorage.getItem("acc_type_purchase"),
          "item_qty" : $$("#acc-qty").val(),
          "delivery_address" : window.localStorage.getItem("my_delivery_address"),
          "item_price" : thisItemPrice,
          "total_price" : window.localStorage.getItem("total_gas_accessory_order")

        }
        window.localStorage.setItem("full_accessory_order", JSON.stringify(fullAccessoryOrder));


      	$$("#place-acc-order-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
      	setTimeout(function(){
      		mainView.router.navigate("/paypageacc/");
      	}, 2500);

      });


     


});





$$(document).on('page:init', '.page[data-name="paypageacc"]', function (e){

  var paypopup = app.popup.create({
    el : ".payment-popup"
  });



  var codpopup = app.popup.create({
    el : ".cod-popup"
  });


  var baseFee = 0;
  var perKMFee = 0;
  
      // fetch fees
      app.request.post('https://nairasurvey.com/hub/fetch_fees.php', 
        {
         "fee_name" : "base_fee"
       },
         function (data) {
              baseFee = parseInt(data);
              $$("#base-fee").text(baseFee);
         }, 
         function (data) {
            toastMe("Unable to fetch fees. Network error");
         });


        // fetch fees
        app.request.post('https://nairasurvey.com/hub/fetch_fees.php', 
          {
           "fee_name" : "per_kilometer_ fee"
         },
           function (data) {
                perKMFee = data * parseInt(window.localStorage.getItem("distance_to_delivery"));
                perKMFee = parseInt(perKMFee);
                $$("#processing-fee").text(perKMFee);
           }, 
           function (data) {
              toastMe("Unable to fetch fees. Network error");
           });




  

  chooseCard = function(cardID){


    $$(".atm-card").css("border", "none");
    $$("#" + cardID).css("border", "solid thin #002c6b");

    var splitCardID = cardID.split("-");
    var theInteger = splitCardID[splitCardID.length - 1];

    var splitCardExp = $$("#hidden-card-exp-" + theInteger).val().split("/");


    $$("#card-number").val($$("#hidden-card-no-" + theInteger).val());
    $$("#expiry-month").val(splitCardExp[0]);
    $$("#expiry-year").val(splitCardExp[1]);


    $$('#checkbox-wallet, #checkbox-cod').prop("checked", false);

    window.localStorage.setItem("selected_payment_method", "card");


    app.dialog.prompt("<small>3 digits at the back of card</small>", "Enter Card CVV", function(cvv){
        if (cvv.trim() == "" || cvv.trim() == " " || cvv.length < 3 || cvv.length > 3) {

          app.dialog.alert("Please enter a valid CVV code");

        }
        else{

          $$("#pay-card-cvv").val(cvv);

        }

      }, function(){


          console.log("Cancelled");

      });

}


  $$("#pay-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);

  

      var checkboxWallet = $$('#checkbox-wallet');
      var checkboxCOD = $$('#checkbox-cod');

      //set wallet as default payment method
      checkboxWallet.prop("checked", true);
      window.localStorage.setItem("selected_payment_method", "wallet");

      
      checkboxWallet.click(function(){
        $$(".atm-card").css("border", "none");
        checkboxCOD.prop("checked", false);
        window.localStorage.setItem("selected_payment_method", "wallet");
      });


      checkboxCOD.click(function(){
        $$(".atm-card").css("border", "none");
        checkboxWallet.prop("checked", false);
        window.localStorage.setItem("selected_payment_method", "cod");
      });


      $$("#wallet-card").click(function(){
          checkboxWallet.prop("checked", true);
          $$(".atm-card").css("border", "none");
          checkboxCOD.prop("checked", false);
          window.localStorage.setItem("selected_payment_method", "wallet");

      });


      $$("#cod-card").click(function(){
          checkboxWallet.prop("checked", false);
          checkboxCOD.prop("checked", true);
          $$(".atm-card").css("border", "none");
          window.localStorage.setItem("selected_payment_method", "cod");
      });



      var totalOrderPrice = 0;
      var walletBalance = 0;


      app.request.post('https://nairasurvey.com/hub/fetch_wallet_balance.php', 
        {

         "user_serial" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial

       },
         function (data) {

              console.log(data);
              walletBalance = data;
              $$("#available-wallet-balance").text("NGN" + data);

         }, 
         function (data) {

            toastMe("Unable to fetch Wallet Balance. Network error");

         });







      app.request.post('https://nairasurvey.com/hub/list_cards.php', 
            {

             "user_serial" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
            
            },
             function (data) {

                  var data = JSON.parse(data);

                  var totalOrderPrice = window.localStorage.getItem("total_gas_accessory_order");
                  totalOrderPrice = parseInt(totalOrderPrice);
                  var entireOrderPrice = totalOrderPrice + baseFee + perKMFee;



                  $$("#total-order-peek").text("NGN" + totalOrderPrice);

                  

                  $$("#pay-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay NGN " + entireOrderPrice).prop("disabled", false);

                  if(data[0].card == "no card"){

                      toastMe("No Debit Card Found");
                      $$('#checkbox-wallet').prop("checked", true);
                      $$("#list-cards-container").html("<p class='block-title'>No Debit Cards Found</span>");

                  }
                  else{

                        
                  

                  var buildUpCards = "";


                  for (var i = 0; i < data.length - 1; i++) { 

                    var cardSN = data[i].card_sn;
                     var cardName = data[i].card_name;
                     var cardNo = data[i].card_no;
                     var cardExp = data[i].card_expiry_date;

                     var doctoredCardNo = cardNo.substr(12, 16);

                     buildUpCards += "<div class='swiper-slide'><div id='my-card-" + i + "' onclick=chooseCard('my-card-" + i + "') class='atm-card card card-outline elevation-1'><div class='card-content card-content-padding'>" + cardName + "<br><br>XXXX XXXX XXXX " + doctoredCardNo + "<input type='hidden' id='hidden-card-no-" + i + "' value='" + cardNo + "'><input type='hidden' id='hidden-card-exp-" + i + "' value='" + cardExp + "'></div></div></div>";

                  }
                  
                      $$("#list-cards-container").html(buildUpCards);
                  
                    initSlider();

                }
             },
             function(){

                toastMe("Unable to fetch Payment methods. Network Error");
                

             });




        function initSlider(){

                var swiper = app.swiper.create('.swiper-container', {
                speed: 400,
                spaceBetween: 20,
                slidesPerView : 1.5

                });
            }





            $$("#pay-btn").click(function(){

              var orderAmount = JSON.parse(window.localStorage.getItem("full_accessory_order")).total_price;
              var totalFees = baseFee + perKMFee;
      
              $$(this).html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);

              if (window.localStorage.getItem("selected_payment_method") == "wallet"){

                if ((parseInt(orderAmount) + parseInt(totalFees)) > parseInt(walletBalance)) {

                  app.dialog.alert("Insufficient Balance!");
                  console.log("no money to buy");
                  
                  var grabTotalAmount = parseInt(orderAmount) + parseInt(totalFees);
                  $$(this).html("<i class='icon f7-icons'>lock</i>&nbsp;Pay NGN " + grabTotalAmount).prop("disabled", false);

                }
              
              else{

                
                
                 app.request.post('https://nairasurvey.com/hub/init_gas_accessory_transaction.php', 
              {

               "user_id" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
               "processing_fee" : totalFees,
               "price" : JSON.parse(window.localStorage.getItem("full_accessory_order")).item_price,
               "total_price" : JSON.parse(window.localStorage.getItem("full_accessory_order")).total_price,
               "item_name" : window.localStorage.getItem("acc_type_purchase"),
               "item_qty" : JSON.parse(window.localStorage.getItem("full_accessory_order")).item_qty,
               "buyer" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
               "seller" : JSON.parse(window.localStorage.getItem("full_accessory_order")).seller,
               "payment_method" : window.localStorage.getItem("selected_payment_method"),
               "delivery_address" : JSON.parse(window.localStorage.getItem("full_accessory_order")).delivery_address,


             },
         function (data) {

              console.log(data);

               data = data.split(" ");

                if (data[1] == "Successful") {

                  var allAmountPaid = parseInt(orderAmount) + parseInt(totalFees);
                  
                  $$("#amount-payed").text(allAmountPaid);
                  paypopup.open();
                    //Move to dashboard
                    setTimeout(function(){
                      paypopup.close();
                      mainView.router.navigate("/dashboard/");
                    }, 3000);
                }
                else{

                  toastMe("Unable to create transaction now. Try again later");
                  $$("#pay-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay NGN " + allAmountPaid).prop("disabled", false);

                }

         }, 
         function (data) {

            toastMe("Unknown Network error. Try again later");
            $$("#pay-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay NGN " + allAmountPaid).prop("disabled", false);

         });

              }

            }



            else if(window.localStorage.getItem("selected_payment_method") == "cod"){


              // Now process payment via debit card
                 app.request.post('https://nairasurvey.com/hub/init_gas_accessory_transaction.php', 
                    {

               "user_id" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
               "processing_fee" : totalFees,
               "price" : JSON.parse(window.localStorage.getItem("full_accessory_order")).item_price,
               "total_price" : JSON.parse(window.localStorage.getItem("full_accessory_order")).total_price,
               "item_name" : window.localStorage.getItem("acc_type_purchase"),
               "item_qty" : JSON.parse(window.localStorage.getItem("full_accessory_order")).item_qty,
               "buyer" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
               "seller" : JSON.parse(window.localStorage.getItem("full_accessory_order")).seller,
               "payment_method" : window.localStorage.getItem("selected_payment_method"),
               "delivery_address" : JSON.parse(window.localStorage.getItem("full_accessory_order")).delivery_address,


                   },
               function (data) {

              console.log(data);

               data = data.split(" ");

                if (data[1] == "Successful") {

                  var allAmountPaid = parseInt(orderAmount) + parseInt(totalFees);
                  $$("#cod-amount-payed").text(allAmountPaid);

                  codpopup.open();
                    //Move to dashboard
                    setTimeout(function(){
                      codpopup.close();
                      mainView.router.navigate("/dashboard/");
                    }, 4000);
                }
                else{

                  toastMe("Unable to create transaction now. Try again later");
                  $$("#pay-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay NGN " + allAmountPaid).prop("disabled", false);

                }

         }, 
         function (data) {

            toastMe("Unknown Network error. Try again later");
            $$("#pay-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay NGN " + allAmountPaid).prop("disabled", false);

         });


                

            }

            else{


               //lets pay via card


            app.request.post('https://nairasurvey.com/hub/init_gas_accessory_transaction.php', 
              {

               "user_id" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
               "processing_fee" : totalFees,
               "price" : JSON.parse(window.localStorage.getItem("full_accessory_order")).item_price,
               "total_price" : JSON.parse(window.localStorage.getItem("full_accessory_order")).total_price,
               "item_name" : window.localStorage.getItem("acc_type_purchase"),
               "item_qty" : JSON.parse(window.localStorage.getItem("full_accessory_order")).item_qty,
               "buyer" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
               "seller" : JSON.parse(window.localStorage.getItem("full_accessory_order")).seller,
               "payment_method" : window.localStorage.getItem("selected_payment_method"),
               "delivery_address" : JSON.parse(window.localStorage.getItem("full_accessory_order")).delivery_address,


             },
         function (data) {

              console.log(data);

               data = data.split(" ");

                if (data[1] == "Successful") {

                  var paddedOrderAmount = parseInt(orderAmount) + totalFees;

                  //initate paystack
                  app.request.post("https://nairasurvey.com/hub/paystack_init.php",
                        {
                          "buyer_email" : JSON.parse(window.localStorage.getItem("buyer_details")).email,
                          "amount_2_pay" : paddedOrderAmount * 100,
                          "tnx_reference" : data[0]
                          
                        },
                         function(data){

                          console.log(data);
                          

                          if (JSON.parse(data).status != true) {

                            toastMe("Unknown error. Try Again");
                            $$("#pay-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay NGN " + allAmountPaid).prop("disabled", false);
                            return;
                          }

                          
                          var parsedData = JSON.parse(data);
                          var accessCode = parsedData.data.access_code
                                                   
                          Paystack.init({
                            access_code: accessCode,
                            form: "pay-for-gas-accessory-form"
                        }).then(function(returnedObj){
                            window.PAYSTACK = returnedObj;

                            $$("#pay-for-gas-accessory-form").trigger("submit");

                        }).catch(function(error){
                            // If there was a problem, you may 
                            // log to console (while testing)
                            toastMe("Error connecting to server");
                            console.log("Problem connecting to payments server. Try again later");
                            // or report to your backend for debugging (in production)
                            $$("#pay-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay NGN " + allAmountPaid).prop("disabled", false);
                        });

                         }, function(){

                            
                            toastMe("Unable to create transaction now. Try again later");
                            $$("#pay-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay NGN " + allAmountPaid).prop("disabled", false);
                            
                         });

        
                }
                else{

                  toastMe("Unable to process transaction. Try again later");
                  console.log(data);
                  $$("#pay-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay NGN " + allAmountPaid).prop("disabled", false);

                }      
                          

                 }, function(data){

                    
                    toastMe("Unable to create transaction. Try again later");
                    $$("#pay-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay NGN " + allAmountPaid).prop("disabled", false);
                    
                 });

            }

          });
  



  $$("#pay-for-gas-accessory-form").submit(function(e){



    e.preventDefault();

      PAYSTACK.card.charge().then(function(response){

        console.log(response);

        switch(response.status) {
            case 'auth':
                switch(response.data.auth) {
                    case 'pin':
                        mainView.router.navigate("/payaccpin/");
                        break;
                    case 'phone':
                        toastMe("Invalid Card Supplied!");
                        mainView.router.navigate("/paypageacc/");
                        break;
                    case 'otp':
                        mainView.router.navigate("/payaccotp/");
                        break;
                    case '3DS':
                        toastMe("Invalid Card Supplied!");
                        mainView.router.navigate("/paypageacc/");
                        break;
                }
                break;
            case 'timeout':
                toastMe("Server Timeout. Try Again");
                mainView.router.navigate("/paypageacc/");
                break;
            case 'success':
                toastMe("Payment Successful");
                var returnedReference = response.data.reference;
                runCode2PendOrder(returnedReference);
                break;
            case 'failed':
                tosatMe("Transaction Failed!");
                mainView.router.navigate("/paypageacc/");
                break;
        }
        

      }, 
      function(error){

        console.log(error);
        toastMe("Unknown Error");
        mainView.router.navigate("/paypageacc/");

      });
            

    
});



  function runCode2PendOrder(suppliedReference){ 

      app.request.post('https://nairasurvey.com/hub/confirm_pay.php', 
          {

           "transaction_id" : suppliedReference,
           "table" : "gas_accessories_orders"

         },
           function (data) {

               console.log(data);
                if (data == "Successful") {

                   var amountPaid = JSON.parse(window.localStorage.getItem("full_accessory_order")).total_price
                   var totalFees = baseFee + perKMFee;
                   amountPaid = parseInt(amountPaid) + parseInt(totalFees);
                    $$("#amount-payed").text(amountPaid);
                    paypopup.open();
                        //Move to dashboard
                        setTimeout(function(){
                          paypopup.close();
                          mainView.router.navigate("/dashboard/");
                        }, 3000);

                }
                else{
                  console.log(data);
                }
                

           }, 
           function (data) {

              toastMe("Unable to activate transaction. Network error");

           });
  }



});










$$(document).on('page:init', '.page[data-name="wallet"]', function (e){


   $$('.ac-6').on('click', function () {
         fivePlugs();
      });


      

      app.request.post('https://nairasurvey.com/hub/fetch_wallet_balance.php', 
        {

         "user_serial" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial

       },
         function (data) {

              console.log(data);
              $$("#my-wallet-balance").text("NGN" + data);

         }, 
         function (data) {

            toastMe("Unable to fetch Wallet Balance. Network error");

         });






      app.request.post('https://nairasurvey.com/hub/fetch_wallet_history.php', 
            {

             "user_serial" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial
             

           },
             function (data) {

                  console.log(data)
                  $$("#wallet-history-grid").html(data);

             }, 
             function (data) {

                toastMe("Unable to fetch wallet balance. Network error");

             });

});







$$(document).on('page:init', '.page[data-name="recover"]', function (e){

    
    $$("#recover-btn").click(function(){

      if ($$("#user-email").val().trim() == "" || $$("#user-email").val().trim() == " ") {

            toastMe("Please enter a valid email");

      }
      else{

        $$("#recover-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>");
        
        app.request.post('https://nairasurvey.com/hub/recover_account.php', 
            {
             
             "user_email" : $$("#user-email").val()
           },
             function (data) {

              var splitData = data.split(" ");
              if (splitData[0] == "successful") {

                  window.localStorage.setItem("account_recovery_code", splitData[1]);
                  window.localStorage.setItem("recovery_request_user", splitData[2]);

                  toastMe("Recovery Code Sent!");
                  mainView.router.navigate("/enterreccode/");

              }else{

                  toastMe("Unable to recover account. Try again later");
                  $$("#recover-btn").html("Continue&nbsp;<i class='icon f7-icons'>arrow_right</i>").prop("disabled", false);
              }          

            }, function(){
              
                    
                    toastMe("Network Error, Try again later");
                    $$("#recover-btn").html("Continue&nbsp;<i class='icon f7-icons'>arrow_right</i>").prop("disabled", false);

            });

      }





    });


});





$$(document).on('page:init', '.page[data-name="enterreccode"]', function (e){

  $$("#resend-btn").hide();

  function runTimer(){

    var timer = 60;
    var countDown = window.setInterval(function(){
        timer = timer - 1;
        $$("#countdown-btn").text("00 : " + timer);
        if (timer == 0) { window.clearInterval(countDown); 
            $$("#countdown-btn").hide();
            $$("#resend-btn").show();
        }
        
    },1000);
  }

  runTimer();




   $$("#otp-1").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-1", key);
      },50);
      
      
    });


    $$("#otp-2").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-2", key);
      },50);
      
      
    });


    $$("#otp-3").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-3", key);
      },50);
      
      
    });


    $$("#otp-4").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-4", key);
      },50);
      
      
    });


    $$("#otp-5").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-5", key);
      },50);
      
      
    });


    $$("#otp-6").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-6", key);
      },50);
      
      
    });




    $$("#resend-btn").click(function(){

      $$("#countdown-btn").show();
      $$("#resend-btn").hide();
      runTimer();
      toastMe("Sending OTP...");
      messenger("Hello, your OTP for Ineed is " + window.localStorage.getItem("account_recovery_code") + " <br>Regards, Ineed Team", "email", JSON.parse(window.localStorage.getItem("buyer_details")).email, JSON.parse(window.localStorage.getItem("buyer_details")).phone, "Account Recovery");

    });




  $$("#finalise-recovery").click(function(){

    $$("#finalise-recovery").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
    var buildUpOTP = $$("#otp-1").val() + $$("#otp-2").val() + $$("#otp-3").val() + $$("#otp-4").val() + $$("#otp-5").val() + $$("#otp-6").val();



      if (buildUpOTP == window.localStorage.getItem("account_recovery_code")) {
        
        //OTP correct
        setTimeout(function(){mainView.router.navigate("/setnewpassword/");}, 2500);


      }
      else{

          toastMe("Invalid OTP");
          $$("#finalise-recovery").html("Recover My Account").prop("disabled", false);
          $$(".otp-field").addClass("shake")
          setTimeout(function(){
            $$(".otp-field").removeClass("shake");
          },1000);
      }
      
  });


    

});





  

  $$(document).on('page:init', '.page[data-name="setnewpassword"]', function (e){

      
        $$("#complete-recovery-btn").click(function(){

          if ($$("#new-password").val().trim() == "" || $$("#new-password-confirm").val().trim() == "") {

              toastMe("Please enter valid passwords");

          }
          else if($$("#new-password").val() != $$("#new-password-confirm").val()){

            toastMe("Passwords do not match");
          }
          else{

              $$("#complete-recovery-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
              app.request.post('https://nairasurvey.com/hub/set_new_password.php', 
                {

                 "user_serial_no" : window.localStorage.getItem("recovery_request_user"),
                 "new_password" : $$("#new-password").val(),
                 "new_password_confirm" : $$("#new-password-confirm").val()

               },
               function (data) {

                  if (data == "Password Change Successful") {

                        toastMe(data);
                        setTimeout(function(){
                          mainView.router.navigate("/login/");
                        },2000);
                  }
                  else{

                    toastMe(data);
                    $$("#complete-recovery-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Complete Recovery").prop("disabled", false);

                  }


              }, function(){
                
                      
                      toastMe("Network Error, Try again later");
                      $$("#complete-recovery-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Complete Recovery").prop("disabled", false);

              });
            }

        });

  });








    $$(document).on('page:init', '.page[data-name="login"]', function (e){


          $$("#login-form").submit(function(e){

          $$("#login-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
            

            app.request.post('https://nairasurvey.com/hub/user_login.php', 
            {
             "user_mail" : $$("#login-email").val(),
             "user_password" : $$("#login-password").val()
           },
             function (data) {

              if (data == "Invalid Login Details") {

                toastMe(data);
                $$("#login-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Login").prop("disabled", false);

              }
              else{

                console.log(data);
                  window.localStorage.setItem("buyer_details", data);
                      
                        setTimeout(function(){
                        mainView.router.navigate("/dashboard/");
                      },2000);

              
                
              }


            }, function(){
              
                    
                    toastMe("Network Error, Try again later");
                    $$("#login-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Login").prop("disabled", false);

            });

          });


    });





$$(document).on('page:init', '.page[data-name="addmoney"]', function (e){

   var paypopup = app.popup.create({
    el : ".payment-popup"
  });


  $$("#push-payment-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
  $$("#push-payment-btn").click(function(){

    if ($$("#card-cvv").val().trim() == "" || $$("#card-number").val().trim() == "" || $$("#expiry-month").val().trim() == "" || $$("#expiry-month").val().trim() == "" || !window.localStorage.getItem("add_money_amount")) {

        app.dialog.alert("Please complete missing fields");
        return;
    }
    else{

        $$(this).html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
        
         app.request.post('https://nairasurvey.com/hub/init_wallet_transaction.php', 
        {

         "user_id" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
         "amount" : window.localStorage.getItem("add_money_amount")
       },
         function (data) {

              console.log(data);

               data = data.split(" ");

                if (data[1] == "Successful") {

                    var amount = window.localStorage.getItem("add_money_amount");


                      app.request.post("https://nairasurvey.com/hub/paystack_init.php",
                        {
                          "buyer_email" : JSON.parse(window.localStorage.getItem("buyer_details")).email,
                          "amount_2_pay" : amount * 100,
                          "tnx_reference" : data[0]
                          
                        },
                         function(data){

                          console.log(data);
                          

                          if (JSON.parse(data).status != true) {

                            toastMe("Unknown error. Try Again");
                            $$("#push-payment-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay").prop("disabled", false);
                            return;
                          }

                          
                          var parsedData = JSON.parse(data);
                          var accessCode = parsedData.data.access_code
                                                   
                          Paystack.init({
                            access_code: accessCode,
                            form: "add-money-form"
                        }).then(function(returnedObj){
                            window.PAYSTACK = returnedObj;

                            $$("#add-money-form").trigger("submit");

                        }).catch(function(error){
                            // If there was a problem, you may 
                            // log to console (while testing)
                            console.log("Problem connecting to payments server. Try again later");
                            // or report to your backend for debugging (in production)
                            window.reportErrorToBackend(error);
                        });
                          
                          

                         }, function(){

                            
                            toastMe("Unable to create transaction now. Try again later");
                            $$("#push-payment-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay").prop("disabled", false);
                            
                         });
                }
                else{

                  toastMe("Unable to create transaction now. Try again later");
                  $$("#push-payment-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay").prop("disabled", false);

                }
              

         }, 
         function (data) {

            toastMe("Network error. Try again later");

         });
    }

  });

chooseCard = function(cardID){


    $$(".atm-card").css("border", "none");
    $$("#" + cardID).css("border", "solid thin #002c6b");

    var splitCardID = cardID.split("-");
    var theInteger = splitCardID[splitCardID.length - 1];

    var splitCardExp = $$("#hidden-card-exp-" + theInteger).val().split("/");


    $$("#card-number").val($$("#hidden-card-no-" + theInteger).val());
    $$("#expiry-month").val(splitCardExp[0]);
    $$("#expiry-year").val(splitCardExp[1]);

}


choosePrice = function(theAmount, thisButton){

  window.localStorage.setItem("add_money_amount", theAmount);
  $$(".price-btn").removeClass("elevation-15");
  $$("#" + thisButton).addClass("elevation-15");

}

$$("#add-money-form").submit(function(){

      PAYSTACK.card.charge().then(function(response){

        console.log(response);

        switch(response.status) {
            case 'auth':
                switch(response.data.auth) {
                    case 'pin':
                        mainView.router.navigate("/addmoneypin/");
                        break;
                    case 'phone':
                        toastMe("Invalid Card Supplied!");
                        mainView.router.navigate("/wallet/");
                        break;
                    case 'otp':
                        mainView.router.navigate("/addmoneyotp/");
                        break;
                    case '3DS':
                        toastMe("Invalid Card Supplied!");
                        mainView.router.navigate("/wallet/");
                        break;
                }
                break;
            case 'timeout':
                toastMe("Server Timeout. Try Again");
                $$("#push-payment-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay").prop("disabled", false);
                break;
            case 'success':
                toastMe("Payment Successful");
                //activate money in wallet
                 app.request.post('https://nairasurvey.com/hub/confirm_wallet_pay.php', 
                  {

                   "wallet_transaction_id" : response.data.reference,
                   "wallet_owner" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
                   "amount" : window.localStorage.getItem("add_money_amount")

                 },
                   function (data) {

                        console.log(data);
                        if (data == "Transaction was successful") {


                          var amountPaid = window.localStorage.getItem("add_money_amount")
                          $$("#amount-payed").text(amountPaid);
                          paypopup.open();
                              //Move to dashboard
                              setTimeout(function(){
                                paypopup.close();
                                mainView.router.navigate("/wallet/");
                              }, 3000);
                        }
                        else{
                          toastMe(data);

                          mainView.router.navigate("/wallet/");

                        }
                        

                   }, 
                   function (data) {

                      toastMe("Unable to top up wallet. Network error");

                   });
                
                break;
            case 'failed':
                app.dialog.alert("Transaction Failed!");
                $$("#push-payment-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay").prop("disabled", false);
                mainView.router.navigate("/addmoney/");
                break;
        }
        

      }, 
      function(error){

        console.log(error);
        toastMe("Unknown Error");
        $$("#push-payment-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay").prop("disabled", false);

       

      });
            

    
});











    


      
      
    app.request.post('https://nairasurvey.com/hub/list_cards.php', 
            {

             "user_serial" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
            
            },
             function (data) {

                  var data = JSON.parse(data);

                  

                  if(data[0].card == "no card"){

                      toastMe("No Debit Card. Add a card now");
                      mainView.router.navigate("/billing/");

                  }
                  else{

                      $$("#push-payment-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay").prop("disabled", false);

                  var buildUpCards = "";


                  for (var i = 0; i < data.length - 1; i++) { 

                    var cardSN = data[i].card_sn;
                     var cardName = data[i].card_name;
                     var cardNo = data[i].card_no;
                     var cardExp = data[i].card_expiry_date;

                     var doctoredCardNo = cardNo.substr(12, 16);

                     buildUpCards += "<div class='swiper-slide'><div id='my-card-" + i + "' onclick=chooseCard('my-card-" + i + "') class='atm-card card card-outline elevation-1'><div class='card-content card-content-padding'>" + cardName + "<br><br>XXXX XXXX XXXX " + doctoredCardNo + "<input type='hidden' id='hidden-card-no-" + i + "' value='" + cardNo + "'><input type='hidden' id='hidden-card-exp-" + i + "' value='" + cardExp + "'></div></div></div>";

                  }
                  
                      $$("#list-cards-container").html(buildUpCards);
                  
                    initSlider();

                }
             },
             function(){

                toastMe("Unable to fetch Payment methods. Network Error");
                

             });



            function initSlider(){

                var swiper = app.swiper.create('.swiper-container', {
                speed: 400,
                spaceBetween: 20,
                slidesPerView : 1.5

                });
            }





});








$$(document).on('page:init', '.page[data-name="addmoneypin"]', function (e){

  var paypopup = app.popup.create({
    el : ".payment-popup"
  });

      $$("#verify-pin-form").submit(function(e){

        e.preventDefault();

        if ($$("#debit-card-pin").val().trim() == "" || $$("#debit-card-pin").val().length < 4) {

          app.dialog.alert("Please enter a valid PIN");

        }
        else{

        $$("#verify-card-pin-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>");
        
        

        PAYSTACK.card.charge({
          
          pin: $$("#debit-card-pin").val()

        }).then(function(response){

          console.log(response);
          switch(response.status) {
            case 'auth':
                switch(response.data.auth) {
                    case 'phone':
                        toastMe("Invalid Card Supplied!");
                        mainView.router.navigate("/wallet/");
                        break;
                    case 'otp':
                        mainView.router.navigate("/addmoneyotp/");
                        break;
                    case '3DS':
                        toastMe("Invalid Card Supplied!");
                        mainView.router.navigate("/wallet/");
                        break;
                }
                break;
                case 'timeout':
                  toastMe("Server Timeout. Try Later");
                  mainView.router.navigate("/wallet/");
                break;
                case 'success':
                //activate money in wallet
                 app.request.post('https://nairasurvey.com/hub/confirm_wallet_pay.php', 
                  {

                   "wallet_transaction_id" : response.data.reference,
                   "wallet_owner" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
                   "amount" : window.localStorage.getItem("add_money_amount")

                 },
                   function (data) {

                        console.log(data);
                        if (data == "Transaction was successful") {

                          var amountPaid = window.localStorage.getItem("add_money_amount")
                          $$("#amount-payed").text(amountPaid);
                          paypopup.open();
                              //Move to dashboard
                              setTimeout(function(){
                                paypopup.close();
                                mainView.router.navigate("/wallet/");
                              }, 3000);

                        }
                        else{
                          app.dialog.alert(data);
                          mainView.router.navigate("/wallet/");

                        }
                   }, 
                   function (data) {

                      toastMe("Unable to top up wallet. Network error");

                   });
                    break;
                case 'failed':
                    toastMe("Trasaction Failed!. Try Later");
                    mainView.router.navigate("/wallet/");
            }


              

        }, function(error){

          console.log(error);
          
          console.log(error.message);
          if (error.message == "Incorrect PIN") {
            app.dialog.alert("Incorrect PIN supplied");
            $$("#verify-card-pin-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Confirm PIN").prop("disabled", false);
          }
          else{
            toastMe("Unknown error occured.");
            $$("#verify-card-pin-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Confirm PIN").prop("disabled", false);
          }

        });

      }

      });
});




















$$(document).on('page:init', '.page[data-name="settings"]', function (e){

    $$('.ac-6').on('click', function () {
         fivePlugs();
      });

    
    $$("#preview-full-name").text(JSON.parse(window.localStorage.getItem("buyer_details")).full_name);



     app.request.post('https://nairasurvey.com/hub/fetch_wallet_balance.php', 
        {

         "user_serial" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial

       },
         function (data) {

              console.log(data);
              $$("#wallet-balance-peek").text("NGN" + data);

         }, 
         function (data) {

            toastMe("Unable to fetch Wallet Balance. Network error");

         });
    

    $$("#signout-btn").click(function(){

      app.dialog.progress("Signing Out...", "deeporange");
      setTimeout(function(){

          window.localStorage.removeItem("buyer_details");
          app.dialog.close();
          mainView.router.navigate("/login/");

      }, 4000);


    });

});





$$(document).on('page:init', '.page[data-name="gasacc"]', function (e){

      
      selectAccessory = function(type){

          window.localStorage.setItem("acc_type_purchase", type);
          console.log("accessory purchase set");


          mainView.router.navigate("/gasaccmap/");
      }


});










$$(document).on('page:init', '.page[data-name="history"]', function (e){

var buyer = JSON.parse(window.localStorage.getItem("buyer_details"));


      app.request.post('https://nairasurvey.com/hub/pull_history.php', 
            {

             "user_serial" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
             "table_block" : "gas_orders",
             "user_email" :  buyer.email

           },
             function (data) {

                  $$("#gas-container").html(data);
             }, 
             function (data) {

                toastMe("Unable to fetch Orders. Network error");

             });


      app.request.post('https://nairasurvey.com/hub/pull_history.php', 
            {

             "user_serial" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
             "table_block" : "logistics_orders",
             "user_email" :  buyer.email

           },
             function (data) {

                  $$("#logistics-container").html(data);
             }, 
             function (data) {

                toastMe("Unable to fetch Orders. Network error");

             });



      app.request.post('https://nairasurvey.com/hub/pull_history.php', 
            {

             "user_serial" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
             "table_block" : "gas_accessories_orders",
             "user_email" :  buyer.email 

           },
             function (data) {

                  $$("#gas-accessories-container").html(data);
             }, 
             function (data) {

                toastMe("Unable to fetch Orders. Network error");

             });

});









$$(document).on('page:init', '.page[data-name="editprofile"]', function (e){

  $$("#ripple").show();
  $$("#verify-chip").hide();
  $$("#verified-chip").hide();


 var fullName = JSON.parse(window.localStorage.getItem("buyer_details")).full_name;
 var buyer = JSON.parse(window.localStorage.getItem("buyer_details"));

 $$("#display-my-phone").text(buyer.phone);


  app.request.post("https://nairasurvey.com/hub/verify_platform.php", 
  {
    
    "user_serial" : buyer.buyer_serial,
    "the_channel" : "phone"

  }, function(dataSeed){

    if (dataSeed == "activated") {

      $$("#verified-chip").show();
      $$("#verify-chip").hide();
      $$("#ripple").hide();
      

    }
    else{


      $$("#verify-chip").show();
      $$("#verified-chip").hide();
      $$("#ripple").hide();


    }

  }, function(){

      toastMe("Unable to connect to Ineed servers");

  });



 
  var updatedBuyerDetails = {};

  $$("#real-full-name").text(fullName);
    
    $$("#full-name-edit").click(function(){

      app.dialog.prompt("Update your full name", "Full Name", function(name){
        if (name.trim() == "" || name.trim() == " ") {

          app.dialog.alert("Please enter a valid name");

        }
        else{

        
        for (x in buyer) {

          updatedBuyerDetails[x] = buyer[x];
          if (x == "full_name") {
            updatedBuyerDetails["full_name"] = name;
          }

        }

        app.dialog.progress("Updating Profile...", "deeporange");
        app.request.post('https://nairasurvey.com/hub/user_profile_update.php', 
            {

             "user_full_name" : name,
             "user_email" : buyer.email,
             "user_phone" : buyer.phone,
             "user_serial" : buyer.buyer_serial

           },
             function (data) {
              
              if (data == "Update Successful") {

                  $$("#real-full-name").text(name);
                  window.localStorage.setItem("buyer_details", JSON.stringify(updatedBuyerDetails));
                  setTimeout(function(){
                    app.dialog.close();
                    toastMe("Profile Updated!");
                  },2000);
                  

              }
              else{

                  toastMe("Unable to update profile. Try again later");
                  app.dialog.close();
                  
              }

             },function(){

                  toastMe("Unable to connect to Ineed servers. Try again later");
                  app.dialog.close();

             });
        


      }
        
      }, function(){},
      
        fullName

      );


});




    $$("#verify-chip").click(function(){

        $$("#ripple").show();
        $$("#verify-chip").hide();
        $$("#verified-chip").hide();
        

        messenger("Hello, your Phone OTP for Ineed App is " + JSON.parse(window.localStorage.getItem("buyer_details")).phone_otp, "phone", JSON.parse(window.localStorage.getItem("buyer_details")).email, JSON.parse(window.localStorage.getItem("buyer_details")).phone, "Ineed OTP Request");
        setTimeout(function(){
          mainView.router.navigate("/verifyphone/");
        }, 5000);
        
    });




});

















$$(document).on('page:init', '.page[data-name="verifyphone"]', function (e){

   $$("#resend-btn").hide();

    function runTimer(){

    var timer = 60;
    var countDown = window.setInterval(function(){
        timer = timer - 1;
        $$("#countdown-btn").text("00 : " + timer);
        if (timer == 0) { window.clearInterval(countDown); 
            $$("#countdown-btn").hide();
            $$("#resend-btn").show();
        }
        
    },1000);
  }

  runTimer();

      
    $$("#otp-1").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-1", key);
      },50);
      
      
    });


    $$("#otp-2").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-2", key);
      },50);
      
      
    });


    $$("#otp-3").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-3", key);
      },50);
      
      
    });


    $$("#otp-4").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-4", key);
      },50);
      
      
    });


    $$("#otp-5").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-5", key);
      },50);
      
      
    });


    $$("#otp-6").keydown(function(){ 

      var key = event.keyCode || event.charCode;
      setTimeout(function(){
          shift("otp-6", key);
      },50);
      
      
    });


    



    $$("#resend-btn").click(function(){

      $$("#countdown-btn").show();
      $$("#resend-btn").hide();
      runTimer();
      toastMe("Sending OTP...");
      messenger("Hello, your Phone OTP for Ineed App is " + JSON.parse(window.localStorage.getItem("buyer_details")).phone_otp, "phone", JSON.parse(window.localStorage.getItem("buyer_details")).email, JSON.parse(window.localStorage.getItem("buyer_details")).phone, "Ineed OTP Request");

    });



    
    



  $$("#finalise-reg-btn").click(function(){

    $$("#finalise-reg-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
    var buildUpOTP = $$("#otp-1").val() + $$("#otp-2").val() + $$("#otp-3").val() + $$("#otp-4").val() + $$("#otp-5").val() + $$("#otp-6").val();


      if (buildUpOTP == JSON.parse(window.localStorage.getItem("buyer_details")).phone_otp) {
        
        //OTP correct
        $$("#finalise-reg-btn").html("Continue").prop("disabled", false);
        
          //Activate user account via email
          app.request.post('https://nairasurvey.com/hub/activate_account.php', 
            {

             "user_serial" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
             "the_channel" : "phone",

           },
             function (data) {

                if (data == "user activated") {

                    mainView.router.navigate("/editprofile/");
                  

                }else{

                  toastMe("Unable to activate phone. Try again Later");

                }

            }, function(){
                                 
                  toastMe("Network Error, Try again later");
                    
            });



      }
      else{

          toastMe("Invalid OTP");
          $$("#finalise-reg-btn").html("Continue").prop("disabled", false);
          $$(".otp-field").addClass("shake")
          setTimeout(function(){
            $$(".otp-field").removeClass("shake");
          },1000);
      }
      
  });


 
   
});




$$(document).on('page:init', '.page[data-name="billing"]', function (e){

  var popup = app.popup.create({ 

    el : ".demo-popup-swipe-handler",
    swipeToClose : true
  
  });

  var systems = "";

    $$("#add-new-card-btn").click(function(){

      var cardFields = ['card-no', 'card-name', 'exp-mm', 'exp-yy'];
      for (var i = 0; i < cardFields.length; i++) {
        
        if($$("#" + cardFields[i]).val().trim() == "" || $$("#" + cardFields[i]).val().trim() == " "){

            app.dialog.alert("Complete card fields");
            systems = "not set";
            break;
        }
        else{

            systems = "all systems go!";

        }

      }

      if (systems == "all systems go!") {


        $$("#add-new-card-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
        app.request.post('https://nairasurvey.com/hub/add_card.php', 
            {

             "user_serial" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
             "card_name" : $$("#card-name").val(),
             "card_no" : $$("#card-no").val(),
             "card_exp_date" : $$("#exp-mm").val() + "/" + $$("#exp-yy").val()

           },
             function (data) {

              if (data == "card added") {

                mainView.router.navigate("/billing/");
                toastMe("Card Added");
                setTimeout(function(){

                  popup.close();
                  setTimeout(function(){
                    mainView.router.refreshPage();  
                  }, 1500);
                  

                },2000)

              }
              else{

                toastMe("Unable to add card");
                $$("#add-new-card-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Add Card").prop("disabled", false);

              }

                

             },
             function (data) {

             });


      }

    });












    app.request.post('https://nairasurvey.com/hub/list_cards.php', 
            {

             "user_serial" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
            

           },
             function (data) {

                  var data = JSON.parse(data);

                  console.log(data);

                  if(data[0].card == "no card"){

                    $$("#cards-container").html("<img src='imgs/card.png' style='display:block; margin:0 auto; max-width:160px;'><h3 class='text-center text-color-gray'>No Payment Method found</h3>");

                  }
                  else{

                  var buildUpCards = "";


                  for (var i = 0; i < data.length - 1; i++) { 

                    var cardSN = data[i].card_sn;
                     var cardName = data[i].card_name;
                     var cardNo = data[i].card_no;
                     var cardExp = data[i].card_expiry_date;

                     buildUpCards += "<div class='card bg-color-white elevation-1' style=' border-radius:6px;'><div class='card-content card-content-padding ' style='padding:20px 10px;'><img src='imgs/mastercard.png' style='max-width: 32px;'><br>" + cardNo + "<i class='icon material-icons text-color-gray' style='float: right;' onclick=deleteCard('" +  cardSN + "')>delete</i></div></div>";

                  }

                  $$("#cards-container").html(buildUpCards);

                }
             },
             function(){

                toastMe("Unable to fetch Payment methods");
                $$("#cards-container").html("<img src='imgs/card.png' style='display:block; margin:0 auto; max-width:160px;'><h3 class='text-center text-color-gray'>No Payment Method found</h3>");

             });


});








$$(document).on('page:init', '.page[data-name="addresses"]', function (e){


    app.request.post('https://nairasurvey.com/hub/list_saved_addresses.php', 
            {

             "user_serial" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
             

           },
             function (data) {

                  $$("#addresses-container").html(data);
             }, 
             function (data) {

                toastMe("Unable to fetch addresses. Network error");

             });
    

});








$$(document).on('page:init', '.page[data-name="editaddress"]', function (e){


  var input = document.getElementById('the-address-edit');
  var options = {
      types: ['address'],
      componentRestrictions: {country: 'ng'}
    };

     autocomplete  = new google.maps.places.Autocomplete(input, options);





    var getAddressEdit = window.localStorage.getItem("edit_this_address");
    getAddressEdit = JSON.parse(getAddressEdit);

    var addressSerial = getAddressEdit.addressSerialNo;
    var addressName = getAddressEdit.theAddressName;
    var addressDetails = getAddressEdit.theAddressDetails;

    $$("#address-name-span").text(addressName);
    $$("#the-address-edit").val(addressDetails);


    $$("#update-address-btn").click(function(){

      var updateAddrName = $$("#address-name-span").text();
      var updateAddrDetails = $$("#the-address-edit").val();

      if (updateAddrName.trim() == "" || updateAddrDetails.trim() == "") {

          app.dialog.alert("Please enter valid address details");

      }

      else{

        $$("#update-address-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);

        app.request.post('https://nairasurvey.com/hub/update_address.php', 
            {

             "user_serial" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
             "address_serial" : addressSerial,
             "address_details" : updateAddrDetails
             
           },
             function (data) {

                  if (data == "Address Updated") {

                    toastMe(data);
                    setTimeout(function(){
                      mainView.router.navigate("/addresses/");
                    }, 2000);

                  }

                  else{

                      toastMe(data);
                      $$("#update-address-btn").html("Update Address&nbsp;<i class='icon f7-icons'>arrow_right</i>").prop("disabled", false);

                  }
             }, 
             function (data) {

                toastMe("Unable to update addresses. Network error");
                $$("#update-address-btn").html("Update Address&nbsp;<i class='icon f7-icons'>arrow_right</i>").prop("disabled", false);

             });

      }


    });
    

    

});












$$(document).on('page:init', '.page[data-name="newaddress"]', function (e){



var input = document.getElementById('the-address-details');
  var options = {
      types: ['address'],
      componentRestrictions: {country: 'ng'}
    };

     autocomplete  = new google.maps.places.Autocomplete(input, options);





    $$("#add-address-btn").click(function(){

      var addrName = $$("#the-address-name").val();
      var addrDetails = $$("#the-address-details").val();

      if (addrName.trim() == "" || addrDetails.trim() == "") {

          app.dialog.alert("Please enter valid address details");
      }

      else{

        $$("#add-address-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);

        app.request.post('https://nairasurvey.com/hub/add_address.php', 
            {

             "user_serial" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
             "address_name" : addrName,
             "address_details" : addrDetails
             
           },
             function (data) {

              console.log(data);

                  if (data == "Address Added") {

                    toastMe(data);
                    setTimeout(function(){
                      mainView.router.navigate("/addresses/");
                    }, 2000);

                  }

                  else{

                      toastMe(data);
                      $$("#update-address-btn").html("Update Address&nbsp;<i class='icon f7-icons'>arrow_right</i>").prop("disabled", false);

                  }
             }, 
             function (data) {

                toastMe("Unable to add new addresses. Network error");
                $$("#add-address-btn").html("Update Address&nbsp;<i class='icon f7-icons'>arrow_right</i>").prop("disabled", false);

             });

      }


    });
    

    

});













$$(document).on('page:init', '.page[data-name="search"]', function (e){

      var searchbar = app.searchbar.create({el: '.searchbar'}); 
      searchbar.enable();
});
