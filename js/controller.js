//'use strict';
/* Controllers */
angular.module('hoc.controllers',[]);
app.controller("loginController",function($scope,$http){
	console.log("this is login controller");
});
app.controller("dashboardController",function($scope,$http){
	console.log("this is dashboard controller");
});
app.controller("taxinfoController",function($scope,$http,$modal,$location){
	console.log("this is tax controller");
	$scope.postData =function(taxinfo){
		console.log(taxinfo);
	}
	
});
app.controller("summaryController",function($scope,$http){
	console.log("this is summary controller");
	//code for date picker
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

});
app.controller("partyController",function($scope,$http,$modal,$location){
	console.log("this is party controller");
	$scope.postData =function(addparty){
		
		console.log(addparty);
	}
	// code for open modal
	$scope.open = function () {
		size = 'lg';
		$modal.open({
			templateUrl: 'modules/viewparty.html',
			size: size,
		});
	}
	$scope.ok = function () {
		$modal.close();
	};
	$scope.cancel = function () {
		$modal.dismiss();
	};
	
	//code for paggination
	$scope.totalItems = 1;
	$scope.currentPage = 10;
	$scope.bigTotalItems = 100;
	$scope.bigCurrentPage = 1;
	$scope.postData =function(addmeasurement){
		console.log(addmeasurement);
	}
});
app.controller("invoiceController",function($scope,$http,$modal,$location){
	console.log("this is invoice controller");
	$scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];
	$scope.today = function() {
		$scope.date = new Date();
	};
	//code to set current date
	$scope.date = new Date();
	var dd = $scope.date.getDate();
	var mm = $scope.date.getMonth();
	var yy = $scope.date.getFullYear();
	$scope.cdate =dd+"/"+mm+"/"+yy;
	
	//code to date picker
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
		$scope.ok = function () {
			
			close();
		};
		$scope.cancel = function () {
			$modal.dismiss('cancel');
			console.log("cancel method");
		};
	}
	
	
	//code for paggination
	$scope.totalItems = 1;
	$scope.currentPage = 10;
	$scope.bigTotalItems = 100;
	$scope.bigCurrentPage = 1;
	$scope.postData =function(addmeasurement){
		console.log(addmeasurement);
	}
});
app.controller("measurementController",function($scope,$http){
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
	
	//code for paggination
	$scope.totalItems = 1;
	$scope.currentPage = 10;
	$scope.bigTotalItems = 100;
	$scope.bigCurrentPage = 1;
	$scope.postData =function(addmeasurement){
		console.log(addmeasurement);
	}
});
app.controller("itemController",function($scope,$http,$modal,$location){
	console.log("this is item controller");
	$scope.postData =function(itemadd){
		console.log(itemadd);
	}
	//code for paggination
	$scope.totalItems = 1;
	$scope.currentPage = 10;
	$scope.bigTotalItems = 100;
	$scope.bigCurrentPage = 1;
	$scope.postData =function(addmeasurement){
		console.log(addmeasurement);
	}
});
app.controller("quotationController",function($scope,$http,$modal){
		console.log("this is quotation controller");
		$scope.addData = function(addquotation){ 
			console.log(addquotation);
		}
		//code to open modal
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
		//code for paggination
		$scope.totalItems = 1;
		$scope.currentPage = 10;
		$scope.bigTotalItems = 100;
		$scope.bigCurrentPage = 1;
		$scope.postData =function(addmeasurement){
			console.log(addmeasurement);
		}
	});

app.controller("departmentController",function($scope,$http){
	//code for paggination
	$scope.totalItems = 1;
	$scope.currentPage = 10;
	$scope.bigTotalItems = 100;
	$scope.bigCurrentPage = 1;
	$scope.postData =function(addmeasurement){
		console.log(addmeasurement);
	}
	$scope.addData = function(adddepartment)
	{ 
		console.log(adddepartment);
	}
	console.log("this is department controller");
});
app.controller('', function ($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});