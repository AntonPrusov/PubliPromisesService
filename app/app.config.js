//currentMenuItem
app.run(function($rootScope, $location) {
	$rootScope.$on('$routeChangeSuccess', function(event, current, previous, reject) {
		$rootScope.currentMenuItem = $location.path() || '/';
	});
});

//проверка Авторизован пользователь, или нет, если нет, то перенаправляем на главную /
app.run(function($rootScope, $location) {
	$rootScope.$on('$routeChangeStart', function (event, current, previous, reject) {

		if (!localStorage.getItem('authToken') && $location.path() !== '/login'){
			$location.path('/');
		};
	})

});

// check authorization
app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
		return {
			request: function(config) {
				// console.log(config)
				config.headers = config.headers || {};
				if (localStorage.getItem('authToken')) {
					config.headers.Authorization = 'Bearer ' + localStorage.getItem('authToken');
				}
				return config;
			},
			responseError: function(response) {
				// console.log('aa')
				// if (response.status === 401) {
				// 	$location.path('/login');
				// }
				return $q.reject(response);
			}
		};
	}]);
}]);

//spinner loader
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoadingInterceptor');
}]);