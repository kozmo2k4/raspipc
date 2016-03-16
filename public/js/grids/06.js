angular.module('app')

// Begin View Template
.controller('6Cams', ['$scope', '$http', '$rootScope', function($scope, $http,
	$rootScope) {
	// Define Default Grid Layout Here
	var defaultView = [{
		sizeX: 2,
		sizeY: 2,
		row: 0,
		col: 0,
		id: 1
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 0,
		col: 2,
		id: 2
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 3,
		col: 0,
		id: 3
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 3,
		col: 1,
		id: 4
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 3,
		col: 2,
		id: 5
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 1,
		col: 2,
		id: 6
	}];

	// Options for Grid
	$scope.gridsterOpts = {
		margins: [5, 5],
		columns: 3,
		colWidth: 332.5,
		rowHeight: 187.53,
		isMobile: false,
		mobileModeEnabled: false,
		maxRows: 3,
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

	// Load Cameras from Database
	$rootScope.getCameras();
	$scope.$on('gotCameras', function(event, args) {
		$scope.cameras = args
	})

	// Load Views from Database
	$scope.viewItems = defaultView;
	$rootScope.getViews($scope.page[0])
	$scope.$on('viewBroadcast', function(event, args) {
			$scope.viewItems = args
		})
		//if ($rootScope.viewItems) $scope.viewItems = $rootScope.viewItems;
		//if (!$scope.viewItems) $scope.viewItems = defaultView;

	// Watch for Changes and Update View
	$scope.$watch('viewItems', function(items) {
		var jdata = 'view=' + $scope.page[0] + '&data=' + JSON.stringify(
			items);
		$rootScope.updateView(jdata)
	}, true)

}]);
