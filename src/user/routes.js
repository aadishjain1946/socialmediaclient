userapp.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/',{
        templateUrl:'views/imagecard.html',
    }).when('/changepass',{
        templateUrl:'views/changepass.html',
        controller: 'passcoltr'
    }).otherwise({
        template:`<h1>U Type Something Wrong </h1>`
    })
})