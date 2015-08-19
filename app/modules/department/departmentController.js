'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService','modalService'];
  // This is controller for this view
	var departmentController = function ($scope, $injector,$routeParams,$rootScope,dataService,modalService) {
		$rootScope.metaTitle = "HOC";
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.currentPage = 1;
		$scope.pageItems = 10;
		$scope.numPages = "";		
		
		$scope.alerts = [];
		
		//function to close alert
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		//for dynamic tooltip
		$scope.dynamicTooltip = function(status, active, notActive){
			return (status==1) ? active : notActive;
		};
			
		$scope.ok = function () {
			$modalOptions.close('ok');
		};
		$scope.open = function () {
			var modalDefaults = {
				templateUrl: 'modules/department/department.html',	
				size : 'md'
			};
			var modalOptions = {
				addData : function(adddepartment) {
					dataService.post("department", adddepartment);
					console.log(adddepartment); 
				} 
			};
			modalService.showModal(modalDefaults,modalOptions).then(function (result) {
			});
		};
		$scope.addData = function(adddepartment)
		{ 
			console.log(adddepartment);
		}
		console.log("this is department controller");
	 };		 
	// Inject controller's dependencies
	departmentController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('departmentController', departmentController);
});