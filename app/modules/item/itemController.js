'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService','modalService','$notification'];
  // This is controller for this view
	var itemController = function ($scope, $injector,$routeParams,$rootScope,dataService,modalService,$notification) {
		$rootScope.metaTitle = "HOC";
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.currentPage = 1;
		$scope.pageItems = 10;
		
		$scope.openAddItem = function (additem) {
			var x =angular.copy(additem);
			var modalDefaults = {
				templateUrl: 'modules/item/item.html',	
				size : 'lg'
			};
				
			var modalOptions = {
				additem : (additem) ? x :{},
				postData : function(additem) {
					dataService.post("item", additem).then(function(response) {
						console.log(response);
						if(response.status == "success"){
							$scope.getItem($scope.currentPage, $scope.params);
						}
						if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
						$notification[response.status](" Record Added", response.message);
					});
					
				}, 
				updateData : function(additem) {
					var params={where:{id:additem.id}};
					console.log(params);
					delete additem.id;
					console.log(additem);
					dataService.put("item",additem,params)
					.then(function(response) {
						console.log(response);
						if(response.status == "success"){
							$scope.getItem($scope.currentPage, $scope.params);
						}
						if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
						$notification[response.status]("Update record", response.message);
					});
				}
				
			};
			modalService.showModal(modalDefaults,modalOptions).then(function (result) {
			
			});
		};
		$scope.viewItem = function (itemdata) {
			var modalDefaults = {
				templateUrl: 'modules/item/viewitem.html',	
				size : 'lg'
			};
			var modalOptions = {
				item : itemdata,
			};
			modalService.showModal(modalDefaults,modalOptions).then(function (result) {
			
			});
		};
		console.log("this is item controller");
		
		$scope.getItem = function(page, params){
			$scope.params = (params) ? params : {
				 where : {
					status : 0
				},
				cols : ["*"],
				join : ["INNER JOIN users as t1 ON t0.user_id = t1.id"]
			}; 
			angular.extend($scope.params, {limit : {
					page : page,
					records : $scope.pageItems
				}
			})
			dataService.get(false,"item", $scope.params)
			.then(function(response) {
				console.log($scope.params);
				console.log(response);
				if(response.status == 'success'){
					$scope.itemlist = angular.copy(response.data);
					$scope.totalRecords = response.totalRecords;
				}else{
					$scope.itemlist = [];
					$scope.totalRecords = 0;
					if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
					$notification[response.status]("Get Transactions", response.message);
				}
			});
		}
			$scope.filter = function(col, value, search){
				if(search == true){
				if(value == "" || value == undefined){
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
				$scope.getItem($scope.currentPage, $scope.params);
			}
			$scope.orderBy = function(col, value){
				if(!$scope.params.orderBy) $scope.params.orderBy = {};
				$scope.params.orderBy[col] = value;
				$scope.getItem($scope.currentPage, $scope.params);
			}
			$scope.changeCol = function(colName, colValue, id){
				$scope.changeStatus = {};
				$scope.changeStatus[colName] = colValue;
				console.log(colName, colValue);
				dataService.put("item",$scope.changeStatus,{where : { id : id}})
				.then(function(response) {
					//console.log(response);
					if(response.status == "success"){
						$scope.getItem($scope.currentPage, $scope.params);
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
	itemController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('itemController', itemController);
});