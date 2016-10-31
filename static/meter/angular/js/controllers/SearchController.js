

app.controller('SearchController', ['$scope', '$log', '$location', '$http', '$q',function($scope, $log, $location, $http, $q){




    var self = this;

    self.simulateQuery = false;
    self.isDisabled    = false;

    // list of `state` value/display objects
    self.words        = "";
    self.querySearch   = querySearch;
    this.submitForm = submitForm;


    // ******************************
    // Internal methods
    // ******************************

    function submitForm(selectedWord) {
        $location.path(selectedWord.value + "/");
    };


    // Search for words
    function querySearch (query) {

      var deferred = $q.defer();
      $http.get(encodeURIComponent('api/search/' + query)).success(function(data){
        // the promise gets resolved with the data from HTTP
        deferred.resolve(data);
      });
      // return the promise
      return deferred.promise;

    }


    // Create filter function for a query string

    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(state) {
            return (state.value.indexOf(lowercaseQuery) === 0);
        };

    }

  }]);




