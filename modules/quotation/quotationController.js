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
		$scope.user_id = {user_id : $rootScope.userDetails.id}; 
		$scope.alerts = [];
		
		// function to close alert
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		//for dynamic tooltip
		$scope.dynamicTooltip = function(status, active, notActive){
			return (status==1) ? active : notActive;
		};
		//Code For Pagination
		$scope.pageChanged = function(page) { 
			angular.extend($scope.projectParam, $scope.user_id);
			dataService.get("getmultiple/project/"+page+"/"+$scope.pageItems,$scope.projectParam).then(function(response){
				$scope.projects = response.data;
			
			});
		};	
	 };		 
	// Inject controller's dependencies
	quotationController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('quotationController', quotationController);
});