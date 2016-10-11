
app.controller('DisplayController', ['$scope', 'chartdata', 'datamap', '$routeParams', '$location', '$http', '$log', function($scope, chartdata, datamap, $routeParams, $location, $http, $log ) {

    $scope.word = $routeParams.word;
    $scope.num = 30;


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
    $scope.datamap.options.staticGeoData = true;
    datamap.getData($scope.word).success(function(data) {
        $scope.datamap.data=data;
    });


    
    // DATA OF THE SCORE CHART
    $scope.scoreChart= {
        title: {
            text: 'Score Chart',
        },
        subtitle: {
            text: 'Overall score of the word',
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
        series: [],
        xAxis: {}
    };
    $scope.scoreChartData = {};
    $scope.scoreChartxAxis = {};
    chartdata.getData($scope.word, "overall", "scorechart",3,'#008cba').success(function(data) {
        $scope.scoreChartxAxis['xAxis'] = data.xAxis;
        $scope.scoreChartData['overall'] = data.series;
        $scope.scoreChart.xAxis = {categories: data.xAxis.categories.slice(data.xAxis.categories.length-30,data.xAxis.categories.length)};
        $scope.scoreChart.series.push({name: data.series.name, data: data.series.data.slice(data.series.data.length-30,data.series.data.length), color: data.series.color});
        console.log($scope.scoreChartData['overall']);
    });


    // DATA OF THE RECURRENCE CHART
    $scope.recurrenceChart= {
        title: {
            text: 'Recurrence Chart',
        },
        subtitle: {
            text: 'Number of times the word is tweeted',
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
        },
        series: [],
        xAxis: {}
    };
    $scope.recurrenceChartData = {};
    $scope.recurrenceChartxAxis = {};
    chartdata.getData($scope.word, "overall", "recurrencechart", 3,'#008cba').success(function(data) {
        $scope.recurrenceChartxAxis['xAxis'] = data.xAxis;
        $scope.recurrenceChartData['overall'] = data.series;
        $scope.recurrenceChart.xAxis = {categories: data.xAxis.categories.slice(data.xAxis.categories.length-30,data.xAxis.categories.length)};
        $scope.recurrenceChart.series.push({name: data.series.name, data: data.series.data.slice(data.series.data.length-30,data.series.data.length), color: data.series.color});
    });


    // UPDATE STATES CHART
    $scope.total = 0;
    $scope.chartColors = [ //Stack of colors
        '#2ecc71',
        '#f1c40f',
        '#16a085',
        '#e74c3c',
        '#8e44ad',
        ]

    $scope.updatePag = function(numButton){
        $scope.num = parseInt(numButton);

        // Indexs
        var start = ($scope.scoreChartxAxis['xAxis'].categories.length - $scope.num) >= 0 ? ($scope.scoreChartxAxis['xAxis'].categories.length - $scope.num) : 0;
        var end = $scope.scoreChartxAxis['xAxis'].categories.length;

        console.log($scope.scoreChartxAxis['xAxis'].categories.slice(start,end));

        // Change xAxis
        $scope.scoreChart.xAxis = {categories: $scope.scoreChartxAxis['xAxis'].categories.slice(start,end)}; 
        $scope.recurrenceChart.xAxis = {categories: $scope.recurrenceChartxAxis['xAxis'].categories.slice(start,end)}; 


        $scope.scoreChart.series = [];
        for( e in $scope.scoreChartData){
            $scope.scoreChart.series.push({ name: $scope.scoreChartData[e].name, 
                                            data: $scope.scoreChartData[e].data.slice(start,end), 
                                            color: $scope.scoreChartData[e].color});
        }

        $scope.recurrenceChart.series = [];
        for( e in $scope.recurrenceChartData){
            $scope.recurrenceChart.series.push({ name: $scope.recurrenceChartData[e].name, 
                                                 data: $scope.recurrenceChartData[e].data.slice(start,end), 
                                                 color: $scope.recurrenceChartData[e].color});
        }
        
       
    }

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
                $scope.chartColors.push($scope.scoreChart.series[$scope.auxindex].color)
                $scope.scoreChart.series.splice($scope.auxindex,1)
                delete $scope.scoreChartData[abbr];

                //Update recurrence chart
                $scope.auxindex = getIndexOf($scope.recurrenceChart.series,abbr,'name')
                $scope.recurrenceChart.series.splice($scope.auxindex,1)
                delete $scope.recurrenceChartData[abbr];
            }
        }
        else {
            if($scope.total<5){ 
                $scope.total++;

                var start = ($scope.scoreChartxAxis['xAxis'].categories.length - $scope.num) >= 0 ? ($scope.scoreChartxAxis['xAxis'].categories.length - $scope.num) : 0;
                var end = $scope.scoreChartxAxis['xAxis'].categories.length

                //Update score chart
                chartdata.getData($scope.word, abbr, "scorechart",3,$scope.chartColors[0]).success(function(data) {
                    $scope.scoreChartData[abbr] = data.series;
                    $scope.scoreChart.series.push({ name: data.series.name, 
                                                    data: data.series.data.slice(start,end), color: data.series.color});
                });

                //Update recurrence chart
                chartdata.getData($scope.word, abbr, "recurrencechart", 3,$scope.chartColors[0]).success(function(data) {
                    $scope.recurrenceChartData[abbr] = data.series;
                    $scope.recurrenceChart.series.push({name: data.series.name, 
                                                        data: data.series.data.slice(start,end), 
                                                        color: data.series.color});
                });
                $scope.chartColors.splice(0, 1);
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
        { name: 'D.C', abbr: 'DC'},
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



