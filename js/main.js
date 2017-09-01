var app = angular.module("cvApp", ["ngRoute"]);
app.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when("/", {
        templateUrl: "pages/home/home.html",
        controller: 'HomeController'
    })
    .when("/profile/:profileId", {
        templateUrl: "pages/home/profile.html",
        controller: "ProfileController"
    })
    .when("/ruby", {
        templateUrl: "pages/ruby/ruby.html"
    });
    
    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
});

app.controller('HomeController', ['$scope','profileService', '$routeParams',
function($scope, profileService, $routeParams){
    profileService.getProfiles()
    .then(function(profiles){
        $scope.profiles = profiles;
    }).catch(function(err){
        console.error(err);
    })
}]);

app.controller("ProfileController", ['$scope','$routeParams', 'profileService', 
function($scope, $routeParams, profileService){
    var profileId = $routeParams.profileId;
    profileService.getSkills(profileId)
    .then(function(skills){
        console.log(skills);
        $scope.skills = skills;
    }).catch(function(error){
        console.error(error);
    });
}]);

app.factory('profileService', ['$http','$q', function($http, $q){
    var service = {};
    
    service.getProfiles = function(){
        var deferred = $q.defer();
        
        $http({
            method: 'GET',
            url: 'http://localhost:3000/profiles/get_profiles'
        }).then(function(response){
            deferred.resolve(response.data);
        }, function errorCallback(response){
            deferred.reject(response);
        });
        
        return deferred.promise;
    };
    
    service.getSkills = function(profileId){
        var deferred = $q.defer();
        
        $http({
            method: 'GET',
            url: 'http://localhost:3000/profiles/' + profileId + '/profile_skills/get_profile_skills'
        }).then(function(response){
            deferred.resolve(response.data);
        }, function errorCallback(response){
            deferred.reject(response);
        });
        
        return deferred.promise;
    };
    
    return service;
}]);