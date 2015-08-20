'use strict';

// Services goes here

define(['app'], function (app) {
	var app =  angular.module('customServices', []);
	app.service('modalService', ['$modal', function ($modal) {

        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
			size : 'md',
            templateUrl: '../app/modules/component/modal.html'
        };

        var modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };

        this.showModal = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
        };

        this.show = function (customModalDefaults, customModalOptions) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function (result) {
                        $modalInstance.close(result);
                    };
                    $scope.modalOptions.close = function (result) {
                        $modalInstance.dismiss('cancel');
                    };
                }
            }

            return $modal.open(tempModalDefaults).result;
        };

    }]);
	/******************************************************************************
	 * Modal Service Ends Here */
	
	app.factory('breadcrumbs', [
      '$rootScope',
      '$location',
      '$route',
      function ($rootScope, $location, $route) {
        var BreadcrumbService = {
          breadcrumbs: [],
          get: function(options) {
            this.options = options || this.options;
            if (this.options) {
              for (var key in this.options) {
                if (this.options.hasOwnProperty(key)) {
                  for (var index in this.breadcrumbs) {
                    if (this.breadcrumbs.hasOwnProperty(index)) {
                      var breadcrumb = this.breadcrumbs[index];
                      if (breadcrumb.label === key) {
                        breadcrumb.label = this.options[key];
                      }
                    }
                  }
                }
              }
            }
            return this.breadcrumbs;
          },
          generateBreadcrumbs: function() {
            var routes = $route.routes,
                _this = this,
                params,
                pathElements,
                pathObj = {},
                path = '',
                originalPath = '',
                param;

            if ($route && $route.current && $route.current.originalPath) {
              this.breadcrumbs = [];
              params = $route.current.params;
              pathElements = $route.current.originalPath.trim().split('/');

              // Necessary to get rid of of duplicate empty string on root path
              if (pathElements[1] === '') {
                pathElements.splice(1, 1);
              }

              angular.forEach(pathElements, function(pathElement, index) {
                param = pathElement[0] === ':' &&
                        typeof params[pathElement
                          .slice(1, pathElement.length)] !== 'undefined' ?
                        params[pathElement.slice(1, pathElement.length)] :
                        false;

                pathObj[index] = {
                  path: param || pathElement,
                  originalPath: pathElement
                };

                path = Object
                  .keys(pathObj)
                  .map(function(k) { return pathObj[k].path;  })
                  .join('/') || '/';

                originalPath = Object
                  .keys(pathObj)
                  .map(function(k) { return pathObj[k].originalPath;  })
                  .join('/') || '/';

                if (routes[originalPath] &&
                    (routes[originalPath].label || param) &&
                    !routes[originalPath].excludeBreadcrumb) {
                  _this.breadcrumbs.push({
                    path: path,
                    originalPath: originalPath,
                    label: routes[originalPath].label || param,
                    param: param
                  });
                }
              });
            }
          }
        };

        // We want to update breadcrumbs only when a route is actually changed
        // as $location.path() will get updated immediately (even if route
        // change fails!)
        $rootScope.$on('$routeChangeSuccess', function() {
          BreadcrumbService.generateBreadcrumbs();
        });

        $rootScope.$watch(
          function() { return BreadcrumbService.options; },
          function() {
            BreadcrumbService.generateBreadcrumbs();
          }
        );

        BreadcrumbService.generateBreadcrumbs();

        return BreadcrumbService;
      }
    ]);
	
	/* File Upload Service 
	**********************************************************************/
	app.factory('upload', [
      '$rootScope',
	  
      '$upload',
	  '$timeout',
      function ($rootScope, $upload, $timeout) {
		return {
			fileReaderSupported : window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false),
			upload : function (files,path,userinfo,success,error) {
				if (files && files.length) {
					var progressArr = {};
					for (var i = 0; i < files.length; i++) {
						var file = files[i];
						$upload.upload({
							url: '../server-api/index.php/upload',
							fields: {'path': 'uploads/'+path, 'userinfo': userinfo},
							file: file
						}).progress(function (evt) {
							var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
							//console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
							file.progress = progressPercentage;
							
						}).success(function (data, status, headers, config) {
							//console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
							success(data, status, headers, config);
						}).error(function(err,err1,err2, err3){
							error(err,err1,err2,err3);
							//console.log(err3);
						});
					}
				}
			},
			generateThumb : function(file) {
				if (file != null) {
					if (this.fileReaderSupported && file.type.indexOf('image') > -1) {
						$timeout(function() {
							var fileReader = new FileReader();
							fileReader.readAsDataURL(file);
							fileReader.onload = function(e) {
								$timeout(function() {
									file.dataUrl = e.target.result;
								});
							}
						});
					}
				}
			},
			generateThumbs : function(files) {
				if (files && files.length) {
					for (var i = 0; i < files.length; i++) {
						var file = files[i];
						this.generateThumb(file);
					}
				}
			}
		}
	  }]);
	  
	  /* $HTTP Service for server request
	  *************************************************************************/
	  
	  app.factory("dataService", ['$http', '$window','$rootScope', '$cookieStore', '$cookies', '$location','$timeout','$notification', '$q',
		function ($http, $window,$rootScope,$cookieStore,$cookies,$location,$timeout, $notification, $q) { // This service connects to our REST API

			var serviceBase = '../server-api/index.php/';
			var today = new Date();
			var year = today.getFullYear();
			var month = today.getMonth() + 1;
			var date = today.getDate();
			var hour = today.getHours();
			var min = today.getMinutes();
			var sec = today.getSeconds();
			var obj = {};
			obj.serviceTax = function(amount){
				var st = amount * parseFloat($rootScope.userDetails.config.rentsetting.service_tax) / 100;
				//console.log(st, 'st');
				var pec = st * parseFloat($rootScope.userDetails.config.rentsetting.primary_edu_cess) / 100;
				//console.log(pec, 'pec');
				var sec = st * parseFloat($rootScope.userDetails.config.rentsetting.secondary_edu_cess) / 100;
				//console.log(sec, 'sec');
				return parseFloat(st + pec + sec);
			}
			
			obj.otherTax = function(amount){
				var ot = amount * parseFloat($rootScope.userDetails.config.rentsetting.other_tax) / 100;
				return parseFloat(ot);
			}
			
			obj.tdsCalculate = function(amount){
				if($rootScope.userDetails.config.rentsetting.tds == 0){ 
					return 0;
				}else{
					return amount * parseFloat($rootScope.userDetails.config.rentsetting.tds) / 100;
				}
			}
			
			obj.calculateTax = function(taxObject, amount, tax){
				console.log(tax);
				var tax = (tax) ? tax : {service_tax:0,other_tax:0,tds:0};
				angular.forEach(taxObject, function(value, key) {
					if(value.name == "service_tax"){
						tax.service_tax += obj.serviceTax(amount);
					}
					if(value.name == "tds"){
						tax.tds += obj.tdsCalculate(amount);
					}
					if(value.name == "other_tax"){
						tax.other_tax += obj.otherTax(amount);
					}
				})
				return tax;
			}
			
			
			obj.currentDate = year + "-" + month + "-" + date + " " + hour + ":" + min + ":"+sec;
			obj.setBase = function(path){
				serviceBase = path;
			};
			obj.capitalize = function(string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			}
			obj.stringify = function(oldObj){
				var newObj = {};
				angular.forEach(oldObj, function(value, key) {
				  this[key] = JSON.stringify(value);
				}, newObj);
				return newObj;
			}
			// this parse will parse within array or object of JSON string to object/array
			obj.parse = function(oldObj){
				if(angular.isArray(oldObj)){
					var newObj = [];
					for(var x in oldObj){
						var newArrObj = {};
						angular.forEach(oldObj[x], function(value, key) {
						  this[key] = (angular.isObject(value) || angular.isNumber(value) || value == null || value == 'true' || value == 'false') ? value :(value.slice(0, 1) == "{" || value.slice(0, 1) == "[" ) ? JSON.parse(value) : value;
						}, newArrObj);
						newObj.push(newArrObj);
					}
				}else{
					var newObj = {};
					angular.forEach(oldObj, function(value, key) {
					  this[key] = (angular.isObject(value) || angular.isNumber(value) || value == null || value == 'true' || value == 'false') ? value :(value.slice(0, 1) == "{" || value.slice(0, 1) == "[" ) ? JSON.parse(value) : value;
					}, newObj);
				}
				return newObj;
			}
			
				

			
			obj.rememberPass = function(remb){
				//$cookieStore.put('auth',remb);
				sessionStorage.clear();
			}
			obj.logout = function(){
				obj.get('/login/logout').then(function(response){
					$rootScope.LogoutMsg = response;
					obj.userDetails = null;
					obj.setAuth(false);
					obj.removeCookies($cookies);
					sessionStorage.clear();
					localStorage.clear();
				});
			};
			obj.removeCookies = function(cookies){
				angular.forEach(cookies, function (v, k) {
					$cookieStore.remove(k);
				});
			}
			
			obj.auth = ($cookies.auth) ? $cookieStore.get('auth') : false;
			
			obj.userDetails = (localStorage.userDetails) ? JSON.parse(localStorage.userDetails) : null;
			$timeout(function () {
				$rootScope.$watch(function() { return $cookies.auth; }, function(newValue) {
					//console.log('Cookie string: ' + $cookies.auth);
					if($cookies.auth == undefined && obj.userDetails != null){
						obj.logout();
						$rootScope.userDetails = null;
						$notification.warning("Login", "Session Expired, Please login again!");
						$timeout(function () {
							$location.path("/login");
						}, 700);
					}
				});
			}, 1500);
			obj.setAuth = function (data) {
				//sessionStorage.auth = data;
				//return obj.auth =  JSON.parse(sessionStorage.auth);
				//$cookieStore.put('auth',data);
				return obj.auth =  ($cookieStore.get('auth'));
			};
			obj.setUserDetails = function(data){
				if(data == (undefined || "")){
					console.log("data undefined: "+data);
				}else{
					localStorage.clear();
					localStorage.userDetails = angular.isObject(data) ?  JSON.stringify(data) : data;
					obj.userDetails = JSON.parse(localStorage.userDetails);
				}
			}
			obj.config = function(table, params){
				if(params == undefined) params = {};
				params.table = table;
				return $http({
					url: serviceBase +'getmultiple/config/1/1',
					method: "GET",
					params: params
				}).then(function (results) {
					if(results.data.status == 'success'){
						return obj.parse(results.data.data);
					}else{
						return obj.parse(results.data.data);
					}
					
					
				});
			};
			var db = openDatabase('hoc', '1.0', 'HOC-Management', 2 * 1024 * 1024 * 1024);
			obj.get = function (signle,table, params) {
				$rootScope.loading = true;
				var deferred = $q.defer();
				var data = {data : [], status : "success", message : "Data Selected!"};
				var whereClause = "";
				if(signle == true){
					whereClause = ' WHERE id = ' + params.where.id;
				}
				db.transaction(function (tx) {
				  tx.executeSql('SELECT * FROM ' + table + whereClause, [], function (tx, results) {
					  deferred.notify('About to greet ' + name + '.');
					//console.log(results.rows.item(1));
					var len = results.rows.length, i;
					if(len == 1 && signle == true){
						data.data = results.rows.item(0);
					}else{
						for (i = 0; i < len; i++) {
						  data.data.push(results.rows.item(i));
						}
					}
					deferred.resolve(data);
					//console.log(data);
				  },function(error){
					  data.status = 'error';
					  data.message = error;
					  deferred.reject(data);
					  console.log(data.message);
				  });
				  //
				});
				return deferred.promise;
			};
			
			obj.post = function (table, object) {
				$rootScope.loading = true;
				var colName = "";
				var colValue = "";
				var i = 0;
				angular.forEach(object, function(value, key) {
					i++;
					colName += "'" + key + "',";
					colValue += "'" + value + "',";
					//queryString = "'" + key + "' = " + "'" + value + "',";
				});
				colName = colName.slice(0,-1);
				colValue = colValue.slice(0,-1);
				
				db.transaction(function (tx) {
				  tx.executeSql("INSERT INTO "+table+" ("+colName+") VALUES ("+colValue+")");
				}, success, error1 );
				function success(t, e){
					console.log(t, e);
					alert("success");
				};
				function error1(t, e) {
					console.log(t, e);
				}; 
				$rootScope.loading = false; 
			};
			obj.put = function (table, object, params) {
				$rootScope.loading = true;
				
				var newArrObj = {};
				var colName = "";
				var colValue = "";
				var queryString="";
				var i = 0;
				angular.forEach(object, function(value, key) {
					queryString = "'" + key + "' = " + "'" + value + "',";
				});
				colName = colName.slice(0,-1);
				colValue = colValue.slice(0,-1);
				var whereString = ' id = ' + params;
				db.transaction(function (tx) {
				  tx.executeSql("UPDATE "+table+" SET "+queryString+" where " + whereString);
				}, success, error1 );
				function success(t, e){
					console.log(t, e);
					alert("success");
					var result = {
						status : "success",
						message : "Record updated successfully!",
						data : null
					};
					return result;
				};
				function error1(t, e) {
					console.log(t, e);
					var result = {
						status : "error",
						message : e,
						data : null
					};
					return result;
				};
				$rootScope.loading = false;
				
			};
			obj.delete = function (q, object, params) {
				if(!params) params = {};
				angular.extend(params, {METHOD : 'DELETE'});
				$rootScope.loading = true;
				return $http({
					url: serviceBase + q,
					method: "POST",
					data: object,
					params: params
				}).then(function (results) {
					$rootScope.loading = false;
					return results.data;
				});
			};

			return obj;
	}]);

	app.factory('$notification', ['$timeout',function($timeout){

		
		var notifications = JSON.parse(localStorage.getItem('$notifications')) || [],
			queue = [];

		var settings = {
		  info: { duration: 2500, enabled: true },
		  warning: { duration: 2500, enabled: true },
		  error: { duration: 3000, enabled: true },
		  success: { duration: 2500, enabled: true },
		  progress: { duration: 2000, enabled: true },
		  custom: { duration: 2000, enabled: true },
		  details: true,
		  localStorage: false,
		  html5Mode: false,
		  html5DefaultIcon: 'icon.png'
		};

		function html5Notify(icon, title, content, ondisplay, onclose){
		  if(window.webkitNotifications.checkPermission() === 0){
			if(!icon){
			  icon = 'favicon.ico';
			}
			var noti = window.webkitNotifications.createNotification(icon, title, content);
			if(typeof ondisplay === 'function'){
			  noti.ondisplay = ondisplay;
			}
			if(typeof onclose === 'function'){
			  noti.onclose = onclose;
			}
			noti.show();
		  }
		  else {
			settings.html5Mode = false;
		  }
		}


		return {

		  /* ========== SETTINGS RELATED METHODS =============*/

		  disableHtml5Mode: function(){
			settings.html5Mode = false;
		  },

		  disableType: function(notificationType){
			settings[notificationType].enabled = false;
		  },

		  enableHtml5Mode: function(){
			// settings.html5Mode = true;
			settings.html5Mode = this.requestHtml5ModePermissions();
		  },

		  enableType: function(notificationType){
			settings[notificationType].enabled = true;
		  },

		  getSettings: function(){
			return settings;
		  },

		  toggleType: function(notificationType){
			settings[notificationType].enabled = !settings[notificationType].enabled;
		  },

		  toggleHtml5Mode: function(){
			settings.html5Mode = !settings.html5Mode;
		  },

		  requestHtml5ModePermissions: function(){
			if (window.webkitNotifications){
			  if (window.webkitNotifications.checkPermission() === 0) {
				return true;
			  }
			  else{
				window.webkitNotifications.requestPermission(function(){
				  if(window.webkitNotifications.checkPermission() === 0){
					settings.html5Mode = true;
				  }
				  else{
					settings.html5Mode = false;
				  }
				});
				return false;
			  }
			}
			else{
			  return false;
			}
		  },


		  /* ============ QUERYING RELATED METHODS ============*/

		  getAll: function(){
			// Returns all notifications that are currently stored
			return notifications;
		  },

		  getQueue: function(){
			return queue;
		  },

		  /* ============== NOTIFICATION METHODS ==============*/

		  info: function(title, content, userData){
			return this.awesomeNotify('info','info-sign', title, content, userData);
		  },

		  error: function(title, content, userData){
			return this.awesomeNotify('error', 'remove', title, content, userData);
		  },

		  success: function(title, content, userData){
			return this.awesomeNotify('success', 'ok', title, content, userData);
		  },

		  warning: function(title, content, userData){
			return this.awesomeNotify('warning', 'exclamation-sign', title, content, userData);
		  },

		  awesomeNotify: function(type, icon, title, content, userData){
			/**
			 * Supposed to wrap the makeNotification method for drawing icons using font-awesome
			 * rather than an image.
			 *
			 * Need to find out how I'm going to make the API take either an image
			 * resource, or a font-awesome icon and then display either of them.
			 * Also should probably provide some bits of color, could do the coloring
			 * through classes.
			 */
			// image = '<i class="icon-' + image + '"></i>';
			return this.makeNotification(type, false, icon, title, content, userData);
		  },

		  notify: function(image, title, content, userData){
			// Wraps the makeNotification method for displaying notifications with images
			// rather than icons
			return this.makeNotification('custom', image, true, title, content, userData);
		  },

		  makeNotification: function(type, image, icon, title, content, userData){
			var notification = {
			  'type': type,
			  'image': image,
			  'icon': icon,
			  'title': title,
			  'content': content,
			  'timestamp': +new Date(),
			  'userData': userData
			};
			notifications.push(notification);

			if(settings.html5Mode){
			  html5Notify(image, title, content, function(){
			  }, function(){
			  });
			}
			else{
			  queue.push(notification);
			  $timeout(function removeFromQueueTimeout(){
				queue.splice(queue.indexOf(notification), 1);
			  }, settings[type].duration);

			}

			this.save();
			return notification;
		  },


		  /* ============ PERSISTENCE METHODS ============ */

		  save: function(){
			// Save all the notifications into localStorage
			// console.log(JSON);
			if(settings.localStorage){
			  localStorage.setItem('$notifications', JSON.stringify(notifications));
			}
			// console.log(localStorage.getItem('$notifications'));
		  },

		  restore: function(){
			// Load all notifications from localStorage
		  },

		  clear: function(){
			notifications = [];
			this.save();
		  }

		};
	}])
  
	return app;
});