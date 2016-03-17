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
			// Get Suported HW Decoders
		$scope.getCodecSupport = function() {
			var url = '/api/getCodecSupport';
			$http.get(url).success(function(data) {
				console.log(data)
				$scope.codecSupport = data;
			});
		}
		$scope.getCpuInfo();
		$scope.getCodecSupport();
	}
])
