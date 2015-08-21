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
						dataService.post("party", addparty).then(function(response){
							if(response.status == "success"){
								$scope.getParty($scope.currentPage, $scope.params);
							}
						});
					},
					updateData : function(addparty) {
						var params={where:{id:addparty.id}};
						console.log(params);
						dataService.put("party",addparty,params)
						.then(function(response) {
							console.log(response);
							if(response.status == "success"){
								$scope.getParty($scope.currentPage, $scope.params);
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
			$scope.orderBy = function(col, value){
				if(!$scope.params.orderBy) $scope.params.orderBy = {};
				$scope.params.orderBy[col] = value;
				$scope.getParty($scope.currentPage, $scope.params);
			}
			$scope.changeCol = function(colName, colValue, id){
				$scope.changeStatus = {};
				$scope.changeStatus[colName] = colValue;
				console.log(colName, colValue);
				dataService.put("party",$scope.changeStatus,{where : { id : id}})
				.then(function(response) {
					//console.log(response);
					if(response.status == "success"){
						$scope.getParty($scope.currentPage, $scope.params);
					}
					if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
					$notification[response.status]("Add record", response.message);
				});
			}
			
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
					}else{
						$scope.partylist = [];
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