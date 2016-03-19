angular.module('app')

// Begin View Template
.controller('cams1', ['$scope', '$http', '$rootScope', function($scope, $http,
	$rootScope) {
	// Define Default Grid Layout Here
	var defaultView = [{
		sizeX: 4,
		sizeY: 4,
		row: 0,
		col: 0,
		id: 1
	}];

	// Options for Grid
	$scope.gridsterOpts = {
		margins: [5, 5],
		columns: 4,
		colWidth: 250,
		rowHeight: 141,
		isMobile: false,
		mobileModeEnabled: false,
		maxRows: 4,
		outerMargin: false,
		pushing: false,
		floating: true,
		swapping: true,
		draggable: {
			enabled: false
		},
		resizable: {
			enabled: false,
		}
	};

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

	// String to append to preview images so they can be reloaded
	if ($rootScope.dateCache) $scope.dateCache = $rootScope.dateCache
	else {
		$scope.dateCache = '?' + new Date().getTime();
		$rootScope.dateCache = $scope.dateCache
	}

	// Load Cameras from Database
	$rootScope.getCameras();
	$scope.$on('gotCameras', function(event, args) {
		$scope.cameras = args
	})

	// Load Views from Database
	$scope.viewItems = defaultView;
	$scope.viewItems.id = 1;

	// Change Cameras in FullScreen Buttons
	$scope.changeCamera = function(camera) {
		$scope.viewItems.id = camera + 1
		console.log(camera)
		var image = $scope.cameras[camera].jpeg
		var ar = $scope.cameras[camera].ar
		if (image) {
			$scope.camStyle = "{ 'background-image': 'url('" + image + "')',  'background-size': " +
				$scope.getBackgroundSize(ar) + " }";
		}
	}

	// Watch for Changes and Update View
	$scope.$watch('viewItems', function(items) {
		var jdata = 'view=' + $scope.page[0] + '&data=' + JSON.stringify(
			items);
		$rootScope.updateView(jdata)
	}, true)

}]);
