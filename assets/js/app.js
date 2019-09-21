const app = angular.module('app', ['ui.materialize', 'ngRoute']);

app.config(function ($locationProvider, $routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "./pages/home.html",
			controller: "App"
		})
	// .when("/contest", {
	// 	templateUrl: "./pages/contest2.html",
	// 	controller: "App"
	// })
	// .when("/top", {
	// 	templateUrl: "pages/top/top_template.html",
	// 	controller: "App"
	// })
	// .when("/evaluation", {
	// 	templateUrl: "pages/evaluation/evaluation_template.html"
	// })
	.otherwise({
		redirectTo: '/'
	});
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});

app.controller('App',
	["$scope", "$location", "$http", "$interval", "$timeout",
		function ($scope, $location, $http, $interval, $timeout, $sce) {

			$scope.state = {
				lastModified: null,
				isModified: false,
				sheetsNames: [],
				sheets: [],
				book: {}
			}

			$scope.curretCategory = ""
			$scope.showCategory = false
			$scope.goToContest = false
			$scope.showTab = false
			$scope.activeTab1 = 'tab_bg_active'

			$scope.isActive = (viewLocation) => {
				return viewLocation === $location.path();
			};

			$scope.actionGoToContest = () => {
				$scope.goToContest = true
				 M.toast({
				 	html: 'Bienvenido!'
				 })
			}
			$scope.goBack = () => {
				$scope.showCategory = false
				$scope.topSheet = null
				$scope.currentCategory = ""
				$scope.showTab = false
			}

			$scope.goToIndex = () => {
				$scope.goToContest = false
			}

			$scope.changeTab = ($event, id) => {

				id == 1 ? $scope.showTab = true : $scope.showTab = false
				$scope.activeTab1 = $event.target.id == 'tab1' ? 'tab_bg_active' : ''
				$scope.activeTab2 = $event.target.id == 'tab2' ? 'tab_bg_active' : ''
			}

			$scope.getData = () => {

				$http({
						method: 'GET',
						url: 'assets/data/timbaland2019.xlsx',
						responseType: 'arraybuffer',
						headers: {
							'Cache-control': 'no-cache'
						},
					})
					.then(
						(data) => {

							$scope.state.lastModified = data.headers('Last-Modified');
							$scope.state.isModified = true;
							$timeout(
								() => {
									$scope.state.isModified = false;
									$scope.state.book = XLSX.read(data.data, {
										type: "array"
									});
									$scope.state.sheetsNames = $scope.state.book.SheetNames;
									for (i = 0; i < Object.keys($scope.state.book.Sheets).length; i += 1) {
										$scope.state.sheets[i] = XLSX.utils.sheet_to_json($scope.state.book.Sheets[$scope.state.book.SheetNames[i]]);
									}
								},
								1000
							);
							$scope.transformToObject()

						},
						(err) => {
							console.log(err);
						}
					);
			}

			$scope.getData();
			// $interval($scope.getData, 5000);


			$scope.goToTop = (index, currentCategory, sheet) => {
				// debugger
				$scope.showTab = true
				$scope.showCategory = true
				$scope.currentCategory = currentCategory
				$scope.index = index
				$scope.topSheet = sheet
				$scope.transformToObject($scope.topSheet)
				$scope.activeTab1 = 'tab_bg_active'
				$scope.activeTab2 = ''

			}

			$scope.transformToObject = (sheet) => {

				if ($scope.topSheet != null) {

					$scope.top = []
					$scope.header = []
					$scope.state.sheets[$scope.index].map((data, index) => {

						if (index === 0) {
							$scope.header.push({
								academia: data.__EMPTY,
								participante: data.__EMPTY_1,
								total: data.__EMPTY_2,
								item_1: data.__EMPTY_4,
								item_2: data.__EMPTY_3,
								item_3: data.__EMPTY_5,
								item_4: data.__EMPTY_6,
								item_5: data.__EMPTY_7,
								item_6: data.__EMPTY_8,
								item_7: data.__EMPTY_9,
								item_8: data.__EMPTY_10,
								item_9: data.__EMPTY_11,
								item_1: data.__EMPTY_12,

							})
						} else {
							$scope.top.push({
									academia: data.__EMPTY,
									participante: data.__EMPTY_1,
									total: data.__EMPTY_2,
									item_1: data.__EMPTY_4,
									item_2: data.__EMPTY_3,
									item_3: data.__EMPTY_5,
									item_4: data.__EMPTY_6,
									item_5: data.__EMPTY_7,
									item_6: data.__EMPTY_8,
									item_7: data.__EMPTY_9,
									item_8: data.__EMPTY_10,
									item_9: data.__EMPTY_11,
									item_1: data.__EMPTY_12,
								}


							)
						}

					})
					console.log("DATA", $scope.top)
				}
			}
		}
	]);