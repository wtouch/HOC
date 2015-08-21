'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService','modalService','$notification'];
  // This is controller for this view
	var quotationController = function ($scope, $injector,$routeParams,$rootScope,dataService,modalService,$notification) {
		$rootScope.metaTitle = "Real Estate Project";
	
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.currentPage = 1;
		$scope.pageItems = 10;
		$scope.numPages = "";		
		$scope.alerts = [];
		
		// function to close alert
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		$scope.openAddQuotation = function () {
			var modalDefaults = {
				templateUrl: 'modules/quotation/quotation.html',	
				size : 'lg'
			};
			var modalOptions = {
				postData : function(addquotation) {
					dataService.post("quotation", addquotation);
					console.log(addquotation); 
				} 
			};
			modalService.showModal(modalDefaults,modalOptions).then(function (result) {
			});
		};
		
		$scope.filter = function(col, value, search){
			if(search == true){
				if(!$scope.params.search) $scope.params.search = {};
				$scope.params.search[col] = value;
			}else{
				if(!$scope.params.where) $scope.params.where = {};
				$scope.params.where[col] = value;
			}
			$scope.getQuotation($scope.currentPage, $scope.params);
		}
			
		$scope.orderBy = function(col, value){
			if(!$scope.params.orderBy) $scope.params.orderBy = {};
			$scope.params.orderBy[col] = value;
			$scope.getQuotation($scope.currentPage, $scope.params);
		}
			
		$scope.getQuotation = function(page,params){
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
			dataService.get(false,"quotation",$scope.params)
			.then(function(response) {
				//console.log(addquotation);
				if(response.status == 'success'){
					$scope.quotationlist = response.data;
					$scope.totalRecords = response.totalRecords;
				}else{
					$scope.quotationlist = [];
					$scope.totalRecords = 0;
					if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
					$notification[response.status]("Get Transactions", response.message);
				}
			});
		}
		//for dynamic tooltip
		$scope.dynamicTooltip = function(status, active, notActive){
			return (status==1) ? active : notActive;
		};
		
	 };		 
	// Inject controller's dependencies
	quotationController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('quotationController', quotationController);
});