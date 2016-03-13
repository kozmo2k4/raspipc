angular.module('app')

.directive('integer', function() {
	return {
		require: 'ngModel',
		link: function(scope, ele, attr, ctrl) {
			ctrl.$parsers.unshift(function(viewValue) {
				if (viewValue === '' || viewValue === null || typeof viewValue === 'undefined') {
					return null;
				}
				return parseInt(viewValue, 10);
			});
		}
	};
})

.controller('MainCtrl', function($scope) {

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

	// these map directly to gridsterItem options
	$scope.standardItems = [{
		sizeX: 1,
		sizeY: 1,
		row: 0,
		col: 0,
		name: 'Camera 1'
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 0,
		col: 1,
		name: 'Camera 2'
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 0,
		col: 2,
		name: 'Camera 3'

	}, {
		sizeX: 1,
		sizeY: 1,
		row: 0,
		col: 3,
		name: 'Camera 4'

	}, {
		sizeX: 1,
		sizeY: 1,
		row: 1,
		col: 0,
		name: 'Camera 5'
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 1,
		col: 1,
		name: 'Camera 6'
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 1,
		col: 2,
		name: 'Camera 7'
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 1,
		col: 3,
		name: 'Camera 8'
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 2,
		col: 0,
		name: 'Camera 9'
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 2,
		col: 1,
		name: 'Camera 10'
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 2,
		col: 2,		
		name: 'Camera 11'
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 2,
		col: 3,
		name: 'Camera 12'
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 3,
		col: 0,
		name: 'Camera 13'
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 3,
		col: 1,
		name: 'Camera 14'
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 3,
		col: 2,
		name: 'Camera 15'
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 3,
		col: 3,
		name: 'Camera 16'
	}];

	// map the gridsterItem to the custom item structure
	$scope.customItemMap = {
		sizeX: 'item.size.x',
		sizeY: 'item.size.y',
		row: 'item.position[0]',
		col: 'item.position[1]'
	};

});
