//'use strict';


/* Controllers */

angular.module('patientApp.controllers',[]);
app.controller("appointmentController",function($scope,$http){
	console.log("appointment controller");
	$scope.oneAtATime = true;
	$scope.status = {
		isFirstOpen: true,
		isFirstDisabled: false
	};
	$scope.isOpen =function(){
		console.log("isopen");
		$scope.status = {
			isSecondOpen: true,
			isFirstDisabled: false
		}; 
		
	}
	$scope.status.open = true;
	$scope.today = function() {
    $scope.dt = new Date();
  };
	
	var cdate= new Date();
	var dd = cdate.getDate();
	var mm = cdate.getMonth()+1;
	var yy = cdate.getFullYear();
	$scope.myDate =dd + '/' +mm +'/'+yy;
	console.log($scope.myDate);
	$scope.clear = function () {
		$scope.dt = null;
	};
/************************* code for date selection **********************************/
	$scope.today();
	  // Disable weekend selection
	$scope.disabled = function(date, mode) {
		return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	};

	$scope.toggleMin = function() {
		$scope.minDate = $scope.minDate ? null : new Date();
	};
	$scope.toggleMin();

	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened = true;
	};

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};
	
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];
	
/********************************************************************************************/
	$scope.insert = function(appointment){
		console.log(appointment);
		//$scope.appointment.cdate = $scope.myDate;
		$http.post("http://localhost/sunita/patientapp/server.php/post",$scope.appointment).success(function(response){
			console.log(response);
		})
		console.log(appointment);
	}

});
app.controller("doctorController",function($scope,$http,$modal,$location){
	
/************************ code for open modal for doctor single view*************************/	
	$scope.open = function () {
		size = 'lg';
		$modal.open({
			templateUrl: 'template/viewdoctor.html',
			size: size,
			
		});
		
	}
	$scope.ok = function () {
		$modal.close();
	};
	$scope.cancel = function () {
		$modal.dismiss();
	};
	
	$scope.login = function(logindata){
		console.log(logindata);
		var n = "sai";
		var p = "ram";
		var name = $scope.logindata.name;
		var pass = $scope.logindata.password;
		console.log(name);
		console.log(pass);
		
		if((name == n) && (pass == p )){
			alert("login successful");
			$location.path("/viewappointment");
		}else{
			
			alert("Invalid password");
		}
	}
});
app.controller('ViewController', function($scope,$http) {
	$http.get("http://localhost/sunita/patientapp/server.php/get").success(function(response) {	$scope.patient = response;
	});
});