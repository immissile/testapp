'use strict';

/**
 * @ngdoc function
 * @name cnodejs.services:TabsService
 * @description
 * # TabsService
 * Tabs Service of the cnodejs app
 */


angular.module('cnodejs.services')
.factory('Tabs', function() {
  return [
    {
      value: 'all',
      label: '最新'
    },
    {
      value: 'good',
      label: '精华'
    },
    {
      value: 'show',
      label: '爱秀车'
    },
    {
      value: 'job',
      label: '提车作业'
    },
    {
      value: 'driving',
      label: '自驾游'
    },
    {
      value: 'activity',
      label: '活动'
    }
  ];
});
