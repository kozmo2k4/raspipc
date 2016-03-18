angular.module('app')

// Begin View Template
.controller('1Cam', ['$scope', '$http', '$rootScope', function($scope, $http,
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

	// Load Cameras from Database
	$rootScope.getCameras();
	$scope.$on('gotCameras', function(event, args) {
		$scope.cameras = args
	})

	// Load Views from Database
	$scope.viewItems = defaultView;
	$scope.viewItems.id = 1;

	$scope.changeCamera = function(camera) {
		$scope.viewItems.id = camera
		$scope.camStyle = "{ 'background-image': 'url('" + $scope.cameras[camera]
			.jpeg + "')',  'background-size': " + getBackgroundSize($scope.cameras[
				camera].ar) + " }"
	}


	// Watch for Changes and Update View
	$scope.$watch('viewItems', function(items) {
		var jdata = 'view=' + $scope.page[0] + '&data=' + JSON.stringify(
			items);
		$rootScope.updateView(jdata)
	}, true)

}]);
