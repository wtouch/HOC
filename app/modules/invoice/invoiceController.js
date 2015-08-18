'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService','modalService'];
  // This is controller for this view
	var invoiceController = function ($modal,$scope, $injector,$routeParams,$rootScope,dataService,modalService) {
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
		var curDate = new Date();
		var month = curDate.getMonth() + 1;
		month = (month <= 9) ? '0' + month : month;
		$scope.currentDate = curDate.getFullYear() + "-" + month + "-" + curDate.getDate();
		
		//code to date picker
		$scope.open = function($event,opened){
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened = ($scope.opened==true)?false:true;
		};
		$scope.open1 = function($event,opened){
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened1 = ($scope.opened1==true)?false:true;
		};
		$scope.postData =function(invoice){
			console.log(invoice);
		}
		
		//code to open modal
		$scope.ok = function () {
			$modalOptions.close('ok');
		};
		$scope.openModel = function () {
			var modalDefaults = {
				templateUrl: 'modules/invoice/invoice.html',	
				size : 'lg'
			};
			var modalOptions = {
				postData : function(invoice){
					console.log(invoice);
				} 
			};
			modalService.showModal(modalDefaults,modalOptions).then(function (result) {
			});
		};
	};	
	// Inject controller's dependencies
	invoiceController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('invoiceController', invoiceController);
});