'use strict';

/**
 * @ngdoc function
 * @name cnodejs.services:UserService
 * @description
 * # UserService
 * User Service of the cnodejs app
 */

angular.module('cnodejs.services')
.factory('User', function(ENV, $resource, $log, $q, Storage, Push) {
  var api = ENV.domain + ENV.api;
  var storageKey = 'user';
  var resource = $resource(api + '/accesstoken');
  var userResource = $resource(api + '/user/:loginname', {
    loginname: ''
  });
  var userLoginRes = $resource(api + '/login', {}, {
    signin: {
      method: 'post',
      url: api + '/signin'
    }
  });
  var user = Storage.get(storageKey) || {};
  return {
    getUser: function (data) {
      return userLoginRes.signin({}, {
        loginname: data.loginname,
        password: data.password
      });
    },
    login: function(accesstoken) {
      var $this = this;
      return resource.save({
        accesstoken: accesstoken
      }, null, function(response) {
        $log.debug('post accesstoken:', response);
        user.accesstoken = accesstoken;
        $this.getByLoginName(response.loginname).$promise.then(function(r) {
          user = r.data;
          user.id = response.id;
          user.accesstoken = accesstoken;

          // set alias for jpush
          Push.setAlias(user.id);

          Storage.set(storageKey, user);
        });
        user.loginname = response.loginname;
      });
    },
    logout: function() {
      user = {};
      Storage.remove(storageKey);

      // unset alias for jpush
      Push.setAlias('');
    },
    getCurrentUser: function() {
      $log.debug('current user:', user);
      return user;
    },
    getByLoginName: function(loginName) {
      if (user && loginName === user.loginname) {
        var userDefer = $q.defer();
        $log.debug('get user info from storage:', user);
        userDefer.resolve({
          data: user
        });
        return {
          $promise: userDefer.promise
        };
      }
      return this.get(loginName);
    },
    get: function(loginName) {
      return userResource.get({
        loginname: loginName
      }, function(response) {
        $log.debug('get user info:', response);
        if (user && user.loginname === loginName) {
          angular.extend(user, response.data);

          Storage.set(storageKey, user);
        }
      });
    }
  };
});
