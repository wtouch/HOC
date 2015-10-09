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
		$scope.currDate = dataService.currentDate;
		$scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];
		//datepicker
		$scope.today = function() {
			$scope.date = new Date();
		};
		$scope.open = function($event,opened){
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened = ($scope.opened==true)?false:true;
		};
		$scope.open1 = function($event,opened1){
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
		
		$scope.ok = function () {
			$modalOptions.close('ok');
		};
		$scope.openDept = function (adddepartment) {
			var x = angular.copy(adddepartment); 
			var modalDefaults = {
				templateUrl: 'modules/department/department.html',	
				size : 'lg'
			};
			
				var curDate = new Date();
				var month = curDate.getMonth() + 1;
			var modalOptions = {
				currentDate : curDate.getFullYear() + "-" + month + "-" +curDate.getDate(),
				open2 : function($event,modalOptions){
					$event.preventDefault();
					$event.stopPropagation();
					$scope.modalOptions.opened2 = ($scope.modalOptions.opened2==true)?false:true;
				},
				getData : function(table, modalOptions, subobj) {
					$scope.getData(false,table, subobj,false,modalOptions);
				},
				adddepartment : adddepartment ? x : {},
				postData : function(adddepartment) {
					console.log(adddepartment);
					dataService.post("department", adddepartment).then(function(response){
					console.log(response);
						if(response.status == "success"){
							$scope.getData($scope.currentPage, "department", "departmentlist", $scope.params);
						}
						if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
						$notification[response.status](response.message); 
					});
					console.log(adddepartment);  

				} , 
				updateData : function(adddepartment) {
					var params={where:{id:adddepartment.id}};
					dataService.put("department",adddepartment,params)
					.then(function(response) {
						if(response.status == "success"){
							$scope.getData($scope.currentPage, "department", "departmentlist", $scope.params);
							$notification[response.status]("Record Updated Successfully!", response.message);
						}
						if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
					});
				}
			};
			modalService.showModal(modalDefaults,modalOptions).then(function (result) {
			});
		};
		$scope.getData = function(page, table, subobj, params, modalOptions) {
			$scope.params = (params) ? params : {
				where : {
					status : 1
				},
				cols : ["*"]
			};
			if(page){
				angular.extend($scope.params, {
					limit : {
						page : page,
						records : $scope.pageItems
					}
				})
			}
			
			dataService.get(false,table,$scope.params)
			.then(function(response) {
				if(response.status == 'success'){
					if(modalOptions != undefined){
						modalOptions[subobj] = angular.copy(response.data);
						modalOptions.totalRecords = response.totalRecords;
					}else{
						$scope[subobj] = angular.copy(response.data);
						$scope.totalRecords = response.totalRecords;
					}
				}else{
					if(modalOptions != undefined){
						modalOptions[subobj] = [];
						modalOptions.totalRecords = 0;
					}else{
						$scope[subobj] = [];
						$scope.totalRecords = 0;
					}
					if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
					$notification[response.status]("Get Transactions", response.message);
				}
			});
		}
		
		$scope.viewDepartment = function (measurementdata) {
				var modalDefaults = {
					templateUrl: 'modules/measurement/viewmeasurement.html',	
					size : 'lg'
				};
				var modalOptions = {
					measurement : measurementdata,
				};
				modalService.showModal(modalDefaults,modalOptions).then(function (result) {
				
				});
			};
			
			
		$scope.filter = function(col, value, search){
			if(search == true){
				if(value == "" || value == undefined){
					alert(value, col);
					delete $scope.params.search[col];
				}else{
					if(!$scope.params.search) $scope.params.search = {};
					$scope.params.search[col] = value;
				}
			}else{
				if(value == "" || value == undefined){
					delete $scope.params.where[col];
				}else{
					if(!$scope.params.where) $scope.params.where = {};
					$scope.params.where[col] = value;
				}
			}
				$scope.getData($scope.currentPage, "department", "departmentlist", $scope.params);
		}
		$scope.changeCol = function(colName, colValue, id){
			$scope.changeStatus = {};
			$scope.changeStatus[colName] = colValue;
			console.log(colName, colValue);
			dataService.put("department",$scope.changeStatus,{where : { id : id}})
			.then(function(response) {
				if(response.status == "success"){
					$scope.getData($scope.currentPage, "department", "departmentlist", $scope.params);
					$notification[response.status]("Record Deleted Successfully!", response.message);
				}
				if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
			});
		}
		$scope.calcDuration = function(type, duration){
			var dateS = new Date(duration.start);
			var dateE = new Date(duration.end);
			var startDt = dateS.getFullYear() + "-" + (dateS.getMonth() + 1) + "-" + dateS.getDate();
			var endtDt = dateE.getFullYear() + "-" + (dateE.getMonth() + 1) + "-" + (dateE.getDate() + 1 );
		}
		console.log("this is department controller");
	 };		 
	// Inject controller's dependencies
	departmentController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('departmentController', departmentController);
});