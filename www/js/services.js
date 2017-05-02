
var apiROOT = 'http://67.207.84.175/';
//var apiROOT = 'http://localhost:8000/';
var APIKEY;
var api_key;
angular.module('starter.services', ['http-auth-interceptor'])
    .directive('fileModel', ['$parse',
        function($parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;

                    element.bind('change', function() {
                        scope.$apply(function() {
                            modelSetter(scope, element[0].files[0]);
                        });
                    });
                }
            };
        }
    ])



    .factory('AuthenticationService', function($q, $rootScope, $http, authService, User, $cordovaSQLite, $ionicPopup ,$state , $ionicLoading ,$ionicPlatform) {
        var service = {
            login: function(user) {
				 /*
                    //    password: user.password
					if  (user.cell == null)
					{
						 $ionicLoading.hide({
                       template: 'Loggin In...'
                   });
						 var alertPopup = $ionicPopup.alert({
                          title: 'Erro ',
                         template: 'wrong  user name  or password'
                      });
					}else
					{
			      	var query = "SELECT  cellphone ,key  FROM  user WHERE  cellphone =  (?)";
                        $cordovaSQLite.execute(db, query, [user.cell]).then(function(res) {
							if(res.rows.length > 0) {
                  //        console.log("SELECTED -> " + res.rows.item(0).key + " " +  res.rows.item(0).id );
				     $ionicLoading.hide({
                       template: 'Loggin In...'
                   });
							 $state.go('app.home');
							}
                            }, function (err) {
								alert("home") ;
                          console.error(err);
                        });
				   }
				**/




        $ionicPlatform.ready(function() {
            if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {


//alert("good");

                }else{




//alert("bad");



            }

          }
        });


         $ionicPlatform.ready(function() {
            if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })





                    .then(function(result) {
                        if(!result) {
                            ionic.Platform.exitApp();
                        }
                    });
                }
            }
        });

               $http.post(apiROOT + 'api/v1/login', {
                        cell: user.cell,
                        password: user.password
                    }, {
                        ignoreAuthModule: true
                    })
                    .success(function(data, status, headers, config) {
                        var obj = data;
                        if (obj.error) {
                            $rootScope.$broadcast('event:auth-login-failed', status);
                        } else {



                            APIKEY  = obj.apiKey;

                            api_key = obj.api_key;

                            $http.defaults.headers.common.api_key = APIKEY ; // Step 1
                            $http.defaults.headers.common.api_key_new = api_key;

                            User.setDetails(obj);
                            localStorage.setItem("Cell1", obj.cell_no);
							 localStorage.setItem("key", APIKEY);

						var query = "INSERT INTO user (cellphone ,key ) VALUES (? ,?)";
                        $cordovaSQLite.execute(db, query, [obj.cell_no,APIKEY]).then(function(res) {
                        console.log("INSERT ID -> " + res.insertId);
                            }, function (err) {
                          console.error(err);
                        });
                            // Need to inform the http-auth-interceptor that
                            // the user has logged in successfully.  To do this, we pass in a function that
                            // will configure the request headers with the authorization token so
                            // previously failed requests(aka with status == 401) will be resent with the
                            // authorization token placed in the header
                            authService.loginConfirmed(data, function(config) {
                                // Step 2 & 3

                                localStorage.setItem("key", APIKEY);
                                config.headers.Authorization.api_key     = APIKEY;
                                config.headers.Authorization.api_key_new = api_key;

                                console.log(config);
                                return config;

                            });
                        }
                    })
                    .error(function(data, status, headers, config) {
                        $rootScope.$broadcast('event:auth-login-failed', status);
                    });


            },
            logout: function(user) {
                $http.post(apiROOT + 'api/v1/logout', {}, {
                        ignoreAuthModule: true
                    })
                    .finally(function(data) {
                        delete $http.defaults.headers.common.Authorization;
                        $rootScope.$broadcast('event:auth-logout-complete');
                    });
            },
            reset: function(user) {
                return $http.post(apiROOT + 'api/v1/forgot', user, {
                    ignoreAuthModule: true
                }).then(function(argument) {
                    return argument;
                }, function(argument) {
                    $q.reject("We are having trouble resetting your password");
                });
            },
            loginCancelled: function() {
                authService.loginCancelled();
            },

        };
        return service;
    })


    .factory('User', function() {
            var user = {
                details: {
                    id: null,
                    name: null,
                    cell: null,
                    apiKey: null
                },
                setDetails: function(user) {
                    this.details = user;
                }
            };
            return user;
        })


    .factory('Categories', function($rootScope, $http) {
            var categories = {
                getCategories: function() {
                    var cat = {};
                    $http.get(apiROOT + 'api/v1/categoriess')
                        .success(function(data, status, headers, config) {
                            var str = data.slice(1);
                            var obj = JSON.parse(str);
                            if (obj.error) {
                                $rootScope.$broadcast('event:categories-failed', obj.message);
                            } else {
                                $rootScope.$broadcast('event:categories-success', obj.message);
                            }

                        })
                        .error(function(data, status, headers, config) {
                            console.log("Error occurred.  Status:" + status);
                        });

                }
            };
            return categories;
        })

        .factory('Report', function($rootScope, $http, User) {
                var reports = {

        load:function() {

             if (localStorage.getItem("key")) {
                            APIKEY = localStorage.getItem("key");
                        }




          $http({
          url: apiROOT + ' api/v1/test',
          method: "POST",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          headers :{
                  'api_key': APIKEY,
                  'api_key_new':api_key

              },

          data: $scope.tasks,

      })
      .success(function(data, status, headers, config) {
          console.log("home") ;
      },
      function(response) { // optional
              // failed

        console.log("faild") ;
      });

},





                    postReport: function(report) {

                        report.user_email = localStorage.getItem("user_email");


 if (localStorage.getItem("key")) {
                            APIKEY = localStorage.getItem("key");

                            var  api_key = APIKEY ;
                        }

                        var headers = {
                            'api_key': APIKEY,
                            'api_key_new':api_key

                        };
          $http({
          url:  apiROOT + 'api/v1/report',
          method: "POST",

          headers :{
                    'api_key': APIKEY,
                    'api_key_new':api_key

                },

          data:  report,

      })

                            .success(function(data, status, headers, config) {

                                var obj = data;
                                if (obj.error) {
                                    $rootScope.$broadcast('event:report-failed', obj.message);
                                } else {
                                    $rootScope.$broadcast('event:report-success', obj.message);
                                }
                                // console.log(data);

                            })
                            .error(function(data, status, headers, config) {
                                $rootScope.$broadcast('event:report-failed', data);
                            });

                    },
                    postReportWithImage: function(img, data) {
                        data.user_email = localStorage.getItem("user_email");
                        var fd = new FormData();
                        for (var k in data) {
                            if (data.hasOwnProperty(k)) {
                                fd.append(k.toString(), data[k]);
                            }
                        }
                        fd.append('img', img);

                        $http.post(apiROOT + 'api/v1/reportImage', fd, {
                                transformRequest: angular.identity,
                                headers: {
                                    'Content-Type': undefined
                                }
                            })
                            .success(function(data, status, headers, config) {
                                var obj = data;
                                if (obj.error) {
                                    $rootScope.$broadcast('event:report-failed', obj.message);
                                } else {
                                    $rootScope.$broadcast('event:report-success', obj.message);
                                }
                                console.log(data);

                            })
                            .error(function(data, status, headers, config) {
                                $rootScope.$broadcast('event:report-failed', data);
                            });

                    },
                    postReportWithImageCam: function(img, data) {
                        if (localStorage.getItem("key")) {
                            APIKEY = localStorage.getItem("key");
                        }


                        var myImg = img;
                        var options = new FileUploadOptions();
                        options.fileKey = "img";
                        options.chunkedMode = false;
                        var headers = {
                            'api_key': APIKEY,
                            'api_key_new':api_key

                        };
                        options.headers = headers;
                        var params = data;
                        options.params = params;
                        var ft = new FileTransfer();
                        ft.upload(myImg, encodeURI(apiROOT + 'api/v1/report'), onUploadSuccess, onUploadFail, options);

                        function onUploadSuccess(argument) {
                            var obj = argument.response;
                            if (obj.error) {
                                $rootScope.$broadcast('event:report-failed', obj.message);
                            } else {
                                $rootScope.$broadcast('event:report-success', obj.message);
                            }
                            console.log(data);
                            // body...
                        }

                        function DN() {

                        }

                        function onUploadFail(argument) {
                            navigator.notification.alert('There Was An Error Uploading Your Image, We\'ll Try Again Later');
                            $rootScope.$broadcast('event:report-failed', argument.response);
                            // body...
                        }

                    },
                    savedReports: []
                }
                return reports;
            })

.factory('LocationService', [function(){
  var Loc = {
      location: {
          latitude: null,
          longitude: null
      }
  };
  return Loc;

}])


.service('BlankService', [function(){

}]);
