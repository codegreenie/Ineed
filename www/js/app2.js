$$(document).on('page:init', '.page[data-name="addmoneyotp"]', function (e){

   var paypopup = app.popup.create({
    el : ".payment-popup"
  });



      $$("#verify-otp-form").submit(function(e){

        e.preventDefault();

        if ($$("#otp-code").val().trim() == "") {

          app.dialog.alert("Please enter a valid OTP");

        }
        else{

        $$("#verify-otp-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
        
            PAYSTACK.card.validateToken({

              token: $$("#otp-code").val()

            }).then(function(response){

              console.log(response);


              if(response.status == "success") {

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
                  
               }

              
              

            }, function(error){
              
              console.log(error.message);
              if (error.message == "Token Authorization Not Successful. Incorrect Token Supplied") {
                app.dialog.alert("Incorrect OTP supplied");
                $$("#verify-otp-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Confirm OTP").prop("disabled", false);
              }
              else{
                toastMe("Unknown error occured.");
                $$("#verify-otp-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Confirm OTP").prop("disabled", false);
              }

            });

      }

      });
});









$$(document).on('page:init', '.page[data-name="payaccpin"]', function (e){

   var paypopup = app.popup.create({
    el : ".payment-popup"
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
                        mainView.router.navigate("/paypageacc/");
                    case 'otp':
                        mainView.router.navigate("/payaccotp/");
                        break;
                    case '3DS':
                        toastMe("Invalid Card Supplied!");
                        mainView.router.navigate("/paypageacc/");
                }
                break;
                case 'timeout':
                  toastMe("Server Timeout. Try Later");
                  mainView.router.navigate("/paypageacc/");
                break;
                case 'success':
                //activate money in wallet
                app.request.post('https://nairasurvey.com/hub/confirm_pay.php', 
          {

           "transaction_id" : response.data.reference,
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
                    break;
                    case 'failed':
                    toastMe("Trasaction Failed!. Try Later");
                    mainView.router.navigate("/paypageacc/");
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





$$(document).on('page:init', '.page[data-name="payaccotp"]', function (e){

  var paypopup = app.popup.create({
    el : ".payment-popup"
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

      $$("#verify-otp-form").submit(function(e){

        e.preventDefault();

        if ($$("#otp-code").val().trim() == "") {

          app.dialog.alert("Please enter a valid OTP");

        }
        else{

        $$("#verify-otp-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
        
            PAYSTACK.card.validateToken({

              token: $$("#otp-code").val()

            }).then(function(response){

              console.log(response);


              if(response.status == "success") {

                //activate money in wallet
                app.request.post('https://nairasurvey.com/hub/confirm_pay.php', 
          {

           "transaction_id" : response.data.reference,
           "table" : "gas_accessories_orders"

         },
           function (data) {

               console.log(data);
                if (data == "Successful") {

                   var amountPaid = JSON.parse(window.localStorage.getItem("full_accessory_order")).total_price;
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

              
              

            }, function(error){
              
              console.log(error.message);
              if (error.message == "Token Authorization Not Successful. Incorrect Token Supplied") {
                app.dialog.alert("Incorrect OTP supplied");
                $$("#verify-otp-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Confirm OTP").prop("disabled", false);
              }
              else{
                toastMe("Unknown error occured.");
                $$("#verify-otp-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Confirm OTP").prop("disabled", false);
              }

            });

      }

      });
});








$$(document).on('page:init', '.page[data-name="gassize"]', function (e){

      chooseSize = function(suppliedSize){
        window.localStorage.setItem("selected_cylinder_size", suppliedSize);
        toastMe(suppliedSize + " of Gas...");
        mainView.router.navigate("/gasmap/");
      }


  });





$$(document).on('page:init', '.page[data-name="paypagegas"]', function (e){

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

                  totalOrderPrice = window.localStorage.getItem("total_gas_order");
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

              var orderAmount = JSON.parse(window.localStorage.getItem("full_gas_order")).total_price;
              var totalFees = baseFee + perKMFee;
      
              $$(this).html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);

              if (window.localStorage.getItem("selected_payment_method") == "wallet"){

                if ((parseInt(orderAmount) + parseInt(totalFees)) > parseInt(walletBalance)) {

                  app.dialog.alert("Insufficient Balance!");
                  console.log("no money to buy");

                }
              
              else{

                
                // Now process payment via debit card
                 app.request.post('https://nairasurvey.com/hub/init_gas_transaction.php', 
                    {

                     "user_id" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
                     "processing_fee" : totalFees,
                     "price" : JSON.parse(window.localStorage.getItem("full_gas_order")).item_price,
                     "total_price" : JSON.parse(window.localStorage.getItem("full_gas_order")).total_price,
                     "cylinder_size" : window.localStorage.getItem("selected_cylinder_size"),
                     "item_qty" : JSON.parse(window.localStorage.getItem("full_gas_order")).item_qty,
                     "buyer" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
                     "seller" : JSON.parse(window.localStorage.getItem("full_gas_order")).seller,
                     "payment_method" : window.localStorage.getItem("selected_payment_method"),
                     "delivery_address" : JSON.parse(window.localStorage.getItem("full_gas_order")).delivery_address,


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

            }

            else if(window.localStorage.getItem("selected_payment_method") == "cod"){


              // Now process payment via debit card
                 app.request.post('https://nairasurvey.com/hub/init_gas_transaction.php', 
                    {

                     "user_id" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
                     "processing_fee" : totalFees,
                     "price" : JSON.parse(window.localStorage.getItem("full_gas_order")).item_price,
                     "total_price" : JSON.parse(window.localStorage.getItem("full_gas_order")).total_price,
                     "cylinder_size" : window.localStorage.getItem("selected_cylinder_size"),
                     "item_qty" : JSON.parse(window.localStorage.getItem("full_gas_order")).item_qty,
                     "buyer" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
                     "seller" : JSON.parse(window.localStorage.getItem("full_gas_order")).seller,
                     "payment_method" : window.localStorage.getItem("selected_payment_method"),
                     "delivery_address" : JSON.parse(window.localStorage.getItem("full_gas_order")).delivery_address,


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


            app.request.post('https://nairasurvey.com/hub/init_gas_transaction.php', 
              {

               "user_id" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
               "processing_fee" : totalFees,
               "price" : JSON.parse(window.localStorage.getItem("full_gas_order")).item_price,
               "total_price" : JSON.parse(window.localStorage.getItem("full_gas_order")).total_price,
               "cylinder_size" : window.localStorage.getItem("selected_cylinder_size"),
               "item_qty" : JSON.parse(window.localStorage.getItem("full_gas_order")).item_qty,
               "buyer" : JSON.parse(window.localStorage.getItem("buyer_details")).buyer_serial,
               "seller" : JSON.parse(window.localStorage.getItem("full_gas_order")).seller,
               "payment_method" : window.localStorage.getItem("selected_payment_method"),
               "delivery_address" : JSON.parse(window.localStorage.getItem("full_gas_order")).delivery_address

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
                            form: "pay-for-gas-form"
                        }).then(function(returnedObj){
                            window.PAYSTACK = returnedObj;

                            $$("#pay-for-gas-form").trigger("submit");

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
  



  $$("#pay-for-gas-form").submit(function(e){

    e.preventDefault();

      PAYSTACK.card.charge().then(function(response){

        console.log(response);

        switch(response.status) {
            case 'auth':
                switch(response.data.auth) {
                    case 'pin':
                        mainView.router.navigate("/paygaspin/");
                        break;
                    case 'phone':
                        toastMe("Invalid Card Supplied!");
                        mainView.router.navigate("/paypagegas/");
                        break;
                    case 'otp':
                        mainView.router.navigate("/paygasotp/");
                        break;
                    case '3DS':
                        toastMe("Invalid Card Supplied!");
                        mainView.router.navigate("/paypagegas/");
                        break;
                }
                break;
            case 'timeout':
                toastMe("Server Timeout. Try Again");
                mainView.router.navigate("/paypagegas/");
                break;
            case 'success':
                toastMe("Payment Successful");
                var returnedReference = response.data.reference;
                runCode2PendOrder(returnedReference);
                break;
            case 'failed':
                toastMe("Transaction Failed!");
                mainView.router.navigate("/paypagegas/");
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
           "table" : "gas_orders"

         },
           function (data) {

               console.log(data);
                if (data == "Successful") {

                   var amountPaid = JSON.parse(window.localStorage.getItem("full_gas_order")).total_price
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









$$(document).on('page:init', '.page[data-name="paygaspin"]', function (e){


  var paypopup = app.popup.create({
    el : ".payment-popup"
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
                        mainView.router.navigate("/paypagegas/");
                    case 'otp':
                        mainView.router.navigate("/paygasotp/");
                        break;
                    case '3DS':
                        toastMe("Invalid Card Supplied!");
                        mainView.router.navigate("/paypagegas/");
                }
                break;
                case 'timeout':
                  toastMe("Server Timeout. Try Later");
                  mainView.router.navigate("/paypagegas/");
                break;
                case 'success':
                //activate money in wallet
                app.request.post('https://nairasurvey.com/hub/confirm_pay.php', 
          {

           "transaction_id" : response.data.reference,
           "table" : "gas_orders"

         },
           function (data) {

               console.log(data);
                if (data == "Successful") {

                   var amountPaid = JSON.parse(window.localStorage.getItem("full_gas_order")).total_price
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
                    break;
                    case 'failed':
                    toastMe("Trasaction Failed!. Try Later");
                    mainView.router.navigate("/paypagegas/");
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








$$(document).on('page:init', '.page[data-name="paygasotp"]', function (e){

  var paypopup = app.popup.create({
    el : ".payment-popup"
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

      $$("#verify-otp-form").submit(function(e){

        e.preventDefault();

        if ($$("#otp-code").val().trim() == "") {

          app.dialog.alert("Please enter a valid OTP");

        }
        else{

        $$("#verify-otp-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
        
            PAYSTACK.card.validateToken({

              token: $$("#otp-code").val()

            }).then(function(response){

              console.log(response);


              if(response.status == "success") {

                //activate money in wallet
                app.request.post('https://nairasurvey.com/hub/confirm_pay.php', 
          {

           "transaction_id" : response.data.reference,
           "table" : "gas_orders"

         },
           function (data) {

               console.log(data);
                if (data == "Successful") {

                   var amountPaid = JSON.parse(window.localStorage.getItem("full_gas_order")).total_price
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
               else{

                  toastMe("Transaction Failed!");
                  mainView.router.navigate("/paypagegas/");

               }

              
              

            }, function(error){
              
              console.log(error.message);
              if (error.message == "Token Authorization Not Successful. Incorrect Token Supplied") {
                app.dialog.alert("Incorrect OTP supplied");
                $$("#verify-otp-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Confirm OTP").prop("disabled", false);
              }
              else{
                toastMe("Unknown error occured.");
                $$("#verify-otp-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Confirm OTP").prop("disabled", false);
              }

            });

      }

      });
});










$$(document).on('page:init', '.page[data-name="newdelivery"]', function (e){


  app.accordion.open('.pickup-details');

  var input = document.getElementById('pickup-address');
  var input2 = document.getElementById('delivery-address');

  var options = {  types: ['address'],  componentRestrictions: {country: "ng"}};


  autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete2 = new google.maps.places.Autocomplete(input2, options);

  var processingFee = 0;
  var deliveryFee = 0;


  app.request.post('https://nairasurvey.com/hub/fetch_fees.php', 
      {

       "fee_name" : "base_fee"
     },
       function (data) {

            console.log(data);
            $$("#processing-fee-span").text("NGN " + data);
            processingFee = data;
       }, 
       function (data) {

          toastMe("Unable to fetch Base Fee. Network error");
          mainView.router.reload();

       });


    app.request.post('https://nairasurvey.com/hub/fetch_fees.php', 
        {

         "fee_name" : "per_kilometer_ fee"

       },
         function (data) {

              //console.log(data);
              var calculatedDistance = window.localStorage.getItem("delivery_distance");
              deliveryFee = data;
              
         }, 
         function (data) {

            toastMe("Unable to fetch Fees. Network error");
            mainView.router.reload();

         });


  var theBuyer = JSON.parse(window.localStorage.getItem("buyer_details"));
  
  
  $$("#buyer-name").val(theBuyer.full_name);
  $$("#buyer-email").val(theBuyer.email);
  $$("#buyer-phone").val(theBuyer.phone);


    $$("#new-delivery-btn").click(function(){

      if ($$("#item-description").val().trim() == "" || $$("#pickup-address").val().trim() == "" || $$("#package-size").val().trim() == "" || $$("#delivery-address").val().trim() == "" || $$("#receiving-customer-name").val().trim() == "" || $$("#receiving-customer-email").val().trim() == "" || $$("#receiving-customer-phone").val().trim() == "") {

          app.dialog.alert("Please complete the fields!");
      }
      else{

      $$(this).html("<img src='imgs/ripple.gif' style='max-width:50px; display:block; margin:0 auto;'>");
        


        var service = new google.maps.DistanceMatrixService();
          service.getDistanceMatrix(
            {
              origins: [$$("#pickup-address").val()],
              destinations: [$$("#delivery-address").val()],
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

                      var splitDistance = theDistance.split(" ");
                      var realDistance = splitDistance[0];
                      deliveryFee = realDistance * deliveryFee;
                      $$("#delivery-fee-span").text("NGN " + deliveryFee);
                      $$(this).text("Proceed");

                      var logisticsOrder = {

                       "sender_address" : $$("#pickup-address").val(),
                       "sender_name" : theBuyer.full_name,
                       "sender_email" : theBuyer.email,
                       "sender_phone" : theBuyer.phone,
                       "item_description" : $$("#item-description").val(),
                       "package_size" : $$("#package-size").val(),
                       "receiver_address" : $$("#delivery-address").val(),
                       "receiver_name" : $$("#receiving-customer-name").val(),
                       "receiver_email" : $$("#receiving-customer-email").val(),
                       "receiver_phone" : $$("#receiving-customer-phone").val(),
                       "processing_fee" : processingFee,
                       "total_price" : parseInt(deliveryFee) + parseInt(processingFee),
                       "unique_id" : ""
                       
                     }
                  window.localStorage.setItem("logistics_order", JSON.stringify(logisticsOrder));
                      setTimeout(function(){
                        mainView.router.navigate("/paypagelog/");
                      }, 7000);
                      
                    
                  }
                }


              }

              else{

                console.log("Unable to Calculate Distance. Try Later");
                mainView.router.reload();
                

              }
            }
       
      }



    }); // end of button click





});

















$$(document).on('page:init', '.page[data-name="paypagelog"]', function (e){

  var paypopup = app.popup.create({
    el : ".payment-popup"
  });


  var theBuyer = JSON.parse(window.localStorage.getItem("buyer_details"));



  chooseCard = function(cardID){


    $$(".atm-card").css("border", "none");
    $$("#" + cardID).css("border", "solid thin #002c6b");

    var splitCardID = cardID.split("-");
    var theInteger = splitCardID[splitCardID.length - 1];

    var splitCardExp = $$("#hidden-card-exp-" + theInteger).val().split("/");


    $$("#card-number").val($$("#hidden-card-no-" + theInteger).val());
    $$("#expiry-month").val(splitCardExp[0]);
    $$("#expiry-year").val(splitCardExp[1]);


    $$('#checkbox-wallet').prop("checked", false);

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
      checkboxWallet.prop("checked", true);
      //set wallet to payment method once payment page loads
      window.localStorage.setItem("selected_payment_method", "wallet");

      
      checkboxWallet.click(function(){
        $$(".atm-card").css("border", "none");
        window.localStorage.setItem("selected_payment_method", "wallet");
      });

      $$("#wallet-card").click(function(){

          checkboxWallet.prop("checked", true);
          $$(".atm-card").css("border", "none");
          window.localStorage.setItem("selected_payment_method", "wallet");

      });



      
      var walletBalance = 0;
      var logisticsDetails = window.localStorage.getItem("logistics_order");
      logisticsDetails = JSON.parse(logisticsDetails);
      totalOrderPrice = parseInt(logisticsDetails.total_price);

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

                  
                  
                  $$("#total-order-peek").text("NGN" + totalOrderPrice);

                  $$("#pay-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay NGN " + totalOrderPrice).prop("disabled", false);

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
      
              $$(this).html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);

              if (window.localStorage.getItem("selected_payment_method") == "wallet"){

                if (totalOrderPrice > parseInt(walletBalance)) {

                  app.dialog.alert("Insufficient Balance!");
                  console.log("no money to buy");
                  $$("#pay-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay NGN " + totalOrderPrice).prop("disabled", false);

                }
              
              else{

                
                // Now process payment via debit card
          app.request.post('https://nairasurvey.com/hub/init_logistics_transaction.php', 
            {

             
             "sender_address" : logisticsDetails.sender_address,
             "sender_name" : logisticsDetails.sender_name,
             "sender_email" : logisticsDetails.sender_email,
             "sender_phone" : logisticsDetails.sender_phone,
             "item_description" : logisticsDetails.item_description,
             "package_size" : logisticsDetails.package_size,
             "receiver_address" : logisticsDetails.receiver_address,
             "receiver_name" : logisticsDetails.receiver_name,
             "receiver_email" : logisticsDetails.receiver_email,
             "receiver_phone" : logisticsDetails.receiver_phone,
             "processing_fee" : logisticsDetails.processing_fee,
             "total_price" : logisticsDetails.total_price,
             "unique_id" : "",
             "payment_method" : window.localStorage.getItem("selected_payment_method")
             
           },
               function (data) {

              console.log(data);

               data = data.split(" ");

                if (data[1] == "Successful") {

                  
                  $$("#amount-payed").text(totalOrderPrice);

                  paypopup.open();
                    //Move to dashboard
                    setTimeout(function(){
                      paypopup.close();
                      mainView.router.navigate("/dashboard/");
                    }, 3000);
                }
                else{

                  toastMe("Unable to create transaction now. Try again later");
                  $$("#pay-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay NGN " + totalOrderPrice).prop("disabled", false);

                }

         }, 
         function (data) {

            toastMe("Unknown Network error. Try again later");
            $$("#pay-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay NGN " + totalOrderPrice).prop("disabled", false);

         });

              }

            }

            else{


               
                //lets pay via card


            app.request.post('https://nairasurvey.com/hub/init_logistics_transaction.php', 
            {

             
             "sender_address" : logisticsDetails.sender_address,
             "sender_name" : logisticsDetails.sender_name,
             "sender_email" : logisticsDetails.sender_email,
             "sender_phone" : logisticsDetails.sender_phone,
             "item_description" : logisticsDetails.item_description,
             "package_size" : logisticsDetails.package_size,
             "receiver_address" : logisticsDetails.receiver_address,
             "receiver_name" : logisticsDetails.receiver_name,
             "receiver_email" : logisticsDetails.receiver_email,
             "receiver_phone" : logisticsDetails.receiver_phone,
             "processing_fee" : logisticsDetails.processing_fee,
             "total_price" : logisticsDetails.total_price,
             "unique_id" : "",
             "payment_method" : window.localStorage.getItem("selected_payment_method")
             
           },
              function (data) {

              console.log(data);

               data = data.split(" ");

                if (data[1] == "Successful") {

                  

                  //initate paystack
                  app.request.post("https://nairasurvey.com/hub/paystack_init.php",
                        {
                          "buyer_email" : JSON.parse(window.localStorage.getItem("buyer_details")).email,
                          "amount_2_pay" : totalOrderPrice * 100,
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
                            form: "pay-for-log-form"
                        }).then(function(returnedObj){
                            window.PAYSTACK = returnedObj;

                            $$("#pay-for-log-form").trigger("submit");

                        }).catch(function(error){
                            // If there was a problem, you may 
                            // log to console (while testing)
                            toastMe("Error connecting to server");
                            console.log("Problem connecting to payments server. Try again later");
                            // or report to your backend for debugging (in production)
                            $$("#pay-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay NGN " + totalOrderPrice).prop("disabled", false);
                        });

                         }, function(){

                            
                            toastMe("Unable to create transaction now. Try again later");
                            $$("#pay-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay NGN " + totalOrderPrice).prop("disabled", false);
                            
                         });

        
                }
                else{

                  toastMe("Unable to process transaction. Try again later");
                  console.log(data);
                  $$("#pay-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay NGN " + totalOrderPrice).prop("disabled", false);

                }      
                          

                 }, function(data){

                    toastMe("Unable to create transaction. Try again later");
                    $$("#pay-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Pay NGN " + totalOrderPrice).prop("disabled", false);
                    
                 });

            }

          });
  



  $$("#pay-for-log-form").submit(function(e){

    e.preventDefault();

      PAYSTACK.card.charge().then(function(response){

        console.log(response);

        switch(response.status) {
            case 'auth':
                switch(response.data.auth) {
                    case 'pin':
                        mainView.router.navigate("/paylogpin/");
                        break;
                    case 'phone':
                        toastMe("Invalid Card Supplied!");
                        mainView.router.navigate("/paypagelog/");
                        break;
                    case 'otp':
                        mainView.router.navigate("/paylogotp/");
                        break;
                    case '3DS':
                        toastMe("Invalid Card Supplied!");
                        mainView.router.navigate("/paypagelog/");
                        break;
                }
                break;
            case 'timeout':
                toastMe("Server Timeout. Try Again");
                mainView.router.navigate("/paypagelog/");
                break;
            case 'success':
                toastMe("Payment Successful");
                var returnedReference = response.data.reference;
                runCode2PendOrder(returnedReference);
                break;
            case 'failed':
                toastMe("Transaction Failed!");
                mainView.router.navigate("/paypagelog/");
                break;
        }
        

      }, 
      function(error){

        console.log(error);
        toastMe("Unknown Error");
        mainView.router.navigate("/paypagelog/");

      });
            

    
});



  function runCode2PendOrder(suppliedReference){ 

      app.request.post('https://nairasurvey.com/hub/confirm_pay.php', 
          {

           "transaction_id" : suppliedReference,
           "table" : "logistics_orders"

         },
           function (data) {

               console.log(data);
                if (data == "Successful") {

                   var amountPaid = JSON.parse(window.localStorage.getItem("logistics_order")).total_price
                   amountPaid = parseInt(amountPaid);
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









$$(document).on('page:init', '.page[data-name="paylogpin"]', function (e){


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
                        mainView.router.navigate("/paypagelog/");
                    case 'otp':
                        mainView.router.navigate("/paylogotp/");
                        break;
                    case '3DS':
                        toastMe("Invalid Card Supplied!");
                        mainView.router.navigate("/paypagelog/");
                }
                break;
                case 'timeout':
                  toastMe("Server Timeout. Try Later");
                  mainView.router.navigate("/paypagelog/");
                break;
                case 'success':
                //activate money in wallet
                app.request.post('https://nairasurvey.com/hub/confirm_pay.php', 
          {

           "transaction_id" : response.data.reference,
           "table" : "logistics_orders"

         },
           function (data) {

               console.log(data);
                if (data == "Successful") {

                   var amountPaid = JSON.parse(window.localStorage.getItem("logistics_order")).total_price;
                   amountPaid = parseInt(amountPaid);
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
                    break;
                    case 'failed':
                    toastMe("Trasaction Failed!. Try Later");
                    mainView.router.navigate("/paypagelog/");
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







$$(document).on('page:init', '.page[data-name="paylogotp"]', function (e){

  var paypopup = app.popup.create({
    el : ".payment-popup"
  });




      $$("#verify-otp-form").submit(function(e){

        e.preventDefault();

        if ($$("#otp-code").val().trim() == "") {

          app.dialog.alert("Please enter a valid OTP");

        }
        else{

        $$("#verify-otp-btn").html("<img src='imgs/ripple.gif' style='max-width:50px;'>").prop("disabled", true);
        
            PAYSTACK.card.validateToken({

              token: $$("#otp-code").val()

            }).then(function(response){

              console.log(response);


              if(response.status == "success") {

                //activate money in wallet
                app.request.post('https://nairasurvey.com/hub/confirm_pay.php', 
          {

           "transaction_id" : response.data.reference,
           "table" : "logistics_orders"

         },
           function (data) {

               console.log(data);
                if (data == "Successful") {

                   var amountPaid = JSON.parse(window.localStorage.getItem("logistics_order")).total_price
                    
                   amountPaid = parseInt(amountPaid);
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
               else{

                  toastMe("Transaction Failed!");
                  mainView.router.navigate("/paypagelog/");

               }

              
              

            }, function(error){
              
              console.log(error.message);
              if (error.message == "Token Authorization Not Successful. Incorrect Token Supplied") {
                app.dialog.alert("Incorrect OTP supplied");
                $$("#verify-otp-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Confirm OTP").prop("disabled", false);
              }
              else{
                toastMe("Unknown error occured.");
                $$("#verify-otp-btn").html("<i class='icon f7-icons'>lock</i>&nbsp;Confirm OTP").prop("disabled", false);
              }

            });

      }

      });
});

