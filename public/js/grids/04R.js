angular.module('app')

// Begin View Template
.controller('cams4r', ['$scope', '$http', '$rootScope', function($scope, $http,
	$rootScope) {
	// Define Default Grid Layout Here
	var defaultView = [{
		sizeX: 4,
		sizeY: 2,
		row: 0,
		col: 0,
		id: 1
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 3,
		col: 0,
		id: 2
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 3,
		col: 1,
		id: 3
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 3,
		col: 2,
		id: 4
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

	$scope.$on('viewBroadcast', function(event, args) {
		$scope.viewItems = args
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
