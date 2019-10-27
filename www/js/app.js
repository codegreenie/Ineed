var shareApp, changeStatusBarColor, makeCall, setMerchantCode, routeTo, prepareIntAd, showInterstitialAd, showBottomBannerAd, showTopBannerAd;
// Dom7
var $$ = Dom7;


// Init App
var app = new Framework7({
  name : 'Quick Bank Codes',
  id: 'com.codegreenie.quickbankcodes',
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
    position: 'bottom',
    closeTimeout: 2000,
  });

    toastMe.open();

}




       

document.addEventListener("deviceready", deviceIsReady, false);



function deviceIsReady(){
  StatusBar.styleLightContent();
  StatusBar.backgroundColorByHexString("#043a7a");

  
      changeStatusBarColor = function(suppliedColor){
        StatusBar.backgroundColorByHexString(suppliedColor);
      }

   window.plugins.PushbotsPlugin.initialize("5d967b6bb794120bd54ee207", {"android":{"sender_id":"949600830086"}});


shareApp = function(){

// this is the complete list of currently supported params you can pass to the plugin (all optional)
var options = {

  message: 'Get all Nigerian Bank codes(USSD) in one application. Download Quick Bank Codes App on Google Play Store - 5MB', 
  subject: 'Quick Bank Codes', // fi. for email
  files: [], // an array of filenames either locally or remotely
  url: 'https://play.google.com/store/apps/details?id=com.codegreenie.quickbankcodes',
  chooserTitle: 'Share via'
};

var onSuccess = function(result) {
  toastMe("Share was successful");
};

var onError = function(msg) {
  toastMe("Sharing Failed!");
};

window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);

}


  makeCall = function(theUSSD){

    window.plugins.CallNumber.callNumber(onSuccess, onError, theUSSD, true);
    function onSuccess(){ toastMe(theUSSD); }
    function onError(){ toastMe("Unable to complete request to " + theUSSD); }

  }




                //Google Admob Monetization here :)

                var admobid = {};
                admobid = {
                  banner: 'ca-app-pub-3940256099942544/6300978111',
                  interstitial: 'ca-app-pub-3940256099942544/1033173712'
                };


                var interstitialReady = false;


                // update the state when ad preloaded
                document.addEventListener('onAdLoaded', function(e){
                    if(e.adType == 'interstitial') {
                        interstitialReady = true;
                    }
                });

                // when dismissed, preload one for next show
                document.addEventListener('onAdDismiss', function(e){
                    if(e.adType == 'interstitial') {
                        interstitialReady = false;
                        AdMob.prepareInterstitial({
                           adId:admobid.interstitial, 
                           autoShow:false
                        });
                    }
                });




                prepareIntAd = function(){

                  if(window.AdMob) AdMob.prepareInterstitial({
                      adId:admobid.interstitial, 
                      autoShow:false
                  });

              }


             



              showInterstitialAd = function(){
                if(interstitialReady == true) AdMob.showInterstitial();
              }


              showTopBannerAd = function(){
                AdMob.createBanner({
                  adId:admobid.banner,   
                  position:AdMob.AD_POSITION.POS_XY, x:0, y:80, 
                  autoShow:true,
                  overlap: true
                });
              }


              showBottomBannerAd = function(){
                    if(window.AdMob) AdMob.createBanner({
                    adId:admobid.banner,  
                    position:AdMob.AD_POSITION.BOTTOM_CENTER, 
                    autoShow:true,
                    overlap: true
                  });
              }


              
              setTimeout(function(){
                  prepareIntAd();
              }, 300);




        

  

  document.addEventListener("backbutton", function (){

    app.sheet.close();
    
    var currentPage = mainView.router.currentRoute.name;
    
    //Re-route to Dashboard
    if(currentPage == "dashboard"){

        navigator.app.exitApp();
    }
    else{
      
      showInterstitialAd();

      mainView.router.back({
        ignoreCache : true,
        force : true
      });

    }

}, false);



}







$$(document).on('page:beforeout', function (e) {
  // remove banner from all pages before exiting
  AdMob.removeBanner();
});


$$(document).on('page:afterin', '.page[data-name="about"]', function (e){
  changeStatusBarColor("#043a7a");
});
$$(document).on('page:init', '.page[data-name="about"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
        showInterstitialAd();  
      }, 7000);

  setTimeout(function(){
      showBottomBannerAd();
  }, 1000);


      $$(".share-btn").click(function(){
        shareApp();
      });
});



$$(document).on('page:afterin', '.page[data-name="dashboard"]', function (e){
  
  changeStatusBarColor("#043a7a");

  });
  
$$(document).on('page:init', '.page[data-name="dashboard"]', function (e){

  setTimeout(function(){
      showBottomBannerAd();
  }, 1000);

  routeTo = function(theRoute){
    mainView.router.navigate("/" + theRoute + "/");
  }

  function returnGuess(){
    var guessNo = Math.floor(Math.random() * 4) + 1;
    return guessNo;  
  }
    var luckyNumber = returnGuess();
    if (luckyNumber == 3) {
      //wait for 5 seconds because ad may be preparing
      setTimeout(function(){
        showInterstitialAd();  
      }, 5000);
        
    }
  

  
      var searchbar = app.searchbar.create({
        el: '.searchbar',
        searchContainer : '.search-list',
        searchIn : '.item-title, .item-after'
      });

      $$(".share-btn").click(function(){
        shareApp();
      });

      
});







$$(document).on('page:afterin', '.page[data-name="accessbank"]', function (e){
  changeStatusBarColor("#043a7a");
});
$$(document).on('page:init', '.page[data-name="accessbank"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
      showTopBannerAd();
  }, 1000);

      var airtimeSelf = app.sheet.create({
        el : '.access-bank-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.access-bank-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferAccess = app.sheet.create({
        el : '.access-bank-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.access-bank-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-access-bank-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-access-bank-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-access-bank-transfer").click(function(){
          transferAccess.stepToggle();
      });
      $$("#expand-access-bank-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#access-bank-airtime-self-btn").click(function(){
          if ($$("#access-bank-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#access-bank-airtime-self-amount").val();
            var dialCode = "*901*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#access-bank-airtime-others-btn").click(function(){
          if ($$("#access-bank-airtime-others-phone-no").val().trim() == "" || $$("#access-bank-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#access-bank-airtime-others-phone-no").val().trim().length != 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#access-bank-airtime-others-phone-no").val();
            var amt = $$("#access-bank-airtime-others-amount").val();
            var dialCode = "*901*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#access-bank-transfer-btn").click(function(){
          if ($$("#access-bank-transfer-acc-no").val().trim() == "" || $$("#access-bank-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#access-bank-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#access-bank-transfer-acc-no").val();
            var amt = $$("#access-bank-transfer-amount").val();
            var dialCode = "*901*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferAccess.close();
          }
      });

      $$("#access-bank-transfer-others-btn").click(function(){
          if ($$("#access-bank-transfer-others-acc-no").val().trim() == "" || $$("#access-bank-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#access-bank-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#access-bank-transfer-others-acc-no").val();
            var amt = $$("#access-bank-transfer-others-amount").val();
            var dialCode = "*901*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});

















$$(document).on('page:afterin', '.page[data-name="diamond"]', function (e){
  changeStatusBarColor("#b3d03a");
});
$$(document).on('page:init', '.page[data-name="diamond"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
      showTopBannerAd();
  }, 1000);

      var airtimeSelf = app.sheet.create({
        el : '.diamond-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.diamond-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferDiamond = app.sheet.create({
        el : '.diamond-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.diamond-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-diamond-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-diamond-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-diamond-transfer").click(function(){
          transferDiamond.stepToggle();
      });
      $$("#expand-diamond-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#diamond-airtime-self-btn").click(function(){
          if ($$("#diamond-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#diamond-airtime-self-amount").val();
            var dialCode = "*426*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#diamond-airtime-others-btn").click(function(){
          if ($$("#diamond-airtime-others-phone-no").val().trim() == "" || $$("#diamond-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#diamond-airtime-others-phone-no").val().trim().length != 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#diamond-airtime-others-phone-no").val();
            var amt = $$("#diamond-airtime-others-amount").val();
            var dialCode = "*426*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#diamond-transfer-btn").click(function(){
          if ($$("#diamond-transfer-acc-no").val().trim() == "" || $$("#diamond-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#diamond-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#diamond-transfer-acc-no").val();
            var amt = $$("#diamond-transfer-amount").val();
            var dialCode = "*426*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferDiamond.close();
          }
      });

      $$("#diamond-transfer-others-btn").click(function(){
          if ($$("#diamond-transfer-others-acc-no").val().trim() == "" || $$("#diamond-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#diamond-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#diamond-transfer-others-acc-no").val();
            var amt = $$("#diamond-transfer-others-amount").val();
            var dialCode = "*426*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});














$$(document).on('page:afterin', '.page[data-name="ecobank"]', function (e){
  changeStatusBarColor("#016098");
});
$$(document).on('page:init', '.page[data-name="ecobank"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
      showTopBannerAd();
  }, 1000);

      var airtimeSelf = app.sheet.create({
        el : '.ecobank-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.ecobank-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      


      $$("#expand-ecobank-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-ecobank-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
     



      $$("#ecobank-airtime-self-btn").click(function(){
          if ($$("#ecobank-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#ecobank-airtime-self-amount").val();
            var dialCode = "*326*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#ecobank-airtime-others-btn").click(function(){
          if ($$("#ecobank-airtime-others-phone-no").val().trim() == "" || $$("#ecobank-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#ecobank-airtime-others-phone-no").val().trim().length != 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#ecobank-airtime-others-phone-no").val();
            var amt = $$("#ecobank-airtime-others-amount").val();
            var dialCode = "*326*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });


      
});









$$(document).on('page:afterin', '.page[data-name="firstbank"]', function (e){
  changeStatusBarColor("#03476e");
});
$$(document).on('page:init', '.page[data-name="firstbank"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
      showTopBannerAd();
  }, 1000);

      var airtimeSelf = app.sheet.create({
        el : '.firstbank-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.firstbank-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferFirst = app.sheet.create({
        el : '.firstbank-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.firstbank-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var miniStatement = app.sheet.create({
        el : '.firstbank-mini-statement',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-firstbank-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-firstbank-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-firstbank-transfer").click(function(){
          transferFirst.stepToggle();
      });
      $$("#expand-firstbank-transfer-others").click(function(){
          transferOthers.stepToggle();
      });
      $$("#expand-firstbank-mini-statement").click(function(){
          miniStatement.stepToggle();
      });



      $$("#firstbank-airtime-self-btn").click(function(){
          if ($$("#firstbank-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#firstbank-airtime-self-amount").val();
            var dialCode = "*894*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#firstbank-airtime-others-btn").click(function(){
          if ($$("#firstbank-airtime-others-phone-no").val().trim() == "" || $$("#firstbank-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#firstbank-airtime-others-phone-no").val().trim().length != 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#firstbank-airtime-others-phone-no").val();
            var amt = $$("#firstbank-airtime-others-amount").val();
            var dialCode = "*894*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#firstbank-transfer-btn").click(function(){
          if ($$("#firstbank-transfer-acc-no").val().trim() == "" || $$("#firstbank-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#firstbank-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#firstbank-transfer-acc-no").val();
            var amt = $$("#firstbank-transfer-amount").val();
            var dialCode = "*894*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferFirst.close();
          }
      });

      $$("#firstbank-transfer-others-btn").click(function(){
          if ($$("#firstbank-transfer-others-acc-no").val().trim() == "" || $$("#firstbank-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#firstbank-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#firstbank-transfer-others-acc-no").val();
            var amt = $$("#firstbank-transfer-others-amount").val();
            var dialCode = "*894*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });



      $$("#firstbank-mini-statement-btn").click(function(){
          if ($$("#firstbank-mini-statement-account-no").val().trim() == "" || $$("#firstbank-mini-statement-account-no").val().trim().length != 10) {
            app.dialog.alert("Please complete the fields");
          }
          else{
            var accno = $$("#firstbank-mini-statement-account-no").val();
            var dialCode = "*894*" + accno + "#";
            makeCall(dialCode);
            miniStatement.close();
          }
      });

      
});









$$(document).on('page:afterin', '.page[data-name="fidelity"]', function (e){
  changeStatusBarColor("#0f227e");
});
$$(document).on('page:init', '.page[data-name="fidelity"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
      showTopBannerAd();
  }, 1000);

  setMerchantCode = function(theCode){
    window.localStorage.setItem("merchant_code", theCode);
  }

      var airtimeSelf = app.sheet.create({
        el : '.fidelity-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.fidelity-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferFidelity = app.sheet.create({
        el : '.fidelity-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.fidelity-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var cardlessWithdrawal = app.sheet.create({
        el : '.fidelity-cardless-withdrawal',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var payBills = app.sheet.create({
        el : '.fidelity-pay-bills',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-fidelity-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-fidelity-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-fidelity-transfer").click(function(){
          transferFidelity.stepToggle();
      });
      $$("#expand-fidelity-transfer-others").click(function(){
          transferOthers.stepToggle();
      });
      $$("#expand-fidelity-cardless-withdrawal").click(function(){
          cardlessWithdrawal.stepToggle();
      });
      $$("#expand-fidelity-pay-bills").click(function(){
          payBills.stepToggle();
      });



      $$("#fidelity-airtime-self-btn").click(function(){
          if ($$("#fidelity-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#fidelity-airtime-self-amount").val();
            var dialCode = "*770*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#fidelity-airtime-others-btn").click(function(){
          if ($$("#fidelity-airtime-others-phone-no").val().trim() == "" || $$("#fidelity-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#fidelity-airtime-others-phone-no").val().trim().length != 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#fidelity-airtime-others-phone-no").val();
            var amt = $$("#fidelity-airtime-others-amount").val();
            var dialCode = "*770*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#fidelity-transfer-btn").click(function(){
          if ($$("#fidelity-transfer-acc-no").val().trim() == "" || $$("#fidelity-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#fidelity-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#fidelity-transfer-acc-no").val();
            var amt = $$("#fidelity-transfer-amount").val();
            var dialCode = "*770*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferFidelity.close();
          }
      });

      $$("#fidelity-transfer-others-btn").click(function(){
          if ($$("#fidelity-transfer-others-acc-no").val().trim() == "" || $$("#fidelity-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#fidelity-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#fidelity-transfer-others-acc-no").val();
            var amt = $$("#fidelity-transfer-others-amount").val();
            var dialCode = "*770*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });


      $$("#fidelity-cardless-withdrawal-btn").click(function(){
          if ($$("#fidelity-cardless-withdrawal-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#fidelity-cardless-withdrawal-amount").val();
            var dialCode = "*770*8*" + amt + "#";
            makeCall(dialCode);
            cardlessWithdrawal.close();
          }
      });

      $$("#fidelity-pay-bills-btn").click(function(){
          if ($$("#fidelity-pay-bills-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var theMerchantCode = window.localStorage.getItem("merchant_code");
            var amt = $$("#fidelity-pay-bills-amount").val();
            var dialCode = "*770*" + theMerchantCode + "*" + amt + "#";
            makeCall(dialCode);
            payBills.close();
          }
      });

      
});












$$(document).on('page:afterin', '.page[data-name="fcmb"]', function (e){
  changeStatusBarColor("#5c2684");
});
$$(document).on('page:init', '.page[data-name="fcmb"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
      showTopBannerAd();
  }, 1000);

      var airtimeSelf = app.sheet.create({
        el : '.fcmb-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.fcmb-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferFCMB = app.sheet.create({
        el : '.fcmb-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.fcmb-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var buyData = app.sheet.create({
        el : '.fcmb-buy-data',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var payTV = app.sheet.create({
        el : '.fcmb-pay-tv',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-fcmb-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-fcmb-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-fcmb-transfer").click(function(){
          transferFCMB.stepToggle();
      });
      $$("#expand-fcmb-transfer-others").click(function(){
          transferOthers.stepToggle();
      });
      $$("#expand-fcmb-buy-data").click(function(){
          buyData.stepToggle();
      });
      $$("#expand-fcmb-pay-tv").click(function(){
          payTV.stepToggle();
      });



      $$("#fcmb-airtime-self-btn").click(function(){
          if ($$("#fcmb-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#fcmb-airtime-self-amount").val();
            var dialCode = "*329*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#fcmb-airtime-others-btn").click(function(){
          if ($$("#fcmb-airtime-others-phone-no").val().trim() == "" || $$("#fcmb-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#fcmb-airtime-others-phone-no").val().trim().length != 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#fcmb-airtime-others-phone-no").val();
            var amt = $$("#fcmb-airtime-others-amount").val();
            var dialCode = "*329*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#fcmb-transfer-btn").click(function(){
          if ($$("#fcmb-transfer-acc-no").val().trim() == "" || $$("#fcmb-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#fcmb-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#fcmb-transfer-acc-no").val();
            var amt = $$("#fcmb-transfer-amount").val();
            var dialCode = "*329*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferFCMB.close();
          }
      });

      $$("#fcmb-transfer-others-btn").click(function(){
          if ($$("#fcmb-transfer-others-acc-no").val().trim() == "" || $$("#fcmb-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#fcmb-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#fcmb-transfer-others-acc-no").val();
            var amt = $$("#fcmb-transfer-others-amount").val();
            var dialCode = "*329*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      $$("#fcmb-buy-data-btn").click(function(){
          if ($$("#fcmb-buy-data-phone").val().trim() == "" || $$("#fcmb-buy-data-phone").val().trim().length < 11) {
            app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#fcmb-buy-data-phone").val();
            var dialCode = "*329*1*" + phone + "#";
            makeCall(dialCode);
            buyData.close();
          }
      });

      $$("#fcmb-pay-tv-btn").click(function(){
          if ($$("#fcmb-pay-tv-number").val().trim() == "" || $$("#fcmb-pay-tv-amount").val().trim() == "") {
            app.dialog.alert("Please enter a valid smartcard/IUC number");
          }
          else{
            var smartNumber = $$("#fcmb-pay-tv-number").val();
            var amt = $$("#fcmb-pay-tv-amount").val();
            var dialCode = "*329*2*" + amt + "*" + smartNumber + "#";
            makeCall(dialCode);
            payTV.close();
          }
      });

      
});











$$(document).on('page:afterin', '.page[data-name="gtbank"]', function (e){
  changeStatusBarColor("#df4308");
});
$$(document).on('page:init', '.page[data-name="gtbank"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
      showTopBannerAd();
  }, 1000);
  
  setMerchantCode = function(theCode){
    window.localStorage.setItem("merchant_code", theCode);
  }
      var airtimeSelf = app.sheet.create({
        el : '.gtbank-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.gtbank-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferGTB = app.sheet.create({
        el : '.gtbank-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.gtbank-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var cardlessWithdrawal = app.sheet.create({
        el : '.gtbank-cardless-withdrawal',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var payBills = app.sheet.create({
        el : '.gtbank-pay-bills',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-gtbank-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-gtbank-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-gtbank-transfer").click(function(){
          transferGTB.stepToggle();
      });
      $$("#expand-gtbank-transfer-others").click(function(){
          transferOthers.stepToggle();
      });
      $$("#expand-gtbank-cardless-withdrawal").click(function(){
          cardlessWithdrawal.stepToggle();
      });
      $$("#expand-gtbank-pay-bills").click(function(){
          payBills.stepToggle();
      });



      $$("#gtbank-airtime-self-btn").click(function(){
          if ($$("#gtbank-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#gtbank-airtime-self-amount").val();
            var dialCode = "*737*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#gtbank-airtime-others-btn").click(function(){
          if ($$("#gtbank-airtime-others-phone-no").val().trim() == "" || $$("#gtbank-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#gtbank-airtime-others-phone-no").val().trim().length != 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#gtbank-airtime-others-phone-no").val();
            var amt = $$("#gtbank-airtime-others-amount").val();
            var dialCode = "*737*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#gtbank-transfer-btn").click(function(){
          if ($$("#gtbank-transfer-acc-no").val().trim() == "" || $$("#gtbank-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#gtbank-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#gtbank-transfer-acc-no").val();
            var amt = $$("#gtbank-transfer-amount").val();
            var dialCode = "*737*1*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferGTB.close();
          }
      });

      $$("#gtbank-transfer-others-btn").click(function(){
          if ($$("#gtbank-transfer-others-acc-no").val().trim() == "" || $$("#gtbank-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#gtbank-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#gtbank-transfer-others-acc-no").val();
            var amt = $$("#gtbank-transfer-others-amount").val();
            var dialCode = "*737*2*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      $$("#gtbank-cardless-withdrawal-btn").click(function(){
          if ($$("#gtbank-cardless-withdrawal-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#gtbank-cardless-withdrawal-amount").val();
            var dialCode = "*737*3*" + amt + "#";
            makeCall(dialCode);
            cardlessWithdrawal.close();
          }
      });
      $$("#gtbank-pay-bills-btn").click(function(){
          if ($$("#gtbank-pay-bills-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var theMerchantCode = window.localStorage.getItem("merchant_code");
            var amt = $$("#gtbank-pay-bills-amount").val();
            var dialCode = "*737*50*" + amt + "*" + theMerchantCode + "#";
            makeCall(dialCode);
            payBills.close();
          }
      });

      
});











$$(document).on('page:afterin', '.page[data-name="heritage"]', function (e){
  changeStatusBarColor("#4ba146");
});
$$(document).on('page:init', '.page[data-name="heritage"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
      showTopBannerAd();
  }, 1000);

  setMerchantCode = function(theCode){
    window.localStorage.setItem("merchant_code", theCode);
  }

      var airtimeSelf = app.sheet.create({
        el : '.heritage-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.heritage-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferHeritage = app.sheet.create({
        el : '.heritage-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.heritage-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var payBills = app.sheet.create({
        el : '.heritage-pay-bills',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-heritage-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-heritage-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-heritage-transfer").click(function(){
          transferHeritage.stepToggle();
      });
      $$("#expand-heritage-transfer-others").click(function(){
          transferOthers.stepToggle();
      });
      $$("#expand-heritage-pay-bills").click(function(){
          payBills.stepToggle();
      });



      $$("#heritage-airtime-self-btn").click(function(){
          if ($$("#heritage-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#heritage-airtime-self-amount").val();
            var dialCode = "*322*030*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#heritage-airtime-others-btn").click(function(){
          if ($$("#heritage-airtime-others-phone-no").val().trim() == "" || $$("#heritage-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#heritage-airtime-others-phone-no").val().trim().length != 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#heritage-airtime-others-phone-no").val();
            var amt = $$("#heritage-airtime-others-amount").val();
            var dialCode = "*322*030*" + phone + "*" + amt + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#heritage-transfer-btn").click(function(){
          if ($$("#heritage-transfer-acc-no").val().trim() == "" || $$("#heritage-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#heritage-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#heritage-transfer-acc-no").val();
            var amt = $$("#heritage-transfer-amount").val();
            var dialCode = "*322*030*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferHeritage.close();
          }
      });

      $$("#heritage-transfer-others-btn").click(function(){
          if ($$("#heritage-transfer-others-acc-no").val().trim() == "" || $$("#heritage-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#heritage-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#heritage-transfer-others-acc-no").val();
            var amt = $$("#heritage-transfer-others-amount").val();
            var dialCode = "*322*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      $$("#heritage-pay-bills-btn").click(function(){
          if ($$("#heritage-pay-bills-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var theMerchantCode = window.localStorage.getItem("merchant_code");
            var amt = $$("#heritage-pay-bills-amount").val();
            var dialCode = "*322*030*" + theMerchantCode + "*" + amt + "#";
            makeCall(dialCode);
            payBills.close();
          }
      });

      
});








