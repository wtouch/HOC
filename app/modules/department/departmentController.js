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
		$scope.currentDate = dataService.currentDate;
		$scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];
		//datepicker
		$scope.today = function() {
			$scope.date = new Date();
		};
		$scope.open1 = function($event,opened){
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened = ($scope.opened==true)?false:true;
		};
		$scope.open2 = function($event,opened1){
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened1 = ($scope.opened1==true)?false:true;
		};
		//function to close alert
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		//for dynamic tooltip
		$scope.dynamicTooltip = function(status, active, notActive){
			return (status==1) ? active : notActive;
		};
		$scope.getParty = function(page, params){
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
			dataService.get(false,"party", $scope.params)
			.then(function(response) {
				//console.log(response);
				if(response.status == 'success'){
					$scope.partylist = angular.copy(response.data);
					$scope.totalRecords = response.totalRecords;
					console.log($scope.partylist);
				}else{
					$scope.partylist = [];
					$scope.totalRecords = 0;
					if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
					$notification[response.status]("Get Transactions", response.message);
				}
			});
		}	
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
				formats : ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'],
				format : $scope.formats[0],
				today : function() {
					$scope.date = new Date();
				},
				open3 : function($event,opened3){
					$event.preventDefault();
					$event.stopPropagation();
					$scope.opened3 = ($scope.opened3==true)?false:true;
				},
				getData : function(table, modalOptions, subobj) {
					console.log(modalOptions);
					$scope.params = {
						where : {
							status : 1
						}
					};
					
					dataService.get(false,table,$scope.params)
					.then(function(response) {
						console.log(response);
						if(response.status == "success"){
							modalOptions[subobj] = response.data;
						}
					});
				},
				adddepartment : adddepartment ? x : {},
				addDept : function(adddepartment) {
					dataService.post("department", adddepartment)
					.then(function(response) {
						if(response.status == "success"){
							$scope.getDept($scope.currentPage, $scope.params);
							console.log(response);
							$notification[response.status]("Record Updated Successfully!", response.message);
						}
						if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
						$notification[response.status]("Add record", response.message);
					});
					console.log(adddepartment); 
				} , 
				updateDept : function(adddepartment) {
					var params={where:{id:adddepartment.id}};
					console.log(params);
					dataService.put("department",adddepartment,params)
					.then(function(response) {
						
						if(response.status == "success"){
							$scope.getDept($scope.currentPage, $scope.params);
							console.log(response);
							$notification[response.status]("Record Updated Successfully!", response.message);
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
		$scope.getParty = function(){
			$scope.params = {
				where : {
					status : 1
				},
				orderBy : {
					name : 'asc'
				}
			};
			
			dataService.get(false,"party", $scope.params)
			.then(function(response) {
				
				if(response.status == 'success'){
					$scope.partylist = response.data;
					console.log($scope.partylist);
					$scope.totalRecords = response.totalRecords;
				}else{
					$scope.partylist = [];
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
			$scope.getDept($scope.currentPage, $scope.params);
		}
		$scope.changeCol = function(colName, colValue, id){
			$scope.changeStatus = {};
			$scope.changeStatus[colName] = colValue;
			console.log(colName, colValue);
			dataService.put("department",$scope.changeStatus,{where : { id : id}})
			.then(function(response) {
				//console.log(response);
				if(response.status == "success"){
					$scope.getDept($scope.currentPage, $scope.params);
					$notification[response.status]("Record Deleted Successfully!", response.message);
				}
				if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
				$notification[response.status]("Add record", response.message);
			});
		}
		console.log("this is department controller");
	 };		 
	// Inject controller's dependencies
	departmentController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('departmentController', departmentController);
});