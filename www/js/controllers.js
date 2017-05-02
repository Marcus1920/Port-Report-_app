//var apiROOT = 'http://154.0.164.72:8080/siyaleader_aims_beta/public/';

//var apiROOT = 'http://localhost:8000/';
var apiROOT = 'http://67.207.84.175';
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout ,$cordovaSQLite ,$http ,  $ionicLoading ,$ionicPopup ,$ionicPlatform) {
$scope.check = "" ;
var init = function () {

       $ionicPlatform.ready(function() {
            if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {


var query = "SELECT * FROM  Report ";
                        $cordovaSQLite.execute(db, query, []).then(function(res) {
              if(res.rows.length > 0) {
                  //        console.log("SELECTED -> " + res.rows.item(0).key + " " +  res.rows.item(0).id );
         $scope.check = res.rows.item(0).key ;




 $scope.signInDisabled = true;


              }else {
                  console.log("No results found");

 $scope.signInDisabled = true;

              }
                   }, function (err) {

                          console.error(err);
           });


                }


                else {





        var query = "SELECT * FROM  Report ";
                        $cordovaSQLite.execute(db, query, []).then(function(res) {
              if(res.rows.length > 0) {
                  //        console.log("SELECTED -> " + res.rows.item(0).key + " " +  res.rows.item(0).id );
         $scope.check = res.rows.item(0).key ;




        $scope.signInDisabled = false;


              }else {
                  console.log("No results found");

         $scope.signInDisabled = true;

              }
                   }, function (err) {

                          console.error(err);
           });


                }
            }
        });






};

init();











$scope.cleardb =  function (){

var query = "DELETE *  FROM  Report";
                  $cordovaSQLite.execute(db, query, []).then(function(res) {
              if(res.rows.length > 0) {
                  //        console.log("SELECTED -> " + res.rows.item(0).key + " " +  res.rows.item(0).id );

              }
                            }, function (err) {

                          console.error(err);
                        });


},


   $scope.load = function() {



var   APIKEY  = null ;

    var query = "SELECT  key  FROM  user ";
                        $cordovaSQLite.execute(db, query, []).then(function(res) {
              if(res.rows.length > 0) {

          APIKEY = res.rows.item(0).key ;

  // alert(APIKEY) ;

               }


                            }, function (err) {
                alert("home") ;
                          console.error(err);
                        });


     $scope.tasks  =  [] ;
          var query = "SELECT  id ,firstname ,category ,sub_category ,description ,status , img  ,gps_long  , gps_lat FROM Report ";
            var query1 = "SELECT  key  FROM  user ";

          $cordovaSQLite.execute(db, query, []).then(function(res) {


              if(res.rows.length > 0) {
                  console.log("SELECTED -> " + res.rows.item(0).firstname + " " +  res.rows.item(0).id );

          for (var i=0; i< res.rows.length; i++) {


          $scope.tasks.push({
          "id":res.rows.item(i).id,
          "firstname":res.rows.item(i).firstname,
          "category":res.rows.item(i).category,
          "sub_category":res.rows.item(i).sub_category,
          "description":res.rows.item(i).description,
          "img":res.rows.item(i).img,
           "gps_long":res.rows.item(i).gps_long,
            "gps_lat":res.rows.item(i).gps_lat,
          "status":res.rows.item(i).status

                });




    console.log("SELECTED -> " + "Name : " + res.rows.item(i).firstname + " " +  res.rows.item(i).id );
               }


                        var headers = {
                            'api_key': APIKEY,
                            'api_key_new':APIKEY

                        };

        $http({
          url: apiROOT  + 'api/v1/test',
          method: "POST",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          headers: {

          'api_key' : APIKEY , 'api_key' : APIKEY

    },

      data: $scope.tasks,

      })
      .then(function(response , status, headers, conf) {


         $ionicLoading.show({
       template: 'Loading...'
     }).then(function(){

     });

     var query = "DELETE   FROM  Report";
                  $cordovaSQLite.execute(db, query, []).then(function(res) {
              if(res.rows.length > 0) {
                  //        console.log("SELECTED -> " + res.rows.item(0).key + " " +  res.rows.item(0).id );

              }
                            }, function (err) {

                          console.error(err);
                        });



     $ionicLoading.hide({
       template: 'Loading...'
     }).then(function(){

     });
     var alertPopup = $ionicPopup.alert({
      title: 'Report ',
      template: 'Was successfully send'
    });
      },
      function(response) { // optional
              // failed

        console.log("faild") ;
      });




              } else {
                  console.log("No results found");
              }
          }, function (err) {
              console.error(err);
          });
      }





  $scope.openTC = function  () {
         console.log('Link Open');
         window.open('', '_system');
     }

     $scope.safeApply = function(fn) {
         var phase = this.$root.$$phase;
         if (phase == '$apply' || phase == '$digest') {
             if (fn && (typeof(fn) === 'function')) {
                 fn();
             }
         } else {
             this.$apply(fn);
         }
     };


     $scope.cat = {};
     $scope.Sub = {};
     $scope.SubSub = {};
     $scope.subs = [];
     $scope.subsubs = [];
     $scope.report = {};
  //   $scope.Report = {};
     $scope.img = '';
     $ionicModal.fromTemplateUrl('templates/newreport.html', function($ionicModal, Report) {
         $scope.loginModal = $ionicModal;
     }, {
         scope: $scope,
         animation: 'slide-in-up' //,
             // focusFirstInput: true
     });
     //Be sure to cleanup the modal by removing it from the DOM
     $scope.$on('$destroy', function() {
         $scope.loginModal.remove();
     });

     document.addEventListener("online", onOnline, false);

     function onOnline() {
         if (Report.savedReports.length > 0) {
             for (var i = Report.savedReports.length - 1; i >= 0; i--) {
                 if (Report.savedReports[i].img) {

                     Report.postReportWithImage(Report.savedReports[i]);
                 } else {

                     Report.postReport(Report.savedReports[i]);
                 }
             };
         }
     }


})

.controller('LoginCtrl', function($scope, $ionicModal,$ionicHistory , $http, $state, $ionicLoading, AuthenticationService, User, $cordovaSQLite) {

    $scope.save = function(newMessage) {
         var query = "INSERT INTO Report (firstname ,status , description , gps_lat , gps_long) VALUES (? ,? ,? , ? , ?)";
         $cordovaSQLite.execute(db, query, [newMessage,'pending','I need  help to  change the world to make its a better place' , '12123123' , '3213231412']).then(function(res) {
            // console.log("INSERT ID -> " + res.insertId);
         }, function (err) {
             console.error(err);
         });


     }

   $scope.load = function() {

   $scope.tasks  =  [] ;
        var query = "SELECT  id ,firstname ,category ,sub_category ,description ,status , img  FROM Report ";
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).firstname + " " +  res.rows.item(0).id );

        for (var i=0; i< res.rows.length; i++) {


        $scope.tasks.push({
        "id":res.rows.item(i).id,
        "firstname":res.rows.item(i).firstname,
        "category":res.rows.item(i).category,
        "sub_category":res.rows.item(i).sub_category,
        "description":res.rows.item(i).description,
        "img":res.rows.item(i).img,
        "status":res.rows.item(i).status


              });




  console.log("SELECTED -> " + "Name : " + res.rows.item(i).firstname + " " +  res.rows.item(i).id );
             }


      $http({
        url: apiROOT  + 'api/v1/test',
        method: "POST",

    data: {"data": JSON.stringify($scope.tasks)},
        headers: {
                 'Content-type': 'application/json '
        }

    })
    .then(function(response) {
        console.log("home") ;
    },
    function(response) { // optional
            // failed

      console.log("faild") ;
    });




            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }




  $scope.message = "";
   $scope.toggleLog = false;
   $scope.card = false;
   $scope.cardReg = false;
   $scope.cardSuccess = false;
   $scope.normal = false;
   $scope.toggleButton = function(argument) {
       // body...
       $scope.toggleLog = !$scope.toggleLog;
       $scope.card = false;
       $scope.cardReg = false;
       $scope.cardSuccess = false;
   }
   $scope.toggleReset = function(argument) {
       // body...
       console.log($scope.toggleLog);
       console.log($scope.normal)
       $scope.toggleLog = !$scope.toggleLog;
    //   $scope.normal = !$scope.normal;
       $scope.card = false;
       $scope.cardReg = false;
       $scope.cardSuccess = false;
    //   $scope.Apply();
   }


    $scope.hide = function() {
        $scope.loginModal.hide();
        $state.go('app.home', {}, {
            reload: true,
            inherit: false
        });
    };


    $scope.login = function() {
       $ionicLoading.show({
           template: 'Loggin In...'
       });
       AuthenticationService.login($scope.user);
   };


   $scope.user = {
        cell: null,
        password: null

    };



   $scope.$on('event:auth-loginRequired', function(e, rejection) {
        $scope.loginModal.show();
    });

    $scope.$on('event:auth-loginConfirmed', function() {
        $ionicLoading.hide();
        $scope.username    = null;
        $scope.password    = null;
        $scope.card        = false;
        $scope.cardReg     = false;
        $scope.cardSuccess = false;
    //    $scope.loginModal.hide();

    $state.go('app.home', {}, {
               reload: true,
               inherit: false
           });

    });

    $scope.$on('event:auth-login-failed', function(e, status) {
        $ionicLoading.hide();
        var error = "Invalid Username or Password.";
        $scope.card = true;
        $scope.message = error;
    });

    $scope.resetP = function() {
        if ($scope.user && $scope.user.cell && $scope.user.password) {
            AuthenticationService.reset($scope.user).then(function(argument) {
                $scope.toggleLog = false;
                $scope.normal = false;
            });
        }
    };
    $scope.register = function() {
        AuthenticationService.register($scope.user);
    };

    $scope.$on('event:auth-register-complete', function(e, status) {
       $scope.toggleButton();
       $scope.cardReg = false;
       $scope.card = false;
       $scope.cardSuccess = true;
       $scope.message = status;
   });
   $scope.$on('event:auth-register-failed', function(e, status) {
       var error = status;
       $scope.cardReg = true;
       $scope.message = error;
   });


   $scope.$on('event:auth-logout-complete', function() {
       $state.go('login', {}, {
           reload: true,
           inherit: false
       });
   });


})


.controller('MyreportCtrl', function($scope, $stateParams , $state, $http, $ionicModal, $ionicPopup ,  $cordovaSQLite , $ionicPlatform ,$window) {


  if ($state.go($state.current, $stateParams, {reload: true, inherit: false})) {

    $ionicPlatform.ready(function() {
          if(window.Connection) {
              if(navigator.connection.type == Connection.NONE) {

                   $scope.reports  =  [] ;
                      var query = "SELECT  id ,firstname ,category ,sub_category ,description ,status , img  FROM Report ";
                      $cordovaSQLite.execute(db, query, []).then(function(res) {
                          if(res.rows.length > 0) {
                              console.log("SELECTED -> " + res.rows.item(0).firstname + " " +  res.rows.item(0).id );

                      for (var i=0; i< res.rows.length; i++) {


                      $scope.reports.push({
                        "id":res.rows.item(i).id,
                              "firstname":res.rows.item(i).firstname,
                      "category":res.rows.item(i).category,
                      "sub_category":res.rows.item(i).sub_category,
                      "description":res.rows.item(i).description,
                      "img":res.rows.item(i).img,
                      "status":res.rows.item(i).status

                            });




                console.log("SELECTED -> " + "Name : " + res.rows.item(i).firstname + " " +  res.rows.item(i).id );
                           }


                    $http({
                      url: 'http://localhost:8000/api/v1/test',
                      method: "POST",

                  data: {"data": JSON.stringify($scope.tasks)},
                      headers: {
                               'Content-type': 'application/json '
                      }

                  })
                  .then(function(response) {
                      console.log("home") ;
                  },
                  function(response) { // optional
                          // failed

                    console.log("faild") ;
                  });




                          } else {
                              console.log("No results found");
                          }
                      }, function (err) {
                          console.error(err);
                      });






              }
          }else{



    $scope.reports = [];



  if (localStorage.getItem("key"))
   {
      APIKEY = localStorage.getItem("key");
        var  api_key = APIKEY ;

   }

          $http({
          url: apiROOT + 'api/v1/myreport?api_key=' + api_key,
          method: "GET",
        headers: {
             'api_key': APIKEY,
             'api_key_new':APIKEY
              }
      }).success(
           function(data) {
               for (var i = data.reports.length - 1; i >= 0; i--) {
                   if (data.reports[i].img_url != '') {
                       data.reports[i].img_url = apiROOT + data.reports[i].img_url;
                   }

                  console.log(data.reports[i].id + "  " + data.reports[i].description );
               };
               $scope.reports = data.reports;
               console.log(data.reports)
           }
       ).error(
           function(data) {
               alert('There was an error retrieving your reports.');
               console.log('MY REPORTS Error', data);
           }
       );




       $ionicModal.fromTemplateUrl('templates/myreport.html', {
           scope: $scope,
           animation: 'slide-in-up'
       }).then(function(modal) {
           $scope.repmodal = modal;



       });
       $scope.openrepModal = function(report) {
           $scope.selectedReport = report;
           $scope.repmodal.show();
       };
       $scope.closerepModal = function() {
            $scope.modal.hide();
           $scope.repmodal.hide();
            $scope.selectedReport = {};
       };
       //Cleanup the modal when we're done with it!
       $scope.$on('$destroy', function() {
           $scope.repmodal.remove();
       });


          }
      });

  }


  $scope.doRefresh = function() {



    if (localStorage.getItem("key"))
     {
        APIKEY = localStorage.getItem("key");

        var  api_key  =   APIKEY ;

     }

            $http({
          url: apiROOT + 'api/v1/myreport?api_key=' + api_key,
            method: "GET",

          headers: {
               'api_key': APIKEY,
               'api_key_new':APIKEY
                }
        }).success(
             function(data) {
                 for (var i = data.reports.length - 1; i >= 0; i--) {
                     if (data.reports[i].img_url != '') {
                         data.reports[i].img_url = apiROOT + data.reports[i].img_url;
                     }

                    console.log(data.reports[i].id + "  " + data.reports[i].description );
                 };
                 $scope.reports = data.reports;
                 console.log(data.reports)


                  $scope.$broadcast('scroll.refreshComplete');
             }
         ).error(
             function(data) {
                 alert('There was an error retrieving your reports.');
                 console.log('MY REPORTS Error', data);
             }
         );


  };

})

.controller('HometCtrl', function($scope, $stateParams, $ionicHistory ,$http, $cordovaSQLite) {

  if (localStorage.getItem('watched')) {
          $scope.timer = true;
      } else {
          $scope.timer = false;
      }
      setTimeout(function(argument) {


          setTimeout(function(argument) {
              localStorage.setItem('watched', '1')
              $scope.timer = true;
              $scope.$apply();
          }, 17000);
      }, 3000)
$ionicHistory.clearHistory();
  //    $ionicViewService.clearHistory();
 $scope.categorys = [] ;


 $scope.subcategory = [] ;

  $scope.departement = [] ;


      $http.get(apiROOT  + 'api/v1/category').
     success( function(data) {

               for (var i=0; i< data.length; i++) {
        var  slug  =      data[i].slug ;
        var  name  =      data[i].name ;
        var  created_by  =      data[i].created_by ;
        var  updated_by  =      data[i].updated_by ;
        var  active  =      data[i].active ;
        var  created_at  =      data[i].created_at ;
        var  updated_at  =      data[i].updated_at ;


  var query = "INSERT OR REPLACE INTO categories(slug, name, created_by , updated_by , active,  created_at, updated_at) VALUES (? ,? , ? , ? ,? ,? ,? )";
     $cordovaSQLite.execute(db, query, [slug ,name , created_by ,  updated_by ,  active , created_at , updated_at ]).then(function(res) {
                        console.log("INSERT ID -> " + res.insertId);
                            }, function (err) {
                          console.error(err);
                        });

               };
               $scope.categorys = data.categorys;
               console.log(data.categorys)


   });



$http.get(apiROOT  + 'api/v1/departement').
     success( function(data) {

               for (var i=0; i< data.length; i++) {
        var  slug  =      data[i].slug ;
        var  name  =      data[i].name ;
        var  created_by  =      data[i].created_by ;
        var  updated_by  =      data[i].updated_by ;
        var  active  =      data[i].active ;
        var  created_at  =      data[i].created_at ;
        var  updated_at  =      data[i].updated_at ;


  var query = "INSERT OR REPLACE INTO department(slug, name, created_by , updated_by , active,  created_at, updated_at) VALUES (? ,? , ? , ? ,? ,? ,? )";
     $cordovaSQLite.execute(db, query, [slug ,name , created_by ,  updated_by ,  active , created_at , updated_at ]).then(function(res) {
                        console.log("INSERT ID -> " + res.insertId);
                            }, function (err) {
                          console.error(err);
                        });

               };
               $scope.categorys = data.categorys;
               console.log(data.categorys)


   });







      $http.get(apiROOT  + 'api/v1/subcategory').
     success( function(data) {

               for (var i=0; i< data.length; i++) {
        var  slug  =      data[i].slug ;
        var  name  =      data[i].name ;
        var  created_by  =      data[i].created_by ;
        var  updated_by  =      data[i].updated_by ;
        var  active  =      data[i].active ;
        var  created_at  =      data[i].created_at ;
        var  updated_at  =      data[i].updated_at ;


  var query = "INSERT OR REPLACE INTO subcategories(slug, name, created_by , updated_by , active,  created_at, updated_at) VALUES (? ,? , ? , ? ,? ,? ,? )";
     $cordovaSQLite.execute(db, query, [slug ,name , created_by ,  updated_by ,  active , created_at , updated_at ]).then(function(res) {
                        console.log("INSERT ID -> " + res.insertId);
                            }, function (err) {
                          console.error(err);
                        });

               };
               $scope.subcategory = data.subcategory;
               console.log(data.subcategory)


   });






})


.controller('NewreportCtrl', function($scope, $ionicModal , $stateParams,$ionicHistory, $state ,$http ,Categories , Report,  LocationService  , $ionicLoading ,$ionicPopup ,$cordovaSQLite ,$ionicPlatform , $window) {



   $ionicModal.fromTemplateUrl('templates/newreport.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal = modal;
   });





         $http.get(apiROOT + '/api/v1/categoriess')

       //  var apiROOT = 'http://154.0.164.72:8080/siyaleader_aims_beta/public/api/v1/categories';

             .success(function(data, status, headers, config) {

                 var obj = data;

                                 console.log(data) ;
                 if (obj.error) {
                     $scope.$broadcast('event:categories-failed', obj.message);
                 } else {
                     $scope.$broadcast('event:categories-success', obj);


                 }

             })
             .error(function(data, status, headers, config) {
                 console.log("Error occurred.  Status:" + status);
             });


  $ionicPlatform.ready(function() {
            if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {

  var ua = navigator.userAgent;
      if (ua.indexOf("Android") >= 0) {
          var androidversion = parseFloat(ua.slice(ua.indexOf("Android") + 8));
          if (androidversion != 4.4) {
              $scope.hideGal = false; // do whatever
          } else {
              $scope.hideGal = true;
          }
      }



      $http.get('http://154.0.164.72:8080/siyaleader_prop_it/public/api/v1/categoriess')

    //  var apiROOT = 'http://154.0.164.72:8080/siyaleader_aims_beta/public/api/v1/categories';

          .success(function(data, status, headers, config) {

              var obj = data;


                              console.log(data) ;
              if (obj.error) {
                  $scope.$broadcast('event:categories-failed', obj.message);

              } else {
                  $scope.$broadcast('event:categories-success', obj);


              }

          })
          .error(function(data, status, headers, config) {
              console.log("Error occurred.  Status:" + status);
          });


      $scope.success   = false;
      $scope.alertBad  = false;
      $scope.alertGood = false;
      $scope.report.gps_lat = LocationService.location.latitude;
      $scope.report.gps_lng = LocationService.location.longitude;

      $scope.clickUploadFile = function() {
          document.getElementById('FileInput').click();
      }




        $scope.$on('event:categories-success', function(e, res) {
            $scope.categories   = res.categories;

                      //$scope.cat.selected = $scope.categories[0];

        //    console.log($scope.cat.selected);
            //$scope.update();


        })


      $scope.update = function() {
          $scope.Sub = {};
          $scope.SubSub = {};
          $scope.report.category = $scope.cat.selected.name;
          $scope.selectedCatSubs = $scope.cat.selected.subs;
          $scope.subs            = $scope.selectedCatSubs;

      }




      $scope.update = function() {
          $scope.Sub = {};
          $scope.SubSub = {};
          $scope.report.category = $scope.cat.selected.name;
          $scope.selectedCatSubs = $scope.cat.selected.subs;
          $scope.subs            = $scope.selectedCatSubs;

      }

      $scope.updateSub = function() {
          $scope.Sub = {};
          $scope.report.sub_category = $scope.Sub.selected.name;
          $scope.selectedSubSubs     = $scope.Sub.selected.subs;
          $scope.subsubs             = $scope.selectedSubSubs;


      }

      $scope.updateSubSub = function() {

          $scope.report.sub_sub_category  =  $scope.SubSub.selected.name;
      }



      $scope.prior = function(selected){
         $scope.report.priorities = selected;
      }




                }
                 else  {
                    console.log("No  connection");
                 }
            }
        });







  var ua = navigator.userAgent;
      if (ua.indexOf("Android") >= 0) {
          var androidversion = parseFloat(ua.slice(ua.indexOf("Android") + 8));
          if (androidversion != 4.4) {
              $scope.hideGal = false; // do whatever
          } else {
              $scope.hideGal = true;
          }
      }

      $scope.success   = false;
      $scope.alertBad  = false;
      $scope.alertGood = false;
      $scope.report.gps_lat = LocationService.location.latitude;
      $scope.report.gps_lng = LocationService.location.longitude;
      $http.get(apiROOT + 'api/v1/categories')
          .success(function(data, status, headers, config) {

              var obj = data;
              if (obj.error) {
                  $scope.$broadcast('event:categories-failed', obj.message);
              } else {
                  $scope.$broadcast('event:categories-success', obj);
              }

          })
          .error(function(data, status, headers, config) {
              console.log("Error occurred.  Status:" + status);
          });

      $scope.clickUploadFile = function() {
          document.getElementById('FileInput').click();
      }




        $scope.$on('event:categories-success', function(e, res) {
            $scope.categories   = res.categories;
            //$scope.cat.selected = $scope.categories[0];

      //      console.log($scope.cat.selected);
            //$scope.update();


        })


      $scope.update = function() {
          $scope.Sub = {};
          $scope.SubSub = {};
          $scope.report.category = $scope.cat.selected.name;
          $scope.selectedCatSubs = $scope.cat.selected.subs;
          $scope.subs            = $scope.selectedCatSubs;

      }




      $scope.update = function() {
          $scope.Sub = {};
          $scope.SubSub = {};
          $scope.report.category = $scope.cat.selected.name;
          $scope.selectedCatSubs = $scope.cat.selected.subs;
          $scope.subs            = $scope.selectedCatSubs;

      }

      $scope.updateSub = function() {
          $scope.report.sub_category = $scope.Sub.selected.name;
          $scope.selectedSubSubs     = $scope.Sub.selected.subs;
          $scope.subsubs             = $scope.selectedSubSubs;


      }

      $scope.updateSubSub = function() {

          $scope.report.sub_sub_category  =  $scope.SubSub.selected.name;
      }



      $scope.prior = function(selected){
         $scope.report.priorities = selected;
      }










  $scope.takePicture = function () {
          var options = {
            quality: 50,
            destinationType:Camera.DestinationType.FILE_URI,
            sourceType: 1,
            encodingType:0 //0:photos  library

          }

          navigator.camera.getPicture(onSuccess,onFail ,options);


       }

  // function  to get the  picture

  $scope.pickPicture = function () {
        var options = {
          quality: 50,
          width  :640,
          heigth :480,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          encodingType:0 //0:photos  library
        }

        navigator.camera.getPicture(onSuccess,onFail ,options);


        var photo = document.getElementById('FileInput');
          photo.click();
          photo.onchange = function(argument) {
              if (photo.files && photo.files[0]) {
                  var reader = new FileReader();
                  reader.onload = function(e) {
                      $scope.img = photo.files[0];
                      $scope.imgSrc = e.target.result;
                      $scope.showMessage = true;
                      $scope.$apply();
                  };
                  reader.readAsDataURL(photo.files[0]);
              }

          };
     }



     var onSuccess = function(FILE_URI) {

       $scope.img = FILE_URI;
       $scope.imgSrc = FILE_URI;
       $scope.showMessage = true;
       localStorage.setItem("pic", FILE_URI);
       $scope.$apply();
   };
   var onFail = function(e) {
       console.log("On fail " + e);
   }

   $scope.postReport = function() {

       if (LocationService.location.latitude == null) {
           if (navigator.geolocation) {
               $scope.show();
               var options = {
                   timeout: 10000,
                   enableHighAccuracy: false,
                   maximumAge: 90000
               };
               navigator.geolocation.getCurrentPosition(showPosition, onError, options);


           } else {
               $scope.hide();
               navigator.notification.alert('Please make sure to "Allow" GPS communication. And try again', doNothing);

           }

           function onError(argument) {
               $scope.hide();
               navigator.notification.alert('We have encountered an error Please make sure to "Allow" GPS communication.', doNothing);
           }

           function doNothing(argument) {
               // body...
           }

           function showPosition(position) {
               $scope.report.gps_lat = position.coords.latitude;
               $scope.report.gps_lng = position.coords.longitude;
               $scope.postAReport();
           }

       } else {
           $scope.report.gps_lat = LocationService.location.latitude
           $scope.report.gps_lng = LocationService.location.longitude
           $scope.postAReport();
       }

   }
   $scope.postAReport = function(FILE_URI) {
       $scope.img = localStorage.getItem("pic");
       if ($scope.img) {
           $scope.show();
           if ($scope.img.size) {
               Report.postReportWithImage($scope.img, $scope.report);
           } else {
              Report.postReportWithImageCam($scope.img, $scope.report);
           }
       } else {
           $scope.show();
           Report.postReport($scope.report);
       }
   }
   $scope.$on('event:report-success', function(e, res) {
       $scope.hide();
    //   $scope.success = true;
       $scope.report = {};
       $scope.report.description="" ;
       $scope.report.description="" ;
       $scope.img  = "" ;
       $scope.latt= "" ;
       $scope.long = "" ;
       $scope.cat.selected ="";
       $scope.Sub.selected = "" ;

       $scope.alertGood = true;
       $scope.message = "Your Report Was Posted Successfully";



         $scope.img = localStorage.getItem("pic");

           $scope.report.gps_lat = LocationService.location.latitude;
           $scope.report.gps_lng = LocationService.location.longitude;

          $scope.report.category = $scope.cat.selected.name;
          $scope.selectedCatSubs = $scope.cat.selected.subs;

           $scope.report.sub_category = $scope.Sub.selected.name;
           $scope.selectedSubSubs     = $scope.Sub.selected.subs;
           $scope.subsubs             = $scope.selectedSubSubs;

/**   var query = "INSERT INTO Report (firstname ,status , category , sub_category, description ,img , gps_long  ,  gps_lat ) VALUES (? ,? ,? ,? , ?  ,? ,? ,? )";
         $cordovaSQLite.execute(db, query, ['Paule','pending',  $scope.report.category  ,  $scope.report.sub_category, $scope.report.description, $scope.img, $scope.report.gps_lng ,  $scope.report.gps_lat]).then(function(res) {
             console.log("INSERT ID -> " + res.insertId);
             console.log("INSERT ID -> " + res.img);
         }, function (err) {
             console.error(err);
         });  ***/

               localStorage.removeItem("pic");

              // $window.location.reload(true);
              //  $state.go($state.current, {}, {reload: true});



   })
   $scope.$on('event:report-failed', function(e, res) {
       $scope.hide();
       $scope.hide();
    //   $scope.success = true;
       $scope.report = {};
       $scope.report.description="" ;
       $scope.report.description="" ;
       $scope.img  = "" ;
       $scope.latt= "" ;
       $scope.long = "" ;
       $scope.cat.selected ="";
       $scope.Sub.selected = "" ;


       $scope.alertBad = true;
       $scope.message = "There was an issue sending your report, We'll Send it later for you";
       localStorage.removeItem("pic");
       Report.savedReports.push($scope.report);


   })
   $scope.show = function() {
       $ionicLoading.show({
           template: 'Sending...'
       });
   };
   $scope.hide = function() {
       $ionicLoading.hide();
   };

   $scope.sendreport=  function(){

     $ionicLoading.show({
       template: 'Loading...'
     }).then(function(){

     });


     $ionicLoading.hide({
       template: 'Loading...'
     }).then(function(){

     });
     var alertPopup = $ionicPopup.alert({
      title: 'Report ',
      template: 'Was successfully send'
    });

   // $state.go($state.home);
 }


 $scope.gohome = function(){

  $ionicHistory.nextViewOptions({
      disableBack: true
 });



      $window.location.reload(true);
       $state.go($state.current, {}, {reload: true});

    //$state.go('login');

//  alert("fdgdglklfg") ;
 }



//  mape  staff

  var map, InfoWindow, marker;

             $scope.initialize = function() {

                 infowindow = new google.maps.InfoWindow();
                 var mapOptions = {
                     center: new google.maps.LatLng(-28.800, 31.025),
                     disableDefaultUI: true,
                     mapTypeId: google.maps.MapTypeId.ROADMAP,
                     mapTypeControlOptions: {
                     mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                   'styled_map']
         },
                     zoom: 16
                 };
                 map = new google.maps.Map(document.getElementById("map"), mapOptions);




             }

             if ($state.go($state.current, $stateParams, {reload: true, inherit: false})) {
                  $scope.initialize();
                     Locate();
             }


             function Locate() {
                 var myLatLng;


                 if (navigator.geolocation) {

                     var options = {
                         timeout: 10000,
                         enableHighAccuracy: true,
                         maximumAge: 90000
                     };
                     navigator.geolocation.getCurrentPosition(showPosition, onError, options);
                 } else {

                     navigator.notification.alert('Please make sure to "Allow" GPS communication. And try again', doNothing);
                 }

                 function showPosition(position) {

                                var latt = position.coords.latitude;
                                var long = position.coords.latitude;
                                $scope.latt =latt;
                                $scope.long =long;
                     LocationService.location.latitude = position.coords.latitude;
                     LocationService.location.longitude = position.coords.longitude;
                     //LocationService.location.longitude = position.coords.longitude;

                     myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                     marker = new google.maps.Marker({
                         position: myLatLng,
                         map: map,
                         draggable: true
                     });
                     map.panTo(myLatLng);
                     google.maps.event.addListener(marker, 'dragend', function(evt) {

                         LocationService.location.latitude = evt.latLng.lat();
                         LocationService.location.longitude = evt.latLng.lng();

                     });


                 }

                 function onError(argument) {

                     navigator.notification.alert('We were unable to find you, Please drag the marker to your position', doNothing);
                     marker = new google.maps.Marker({
                         position: new google.maps.LatLng(-28.800, 31.025),
                         map: map,
                         draggable: true
                     });
                     map.panTo(myLatLng);
                     map.setZoom(12);
                 }

             }
$state.go($state.current, $stateParams, {reload: true, inherit: false});
      //       Locate();

  $scope.sendreport=  function(){

    $ionicLoading.show({
      template: 'Loading...'
    }).then(function(){

    });


    $ionicLoading.hide({
      template: 'Loading...'
    }).then(function(){

    });
    var alertPopup = $ionicPopup.alert({
     title: 'Report ',
     template: 'Was successfully send'
   });

  // $state.go($state.home);
}






})

.controller('LogoutCtrl', function($scope, AuthenticationService, $location, $window) {
    $location.path('login');
    $window.localStorage.clear();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
  //$state.go($state.current, $stateParams, {reload: true, inherit: false});

})



.controller('loginCtrl', function($scope, $stateParams) {

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
