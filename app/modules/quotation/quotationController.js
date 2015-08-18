'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService','modalService'];
  // This is controller for this view
	var quotationController = function ($scope, $injector,$routeParams,$rootScope,dataService,modalService) {
		$rootScope.metaTitle = "Real Estate Project";
	
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.projectListCurrentPage = 1;
		$scope.pageItems = 10;
		$scope.numPages = "";		
		$scope.alerts = [];
		
		// function to close alert
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		$scope.openAddQuotation = function () {
			var modalDefaults = {
				templateUrl: 'modules/quotation/quotation.html',	
				size : 'lg'
			};
			modalService.showModal(modalDefaults).then(function (result) {
			});
		};
		
		$scope.addData = function(addquotation){ 
			console.log(addquotation);
		}
		
		//for dynamic tooltip
		$scope.dynamicTooltip = function(status, active, notActive){
			return (status==1) ? active : notActive;
		};
		
	 };		 
	// Inject controller's dependencies
	quotationController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('quotationController', quotationController);
});