"use strict";

 angular.module("cnodejs.config", [])

.constant("$ionicLoadingConfig", {
  "template": "请求中..."
})

.constant("ENV", {
  "version": "2.0.1",
  "name": "development",
  "debug": true,
  "accessToken": "f6d0dc46-d66f-45f9-a7e7-4c1be175a08d",
  "domain": "http://icheshang.com",
  "api": "/api/v1"
})

;
