angular.module('app')


.controller('AboutCtrl', ['$scope', '$http', '$rootScope',
	function($scope, $http, $rootScope) {
		// Get cpuinfo
		$scope.getCpuInfo = function() {
			var url = '/api/getCpuInfo';
			$http.get(url).success(function(data) {
				$scope.cpuInfo = data;
			});
		}
		$scope.getCpuInfo();
	}
])
