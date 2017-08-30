var app = angular.module("cvApp", ["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: "pages/home/home.html"
        });
});