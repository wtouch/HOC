'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService','modalService','$notification'];
  // This is controller for this view
	var taxController = function ($scope, $injector,$routeParams,$rootScope,dataService,modalService,$notification) {
		$rootScope.metaTitle = "HOC";
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.numPages = "";	
		$scope.alerts = [];
		$scope.currentPage = 1;
		$scope.pageItems = 10;
		
		$scope.getTax = function(taxinfo, params){
			$scope.params ={where : {id : 1}};
			dataService.get(true,"tax", $scope.params)
			.then(function(response) {
				console.log(response);
				if(response.status == 'success'){
					$scope.taxinfo = angular.copy(response.data);
				}else{
					$scope.taxinfo = {
						service_tax : 14,
						vat : 5
					};
					dataService.post('tax',$scope.taxinfo).then(function(response){
						console.log(response);
						if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
						$notification[response.status]("Get Transactions", response.message);
					})
					
				}
			});
		}
		
		$scope.updateTax = function(taxinfo) {
			var params={where:{id:taxinfo.id}};
			dataService.put("tax",$scope.taxinfo,params)
			.then(function(response) {
			console.log(response);
				if(response.status == "success"){
					$scope.getTax($scope.currentPage, $scope.params);
					$notification[response.status]("Record Updated successfully.", response.message);
				}
				if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
			});
		}
		
		$scope.remove = function(item) {			
			//console.log(modalOptions);
			var index = term.indexOf(item);
			term.splice(index, 1); 
		}
		$scope.getTerms = function(page, params){
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
			dataService.get(false,"terms", $scope.params)
			.then(function(response) {
				//console.log(response);
				if(response.status == 'success'){
					$scope.termList = angular.copy(response.data);
					$scope.totalRecords = response.totalRecords;
				}else{
					$scope.termList = [];
					$scope.totalRecords = 0;
					if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
					$notification[response.status]("Get Transactions", response.message);
				}
			});
		}
		$scope.ok = function () {
			$modalOptions.close('ok');
		};
		$scope.open = function () {
			var modalDefaults = {
				templateUrl: 'modules/tax/termsandconditions.html',	
				size : 'md'
			};
			var modalOptions = {
				insertTerm : function(term) {
					dataService.post("terms", term).then(function(response){
						if(response.status == "success"){
							$scope.getTerms($scope.currentPage, $scope.params);
						}
						if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
						$notification[response.status]("Terms Added Successfully.", response.message);
					});
				}
			};
			modalService.showModal(modalDefaults, modalOptions).then(function (result) {
			});
		};
		$scope.changeCol = function(colName, colValue, id){
			$scope.changeStatus = {};
			$scope.changeStatus[colName] = colValue;
			console.log(colName, colValue);
			dataService.put("terms",$scope.changeStatus,{where : { id : id}})
			.then(function(response) {
				//console.log(response);
				if(response.status == "success"){
					$scope.getTerms($scope.currentPage, $scope.params);
					$notification[response.status]("Record Deleted Successfully!", response.message);
				}
				if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
			});
		}
		
	 };		 
	// Inject controller's dependencies
	taxController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('taxController', taxController);
});