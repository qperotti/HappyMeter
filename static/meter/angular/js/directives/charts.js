app.directive('chart', function($log, $window){


	return{
		restrict: 'E',
		scope:{
			data: '=',
			typeChart: '@'
		},
		link: function link(scope, element, attr){
		    // put D3 code here

		    scope.scoreChart= {
		        title: {
		            text: 'Score Chart',
		        },
		        subtitle: {
		            text: 'Score of the selected term',
		        },
		        yAxis: {
		            title: {
		                text: 'Score'
		            },
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: [],
		        xAxis: {}
		    };


		    scope.recurrenceChart= {
		        title: {
		            text: 'Recurrence Chart',
		        },
		        subtitle: {
		            text: 'Recurrences of the selected term',
		        },
		        yAxis: {
		            title: {
		                text: 'Recurrences'
		            },
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: [],
		        xAxis: {}
		    };


			scope.$watch('data',function(data){

				if (scope.typeChart === "score"){
					scope.scoreChart.series = data.series
					scope.scoreChart.xAxis = data.xAxis
					Highcharts.chart(element[0], scope.scoreChart);
				}
				else{
					scope.recurrenceChart.series = data.series
					scope.recurrenceChart.xAxis = data.xAxis
					Highcharts.chart(element[0], scope.recurrenceChart);
				}

			},true);
		}
	}



});



