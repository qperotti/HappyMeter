app.directive('rankingState', function($log){


	return{
		restrict: 'E',
		templateUrl: '/static/meter/angular/js/directives/rankingStates.html',
		scope:{
			data: '=',
			usStates: '=',
			rankingData: '@'
		},
		link: function link(scope, element, attr){
		    // put D3 code here
		    

			scope.$watch('data',function(data){
				scope.rankingData = [];
				for(state in data){
					if(state !== 'AA'){
						data[state].name = scope.usStates[state];
						scope.rankingData.push(data[state]);
					}
				}
			},true);			
		}
	}



});



