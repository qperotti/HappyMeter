
//Module 

var app = angular.module('HappyMeter', ['ngRoute', 'datamaps','ngMaterial', 'ngMessages',  ]);

app.config(function ($routeProvider) { 
  $routeProvider 
    .when('/', { 
      controller: 'homeController', 
      templateUrl: '/static/meter/angular/views/home.html' 
    }) 
    .when('/:word/:num', { 
      controller: 'DisplayController', 
      templateUrl: '/static/meter/angular/views/display.html' 
    })
    .otherwise({ 
      redirectTo: '/' 
    }); 
});