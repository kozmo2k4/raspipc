angular.module('app')


.controller('CameraCtl', ['$scope', '$http', '$rootScope',
	function($scope, $http, $rootScope) {
		$scope.gridsterOptions = {
			margins: [20, 20],
			columns: 1,
			pushing: true,
			floating: false,
			swapping: true,
			rowHeight: 90,
			defaultSizeX: 1,
			defaultSizeY: 1,
			resizable: {
				enabled: false
			},
			draggable: {
				enabled: true
			}
		};

		// Load Cameras from Database
		$rootScope.getCameras();
		$scope.$on('gotCameras', function(event, args) {
			$scope.cameras = args
			console.log(args)
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
					jpeg: "http://username:password@host/image.cgi",
					row: $scope.gridsterOptions.maxRows - 1
				});
			}
		};
	}
])

.controller('CustomWidgetCtrl', ['$scope', '$modal', '$http',
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
				$scope.codeStatus = response.data;
				$scope.gridsterOptions.maxRows = $scope.gridsterOptions.maxRows - 1
			}).
			error(function(response) {
				console.log("error"); // Getting Error Response in Callback
				$scope.codeStatus = response || "Request failed";
				console.log($scope.codeStatus);
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
	'$modalInstance', 'widget', '$http',
	function($scope, $timeout, $rootScope, $modalInstance, widget, $http) {
		$scope.widget = widget;

		$scope.form = {
			name: widget.name,
			host: widget.host,
			user: widget.user,
			pass: widget.pass,
			feed: widget.feed,
			jpeg: widget.jpeg,
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
				$scope.codeStatus = response.data;
				$scope.gridsterOptions.maxRows = $scope.gridsterOptions.maxRows - 1
			}).
			error(function(response) {
				console.log("error"); // Getting Error Response in Callback
				$scope.codeStatus = response || "Request failed";
				console.log($scope.codeStatus);
			});
			$scope.cameras.splice($scope.cameras.indexOf(widget),
				1);
			$modalInstance.close();
		};

		// Save Camera Settings
		$scope.submit = function() {
			angular.extend(widget, $scope.form);
			var formData = {
				name: widget.name,
				host: widget.host,
				user: widget.user,
				pass: widget.pass,
				feed: widget.feed,
				jpeg: widget.jpeg,
				ar: widget.ar,
				row: widget.row,
				col: widget.col,
				id: widget._id,
			}
			console.log(widget.row)
			var jdata = 'data=' + JSON.stringify(formData);

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
				$scope.codeStatus = response.data;
			}).
			error(function(response) {
				console.log("error"); // Getting Error Response in Callback
				$scope.codeStatus = response || "Request failed";
				console.log($scope.codeStatus);
			});
			$modalInstance.close(widget);
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
