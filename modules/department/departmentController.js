'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService','modalService'];
  // This is controller for this view
	var departmentController = function ($scope, $injector,$routeParams,$rootScope,dataService,modalService) {
		$rootScope.metaTitle = "Real Estate Project";
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.projectListCurrentPage = 1;
		$scope.pageItems = 10;
		$scope.numPages = "";		
		$scope.user_id = {user_id : $rootScope.userDetails.id}; 
		$scope.alerts = [];
		
		//function to close alert
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		//for dynamic tooltip
		$scope.dynamicTooltip = function(status, active, notActive){
			return (status==1) ? active : notActive;
		};
		
		// code for change status when user delete/ active the project
		$scope.changeValue = function(statusCol,status) {
			$scope.filterStatus= {};
			(status =="") ? delete $scope.projectParam[statusCol] : $scope.filterStatus[statusCol] = status;
			angular.extend($scope.projectParam, $scope.filterStatus);
			angular.extend($scope.projectParam, $scope.search);			
			
			dataService.get("/getmultiple/project/1/"+$scope.pageItems, $scope.projectParam)
			.then(function(response) {  
				if(response.status == 'success'){
					$scope.projects = response.data;
					$scope.totalRecords = response.totalRecords;
				}else{
					$scope.projects = {};
					$scope.totalRecords = {};
					$scope.alerts.push({type: response.status, msg: response.message});
				}				
			});
		};
		// code to access domain names dynamically
		$scope.userinfo={user_id:$rootScope.userDetails.id,status :1}
		dataService.get('getmultiple/website/1/200', $scope.userinfo).then(function(response){
				var domains = [];
				for(var id in response.data){
					var obj = {id: response.data[id].id, domain_name : response.data[id].domain_name};
					domains.push(obj);
				}
				$scope.domains = domains;
		});
		
		$scope.postData =function(addmeasurement){
			console.log(addmeasurement);
		}
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