
// Factory used to get all the available words


app.factory('updatewords', ['$http', function($http) {
  return {
    getData: function(word, state, type_chart) {

      return $http.get('/api/words').success(function(data) {
        return data;
      }).error(function(err) {
        return err;
      });

    }
  }

}]);