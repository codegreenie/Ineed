$$(document).on('page:afterin', '.page[data-name="jaiz"]', function (e){
  changeStatusBarColor("#255a38");
});
$$(document).on('page:init', '.page[data-name="jaiz"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
      showTopBannerAd();
  }, 1000);

      var airtimeSelf = app.sheet.create({
        el : '.jaiz-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.jaiz-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferJaiz = app.sheet.create({
        el : '.jaiz-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.jaiz-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-jaiz-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-jaiz-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-jaiz-transfer").click(function(){
          transferJaiz.stepToggle();
      });
      $$("#expand-jaiz-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#jaiz-airtime-self-btn").click(function(){
          if ($$("#jaiz-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#jaiz-airtime-self-amount").val();
            var dialCode = "*389*301*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#jaiz-airtime-others-btn").click(function(){
          if ($$("#jaiz-airtime-others-phone-no").val().trim() == "" || $$("#jaiz-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#jaiz-airtime-others-phone-no").val().trim().length != 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#jaiz-airtime-others-phone-no").val();
            var amt = $$("#jaiz-airtime-others-amount").val();
            var dialCode = "*389*301*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#jaiz-transfer-btn").click(function(){
          if ($$("#jaiz-transfer-acc-no").val().trim() == "" || $$("#jaiz-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#jaiz-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#jaiz-transfer-acc-no").val();
            var amt = $$("#jaiz-transfer-amount").val();
            var dialCode = "*389*301*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferJaiz.close();
          }
      });

      $$("#jaiz-transfer-others-btn").click(function(){
          if ($$("#jaiz-transfer-others-acc-no").val().trim() == "" || $$("#jaiz-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#jaiz-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#jaiz-transfer-others-acc-no").val();
            var amt = $$("#jaiz-transfer-others-amount").val();
            var dialCode = "*389*301*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});











$$(document).on('page:afterin', '.page[data-name="keystone"]', function (e){
  changeStatusBarColor("#133f77");
});
$$(document).on('page:init', '.page[data-name="keystone"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
      showTopBannerAd();
  }, 1000);

      var airtimeSelf = app.sheet.create({
        el : '.keystone-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.keystone-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferKeystone = app.sheet.create({
        el : '.keystone-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.keystone-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-keystone-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-keystone-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-keystone-transfer").click(function(){
          transferKeystone.stepToggle();
      });
      $$("#expand-keystone-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#keystone-airtime-self-btn").click(function(){
          if ($$("#keystone-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#keystone-airtime-self-amount").val();
            var dialCode = "*7111*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#keystone-airtime-others-btn").click(function(){
          if ($$("#keystone-airtime-others-phone-no").val().trim() == "" || $$("#keystone-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#keystone-airtime-others-phone-no").val().trim().length != 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#keystone-airtime-others-phone-no").val();
            var amt = $$("#keystone-airtime-others-amount").val();
            var dialCode = "*7111*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#keystone-transfer-btn").click(function(){
          if ($$("#keystone-transfer-acc-no").val().trim() == "" || $$("#keystone-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#keystone-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#keystone-transfer-acc-no").val();
            var amt = $$("#keystone-transfer-amount").val();
            var dialCode = "*7111*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferKeystone.close();
          }
      });

      $$("#keystone-transfer-others-btn").click(function(){
          if ($$("#keystone-transfer-others-acc-no").val().trim() == "" || $$("#keystone-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#keystone-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#keystone-transfer-others-acc-no").val();
            var amt = $$("#keystone-transfer-others-amount").val();
            var dialCode = "*7111*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});















$$(document).on('page:afterin', '.page[data-name="polaris"]', function (e){
  changeStatusBarColor("#8934ad");
});
$$(document).on('page:init', '.page[data-name="polaris"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
      showTopBannerAd();
  }, 1000);

      var airtimeSelf = app.sheet.create({
        el : '.polaris-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.polaris-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferPolaris = app.sheet.create({
        el : '.polaris-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.polaris-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-polaris-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-polaris-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-polaris-transfer").click(function(){
          transferPolaris.stepToggle();
      });
      $$("#expand-polaris-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#polaris-airtime-self-btn").click(function(){
          if ($$("#polaris-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#polaris-airtime-self-amount").val();
            var dialCode = "*833*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#polaris-airtime-others-btn").click(function(){
          if ($$("#polaris-airtime-others-phone-no").val().trim() == "" || $$("#polaris-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#polaris-airtime-others-phone-no").val().trim().length != 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#polaris-airtime-others-phone-no").val();
            var amt = $$("#polaris-airtime-others-amount").val();
            var dialCode = "*833*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#polaris-transfer-btn").click(function(){
          if ($$("#polaris-transfer-acc-no").val().trim() == "" || $$("#polaris-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#polaris-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#polaris-transfer-acc-no").val();
            var amt = $$("#polaris-transfer-amount").val();
            var dialCode = "*833*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferPolaris.close();
          }
      });

      $$("#polaris-transfer-others-btn").click(function(){
          if ($$("#polaris-transfer-others-acc-no").val().trim() == "" || $$("#polaris-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#polaris-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#polaris-transfer-others-acc-no").val();
            var amt = $$("#polaris-transfer-others-amount").val();
            var dialCode = "*833*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});










$$(document).on('page:afterin', '.page[data-name="rubies"]', function (e){
  changeStatusBarColor("#b62226");
});












$$(document).on('page:afterin', '.page[data-name="sterling"]', function (e){
  changeStatusBarColor("#db353a");
});
$$(document).on('page:init', '.page[data-name="sterling"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
      showTopBannerAd();
  }, 1000);

      var airtimeSelf = app.sheet.create({
        el : '.sterling-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.sterling-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferSterling = app.sheet.create({
        el : '.sterling-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.sterling-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-sterling-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-sterling-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-sterling-transfer").click(function(){
          transferSterling.stepToggle();
      });
      $$("#expand-sterling-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#sterling-airtime-self-btn").click(function(){
          if ($$("#sterling-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#sterling-airtime-self-amount").val();
            var dialCode = "*822*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#sterling-airtime-others-btn").click(function(){
          if ($$("#sterling-airtime-others-phone-no").val().trim() == "" || $$("#sterling-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#sterling-airtime-others-phone-no").val().trim().length != 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#sterling-airtime-others-phone-no").val();
            var amt = $$("#sterling-airtime-others-amount").val();
            var dialCode = "*822*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#sterling-transfer-btn").click(function(){
          if ($$("#sterling-transfer-acc-no").val().trim() == "" || $$("#sterling-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#sterling-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#sterling-transfer-acc-no").val();
            var amt = $$("#sterling-transfer-amount").val();
            var dialCode = "*822*4*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferSterling.close();
          }
      });

      $$("#sterling-transfer-others-btn").click(function(){
          if ($$("#sterling-transfer-others-acc-no").val().trim() == "" || $$("#sterling-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#sterling-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#sterling-transfer-others-acc-no").val();
            var amt = $$("#sterling-transfer-others-amount").val();
            var dialCode = "*822*5*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});
















$$(document).on('page:afterin', '.page[data-name="stanbic"]', function (e){
  changeStatusBarColor("#00529c");
});
$$(document).on('page:init', '.page[data-name="stanbic"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
      showTopBannerAd();
  }, 1000);

      var airtimeSelf = app.sheet.create({
        el : '.stanbic-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.stanbic-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferStanbic = app.sheet.create({
        el : '.stanbic-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.stanbic-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-stanbic-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-stanbic-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-stanbic-transfer").click(function(){
          transferStanbic.stepToggle();
      });
      $$("#expand-stanbic-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#stanbic-airtime-self-btn").click(function(){
          if ($$("#stanbic-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#stanbic-airtime-self-amount").val();
            var dialCode = "*909*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#stanbic-airtime-others-btn").click(function(){
          if ($$("#stanbic-airtime-others-phone-no").val().trim() == "" || $$("#stanbic-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#stanbic-airtime-others-phone-no").val().trim().length != 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#stanbic-airtime-others-phone-no").val();
            var amt = $$("#stanbic-airtime-others-amount").val();
            var dialCode = "*909*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#stanbic-transfer-btn").click(function(){
          if ($$("#stanbic-transfer-acc-no").val().trim() == "" || $$("#stanbic-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#stanbic-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#stanbic-transfer-acc-no").val();
            var amt = $$("#stanbic-transfer-amount").val();
            var dialCode = "*909*11*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferStanbic.close();
          }
      });

      $$("#stanbic-transfer-others-btn").click(function(){
          if ($$("#stanbic-transfer-others-acc-no").val().trim() == "" || $$("#stanbic-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#stanbic-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#stanbic-transfer-others-acc-no").val();
            var amt = $$("#stanbic-transfer-others-amount").val();
            var dialCode = "*909*22*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});





















$$(document).on('page:afterin', '.page[data-name="uba"]', function (e){
  changeStatusBarColor("#d42e12");
});
$$(document).on('page:init', '.page[data-name="uba"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
      showTopBannerAd();
  }, 1000);

      var airtimeSelf = app.sheet.create({
        el : '.uba-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.uba-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferUBA = app.sheet.create({
        el : '.uba-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.uba-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-uba-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-uba-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-uba-transfer").click(function(){
          transferUBA.stepToggle();
      });
      $$("#expand-uba-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#uba-airtime-self-btn").click(function(){
          if ($$("#uba-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#uba-airtime-self-amount").val();
            var dialCode = "*919*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#uba-airtime-others-btn").click(function(){
          if ($$("#uba-airtime-others-phone-no").val().trim() == "" || $$("#uba-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#uba-airtime-others-phone-no").val().trim().length != 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#uba-airtime-others-phone-no").val();
            var amt = $$("#uba-airtime-others-amount").val();
            var dialCode = "*919*" + phone + "*" + amt + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#uba-transfer-btn").click(function(){
          if ($$("#uba-transfer-acc-no").val().trim() == "" || $$("#uba-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#uba-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#uba-transfer-acc-no").val();
            var amt = $$("#uba-transfer-amount").val();
            var dialCode = "*919*3*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferUBA.close();
          }
      });

      $$("#uba-transfer-others-btn").click(function(){
          if ($$("#uba-transfer-others-acc-no").val().trim() == "" || $$("#uba-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#uba-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#uba-transfer-others-acc-no").val();
            var amt = $$("#uba-transfer-others-amount").val();
            var dialCode = "*919*4*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});

















$$(document).on('page:afterin', '.page[data-name="unity"]', function (e){
  changeStatusBarColor("#314551");
});
$$(document).on('page:init', '.page[data-name="unity"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
      showTopBannerAd();
  }, 1000);

      var airtimeSelf = app.sheet.create({
        el : '.unity-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.unity-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferUnity = app.sheet.create({
        el : '.unity-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.unity-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-unity-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-unity-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-unity-transfer").click(function(){
          transferUnity.stepToggle();
      });
      $$("#expand-unity-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#unity-airtime-self-btn").click(function(){
          if ($$("#unity-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#unity-airtime-self-amount").val();
            var dialCode = "*7799*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#unity-airtime-others-btn").click(function(){
          if ($$("#unity-airtime-others-phone-no").val().trim() == "" || $$("#unity-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#unity-airtime-others-phone-no").val().trim().length != 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#unity-airtime-others-phone-no").val();
            var amt = $$("#unity-airtime-others-amount").val();
            var dialCode = "*7799*" + phone + "*" + amt + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#unity-transfer-btn").click(function(){
          if ($$("#unity-transfer-acc-no").val().trim() == "" || $$("#unity-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#unity-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#unity-transfer-acc-no").val();
            var amt = $$("#unity-transfer-amount").val();
            var dialCode = "*7799*1*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferUnity.close();
          }
      });

      $$("#unity-transfer-others-btn").click(function(){
          if ($$("#unity-transfer-others-acc-no").val().trim() == "" || $$("#unity-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#unity-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#unity-transfer-others-acc-no").val();
            var amt = $$("#unity-transfer-others-amount").val();
            var dialCode = "*7799*2*" + accno + "*" + amt + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});



















$$(document).on('page:afterin', '.page[data-name="union"]', function (e){
  changeStatusBarColor("#00aff0");
});
$$(document).on('page:init', '.page[data-name="union"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
      showTopBannerAd();
  }, 1000);

      var airtimeSelf = app.sheet.create({
        el : '.union-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.union-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferUnion = app.sheet.create({
        el : '.union-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.union-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-union-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-union-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-union-transfer").click(function(){
          transferUnion.stepToggle();
      });
      $$("#expand-union-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#union-airtime-self-btn").click(function(){
          if ($$("#union-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#union-airtime-self-amount").val();
            var dialCode = "*826*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#union-airtime-others-btn").click(function(){
          if ($$("#union-airtime-others-phone-no").val().trim() == "" || $$("#union-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#union-airtime-others-phone-no").val().trim().length != 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#union-airtime-others-phone-no").val();
            var amt = $$("#union-airtime-others-amount").val();
            var dialCode = "*826*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#union-transfer-btn").click(function(){
          if ($$("#union-transfer-acc-no").val().trim() == "" || $$("#union-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#union-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#union-transfer-acc-no").val();
            var amt = $$("#union-transfer-amount").val();
            var dialCode = "*826*1*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferUnion.close();
          }
      });

      $$("#union-transfer-others-btn").click(function(){
          if ($$("#union-transfer-others-acc-no").val().trim() == "" || $$("#union-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#union-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#union-transfer-others-acc-no").val();
            var amt = $$("#union-transfer-others-amount").val();
            var dialCode = "*826*2*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});




















$$(document).on('page:afterin', '.page[data-name="wema"]', function (e){
  changeStatusBarColor("#990b81");
});
$$(document).on('page:init', '.page[data-name="wema"]', function (e){

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
        el : '.wema-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.wema-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferWema = app.sheet.create({
        el : '.wema-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.wema-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var payBills = app.sheet.create({
        el : '.wema-pay-bills',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-wema-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-wema-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-wema-transfer").click(function(){
          transferWema.stepToggle();
      });
      $$("#expand-wema-transfer-others").click(function(){
          transferOthers.stepToggle();
      });
      $$("#expand-wema-cardless-withdrawal").click(function(){
          cardlessWithdrawal.stepToggle();
      });
      $$("#expand-wema-pay-bills").click(function(){
          payBills.stepToggle();
      });



      $$("#wema-airtime-self-btn").click(function(){
          if ($$("#wema-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#wema-airtime-self-amount").val();
            var dialCode = "*945*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#wema-airtime-others-btn").click(function(){
          if ($$("#wema-airtime-others-phone-no").val().trim() == "" || $$("#wema-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#wema-airtime-others-phone-no").val().trim().length != 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#wema-airtime-others-phone-no").val();
            var amt = $$("#wema-airtime-others-amount").val();
            var dialCode = "*945*" + phone + "*" + amt + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#wema-transfer-btn").click(function(){
          if ($$("#wema-transfer-acc-no").val().trim() == "" || $$("#wema-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#wema-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#wema-transfer-acc-no").val();
            var amt = $$("#wema-transfer-amount").val();
            var dialCode = "*945*" + acc + "*" + amt + "#";
            makeCall(dialCode);
            transferWema.close();
          }
      });

      $$("#wema-transfer-others-btn").click(function(){
          if ($$("#wema-transfer-others-acc-no").val().trim() == "" || $$("#wema-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#wema-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#wema-transfer-others-acc-no").val();
            var amt = $$("#wema-transfer-others-amount").val();
            var dialCode = "*945*" + acc + "*" + amt + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });


      $$("#wema-pay-bills-btn").click(function(){
          if ($$("#wema-smartcard-no").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var theMerchantCode = window.localStorage.getItem("merchant_code");
            var smartcardNo = $$("#wema-smartcard-no").val();
            var dialCode = "*945*" + theMerchantCode + "*" + smartcardNo + "#";
            makeCall(dialCode);
            payBills.close();
          }
      });

      
});














$$(document).on('page:afterin', '.page[data-name="zenith"]', function (e){
  changeStatusBarColor("#e3000f");
});
$$(document).on('page:init', '.page[data-name="zenith"]', function (e){

  $$(".left .link").click(function(){
      showInterstitialAd();
  });

  setTimeout(function(){
      showTopBannerAd();
  }, 1000);

      var airtimeSelf = app.sheet.create({
        el : '.zenith-airtime-self',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var airtimeOthers = app.sheet.create({
        el : '.zenith-airtime-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferZenith = app.sheet.create({
        el : '.zenith-transfer',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });
      var transferOthers = app.sheet.create({
        el : '.zenith-transfer-others',
        swipeToStep : true,
        swipeToClose : true,
        backdrop : true,
        closeByOutsideClick : true,
        closeOnEscape : true
      });


      $$("#expand-zenith-airtime-self").click(function(){
          airtimeSelf.stepToggle();
      });
      $$("#expand-zenith-airtime-others").click(function(){
          airtimeOthers.stepToggle();
      });
      $$("#expand-zenith-transfer").click(function(){
          transferZenith.stepToggle();
      });
      $$("#expand-zenith-transfer-others").click(function(){
          transferOthers.stepToggle();
      });



      $$("#zenith-airtime-self-btn").click(function(){
          if ($$("#zenith-airtime-self-amount").val().trim() == "") {
            app.dialog.alert("Please enter an amount");
          }
          else{
            var amt = $$("#zenith-airtime-self-amount").val();
            var dialCode = "*966*" + amt + "#";
            makeCall(dialCode);
            airtimeSelf.close();
          }
      });

      $$("#zenith-airtime-others-btn").click(function(){
          if ($$("#zenith-airtime-others-phone-no").val().trim() == "" || $$("#zenith-airtime-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#zenith-airtime-others-phone-no").val().trim().length != 11){
              app.dialog.alert("Please enter a valid phone number");
          }
          else{
            var phone = $$("#zenith-airtime-others-phone-no").val();
            var amt = $$("#zenith-airtime-others-amount").val();
            var dialCode = "*966*" + amt + "*" + phone + "#";
            makeCall(dialCode);
            airtimeOthers.close();
          }
      });

      $$("#zenith-transfer-btn").click(function(){
          if ($$("#zenith-transfer-acc-no").val().trim() == "" || $$("#zenith-transfer-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#zenith-transfer-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#zenith-transfer-acc-no").val();
            var amt = $$("#zenith-transfer-amount").val();
            var dialCode = "*966*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferZenith.close();
          }
      });

      $$("#zenith-transfer-others-btn").click(function(){
          if ($$("#zenith-transfer-others-acc-no").val().trim() == "" || $$("#zenith-transfer-others-amount").val().trim() == "") {
            app.dialog.alert("Please complete the fields");
          }
          else if($$("#zenith-transfer-others-acc-no").val().trim().length != 10){
              app.dialog.alert("Please enter a valid bank account number");
          }
          else{
            var accno = $$("#zenith-transfer-others-acc-no").val();
            var amt = $$("#zenith-transfer-others-amount").val();
            var dialCode = "*966*" + amt + "*" + accno + "#";
            makeCall(dialCode);
            transferOthers.close();
          }
      });

      
});
