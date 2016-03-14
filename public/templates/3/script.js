angular.module('app')

.directive('integer', function() {
	return {
		require: 'ngModel',
		link: function(scope, ele, attr, ctrl) {
			ctrl.$parsers.unshift(function(viewValue) {
				if (viewValue === '' || viewValue === null || typeof viewValue ===
					'undefined') {
					return null;
				}
				return parseInt(viewValue, 10);
			});
		}
	};
})

.controller('3Cams', ['$scope', '$http', function($scope, $http) {
	// Define Default Grid
	var standardItems = [{
		sizeX: 4,
		sizeY: 2,
		row: 0,
		col: 0,
		id: 1
	}, {
		sizeX: 2,
		sizeY: 2,
		row: 2,
		col: 0,
		id: 2
	}, {
		sizeX: 2,
		sizeY: 2,
		row: 2,
		col: 2,
		id: 3
	}];

	// Options for Grid
	$scope.gridsterOpts = {
		margins: [5, 5],
		columns: 4,
		colWidth: 250,
		rowHeight: 141,
		isMobile: false,
		maxRows: 4,
		outerMargin: false,
		pushing: false,
		floating: true,
		swapping: true,
		draggable: {
			enabled: true
		},
		resizable: {
			enabled: false,
			handles: ['n', 'e', 's', 'w', 'se', 'sw']
		}
	};

	$http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
		method: 'POST',
		url: '/api/getViews',
		data: 'view=' + $scope.page[0],
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
	}).
	success(function(response) {
		if (response[0]) {
			console.log("Views restored from database");
			$scope.standardItems = JSON.parse(response[0].data);
			//console.log(response[0].data)
		} else {
			console.log("Using defaults for view");
			$scope.standardItems = standardItems;
		}
		// Watch for changes and update database
		$scope.$watch('standardItems', function(items) {
			var jdata = 'view=' + $scope.page[0] + '&data=' + JSON.stringify(
				items);

			$http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
				method: 'POST',
				url: '/api/updateView',
				data: jdata,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
			}).
			success(function(response) {
				//console.log("success"); // Getting Success Response in Callback
				$scope.codeStatus = response.data;
				//console.log($scope.codeStatus);
			}).
			error(function(response) {
				console.log("error"); // Getting Error Response in Callback
				$scope.codeStatus = response || "Request failed";
				console.log($scope.codeStatus);
			});
		}, true);

	}).
	error(function(response) {
		console.log(response); // Getting Error Response in Callback
	});

}]);
