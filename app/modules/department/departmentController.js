'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService','modalService','$notification'];
  // This is controller for this view
	var departmentController = function ($scope, $injector,$routeParams,$rootScope,dataService,modalService,$notification) {
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
		$scope.open = function (adddepartment) {
			var x = angular.copy(adddepartment); 
			var modalDefaults = {
				templateUrl: 'modules/department/department.html',	
				size : 'lg'
			};
			var modalOptions = {
				adddepartment : adddepartment ? x : {},
				addDept : function(adddepartment) {
					dataService.post("department", adddepartment);
					console.log(adddepartment); 
					if(response.status == "success"){
						$scope.getDept($scope.currentPage, $scope.params);
					}
				} , 
				updateDept : function(adddepartment) {
					var params={where:{id:adddepartment.id}};
					console.log(params);
					dataService.put("department",adddepartment,params)
					.then(function(response) {
						
						if(response.status == "success"){
							$scope.getDept($scope.currentPage, $scope.params);
							console.log(response);
						}
						if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
						$notification[response.status]("Add record", response.message);
					});
				}
			};
			modalService.showModal(modalDefaults,modalOptions).then(function (result) {
			});
		};
		$scope.getDept = function(page, params){
			$scope.params = (params) ? params : {
				where : {
					status : 1
				}
			};
			angular.extend($scope.params, {limit : {
					page : page,
					records : $scope.pageItems
				}
			})
			dataService.get(false,"department", $scope.params)
			.then(function(response) {
				//console.log(response);
				if(response.status == 'success'){
					$scope.deptList = angular.copy(response.data);
					$scope.totalRecords = response.totalRecords;
				}else{
					$scope.deptList = [];
					$scope.totalRecords = 0;
					if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
					$notification[response.status]("Get Transactions", response.message);
				}
			});
		}
		$scope.filter = function(col, value, search){
			if(search == true){
				if(!$scope.params.search) $scope.params.search = {};
				$scope.params.search[col] = value;
			}else{
				if(!$scope.params.where) $scope.params.where = {};
				$scope.params.where[col] = value;
			}
			$scope.getParty($scope.currentPage, $scope.params);
		}
		console.log("this is department controller");
	 };		 
	// Inject controller's dependencies
	departmentController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('departmentController', departmentController);
});