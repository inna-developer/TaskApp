var ColorApp=angular.module("ColorApp",[]);ColorApp.controller("Colors",["$scope","$http",function(o,r){r.get("data/colorsArray.json").success(function(r){o.colorsArray=r})}]);