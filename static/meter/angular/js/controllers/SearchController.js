

app.controller('SearchController', ['$scope', '$log', '$location', 'updatewords', function($scope, $log, $location, updatewords){



    var self = this;

    self.simulateQuery = false;
    self.isDisabled    = false;

    // list of `state` value/display objects
    self.states        = "";
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;

    //
    this.submitForm = submitForm;

    console.log(self.states)

    // ******************************
    // Internal methods
    // ******************************

    function submitForm(selectedWord) {
        console.log(selectedWord.value);
        $location.path(selectedWord.value);
    };




    // Search for states... use $timeout to simulate
    // remote dataservice call.
    
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    // Build `states` list of key/value pairs
	updatewords.getData().success(function(data) {
		console.log(data);
		self.states = data;
	});


    
    // Create filter function for a query string
     
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }






  }]);




