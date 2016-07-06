
// Directive fot the autocomplete search

app.directive('search',function($log){ 
		return{
			restrict: 'E',
			templateUrl: '/static/meter/angular/js/directives/search.html',
			controller: 'SearchController as ctrl'
		}
});
