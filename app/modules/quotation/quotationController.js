'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService','modalService','$notification'];
  // This is controller for this view
	var quotationController = function ($scope, $injector,$routeParams,$rootScope,dataService,modalService,$notification) {
		$rootScope.metaTitle = "Hari Om Constructions!";
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.currentPage = 1;
		$scope.pageItems = 10;
		$scope.numPages = "";		
		$scope.alerts = [];
		
		$scope.openAddQuotation = function (addquotation) {
			console.log(addquotation);
			var x = angular.copy(addquotation);
			if(x!= undefined){
			x.particular = (angular.isObject(addquotation.particular)) ? addquotation.particular : (addquotation.particular == undefined || addquotation.particular == "") ? [] : JSON.parse(addquotation.particular);
			
			x.termsnconditions = (angular.isObject(addquotation.termsnconditions)) ? addquotation.termsnconditions : (addquotation.termsnconditions == undefined || addquotation.termsnconditions == "") ? [] :  JSON.parse(addquotation.termsnconditions);
			}
			
			var modalDefaults = {
				templateUrl: 'modules/quotation/quotation.html',	
				size : 'lg'
			};
			var modalOptions = {
				addquotation : (addquotation) ? x : {},
				postData : function(addquotation) {
					addquotation.particular = JSON.stringify(addquotation.particular);
					addquotation.termsnconditions = JSON.stringify(addquotation.termsnconditions);
					dataService.post("quotation", addquotation).then(function(response){
						if(response.status == "success"){
							$scope.getQuotation($scope.currentPage, $scope.params);
						}
						if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
						$notification[response.status]("Add record", response.message);
						console.log(response);
					});
				},
				updateData : function(addquotation) {
					addquotation.particular = JSON.stringify((addquotation.particular));
					addquotation.termsnconditions = JSON.stringify((addquotation.termsnconditions));
					$scope.addquotation = addquotation;
					var params={where:{id:addquotation.id}};
					console.log(params);
					console.log(addquotation);
					delete addquotation.id;
					dataService.put("quotation",$scope.addquotation,params)
					.then(function(response) {
					console.log(response);
						if(response.status == "success"){
							$scope.getQuotation($scope.currentPage, $scope.params);
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
				totalCal : function(modalOptions){
					modalOptions.addquotation.total_amount = 0;
					for(var x in modalOptions.addquotation.particular){
						modalOptions.addquotation.total_amount += modalOptions.addquotation.particular[x].amount;
					}
					return modalOptions;
				},
		
				add : function(modalOptions){
					modalOptions.addquotation.particular = (modalOptions.addquotation.particular) ? modalOptions.addquotation.particular : [];
					
					var dtlObj = angular.copy(modalOptions.particular);
					//modalOptions.addquotation.particular = (dtlObj);
					modalOptions.addquotation.particular.push((dtlObj));
					
					var total = modalOptions.totalCal(modalOptions);
					
					modalOptions.particular = { description : " ", unit : "",area : "",rate : "",amount : ""};
				},
				remove : function(item, modalOptions) {			
					console.log(modalOptions);
					var index = modalOptions.addquotation.termsnconditions.indexOf(item);
					modalOptions.addquotation.termsnconditions.splice(index, 1); 
				},
				removep : function(item, modalOptions) {
					
					console.log(modalOptions);
					var index = modalOptions.addquotation.particular.indexOf(item);
					modalOptions.addquotation.particular.splice(index, 1); 
					
					var total = modalOptions.totalCal(modalOptions);
				}
			};
			if(x == undefined){
				modalOptions.getData('terms', modalOptions.addquotation,'termsnconditions');
			}
			modalService.showModal(modalDefaults,modalOptions).then(function (result) {
			});
		};
	
		$scope.openViewparty = function (addquotation) {
				var modalDefaults = {
				templateUrl: 'modules/quotation/viewquotation.html',	
				size : 'lg'
			};
			var modalOptions = {
				addquotation : addquotation,
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
			};
			modalService.showModal(modalDefaults, modalOptions).then(function (result) {
			});
		};
		//
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
				console.log(response);
				if(response.status == 'success'){
					$scope.termslist = angular.copy(response.data);
					console.log($scope.termslist);
					$scope.totalRecords = response.totalRecords;
				}else{
					$scope.termslist = [];
					$scope.totalRecords = 0;
					if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
					$notification[response.status]("Get Transactions", response.message);
				}
			});
		}
		//request for party list
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
		//end party list
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
			$scope.getQuotation($scope.currentPage, $scope.params);
		}
			
		$scope.orderBy = function(col, value){
			if(!$scope.params.orderBy) $scope.params.orderBy = {};
			$scope.params.orderBy[col] = value;
			$scope.getQuotation($scope.currentPage, $scope.params);
		}
		
		$scope.changeCol = function(colName, colValue, id){
			$scope.changeStatus1 = {};
			$scope.changeStatus1[colName] = colValue;
			console.log(colName, colValue);
			dataService.put("quotation",$scope.changeStatus1,{where : { id : id}})
			.then(function(response) {
				//console.log(response);
				if(response.status == "success"){
					$scope.getQuotation($scope.currentPage, $scope.params);
				}
				if(response.status == undefined) response = {status :"error", message:"Unknown Error"};
				$notification[response.status]("Add record", response.message);
			});
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
					$scope.quotationlist = angular.copy(response.data);
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