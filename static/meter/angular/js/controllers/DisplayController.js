
app.controller('DisplayController', ['$scope', 'chartdata', 'datamap', '$routeParams', '$location', '$http', '$log', function($scope, chartdata, datamap, $routeParams, $location, $http, $log ) {

    $scope.word = $routeParams.word;
    $scope.num = 30;


    // DATA OF THE MAP CHART

    $scope.datamap = {
        scope: 'usa',
        options: {
        legendHeight: 60 // optionally set the padding for the legend
        },
        responsive: true,
        geographyConfig: {
        highlightBorderColor: '#000000',
        popupTemplate: function(geography, data) {
            return '<div class="hoverinfo">' + geography.properties.name + ' <br />' +  'Score: ' + data.score + ' <br />' +   data.fillKey +' ';
        },
        highlightBorderWidth: 3
        },
        fills: {
        'positive': '#2ecc71',
        'negative': '#e74c3c',
        'neutral': '#f1c40f',
        'defaultFill': '#C0C0C0'
        },
        "legend": true,
        data: {}
    }

    $scope.dataRanking = []
    $scope.datamap.options.staticGeoData = true;
    datamap.getData($scope.word).success(function(data) {
        $scope.datamap.data=data;
        $scope.dataRanking=data;
    });

    


    $scope.chartState = "overall";
    
    // DATA OF THE SCORE CHART
    $scope.scoreChart= {};
    $scope.scoreChartData = {};
    $scope.scoreChartxAxis = {};

    chartdata.getData($scope.word, $scope.chartState, "scorechart").success(function(data) {
        $scope.scoreChartxAxis = data.xAxis;
        $scope.scoreChartData = data.series;
        $scope.scoreChart.xAxis = {categories: data.xAxis.categories.slice(data.xAxis.categories.length-30,data.xAxis.categories.length)};
        $scope.scoreChart.series = [{name: data.series.name, data: data.series.data.slice(data.series.data.length-30,data.series.data.length), color: data.series.color}];
    });


    // DATA OF THE RECURRENCE CHART
    $scope.recurrenceChart= {};
    $scope.recurrenceChartData = {};
    $scope.recurrenceChartxAxis = {};
    
    chartdata.getData($scope.word, $scope.chartState, "recurrencechart").success(function(data) {
        $scope.recurrenceChartxAxis = data.xAxis;
        $scope.recurrenceChartData = data.series;
        $scope.recurrenceChart.xAxis = {categories: data.xAxis.categories.slice(data.xAxis.categories.length-30,data.xAxis.categories.length)};
        $scope.recurrenceChart.series = [{name: data.series.name, data: data.series.data.slice(data.series.data.length-30,data.series.data.length), color: data.series.color}];
    });


    // UPDATE STATES CHART


    $scope.$watch('num',function(){

        if (Object.keys($scope.scoreChartData).length !== 0){

            // Indexs
            var start = ($scope.scoreChartxAxis.categories.length - $scope.num) >= 0 ? ($scope.scoreChartxAxis.categories.length - $scope.num) : 0;
            var end = $scope.scoreChartxAxis.categories.length;

            // Change xAxis
            $scope.scoreChart.xAxis = {categories: $scope.scoreChartxAxis.categories.slice(start,end)}; 
            $scope.recurrenceChart.xAxis = {categories: $scope.recurrenceChartxAxis.categories.slice(start,end)}; 

            // Change Data
            $scope.scoreChart.series = [{name: $scope.scoreChartData.name, 
                                        data: $scope.scoreChartData.data.slice(start,end), 
                                        color: $scope.scoreChartData.color}];

        
            $scope.recurrenceChart.series = [{  name: $scope.recurrenceChartData.name, 
                                                data: $scope.recurrenceChartData.data.slice(start,end), 
                                                color: $scope.recurrenceChartData.color}];
        }
        
    });

    $scope.$watch('chartState',function(){

        chartdata.getData($scope.word, $scope.chartState, "scorechart").success(function(data) {
            $scope.scoreChartxAxis = data.xAxis;
            $scope.scoreChartData = data.series;

            var start = ($scope.scoreChartxAxis.categories.length - $scope.num) >= 0 ? ($scope.scoreChartxAxis.categories.length - $scope.num) : 0;
            var end = $scope.scoreChartxAxis.categories.length;

            $scope.scoreChart.xAxis = {categories: data.xAxis.categories.slice(start,end)};
            $scope.scoreChart.series = [{name: data.series.name, data: data.series.data.slice(start,end), color: data.series.color}];
        });

        chartdata.getData($scope.word, $scope.chartState, "recurrencechart").success(function(data) {
            $scope.recurrenceChartxAxis = data.xAxis;
            $scope.recurrenceChartData = data.series;

            var start = ($scope.recurrenceChartxAxis.categories.length - $scope.num) >= 0 ? ($scope.recurrenceChartxAxis.categories.length - $scope.num) : 0;
            var end = $scope.recurrenceChartxAxis.categories.length;

            $scope.recurrenceChart.xAxis = {categories: data.xAxis.categories.slice(start,end)};
            $scope.recurrenceChart.series = [{name: data.series.name, data: data.series.data.slice(start,end), color: data.series.color}];
        });
        
    });




    
    // LIST OF US STATES
    $scope.usStates = {
        "AL": "Alabama",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "DC": "D. Of Columbia",
        "FL": "Florida",
        "GA": "Georgia",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PA": "Pennsylvania",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
    };

}]);



