'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService','modalService'];
  // This is controller for this view
	var partyController = function ($scope, $injector,$routeParams,$rootScope,dataService,modalService) {
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
		
		console.log("this is party controller");
			$scope.postData =function(addparty){
				console.log(addparty);
			}
			// code for open modal
			$scope.open = function () {
				size = 'lg';
				$modal.open({
					templateUrl: 'modules/viewparty.html',
					size: size,
				});
			}
			$scope.ok = function () {
				$modal.close();
			};
			$scope.cancel = function () {
				$modal.dismiss();
			};
			$scope.postData =function(addparty){
				console.log(addparty);
			}
			
			$scope.dynamicTooltip = function(status, active, notActive){
				return (status==1) ? active : notActive;
			};	
	 };		 
	// Inject controller's dependencies
	partyController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('partyController', partyController);
});