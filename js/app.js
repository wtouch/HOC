'use strict';
// Declare app level module which depends on filters, and services
var app = angular.module('patientApp', [
	'ngRoute',
	'ui.bootstrap',
	'patientApp.controllers'
]);
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'template/home.html'});
  $routeProvider.when('/about', {templateUrl: 'template/about.html'});
   $routeProvider.when('/contact', {templateUrl: 'template/contact.html'});
  $routeProvider.when('/doctors', {templateUrl: 'template/doctors.html', controller: 'doctorController'});
  $routeProvider.when('/viewdoctor', {templateUrl: 'template/viewdoctor.html', controller: 'appointmentController'});
  $routeProvider.when('/appointment', {templateUrl: 'template/appointment.html', controller: 'appointmentController'});
  $routeProvider.when('/viewappointment', {templateUrl: 'template/viewappointment.html', controller: 'viewController'});
  $routeProvider.when('/news', {templateUrl: 'template/news.html', controller: 'appointmentController'});
  $routeProvider.when('/services', {templateUrl: 'template/services.html', controller: 'appointmentController'});
  
  $routeProvider.otherwise({redirectTo: '/'});
}]);

