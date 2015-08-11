//'use strict';


/* Controllers */
angular.module('hoc.controllers',[]);
app.controller("loginController",function($scope,$http){
	console.log("this is login controller");
});
app.controller("dashboardController",function($scope,$http){
	console.log("this is dashboard controller");
});
app.controller("taxController",function($scope,$http){
	console.log("this is tax controller");
	$scope.postData =function(taxinfo){
		
		console.log(taxinfo);
	}
});
app.controller("summaryController",function($scope,$http){
	console.log("this is summary controller");
});
app.controller("partyController",function($scope,$http){
	console.log("this is party controller");
	$scope.postData =function(addparty){
		
		console.log(addparty);
	}
});
app.controller("invoiceController",function($scope,$http,$modal,$location){
	console.log("this is invoice controller");
	$scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];
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
	
	$scope.postData =function(invoice){
		
		console.log(invoice);
	}
	//code to open modal
	$scope.open = function () {
		size = 'lg';
		$modal.open({
			templateUrl: 'modules/viewinvoice.html',
			size: size,
		});
	}
	$scope.ok = function () {
		$modal.close();
	};
	$scope.cancel = function () {
		$modal.dismiss();
	};
	
});
app.controller("measurementController",function($scope,$http){
	console.log("this is measurement controller");
	$scope.postData =function(addmeasurement){
		
		console.log(addmeasurement);
	}
});
app.controller("itemController",function($scope,$http){
	console.log("this is item controller");
	$scope.postData =function(itemadd){
		
		console.log(itemadd);
	}
});
app.controller("quotationController",function($scope,$http,$modal){
		console.log("this is quotation controller");
		$scope.addData = function(addquotation)
		{ 
			console.log(addquotation);
		}
		
		$scope.open = function () {
			size = 'lg';
			$modal.open({
				templateUrl: 'modules/viewquotation.html',
				size: size,
			});
		}
		$scope.ok = function () {
			$modal.close();
		};
	
	});
		/* $scope.openViewQuotation = function (url) {
			var modalDefaults = {
				templateUrl: url,	// apply template to modal
				size : 'lg'
			};
			var modalOptions = {
			};
			modalService.show(modalDefaults, modalOptions).then(function (result) {
			modalOptions.addincome.date = dataService.currentDate;
				console.log("modalOpened");
		
		});	
		}; */

app.controller("departmentController",function($scope,$http){
		$scope.addData = function(adddepartment)
		{ 
			console.log(adddepartment);
		}
		console.log("this is department controller");
});