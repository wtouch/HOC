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
			/* $scope.postData =function(addparty){
				console.log(addparty);
			} */
			// code for open modal
			/* $scope.open = function () {
				size = 'lg';
				$modal.open({
					templateUrl: 'modules/viewparty.html',
					size: size,
				});
			} */
			
			$scope.ok = function () {
				$modalOptions.close('ok');
			};
			$scope.open = function () {
				var modalDefaults = {
					templateUrl: 'modules/party/viewparty.html',	
					size : 'lg'
				};
				modalService.showModal(modalDefaults).then(function (result) {
				});
			};
			
			$scope.openAddparty = function () {
				console.log('addparty'); 
				var modalDefaults = {
					templateUrl: 'modules/party/party.html',	
					size : 'lg'
				};
				var modalOptions = {
					postData : function(addparty) {
						dataService.post("party", addparty);
						console.log(addparty); 
					} 
				};
				modalService.showModal(modalDefaults, modalOptions).then(function (result) {
				});
			};
			
			/* $scope.postData =function(addparty){
				console.log(addparty);
			} */
			
			$scope.dynamicTooltip = function(status, active, notActive){
				return (status==1) ? active : notActive;
			};	
	 };		 
	// Inject controller's dependencies
	partyController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('partyController', partyController);
});