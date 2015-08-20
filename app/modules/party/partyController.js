'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService','modalService','$notification'];
  // This is controller for this view
	var partyController = function ($scope, $injector,$routeParams,$rootScope,dataService,modalService,$notification) {
		$rootScope.metaTitle = "Real Estate Project";
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.currentPage = 1;
		$scope.pageItems = 10;
		$scope.numPages = "";
		
		// function to close alert
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		
		
		console.log("this is party controller");
			$scope.ok = function () {
				$modalOptions.close('ok');
			};
			$scope.open = function () {
				var modalDefaults = {
					templateUrl: 'modules/party/viewparty.html',	
					size : 'lg'
				};
				modalService.showModal(modalDefaults).then(function (result) {
				});
			};
			
			$scope.openAddparty = function (addparty) {
				var x = angular.copy(addparty);
				console.log('addparty'); 
				var modalDefaults = {
					templateUrl: 'modules/party/party.html',	
					size : 'lg'
				};
				var modalOptions = {
					addparty : (addparty) ? x : {},
					postData : function(addparty) {
						dataService.post("party", addparty);
						console.log(addparty); 
					},
					updateData : function(addparty) {
						var params={where:{id:addparty.id}};
						console.log(params);
						dataService.put("party",addparty,params)
						.then(function(response) { 
						console.log(response);
						if(response.status == "success"){
						}
						if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
						$notification[response.status]("Add record", response.message);
				 	});
					}
				};
				modalService.showModal(modalDefaults, modalOptions).then(function (result) {
				});
			};
			
			
			$scope.openViewparty = function (addparty) {
					var modalDefaults = {
					templateUrl: 'modules/party/viewparty.html',	
					size : 'lg'
				};
				var modalOptions = {
					addparty : addparty,
				};
				modalService.showModal(modalDefaults, modalOptions).then(function (result) {
				});
			};
			
			$scope.getParty = function(page){
				$scope.params = {
					where : {
						status : 0, type : 'Client'
					},
					limit : {
						page : page,
						records : $scope.numPages
					}
				};
				dataService.get(false,"party1", $scope.params)
				.then(function(response) {
					console.log(response);
					if(response.status == 'success'){
						$scope.addparty = response.data;
						$scope.totalRecords = response.totalRecords;
					}else{
						$scope.addparty = [];
						$scope.totalRecords = 0;
						if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
						$notification[response.status]("Get Transactions", response.message);
					}
				});
			}
			
			$scope.getSingleParty = function(addparty){
				$scope.params ={where :{id:13}} ;
				dataService.get(true,"party",$scope.params)
				.then(function(response) {
					console.log(response);
					if(response.status == 'success'){
						$scope.addparty = response.data;
						$scope.totalRecords = response.totalRecords;
					}else{
						$scope.addparty = [];
						$scope.totalRecords = 0;
						if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
						$notification[response.status]("Get Transactions", response.message);
					}
				});
			}
			$scope.dynamicTooltip = function(status, active, notActive){
				return (status==1) ? active : notActive;
			};	
	 };		 
	// Inject controller's dependencies
	partyController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('partyController', partyController);
});