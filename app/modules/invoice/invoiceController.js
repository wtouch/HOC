'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService','modalService'];
  // This is controller for this view
	var invoiceController = function ($scope, $injector,$routeParams,$rootScope,dataService,modalService) {
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.CurrentPage = 1;
		$scope.pageItems = 10;
		$scope.numPages = "";
		console.log("this is invoice controller");
		//code to open modal
		$scope.ok = function () {
			$modalOptions.close('ok');
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
		}
	};	
	// Inject controller's dependencies
	invoiceController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('invoiceController', invoiceController);
});