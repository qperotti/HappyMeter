// Factory used to get the json data for the Line chart

app.factory('chartdata', ['$http', function ($http) {
  return{

    
  	getData: function (word, state, type_chart,num,color) {
  		
  		return $http.get(encodeURIComponent('api/'+word+'/'+state+'/'+num+'/'+type_chart)).success(function(data) { 
            
            data.series['color'] = color;
            console.log(data);
            return data; 
        }).error(function(err) { 
            return err; 
        }); 

  	}
  }

}]);

