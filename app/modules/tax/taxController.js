'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService','modalService'];
  // This is controller for this view
	var taxController = function ($scope, $injector,$routeParams,$rootScope,dataService,modalService) {
		$rootScope.metaTitle = "HOC";
	
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.projectListCurrentPage = 1;
		$scope.pageItems = 10;
		$scope.numPages = "";	
		$scope.alerts = [];
		console.log("this is tax controller");
		// function to close alert
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		$scope.ok = function () {
			$modalOptions.close('ok');
		};
		$scope.open = function () {
			var modalDefaults = {
				templateUrl: 'modules/tax/termsandconditions.html',	
				size : 'md'
			};
			var modalOptions = {
				insertData : function(taxinfo) {
					dataService.post("tax", taxinfo);
					console.log(taxinfo); 
				} 
			};
			modalService.showModal(modalDefaults, modalOptions).then(function (result) {
			});
		};
		$scope.insertData = function(taxinfo) {
			dataService.post("tax", taxinfo);
			console.log(taxinfo); 
		} 
		
	 };		 
	// Inject controller's dependencies
	taxController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('taxController', taxController);
});