'use strict';

var app = angular.module('hoc', [
	'ngRoute',
	'ui.bootstrap',
	'hoc.controllers'
]);
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {templateUrl: 'template/login.html', controller: 'loginController'});
	$routeProvider.when('/login', {templateUrl: 'template/login.html', controller: 'loginController'});
	$routeProvider.when('/dashboard', {templateUrl: 'template/dashboard.html', controller: 'dashboardController'});
  //tax pages route
	$routeProvider.when('/tax/:id?', {templateUrl: 'template/tax.html', controller: 'taxController'});
	$routeProvider.when('/taxlist', {templateUrl: 'template/taxlist.html', controller: 'taxController'});
	$routeProvider.when('/viewtax', {templateUrl: 'template/viewtax.html', controller: 'taxController'});
  //summary route
	$routeProvider.when('/summary', {templateUrl: 'template/summary.html', controller: 'summaryController'});
 //party pages route
	$routeProvider.when('/party/:id?', {templateUrl: 'template/party.html', controller: 'partyController'});
	$routeProvider.when('/partylist', {templateUrl: 'template/partylist.html', controller: 'partyController'});
	$routeProvider.when('/viewparty', {templateUrl: 'template/viewparty.html', controller: 'partyController'});
 //invoice pages route
	$routeProvider.when('/invoice/:id?', {templateUrl: 'template/invoice.html', controller: 'invoiceController'});
	$routeProvider.when('/invoicelist', {templateUrl: 'template/invoicelist.html', controller: 'invoiceController'});
	$routeProvider.when('/viewinvoice', {templateUrl: 'template/viewinvoice.html', controller: 'invoiceController'});
 //measurement pages route
	$routeProvider.when('/measurement/:id?', {templateUrl: 'template/measurement.html', controller: 'measurementController'});
	$routeProvider.when('/measurementlist', {templateUrl: 'template/measurementlist.html', controller: 'measurementController'});
	$routeProvider.when('/viewmeasurement', {templateUrl: 'template/viewmeasurement.html', controller: 'measurementController'});
 //item pages route
	$routeProvider.when('/item/:id?', {templateUrl: 'template/item.html', controller: 'itemController'});
	$routeProvider.when('/itemlist', {templateUrl: 'template/itemlist.html', controller: 'itemController'});
	$routeProvider.when('/viewitem', {templateUrl: 'template/viewitem.html', controller: 'itemController'});
 //quotation pages route
	$routeProvider.when('/quotation/:id?', {templateUrl: 'template/quotation.html', controller: 'quotationController'});
	$routeProvider.when('/quotationlist', {templateUrl: 'template/quotationlist.html', controller: 'quotationController'});
	$routeProvider.when('/viewquotation', {templateUrl: 'template/viewquotation.html', controller: 'quotationController'});
//department pages route
	$routeProvider.when('/department/:id?', {templateUrl: 'template/department.html', controller: 'departmentController'});
	$routeProvider.when('/departmentlist', {templateUrl: 'template/departmentlist.html', controller: 'departmentController'});
	$routeProvider.when('/viewdepartment', {templateUrl: 'template/viewdepartment.html', controller: 'departmentController'});
	
  $routeProvider.otherwise({redirectTo: '/'});
}]);

