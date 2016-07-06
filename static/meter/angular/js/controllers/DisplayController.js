
app.controller('DisplayController', ['$scope', 'chartdata', 'datamap', '$routeParams', '$http', '$log', function($scope, chartdata, datamap, $routeParams, $http, $log ) {

    $scope.word = $routeParams.word;

    // DATA OF THE MAP CHART

    $scope.datamap = {
        scope: 'usa',
        options: {
        width: 1000,
        legendHeight: 60 // optionally set the padding for the legend
        },
        geographyConfig: {
        highlightBorderColor: '#000000',
        popupTemplate: function(geography, data) {
            return '<div class="hoverinfo">' + geography.properties.name + ' <br />' +  data.fillKey + ' ';
        },
        highlightBorderWidth: 3
        },

        fills: {
        'positive': '#31cc47',
        'negative': '#CC4731',
        'neutral': '#FFFF32',
        'defaultFill': '#C0C0C0'
        },
        "legend": true,
        data: {}
    }

    datamap.getData($scope.word).success(function(data) {
        $scope.datamap.data=data;
        console.log($scope.datamap)
    });



    // DATA OF THE SCORE CHART

    $scope.scoreChart= {
        subtitle: {
            text: 'The score of the word each day',
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
    };

    
    chartdata.getData($scope.word, "overall", "scorechart").success(function(data) {
        angular.extend($scope.scoreChart, data)
    });

    // DATA OF THE RECURRENCE CHART

    $scope.recurrenceChart= {
        subtitle: {
            text: 'The number of time the word is tweeted',
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
        }
    };

    chartdata.getData($scope.word, "overall", "recurrencechart").success(function(data) {
        angular.extend($scope.recurrenceChart, data)
    });


    // UPDATE STATES CHART

    $scope.total = 0;

    $scope.colorsScore = [ //Stack of colors
        'blue',
        'green',
        'yellow',
        'red',
        'purple',
        ]

    $scope.colorsRecurrence = [ //Stack of colors
        'blue',
        'green',
        'yellow',
        'red',
        'purple',
        ]

    $scope.checkNUM = function(tt) {
        if($scope.total === 5){
            if(tt===true) return !tt;
            else return tt;
        }
        return !tt;
    }


    $scope.updateChart = function(toggled,abbr){

        if (toggled === false){
            if($scope.total >0){

                //Update score chart
                $scope.total--;
                $scope.auxindex = getIndexOf($scope.scoreChart.series,abbr,'name')
                $scope.colorsScore.push($scope.scoreChart.series[$scope.auxindex].color)
                $scope.scoreChart.series.splice($scope.auxindex,1)

                //Update recurrence chart
                $scope.auxindex = getIndexOf($scope.recurrenceChart.series,abbr,'name')
                $scope.colorsRecurrence.push($scope.recurrenceChart.series[$scope.auxindex].color)
                $scope.recurrenceChart.series.splice($scope.auxindex,1)
            }
        }
        else {
            if($scope.total<5){ 
                $scope.total++;

                //Update score chart
                chartdata.getData($scope.word, abbr, "scorechart").success(function(data) {
                    $scope.aux = data.series;
                    $scope.aux['color'] = $scope.colorsScore[0];
                    $scope.colorsScore.splice(0, 1);
                    $scope.scoreChart.series.push( $scope.aux);
                });

                //Update recurrence chart
                chartdata.getData($scope.word, abbr, "recurrencechart").success(function(data) {
                    $scope.aux = data.series;
                    $scope.aux['color'] = $scope.colorsRecurrence[0];
                    $scope.colorsRecurrence.splice(0, 1);
                    $scope.recurrenceChart.series.push( $scope.aux);
                });
            }
        }
    };



    // Auxiliar function to get the index of a specific object
    function getIndexOf(arr, val, prop) {
        var l = arr.length,
        k = 0;
        for (k = 0; k < l; k = k + 1) {
            if (arr[k][prop] === val) return k;
        }
        return false;
    }

   


    // LIST OF US STATES

    $scope.usStates = [
        { name: 'ALABAMA', abbr: 'AL'},
        { name: 'ARIZONA', abbr: 'AZ'},
        { name: 'ARKANSAS', abbr: 'AR'},
        { name: 'CALIFORNIA', abbr: 'CA'},
        { name: 'COLORADO', abbr: 'CO'},
        { name: 'CONNECTICUT', abbr: 'CT'},
        { name: 'DELAWARE', abbr: 'DE'},
        { name: 'DISTRICT OF COLUMBIA', abbr: 'DC'},
        { name: 'FLORIDA', abbr: 'FL'},
        { name: 'GEORGIA', abbr: 'GA'},
        { name: 'IDAHO', abbr: 'ID'},
        { name: 'ILLINOIS', abbr: 'IL'},
        { name: 'INDIANA', abbr: 'IN'},
        { name: 'IOWA', abbr: 'IA'},
        { name: 'KANSAS', abbr: 'KS'},
        { name: 'KENTUCKY', abbr: 'KY'},
        { name: 'LOUISIANA', abbr: 'LA'},
        { name: 'MAINE', abbr: 'ME'},
        { name: 'MARYLAND', abbr: 'MD'},
        { name: 'MASSACHUSETTS', abbr: 'MA'},
        { name: 'MICHIGAN', abbr: 'MI'},
        { name: 'MINNESOTA', abbr: 'MN'},
        { name: 'MISSISSIPPI', abbr: 'MS'},
        { name: 'MISSOURI', abbr: 'MO'},
        { name: 'MONTANA', abbr: 'MT'},
        { name: 'NEBRASKA', abbr: 'NE'},
        { name: 'NEVADA', abbr: 'NV'},
        { name: 'NEW HAMPSHIRE', abbr: 'NH'},
        { name: 'NEW JERSEY', abbr: 'NJ'},
        { name: 'NEW MEXICO', abbr: 'NM'},
        { name: 'NEW YORK', abbr: 'NY'},
        { name: 'NORTH CAROLINA', abbr: 'NC'},
        { name: 'NORTH DAKOTA', abbr: 'ND'},
        { name: 'OHIO', abbr: 'OH'},
        { name: 'OKLAHOMA', abbr: 'OK'},
        { name: 'OREGON', abbr: 'OR'},
        { name: 'PENNSYLVANIA', abbr: 'PA'},
        { name: 'RHODE ISLAND', abbr: 'RI'},
        { name: 'SOUTH CAROLINA', abbr: 'SC'},
        { name: 'SOUTH DAKOTA', abbr: 'SD'},
        { name: 'TENNESSEE', abbr: 'TN'},
        { name: 'TEXAS', abbr: 'TX'},
        { name: 'UTAH', abbr: 'UT'},
        { name: 'VERMONT', abbr: 'VT'},
        { name: 'VIRGINIA', abbr: 'VA'},
        { name: 'WASHINGTON', abbr: 'WA'},
        { name: 'WEST VIRGINIA', abbr: 'WV'},
        { name: 'WISCONSIN', abbr: 'WI'},
        { name: 'WYOMING', abbr: 'WY' }
];






}]);






