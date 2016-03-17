// This is the Main script

// angular
(function() {
  angular.module('app', ['gridster', 'ui.bootstrap', 'ngRoute',
      'pascalprecht.translate'
    ])
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/1', {
            templateUrl: 'templates/single.html',
            controller: '1Cam'
          })
          .when('/2', {
            templateUrl: 'templates/grid.html',
            controller: '2Cams'
          })
          .when('/2S', {
            templateUrl: 'templates/grid.html',
            controller: '2SCams'
          })
          .when('/3', {
            templateUrl: 'templates/grid.html',
            controller: '3Cams'
          })
          .when('/4', {
            templateUrl: 'templates/grid.html',
            controller: '4Cams'
          })
          .when('/4R', {
            templateUrl: 'templates/grid.html',
            controller: '4RCams'
          })
          .when('/5', {
            templateUrl: 'templates/grid.html',
            controller: '5Cams'
          })
          .when('/6', {
            templateUrl: 'templates/grid.html',
            controller: '6Cams'
          })
          .when('/7', {
            templateUrl: 'templates/grid.html',
            controller: '7Cams'
          })
          .when('/8', {
            templateUrl: 'templates/grid.html',
            controller: '8Cams'
          })
          .when('/9', {
            templateUrl: 'templates/grid.html',
            controller: '9Cams'
          })
          .when('/10', {
            templateUrl: 'templates/grid.html',
            controller: '10Cams'
          })
          .when('/13', {
            templateUrl: 'templates/grid.html',
            controller: '13Cams'
          })
          .when('/16', {
            templateUrl: 'templates/grid.html',
            controller: '16Cams'
          })
          .when('/cameras', {
            templateUrl: 'templates/cameras/view.html',
            controller: 'CameraCtl'
          })
          .when('/about', {
            templateUrl: 'templates/about/view.html',
            controller: 'AboutCtrl'
          })
          .otherwise({
            redirectTo: '/cameras'
          });
      }
    ])
    .controller('RootCtrl', ['$scope', '$http', '$translate', '$rootScope',
      function($scope,
        $http, $translate, $rootScope) {
        $scope.$on('$locationChangeStart', function(e, next, current) {
          $scope.page = next.split('/').splice(-1);
          $scope.styleUrl = '/style.css'
          $rootScope.detectLanguage()
        });
      }
    ])
    .controller('AboutCtrl', ['$scope', '$http', function($scope, $http) {
      $scope.$on('$locationChangeStart', function(e, next, current) {
        $scope.page = next.split('/').splice(-1);
        $scope.styleUrl = '/style.css'
      });
    }])
    // AJAX API Calls
    .run(['$rootScope', '$http', '$translate', function($rootScope, $http,
      $translate) {

      // Detect Language
      $rootScope.detectLanguage = function() {
        var url = '/api/detectLanguage';
        $http.get(url).success(function(data) {
          console.log('language detected = ' + data)
          $translate.use(data)
            //$rootScope.$broadcast('languageDetected', data)
        });
      };

      // Get Views
      $rootScope.getViews = function(page) {
        $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
          method: 'POST',
          url: '/api/getViews',
          data: 'view=' + page,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }).
        success(function(response) {
          if (response[0]) {
            console.log("Views restored from database");
            $rootScope.$broadcast('viewBroadcast', JSON.parse(
              response[0].data))
          } else {
            console.log("Using defaults for view");
            return 0
          }
        })
      };

      // Update View to Database
      $rootScope.updateView = function(jdata) {
        $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
          method: 'POST',
          url: '/api/updateView',
          data: jdata,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }).
        success(function(response) {
          console.log("View Updated"); // Getting Success Response in Callback
        }).
        error(function(response) {
          console.log("View Update Failed"); // Getting Error Response in Callback
          $scope.codeStatus = response || "Request failed";
          console.log($scope.codeStatus);
        });
      };

      // Get Cameras
      $rootScope.getCameras = function() {
        var url = '/api/getCameras';
        $http.get(url).success(function(data) {
          $rootScope.$broadcast('gotCameras', data)
        });
      };

      // Update Cameras to Database
      $rootScope.updateCameras = function(jdata) {
        jdata = 'data=' + JSON.stringify(jdata)
        $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
          method: 'POST',
          url: '/api/updateCameras',
          data: jdata,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }).
        success(function(response) {
          console.log("Cameras Updated"); // Getting Success Response in Callback
        }).
        error(function(response) {
          console.log("Camera Update Failed"); // Getting Error Response in Callback
          //$scope.codeStatus = response || "Request failed";
          //console.log($scope.codeStatus);
        });
      };
    }])
})();
