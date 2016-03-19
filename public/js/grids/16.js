angular.module('app')

// Begin View Template
.controller('16Cams', ['$scope', '$http', '$rootScope', function($scope, $http,
	$rootScope) {
	// Define Default Grid Layout Here
	var defaultView = [{
		sizeX: 1,
		sizeY: 1,
		row: 0,
		col: 0,
		id: 1
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 0,
		col: 1,
		id: 2
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 0,
		col: 2,
		id: 3

	}, {
		sizeX: 1,
		sizeY: 1,
		row: 0,
		col: 3,
		id: 4

	}, {
		sizeX: 1,
		sizeY: 1,
		row: 1,
		col: 0,
		id: 5
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 1,
		col: 1,
		id: 6
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 1,
		col: 2,
		id: 7
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 1,
		col: 3,
		id: 8
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 2,
		col: 0,
		id: 9
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 2,
		col: 1,
		id: 10
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 2,
		col: 2,
		id: 11
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 2,
		col: 3,
		id: 12
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 3,
		col: 0,
		id: 13
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 3,
		col: 1,
		id: 14
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 3,
		col: 2,
		id: 15
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 3,
		col: 3,
		id: 16
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
		mobileModeEnabled: false,
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

	// String to append to preview images so they can be reloaded
	if ($rootScope.dateCache) $scope.dateCache = $rootScope.dateCache
	else {
		$scope.dateCache = '?' + new Date().getTime();
		$rootScope.dateCache = $scope.dateCache
	}

	// Translate Aspect Ratio Settings into CSS
	$scope.getBackgroundSize = function(ar) {
		if (ar === 'stretch') {
			return '100% 100%'
		} else if (ar === 'letterbox') {
			return 'contain'
		} else {
			return 'cover'
		}
	}

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
