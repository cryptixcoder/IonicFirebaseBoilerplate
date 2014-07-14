angular.module('IonicfireBoilerplate.services', [])
	.factory('Auth',['FB','$firebaseSimpleLogin',function(FB, $firebaseSimpleLogin){
		var ref = new Firebase(FB);
		var auth = $firebaseSimpleLogin(ref);
		var Auth = {
			login: function(user){
				return auth.$login('password',user);
			},
			signup: function(user){
				return auth.$createUser(user.email, user.password);
			},
			logout: function(){
				auth.$logout();
			},
			currentUser: function(){
				auth.$getCurrentUser().then(function(user){
					if(user){
						return user;
					}
					else{
						return null;
					}
				});
			}
		};

		return Auth;
	}])
	.factory('User',['FB','$firebase',function(FB, $firebase){
		var ref = new Firebase(FB + "users");
		var users = $firebase(ref);
		var User = {
			create: function(auth, user){
				users[auth.id] = {
					md5_hash: auth.md5_hash,
					name: user.name,
					$priority: user.username
				};

				users.$save(auth.id).then(function(){
					//Do something once saved
				});
			},
			find: function(id){
				return users.$child(id);
			}
		};

		return User;
	}]);