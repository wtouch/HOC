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
		$scope.currDate = dataService.currentDate;
		$scope.a = new Date();
		
		
		// function to close alert
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.getMeasurement = function(page, params){
				
			$scope.params = (params) ? params : {
			 where : {
					status : 1
				},
				cols : ["*"],
				
			}; 
			angular.extend($scope.params, {limit : {
					page : page,
					records : $scope.pageItems
				}
			})
			dataService.get(false,"measurement", $scope.params)
			.then(function(response) {
			
				if(response.status == 'success'){
					$scope.measurementlist = angular.copy(response.data);
					console.log($scope.measurementlist);
					$scope.totalRecords = response.totalRecords;
				}else{
					$scope.measurementlist = [];
					$scope.totalRecords = 0;
					if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
					$notification[response.status]("Get Transactions", response.message);
				}
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
						//alert(value, col);
						delete $scope.params.where[col];
					}else{
						//alert(value, col);
						if(!$scope.params.where) $scope.params.where = {};
						$scope.params.where[col] = value;
					}
				}
				$scope.getMeasurement($scope.currentPage, $scope.params);
			}
		/* // to calculate difference between two dates
			$scope.dateDiff = function(measurement){
				if((measurement.fromDate!= null)&& (measurement.toDate!=null)){
					
					var tdatestring = ("0" + measurement.toDate.getDate()).slice(-2) + "-" + ("0"+(measurement.toDate.getMonth()+1)).slice(-2) + "-" +measurement.toDate.getFullYear() + " " + ("0" +measurement.toDate.getHours()).slice(-2) + ":" + ("0" + measurement.toDate.getMinutes()).slice(-2);
					
					var fdatestring = ("0" +  measurement.fromDate.getDate()).slice(-2) + "-" + ("0"+( measurement.fromDate.getMonth()+1)).slice(-2) + "-" + measurement.fromDate.getFullYear() + " " + ("0" +  measurement.fromDate.getHours()).slice(-2) + ":" + ("0" +  measurement.fromDate.getMinutes()).slice(-2); 
					
					
					
					
				}
				
				/* if($scope.measurement!=null){
					var tdatestring = ("0" + $scope.measurement.toDate.getDate()).slice(-2) + "-" + ("0"+($scope.measurement.toDate.getMonth()+1)).slice(-2) + "-" +$scope.measurement.toDate.getFullYear() + " " + ("0" +$scope.measurement.toDate.getHours()).slice(-2) + ":" + ("0" + $scope.measurement.toDate.getMinutes()).slice(-2);
				
					var fdatestring = ("0" +  $scope.measurement.fromDate.getDate()).slice(-2) + "-" + ("0"+( $scope.measurement.fromDate.getMonth()+1)).slice(-2) + "-" + $scope.measurement.fromDate.getFullYear() + " " + ("0" +  $scope.measurement.fromDate.getHours()).slice(-2) + ":" + ("0" +  $scope.measurement.fromDate.getMinutes()).slice(-2);
					
					
					console.log(tdatestring);
					console.log(fdatestring);
					console.log(diffdate);
				} */
				
				//$scope.fromDate = $scope.measurement.fromDate;
				//$scope.toDate = $scope.measurement.toDate;
				/* 
				
				 
				
				//console.log($scope.fromDate);
				//console.log(newday);
				//$scope.newDate = 
				
			}; */
		//end date function
			$scope.openAddMeasurement = function (addmeasurement) {
				console.log(addmeasurement);
				var x = angular.copy(addmeasurement);
				var modalDefaults = {
					templateUrl: 'modules/measurement/measurement.html',	
					size : 'lg'
				};
				
				var curDate = new Date();
				var month = curDate.getMonth() + 1;
				
				var modalOptions = {
					currentDate : curDate.getFullYear() + "-" + month + "-" +curDate.getDate(),
					addmeasurement : (addmeasurement) ? x :{},
					area : function(){
						console.log("this is area");
						var c = addmeasurement.height;		
						
					},
					postData : function(addmeasurement) {
						console.log(addmeasurement);
						dataService.post("measurement", addmeasurement).then(function(response){
						console.log(response);
							if(response.status == "success"){
								$scope.getMeasurement($scope.currentPage, $scope.params);
							}
							if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
							$notification[response.status](response.message); 
						});
						console.log(addmeasurement); 
					},
					updateData : function(addmeasurement) {
						var params = {where:{id:addmeasurement.id}};
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
					cal : function (modalOptions){
						
						if((modalOptions.measurement_unit == "Sq.Ft")||(modalOptions.measurement_unit == "Sq.meter")){
							modalOptions.area = modalOptions.length * modalOptions.width ;
						}
						if((modalOptions.measurement_unit == "Cum")||(modalOptions.measurement_unit == "Cft")){
							modalOptions.area = modalOptions.length * modalOptions.width * modalOptions.height;
						}
						if((modalOptions.measurement_unit == "Rm")||(modalOptions.measurement_unit == "Fft")){
							modalOptions.area = modalOptions.length ;
						}
						if(modalOptions.measurement_unit == "NOS"){
							modalOptions.area = modalOptions.nos  ;
						} 
					}
				};
				modalService.showModal(modalDefaults,modalOptions).then(function (result) {
				});
			};
			$scope.viewMeasurement = function (measurementdata) {
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
			
			$scope.getParty = function(){
				$scope.params = {
					where : {
						status : 1
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
			
			
	 };		 
	// Inject controller's dependencies
	measurementController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('measurementController', measurementController);
});