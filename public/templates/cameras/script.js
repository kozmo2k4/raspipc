angular.module('app')


.controller('CameraCtl', ['$scope', '$http', '$rootScope', '$confirm', '$translate',

	function($scope, $http, $rootScope, $confirm, $translate) {
		$scope.gridsterOptions = {
			margins: [20, 20],
			columns: 1,
			pushing: true,
			floating: false,
			swapping: true,
			rowHeight: 50,
			outerMargin: true,
			defaultSizeX: 1,
			defaultSizeY: 1,
			resizable: {
				enabled: false
			},
			draggable: {
				enabled: true
			}
		};

		// Default Query Button Class
		$scope.queryBtn = 'btn btn-info'
		$scope.onvifStatus = $translate.instant('QUERYCAM')

		// Load Cameras from Database
		$rootScope.getCameras();
		$scope.$on('gotCameras', function(event, args) {
			$scope.cameras = args
				//console.log(args)
			$scope.gridsterOptions.maxRows = $scope.cameras.length
		})

		// Watch for Changes and Update View
		$scope.$watch('cameras', function(items) {
			//console.log(items)
			$rootScope.updateCameras(items)
		}, true)

		$scope.addWidget = function() {
			if ($scope.cameras.length < 20) {
				$scope.gridsterOptions.maxRows = $scope.gridsterOptions.maxRows + 1
				$scope.cameras.push({
					name: "New Camera",
					ar: "fill",
					feed: "rstp://username:password@host:554/path/to/stream",
					jpeg: "/images/camera.png",
					audio: "none",
					row: $scope.gridsterOptions.maxRows - 1
				});
			}
		};
	}
])

.controller('CustomWidgetCtrl', ['$scope', '$uibModal', '$http',

	function($scope, $modal, $http) {

		// Remove Camera
		$scope.remove = function(widget) {
			var formData = {
				id: widget._id,
			}
			var jdata = 'data=' + JSON.stringify(formData);

			$http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
				method: 'POST',
				url: '/api/delCamera',
				data: jdata,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
			}).
			success(function(response) {
				console.log("Camera Deleted"); // Getting Success Response in Callback
				$scope.gridsterOptions.maxRows = $scope.gridsterOptions.maxRows - 1
			}).
			error(function(response) {
				console.log("Camera Delete Failed"); // Getting Error Response in Callback
			});
			$scope.cameras.splice($scope.cameras.indexOf(widget),
				1);
		}

		// Open Settings
		$scope.openSettings = function(widget) {
			$modal.open({
				scope: $scope,
				templateUrl: 'templates/cameras/widget_settings.html',
				controller: 'WidgetSettingsCtrl',
				resolve: {
					widget: function() {
						return widget;
					}
				}
			});
		};

	}
])

.controller('WidgetSettingsCtrl', ['$scope', '$timeout', '$rootScope',
	'$uibModalInstance', 'widget', '$http', '$translate',
	function($scope, $timeout, $rootScope, $modalInstance, widget, $http, $translate) {
		$scope.widget = widget;

		$scope.form = {
			name: widget.name,
			host: widget.host,
			user: widget.user,
			pass: widget.pass,
			feed: widget.feed,
			jpeg: widget.jpeg,
			audio: widget.audio,
			ar: widget.ar,
			row: widget.row,
			col: widget.col,
		};

		$scope.dismiss = function() {
			$modalInstance.dismiss();
		};

		// Delete Camera
		$scope.remove = function() {
			var formData = {
				id: widget._id,
			}
			var jdata = 'data=' + JSON.stringify(formData);

			$http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
				method: 'POST',
				url: '/api/delCamera',
				data: jdata,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
			}).
			success(function(response) {
				console.log("Camera Deleted"); // Getting Success Response in Callback
				$scope.gridsterOptions.maxRows = $scope.gridsterOptions.maxRows - 1
			}).
			error(function(response) {
				console.log("Camera Delete Failed"); // Getting Error Response in Callback
			});
			$scope.cameras.splice($scope.cameras.indexOf(widget),
				1);
			$modalInstance.close();
		};

		// OnVif Query
		$scope.onvifQuery = function() {
			$scope.queryBtn = 'btn btn-warning'
			$scope.onvifStatus = $translate.instant('WORKING')
				//angular.extend(widget, $scope.form);
			$http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
				method: 'POST',
				url: '/api/onvifStreamQuery',
				data: 'host=' + $scope.form.host + '&user=' + $scope.form.user + '&pass=' + $scope.form.pass,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
			}).
			success(function(response) {
				console.log(response); // Getting Success Response in Callback
				if (response !== 'failed') {
					$scope.form.feed = response
					$scope.queryBtn = 'btn btn-success'
					$scope.onvifStatus = $translate.instant('SUCCESS')
				} else {
					$scope.queryBtn = 'btn btn-danger'
					$scope.onvifStatus = $translate.instant('FAILED')
				}
				//$scope.codeStatus = response.data;
			}).
			error(function(response) {
				console.log(response); // Getting Error Response in Callback
				$scope.queryBtn = 'btn btn-danger'
				$scope.onvifStatus = $translate.instant('FAILED')
					//$scope.codeStatus = response || "Request failed";
					//console.log($scope.codeStatus);
			});
			// Onvif Snapshot URL
			$http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
				method: 'POST',
				url: '/api/onvifSnapshotQuery',
				data: 'host=' + $scope.form.host + '&user=' + $scope.form.user + '&pass=' + $scope.form.pass,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
			}).
			success(function(response) {
				console.log(response); // Getting Success Response in Callback
				if (response !== '/images/camera.png') || ($scope.form.jpeg === '') $scope.form.jpeg = response
			}).
			error(function(response) {
				console.log(response); // Getting Error Response in Callback
				//$scope.codeStatus = response || "Request failed";
				//console.log($scope.codeStatus);
			});
		}

		// Save Camera Settings
		$scope.submit = function() {
			angular.extend(widget, $scope.form);
			var formData = {
				name: widget.name,
				feed: widget.feed,
				jpeg: widget.jpeg,
				audio: widget.audio,
				ar: widget.ar,
				row: widget.row,
				col: widget.col,
				id: widget._id,
			}
			var jdata = 'data=' + encodeURIComponent(JSON.stringify(formData));
			console.log(jdata)
			$http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
				method: 'POST',
				url: '/api/addCamera',
				data: jdata,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
			}).
			success(function(response) {
				console.log("Camera Saved"); // Getting Success Response in Callback
				$modalInstance.close(widget);
			}).
			error(function(response) {
				console.log("Camera Not Saved!");
				console.log(response)
			});
		};
	}
])

// helper code
.filter('object2Array', function() {
	return function(input) {
		var out = [];
		for (i in input) {
			out.push(input[i]);
		}
		return out;
	}
});
