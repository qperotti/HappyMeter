app.directive('chart', function($log) {


	return {
		restrict: 'E',
		scope: {
			data: '='
		},
		link: function link(scope, element, attr) {
			// put D3 code here

			scope.$watch('data', function(data) {
				Highcharts.chart(element[0], scope.data);
				Highcharts.colorCounter = 2;
				Highcharts.symbolCounter = 2;
			}, true);
		}
	}
});


