 
// Factory used to get the json data for the map chart


app.factory('datamap', function ($http) {

	return{
		
	  	getData: function (word) {
	  		
	  		return $http.get(encodeURIComponent('api/'+word+'/map')).success(function(data) { 
	            return data; 
	        }).error(function(err) { 
	            return err; 
	        }); 

	  	}
	}
});