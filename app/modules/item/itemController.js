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
		$scope.alerts = [];
		
		// function to close alert
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.openAddItem = function () {
			var modalDefaults = {
				templateUrl: 'modules/item/item.html',	
				size : 'lg'
			};
			var modalOptions = {
				postData : function(additem) {
					dataService.post("item", additem);
					console.log(additem); 
				} 
			};
			modalService.showModal(modalDefaults,modalOptions).then(function (result) {
			});
		};
		console.log("this is item controller");
		
		
		$scope.getItem = function(additem){
			dataService.get(false,"item")
			.then(function(response) {
				if(response.status == 'success'){
					$scope.additem = response.data;
					$scope.totalRecords = response.totalRecords;
				}else{
					$scope.additem = [];
					$scope.totalRecords = 0;
					if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
					$notification[response.status]("Get Transactions", response.message);
				}
			});
		}
		
	 };		 
	// Inject controller's dependencies
	itemController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('itemController', itemController);
});