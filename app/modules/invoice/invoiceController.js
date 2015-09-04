'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService','modalService','$notification'];
  // This is controller for this view
	var invoiceController = function ($scope, $injector,$routeParams,$rootScope,dataService,modalService,$notification) {
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.currentPage = 1;
		$scope.pageItems = 10;
		$scope.numPages = "";
		//code to open modal
		$scope.ok = function () {
			$modalOptions.close('ok');
		};
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
			
		$scope.openInvoice = function () {
			var modalDefaults = {
				templateUrl: 'modules/invoice/invoice.html',	
				size : 'lg'
			};
			
			var curDate = new Date();
			var month = curDate.getMonth() + 1;
			 
			var modalOptions = {
				currentDate : curDate.getFullYear() + "-" + month + "-" + curDate.getDate(),
				/* formats : ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'],
				format : $scope.formats[0], */
				
				//code to set current date
				month :(month <= 9) ? '0' + month : month,
				
				
				//code to date picker
				open : function($event,opened){
					$event.preventDefault();
					$event.stopPropagation();
					opened :(opened==true)?false:true;
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
				open1 : function($event,opened1){
					$event.preventDefault();
					$event.stopPropagation();
					opened1 : (opened1==true)?false:true;
				},
				postData : function(addinvoice) {
					dataService.post("invoice", addinvoice);
					console.log(addinvoice); 
				} 
			};
			modalService.showModal(modalDefaults,modalOptions).then(function (result) {
			});
		};
		
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
		};
		
		$scope.groupBy = function(col,partyType,value){
			console.log(col,partyType, value);
			if(!$scope.params.groupBy) $scope.params.groupBy = {};
			$scope.params.groupBy[col] = value;
			
			$scope.getMeasurement($scope.currentPage, $scope.params); 
			
		}
		
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
			$scope.getDepartment($scope.currentPage, $scope.params);
		}
			
		$scope.orderBy = function(col, value){
			if(!$scope.params.orderBy) $scope.params.orderBy = {};
			$scope.params.orderBy[col] = value;
			$scope.getMeasurement($scope.currentPage, $scope.params);
			$scope.getDepartment($scope.currentPage, $scope.params);
		}
			
		$scope.changeCol = function(colName, colValue, id){
			$scope.changeStatus = {};
			$scope.changeStatus[colName] = colValue;
			console.log(colName, colValue);
			dataService.put("party",$scope.changeStatus,{where : { id : id}})
			.then(function(response) {
				//console.log(response);
				if(response.status == "success"){
					$scope.getMeasurement($scope.currentPage, $scope.params);
					$scope.getDepartment($scope.currentPage, $scope.params);
				}
				if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
				$notification[response.status]("Add record", response.message);
			});
		}
		
		$scope.getMeasurement = function(page, params){
				
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
		//
		$scope.getDepartment = function(page, params){
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
			
				if(response.status == 'success'){
					$scope.departmentlist = angular.copy(response.data);
					console.log($scope.departmentlist);
					$scope.totalRecords = response.totalRecords;
				}else{
					$scope.departmentlist = [];
					$scope.totalRecords = 0;
					if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
					$notification[response.status]("Get Transactions", response.message);
				}
			});
		};
	};	
	// Inject controller's dependencies
	invoiceController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('invoiceController', invoiceController);
});