
// Directive fot the autocomplete search

app.directive('searchStates',function($log){ 
		return{
			restrict: 'E',
			templateUrl: '/static/meter/angular/js/directives/searchStates.html',
			controller: 'SearchStateController as ctrl',
			scope:{
				selectedState: '='
			}
		}
});
