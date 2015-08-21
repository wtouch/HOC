'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService','modalService','$notification'];
  // This is controller for this view
	var measurementController = function ($scope, $injector,$routeParams,$rootScope,dataService,modalService,$notification) {
		$rootScope.metaTitle = "HOC";
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.currentPage = 1;
		$scope.pageItems = 10;
		$scope.alerts = [];
		
		// function to close alert
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.openAddMeasurement = function (addmeasurement) {
			var modalDefaults = {
				templateUrl: 'modules/measurement/measurement.html',	
				size : 'lg'
			};
			var modalOptions = {
				
				addmeasurement : (addmeasurement) ? x :{},
				postData : function(addmeasurement) {
					dataService.post("measurement", addmeasurement).then(function(response) {
						console.log(response);
						if(response.status == "success"){
							$scope.getMeasurement($scope.currentPage, $scope.params);
						}
						if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
						$notification[response.status](" Record Added", response.message);
					});
					
				}, 
				updateData : function(addmeasurement) {
					var params={where:{id:addmeasurement.id}};
					console.log(params);
					delete addmeasurement.id;
					console.log(addmeasurement);
					dataService.put("measurement",addmeasurement,params)
					.then(function(response) {
						console.log(response);
						if(response.status == "success"){
							$scope.getMeasurement($scope.currentPage, $scope.params);
						}
						if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
						$notification[response.status]("Update record", response.message);
					});
				}
				
			};
			modalService.showModal(modalDefaults,modalOptions).then(function (result) {
			});
		};
		$scope.viewMeasurement = function (itemdata) {
			var modalDefaults = {
				templateUrl: 'modules/measurement/viewmeasurement.html',	
				size : 'lg'
			};
			var modalOptions = {
				item : itemdata,
			};
			modalService.showModal(modalDefaults,modalOptions).then(function (result) {
			
			});
		};
		console.log("this is measurement controller");
			$scope.today = function() {
				$scope.date = new Date();
			};
			$scope.open = function($event,opened){
				$event.preventDefault();
				$event.stopPropagation();
				$scope.opened = ($scope.opened==true)?false:true;
			};
			$scope.open1 = function($event,opened){
				$event.preventDefault();
				$event.stopPropagation();
				$scope.opened1 = ($scope.opened==true)?false:true;
			};
			$scope.getMeasurement = function(page, params){
				$scope.params = (params) ? params : {};
				/* where : {
					status : 1
				}
			}; */
				angular.extend($scope.params, {limit : {
						page : page,
						records : $scope.pageItems
					}
				})
				dataService.get(false,"measurement", $scope.params)
				.then(function(response) {
					console.log(response);
					if(response.status == 'success'){
						$scope.measurementlist = angular.copy(response.data);
						$scope.totalRecords = response.totalRecords;
					}else{
						$scope.measurementlist = [];
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
				$scope.getMeasurement($scope.currentPage, $scope.params);
			}
			$scope.orderBy = function(col, value){
				if(!$scope.params.orderBy) $scope.params.orderBy = {};
				$scope.params.orderBy[col] = value;
				$scope.getMeasurement($scope.currentPage, $scope.params);
			}
			$scope.changeCol = function(colName, colValue, id){
				$scope.changeStatus = {};
				$scope.changeStatus[colName] = colValue;
				console.log(colName, colValue);
				dataService.put("measurement",$scope.changeStatus,{where : { id : id}})
				.then(function(response) {
					//console.log(response);
					if(response.status == "success"){
						$scope.getMeasurement($scope.currentPage, $scope.params);
					}
					if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
					$notification[response.status]("record updated", response.message);
				});
			}
			$scope.dynamicTooltip = function(status, active, notActive){
				return (status==1) ? active : notActive;
			};
			/* $scope.getMeasurement = function(addmeasurement){
				dataService.get(false,"measurement")
				.then(function(response) {
					console.log(addmeasurement);
					if(response.status == 'success'){
						$scope.addmeasurement = response.data;
						$scope.totalRecords = response.totalRecords;
					}else{
						$scope.addmeasurement = [];
						$scope.totalRecords = 0;
						if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
						$notification[response.status]("Get Transactions", response.message);
					}
				});
			} */
	 };		 
	// Inject controller's dependencies
	measurementController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('measurementController', measurementController);
});