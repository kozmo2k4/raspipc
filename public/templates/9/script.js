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

.controller('9Cams', function($scope) {

	$scope.gridsterOpts = {
		margins: [5, 5],
		columns: 3,
		colWidth: 332.5,
		rowHeight: 187.53,
		isMobile: false,
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
		row: 1,
		col: 0,
		name: 'Camera 4'

	}, {
		sizeX: 1,
		sizeY: 1,
		row: 1,
		col: 1,
		name: 'Camera 5'
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 1,
		col: 2,
		name: 'Camera 6'
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 2,
		col: 0,
		name: 'Camera 7'
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 2,
		col: 1,
		name: 'Camera 8'
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 2,
		col: 2,
		name: 'Camera 9'
	}];

	// map the gridsterItem to the custom item structure
	$scope.customItemMap = {
		sizeX: 'item.size.x',
		sizeY: 'item.size.y',
		row: 'item.position[0]',
		col: 'item.position[1]'
	};

});
