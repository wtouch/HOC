'use strict';

var app = angular.module('hoc', [
	'ngRoute',
	'ui.bootstrap',
	'hoc.controllers'
]);
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {templateUrl: 'modules/login.html', controller: 'loginController'});
	$routeProvider.when('/login', {templateUrl: 'modules/login.html', controller: 'loginController'});
	$routeProvider.when('/dashboard', {templateUrl: 'modules/dashboard.html', controller: 'dashboardController'});
  //tax pages route
	$routeProvider.when('/taxinfo/:id?', {templateUrl: 'modules/taxinfo.html', controller: 'taxinfoController'});
	
  //summary route
	$routeProvider.when('/summary', {templateUrl: 'modules/summary.html', controller: 'summaryController'});
 //party pages route
	$routeProvider.when('/party/:id?', {templateUrl: 'modules/party.html', controller: 'partyController'});
	$routeProvider.when('/partylist', {templateUrl: 'modules/partylist.html', controller: 'partyController'});
	$routeProvider.when('/viewparty', {templateUrl: 'modules/viewparty.html', controller: 'partyController'});
 //invoice pages route
	$routeProvider.when('/invoice/:id?', {templateUrl: 'modules/invoice.html', controller: 'invoiceController'});
	$routeProvider.when('/invoicelist', {templateUrl: 'modules/invoicelist.html', controller: 'invoiceController'});
	$routeProvider.when('/viewinvoice', {templateUrl: 'modules/viewinvoice.html', controller: 'invoiceController'});
 //measurement pages route
	$routeProvider.when('/measurement/:id?', {templateUrl: 'modules/measurement.html', controller: 'measurementController'});
	$routeProvider.when('/measurementlist', {templateUrl: 'modules/measurementlist.html', controller: 'measurementController'});
	$routeProvider.when('/viewmeasurement', {templateUrl: 'modules/viewmeasurement.html', controller: 'measurementController'});
 //item pages route
	$routeProvider.when('/item/:id?', {templateUrl: 'modules/item.html', controller: 'itemController'});
	$routeProvider.when('/itemlist', {templateUrl: 'modules/itemlist.html', controller: 'itemController'});
	$routeProvider.when('/viewitem', {templateUrl: 'modules/viewitem.html', controller: 'itemController'});
 //quotation pages route
	$routeProvider.when('/quotation/:id?', {templateUrl: 'modules/quotation.html', controller: 'quotationController'});
	
	$routeProvider.when('/quotationlist', {templateUrl: 'modules/quotationlist.html', controller: 'quotationController'});
	$routeProvider.when('/viewquotation', {templateUrl: 'modules/viewquotation.html', controller: 'quotationController'});
//department pages route
	$routeProvider.when('/department/:id?', {templateUrl: 'modules/department.html', controller: 'departmentController'});
	$routeProvider.when('/departmentlist', {templateUrl: 'modules/departmentlist.html', controller: 'departmentController'});
	$routeProvider.when('/viewdepartment', {templateUrl: 'modules/viewdepartment.html', controller: 'departmentController'});
	
  $routeProvider.otherwise({redirectTo: '/'});
}]);

