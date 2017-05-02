// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var db = null;
var  categorys  = [] ;
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services' , 'ng-cordova' ,'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite , $http ) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();

    }



     db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
     $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  Report (id integer primary key, firstname text ,category text ,sub_category text ,img text , description  text , status  text  ,gps_long text,  gps_lat  text)");
	   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  user (id integer primary key, cellphone text ,key text ,password text  )");
	   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  categories ( slug VARCHAR(60) UNIQUE ,name VARCHAR(60) UNIQUE,created_by int, updated_by int , active int , created_at text,updated_at text   )");
	   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  subcategories( slug VARCHAR(60) UNIQUE,name VARCHAR(60) UNIQUE,created_by int, updated_by int , active int , created_at text,updated_at text   )");
	   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  department ( slug VARCHAR(60) UNIQUE,name VARCHAR(60) UNIQUE,created_by int, updated_by int , active int , created_at text,updated_at text  )");



  });


  if (localStorage.getItem("key")) {

       var apiKey = localStorage.getItem("key");
       var user_email = localStorage.getItem("user_email");
    //   $http.defaults.headers.common.Authorization = apiKey.toString();
   }
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('login', {
  url: '/login',
  templateUrl: 'templates/login.html',
  controller: 'LoginCtrl'
  })

  .state('app.newreport', {
    url: '/newreport',
    views: {
      'menuContent': {
        templateUrl: 'templates/newreport.html',
        controller: 'NewreportCtrl'
      }
    }
  })

  .state('app.myreport', {
      url: '/myreport',
      views: {
        'menuContent': {
          templateUrl: 'templates/myreport.html',
          controller: 'MyreportCtrl'
        }
      }
    })

    .state('app.logout', {
        url: "/logout",
        views: {
            'menuContent': {
                controller: "LogoutCtrl"
            }
        }
    })

    .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html',
            controller: 'HometCtrl'
          }
        }
      });





  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
