'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService','modalService'];
  // This is controller for this view
	var itemController = function ($scope, $injector,$routeParams,$rootScope,dataService,modalService) {
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
		
		console.log("this is item controller");
		$scope.postData =function(itemadd){
			console.log(itemadd);
		}
		
	 };		 
	// Inject controller's dependencies
	itemController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('itemController', itemController);
});