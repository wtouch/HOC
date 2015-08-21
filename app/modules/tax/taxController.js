'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService','modalService','$notification'];
  // This is controller for this view
	var taxController = function ($scope, $injector,$routeParams,$rootScope,dataService,modalService,$notification) {
		$rootScope.metaTitle = "HOC";
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.projectListCurrentPage = 1;
		$scope.pageItems = 10;
		$scope.numPages = "";	
		$scope.alerts = [];
		console.log("this is tax controller");
		// function to close alert
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		/* $scope.insertData = function(taxinfo) {
			dataService.post("tax", taxinfo);
			console.log(taxinfo); 
		}*/
		/* $scope.getTax = function(taxinfo){
			//$scope.param = {where : {id : 1}};
			//console.log($scope.param);
			dataService.get(false , "tax").then(function(response){
				if(response.status == 'success'){	
					$scope.taxinfo = response.data;
					console.log($scope.taxinfo);
					//$scope.totalRecords=response.totalRecords;
				}
				else{
					$scope.taxinfo = [];
					//$scope.totalRecords = {};	
				}
			});
		} */ 
		$scope.getTax = function(taxinfo, params){
			$scope.params = (params) ? params : {
				where : {
					id : 1;
				}
			};
			dataService.get(true,"tax", $scope.params)
			.then(function(response) {
				//console.log(response);
				if(response.status == 'success'){
					alert("success");
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
		$scope.open = function () {
			var modalDefaults = {
				templateUrl: 'modules/tax/termsandconditions.html',	
				size : 'md'
			};
			var modalOptions = {
				insertTerm : function(term) {
					dataService.post("terms", term);
					console.log(term); 
				}
			};
			modalService.showModal(modalDefaults, modalOptions).then(function (result) {
			});
		};
		$scope.termsList = function(term){
			dataService.get(false , "terms").then(function(response){
				console.log(response);
				if(response.status == 'success'){	
					$scope.termList = response.data;
					//$scope.totalRecords=response.totalRecords;
				}
				else{
					$scope.termList = [];
					//$scope.totalRecords = {};	
					if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
					//$notification[response.status]("Get Business List", response.message);
				}
			});
		}
	 };		 
	// Inject controller's dependencies
	taxController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('taxController', taxController);
});