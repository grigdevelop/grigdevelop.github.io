var app = angular.module("cvApp", ["ngRoute"]);
app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when("/", {
            templateUrl: "pages/home/home.html"
        })
        .when("/ruby", {
            templateUrl: "pages/ruby/ruby.html"
        });

        // use the HTML5 History API
        //$locationProvider.html5Mode(true);
});