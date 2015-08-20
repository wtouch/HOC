'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService','modalService'];
  // This is controller for this view
	var measurementController = function ($scope, $injector,$routeParams,$rootScope,dataService,modalService) {
		$rootScope.metaTitle = "Real Estate Project";
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.projectListCurrentPage = 1;
		$scope.pageItems = 10;
		$scope.numPages = "";	
		$scope.alerts = [];
		
		// function to close alert
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.openAddMeasurement = function () {
			var modalDefaults = {
				templateUrl: 'modules/measurement/measurement.html',	
				size : 'lg'
			};
			var modalOptions = {
				postData : function(addmeasurement) {
					dataService.post("measurement", addmeasurement);
					console.log(addmeasurement); 
				} 
			};
			modalService.showModal(modalDefaults,modalOptions).then(function (result) {
			});
		};
		console.log("this is measurement controller");
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
			
			$scope.postData =function(addmeasurement){
				console.log(addmeasurement);
			}
	 };		 
	// Inject controller's dependencies
	measurementController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('measurementController', measurementController);
});