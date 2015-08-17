'use strict'; 

define(['angular',
	'angularRoute',
	'ngCookies',
	'ngSanitize',
	'routeResolver',
	'bootstrap',
	'directives',
	'services', 
	'filters',
	
	'upload','uploadShim',
	'css!../css/bootstrap.min','css!../css/style','css!../css/style1','css!../css/style2','css!../css/style4'
], function(angular, angularRoute, ngCookies) {
	// Declare app level module which depends on views, and components
	var app =  angular.module('hoc', [
	  'ngRoute', 'routeResolverServices', 'ui.bootstrap', 'customDirectives', 'customServices', 'customFilters', 'angularFileUpload', 'ngCookies', 'ngSanitize'
	]);
	app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider',
                '$compileProvider', '$filterProvider', '$provide', '$httpProvider',
				function($routeProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {
					
				//Change default views and controllers directory using the following:
				routeResolverProvider.routeConfig.setBaseDirectories('modules/', 'modules/');
				app.register =
				{
					controller: $controllerProvider.register,
					directive: $compileProvider.directive,
					filter: $filterProvider.register,
					factory: $provide.factory,
					service: $provide.service
				};
				
				//Define routes - controllers will be loaded dynamically
				var route = routeResolverProvider.route;
				$routeProvider
                
                .when('/', route.resolve({controller:'login', template: 'login', label:"Home"}, 'login/login/')) 
				// Always home url is '/' so please don't change this. In future home view can be changed.
				
				.when('/login', route.resolve({controller:'login', template: 'login', label: 'Login'}, 'login/login/'))
				
				.when('/dashboard', route.resolve({controller:'dashboard', template: 'dashboard', label: "Dashboard"}, 'dashboard/'))
				
				//party
				.when('/dashboard/party/:id?', route.resolve({controller:'party', template: 'party', label: 'Party'}, 'party/'))
				.when('/dashboard/partylist', route.resolve({controller:'party', template: 'partylist', label: 'Party Report'}, 'party/'))
				.when('/dashboard/viewparty', route.resolve({controller:'party', template: 'viewparty', label: 'View Party '}, 'party/'))
				
				//item
				.when('/dashboard/item/:id?', route.resolve({controller:'item', template: 'item', label: 'Item'}, 'item/'))
				.when('/dashboard/itemlist', route.resolve({controller:'item', template: 'itemlist', label: 'Item Report'}, 'item/'))
				.when('/dashboard/viewitem', route.resolve({controller:'item', template: 'viewitem', label: 'View Item'}, 'item/'))
				
				.when('/dashboard/measurement/:id?', route.resolve({controller:'measurement', template: 'measurement', label: 'Measurement'}, 'measurement/'))
				.when('/dashboard/measurementlist', route.resolve({controller:'measurement', template: 'measurementlist', label: 'Measurement Report'}, 'measurement/'))
				.when('/dashboard/viewmeasurement', route.resolve({controller:'measurement', template: 'viewmeasurement', label: 'View Measurement'}, 'measurement/'))
				
				.when('/dashboard/department/:id?', route.resolve({controller:'department', template: 'department', label: 'Department'}, 'department/'))
				.when('/dashboard/department', route.resolve({controller:'department', template: 'departmentlist', label: 'Department Report'}, 'department/'))
				.when('/dashboard/department', route.resolve({controller:'department', template: 'viewdepartment', label: 'View Department'}, 'department/'))
				
				.when('/dashboard/invoice/:id?', route.resolve({controller:'invoice', template: 'invoice', label: 'Invoice'}, 'invoice/'))
				.when('/dashboard/invoicelist', route.resolve({controller:'invoice', template: 'invoicelist', label: 'Invoice List'}, 'invoice/'))
				.when('/dashboard/viewinvoice', route.resolve({controller:'invoice', template: 'viewinvoice', label: 'View Invoice'}, 'invoice/'))
				
				.when('/dashboard/invoice/summary', route.resolve({controller:'invoice', template: 'summary', label: 'Summary'}, 'invoice/summary'))
				
				.when('/dashboard/quotation/:id?', route.resolve({controller:'quotation', template: 'quotation', label: 'Quotation'}, 'quotation/'))
				.when('/dashboard/quotationlist', route.resolve({controller:'quotation', template: 'quotationlist', label: 'Quotation Report'}, 'quotation/'))
				.when('/dashboard/viewquotation', route.resolve({controller:'quotation', template: 'viewquotation', label: 'View Quotation'}, 'quotation/'))
				
				.when('/dashboard/taxinfo', route.resolve({controller:'taxinfo', template: 'taxinfo', label: 'Tax Information'}, 'tax/'))
				.otherwise({ redirectTo: '/' });
				
	}]);
	
		
	app.run(['$location', '$rootScope', 'breadcrumbs','dataService','$cookieStore', '$cookies','$routeParams','$notification','$timeout', function($location, $rootScope, breadcrumbs, dataService, $cookieStore, $cookies,$routeParams,$notification,$timeout) {
		$rootScope.$on("$routeChangeStart", function (event, next, current) {
			$rootScope.breadcrumbs = breadcrumbs;
			$rootScope.appConfig = {
				metaTitle : "hoc",
				headerTitle : next.$$route.label,
				subTitle : next.$$route.label,
				assetPath : '..'
			};
		});
	}]);
	return app;
});