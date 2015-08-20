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
			//var x = angular.copy(adddepartment); 
			var modalDefaults = {
				templateUrl: 'modules/department/department.html',	
				size : 'md'
			};
			var modalOptions = {
				//adddepartment : adddepartment ? x : adddepartment;
				addData : function(adddepartment) {
					dataService.post("department", adddepartment);
					console.log(adddepartment); 
				} 
				/* editData : function(adddepartment) {
					dataService.put("department", adddepartment,+$routeParams.id);
					console.log(adddepartment); 
				} */
			};
			modalService.showModal(modalDefaults,modalOptions).then(function (result) {
			});
		};
		$scope.departmentList = function(adddepartment){
			dataService.get(false , "department").then(function(response){
				if(response.status == 'success'){	
					$scope.deptList=response.data;
					//$scope.totalRecords=response.totalRecords;
				}
				else{
					$scope.deptList = [];
					//$scope.totalRecords = {};	
					if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
					$notification[response.status]("Get Business List", response.message);
				}
			});
		} 
		console.log("this is department controller");
	 };		 
	// Inject controller's dependencies
	departmentController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('departmentController', departmentController);
});