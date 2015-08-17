'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService','modalService'];
  // This is controller for this view
	var invoiceController = function ($scope, $injector,$routeParams,$rootScope,dataService,modalService) {
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.CurrentPage = 1;
		$scope.pageItems = 10;
		$scope.numPages = "";
	
	
	console.log("this is invoice controller");
	$scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];
	$scope.today = function() {
		$scope.date = new Date();
	};
	//code to set current date
	$scope.date = new Date();
	var dd = $scope.date.getDate();
	var mm = $scope.date.getMonth();
	var yy = $scope.date.getFullYear();
	$scope.cdate =dd+"/"+mm+"/"+yy;
	
	//code to date picker
	$scope.open = function($event,opened){
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened = ($scope.opened==true)?false:true;
	};
	$scope.open1 = function($event,opened){
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened1 = ($scope.opened==true)?false:true;
	};
	$scope.postData =function(invoice){
		console.log(invoice);
	}
	
	//code to open modal
	$scope.open = function () {
		size = 'lg';
		$modal.open({
			templateUrl: 'modules/viewinvoice.html',
			size: size,
		});
		$scope.ok = function () {
			
			close();
		};
		$scope.cancel = function () {
			$modal.dismiss('cancel');
			console.log("cancel method");
		};
	}
	};	
	// Inject controller's dependencies
	invoiceController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('invoiceController', invoiceController);
});