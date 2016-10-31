

app.controller('SearchStateController', ['$scope', '$log', '$location', function($scope, $log, $location){



    var self = this;

    // list of `state` value/display objects
    self.states = [
        {"display": "Overall", "value": "overall", "abbr": "overall"},
        {"display": "Alabama", "value": "alabama", "abbr": "AL"},
        {"display": "Arizona", "value": "arizona", "abbr": "AZ"},
        {"display": "Arkansas", "value": "arkansas", "abbr": "AR"},
        {"display": "California", "value": "california", "abbr": "CA"},
        {"display": "Colorado", "value": "colorado", "abbr": "CO"},
        {"display": "Connecticut", "value": "connecticut", "abbr": "CT"},
        {"display": "Delaware", "value": "delaware", "abbr": "DE"},
        {"display": "D. Of Columbia", "value": "district of columbia", "abbr": "DC"},
        {"display": "Florida", "value": "florida", "abbr": "FL"},
        {"display": "Georgia", "value": "georgia", "abbr": "GA"},
        {"display": "Idaho", "value": "idaho", "abbr": "ID"},
        {"display": "Illinois", "value": "illinois", "abbr": "IL"},
        {"display": "Indiana", "value": "indiana", "abbr": "IN"},
        {"display": "Iowa", "value": "iowa", "abbr": "IA"},
        {"display": "Kansas", "value": "kansas", "abbr": "KS"},
        {"display": "Kentucky", "value": "kentucky", "abbr": "KY"},
        {"display": "Louisiana", "value": "louisiana", "abbr": "LA"},
        {"display": "Maine", "value": "maine", "abbr": "ME"},
        {"display": "Maryland", "value": "maryland", "abbr": "MD"},
        {"display": "Massachusetts", "value": "massachusetts", "abbr": "MA"},
        {"display": "Michigan", "value": "michigan", "abbr": "MI"},
        {"display": "Minnesota", "value": "minnesota", "abbr": "MN"},
        {"display": "Mississippi", "value": "mississippi", "abbr": "MS"},
        {"display": "Missouri", "value": "missouri", "abbr": "MO"},
        {"display": "Montana", "value": "montana", "abbr": "MT"},
        {"display": "Nebraska", "value": "nebraska", "abbr": "NE"},
        {"display": "Nevada", "value": "nevada", "abbr": "NV"},
        {"display": "New Hampshire", "value": "new hampshire", "abbr": "NH"},
        {"display": "New Jersey", "value": "new jersey", "abbr": "NJ"},
        {"display": "New Mexico", "value": "new mexico", "abbr": "NM"},
        {"display": "New York", "value": "new york", "abbr": "NY"},
        {"display": "North Carolina", "value": "north carolina", "abbr": "NC"},
        {"display": "North Dakota", "value": "north dakota", "abbr": "ND"},
        {"display": "Ohio", "value": "ohio", "abbr": "OH"},
        {"display": "Oklahoma", "value": "oklahoma", "abbr": "OK"},
        {"display": "Oregon", "value": "oregon", "abbr": "OR"},
        {"display": "Pennsylvania", "value": "pennsylvania", "abbr": "PA"},
        {"display": "Rhode Island", "value": "rhode island", "abbr": "RI"},
        {"display": "South Carolina", "value": "south carolina", "abbr": "SC"},
        {"display": "South Dakota", "value": "south dakota", "abbr": "SD"},
        {"display": "Tennessee", "value": "tennessee", "abbr": "TN"},
        {"display": "Texas", "value": "texas", "abbr": "TX"},
        {"display": "Utah", "value": "utah", "abbr": "UT"},
        {"display": "Vermont", "value": "vermont", "abbr": "VT"},
        {"display": "Virginia", "value": "virginia", "abbr": "VA"},
        {"display": "Washington", "value": "washington", "abbr": "WA"},
        {"display": "West Virginia", "value": "west virginia", "abbr": "WV"},
        {"display": "Wisconsin", "value": "wisconsin", "abbr": "WI"},
        {"display": "Wyoming", "value": "wyoming", "abbr": "WY"}
    ];

    self.querySearch   = querySearch;
    this.submitForm = submitForm;


    // ******************************
    // Internal methods
    // ******************************

    function submitForm(selectedWord) {
        $scope.selectedState = selectedWord.abbr;
    };


    // Search for states
    function querySearch (query) {
        var results = query ? self.states.filter( createFilterFor(query) ) : self.states, deferred;
        return results;
    }

    // Create filter function for a query string

    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(states) {
            return (states.value.indexOf(lowercaseQuery) === 0);
        };

    }

  }]);




