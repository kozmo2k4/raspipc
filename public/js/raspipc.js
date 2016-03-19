// This is the Main script

// angular
(function() {
  angular.module('app', ['gridster', 'ui.bootstrap', 'ngRoute',
      'pascalprecht.translate', 'angular-confirm'
    ])
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/1', {
            templateUrl: 'templates/single.html',
            controller: 'cams1'
          })
          .when('/2', {
            templateUrl: 'templates/grid.html',
            controller: 'cams2'
          })
          .when('/2s', {
            templateUrl: 'templates/grid.html',
            controller: 'cams2s'
          })
          .when('/3', {
            templateUrl: 'templates/grid.html',
            controller: 'cams3'
          })
          .when('/4', {
            templateUrl: 'templates/grid.html',
            controller: 'cams4'
          })
          .when('/4r', {
            templateUrl: 'templates/grid.html',
            controller: 'cams4r'
          })
          .when('/5', {
            templateUrl: 'templates/grid.html',
            controller: 'cams5'
          })
          .when('/6', {
            templateUrl: 'templates/grid.html',
            controller: 'cams6'
          })
          .when('/7', {
            templateUrl: 'templates/grid.html',
            controller: 'cams7'
          })
          .when('/8', {
            templateUrl: 'templates/grid.html',
            controller: 'cams8'
          })
          .when('/9', {
            templateUrl: 'templates/grid.html',
            controller: 'cams9'
          })
          .when('/10', {
            templateUrl: 'templates/grid.html',
            controller: 'cams10'
          })
          .when('/13', {
            templateUrl: 'templates/grid.html',
            controller: 'cams13'
          })
          .when('/16', {
            templateUrl: 'templates/grid.html',
            controller: 'cams16'
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
    .controller('RootCtrl', ['$scope', '$http', '$translate', '$rootScope', '$location',
      function($scope,
        $http, $translate, $rootScope) {
        $scope.$on('$locationChangeStart', function(e, next, current) {
          $scope.page = next.split('/').splice(-1);
          $scope.styleUrl = '/style.css'
          $rootScope.detectLanguage()
          $scope.screens = {
            cams1: {
              name: "Full Screen",
              icon: "icon-1",
              href: "1"
            },
            cams2: {
              name: "Split Screen Horiz",
              icon: "icon-2",
              href: "2"
            },
            cams2s: {
              name: "Split Screen Vert",
              icon: "icon-2s",
              href: "2s"
            },
            cams3: {
              name: "Three Cam Tee",
              icon: "icon-3",
              href: "3"
            },
            cams4: {
              name: "2x2 Four Cam Grid",
              ctrl: "4Cams",
              icon: "icon-4",
              href: "4"
            },
            cams4r: {
              name: "Four Cam Ribbon",
              icon: "icon-4r",
              href: "4r"
            },
            cams5: {
              name: "Five Cam Ribbon",
              icon: "icon-5",
              href: "5",
            },
            cams6: {
              name: "Six Cam Grid",
              icon: "icon-6",
              href: "6",
            },
            cams7: {
              name: "Seven Cam Grid",
              icon: "icon-7",
              href: "7",
            },
            cams8: {
              name: "Eight Cam Grid",
              icon: "icon-7",
            },
            cams9: {
              name: "3x3 Nine Cam Grid",
              icon: "icon-9",
              href: "9",
            },
            cams10: {
              name: "Ten Cam Grid",
              icon: "icon-10",
              href: "10",
            },
            cams13: {
              name: "Thirteen Cam Grid",
              icon: "icon-13",
              href: "13",
            },
            cams16: {
              name: "4x4 16 Cam Grid",
              icon: "icon-16",
              href: "16",
            },
          }
        });
      }
    ])
    // AJAX API Calls
    .run(['$rootScope', '$http', '$translate', '$route', function($rootScope, $http,
      $translate, $route) {

      $rootScope.reload = function() {
        $rootScope.dateCache = false
        $route.reload()
      }

      // Detect Language
      $rootScope.detectLanguage = function() {
        var url = '/api/detectLanguage';
        $http.get(url).success(function(data) {
          //console.log('language detected = ' + data)
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
          //console.log("View Updated"); // Getting Success Response in Callback
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
        jdata = 'data=' + encodeURIComponent(JSON.stringify(jdata))
        $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
          method: 'POST',
          url: '/api/updateCameras',
          data: jdata,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }).
        success(function(response) {
          //console.log("Cameras Updated"); // Getting Success Response in Callback
        }).
        error(function(response) {
          console.log("Camera Update Failed"); // Getting Error Response in Callback
          //$scope.codeStatus = response || "Request failed";
          //console.log($scope.codeStatus);
        });
      };
    }])
})();
