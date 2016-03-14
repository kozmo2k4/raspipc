angular.module('app')


.controller('CameraCtl', ['$scope', '$http',
	function($scope, $http) {
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

		$scope.list = function() {
			var url = '/api/getCameras';
			$http.get(url).success(function(data) {
				$scope.cameras = data;
			});
		}
		$scope.list();

		$scope.addWidget = function() {
			$scope.cameras.push({
				name: "New Camera",
			});
		};

	}
])

.controller('CustomWidgetCtrl', ['$scope', '$modal', '$http',
	function($scope, $modal, $http) {

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
				console.log("success"); // Getting Success Response in Callback
				$scope.codeStatus = response.data;
				console.log($scope.codeStatus);
			}).
			error(function(response) {
				console.log("error"); // Getting Error Response in Callback
				$scope.codeStatus = response || "Request failed";
				console.log($scope.codeStatus);
			});
			$scope.cameras.splice($scope.cameras.indexOf(widget),
				1);
		};

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
				console.log("success"); // Getting Success Response in Callback
				$scope.codeStatus = response.data;
				console.log($scope.codeStatus);
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
				id: widget._id,
			}
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
				console.log("success"); // Getting Success Response in Callback
				$scope.codeStatus = response.data;
				console.log($scope.codeStatus);
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
