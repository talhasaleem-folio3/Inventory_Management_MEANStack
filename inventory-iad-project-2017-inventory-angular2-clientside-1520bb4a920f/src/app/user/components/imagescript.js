/**
 * Created by OwaisUddin on 5/4/2017.
 */
var inventoryimage= angular.module("myModule",[]);
inventoryimage.controller("myController",function ($scope) {
 var rightimage={
   name:"inventoryimage1",
   image:"./images/background.jpg"
 }
 $scope.rightimage = rightimage;
})
;
