angular.module('IoT', [
    	'ngRoute',
   	'mobile-angular-ui',
	'btford.socket-io'
])
.config(function($routeProvider) {
    $routeProvider
	.when('/', {
        templateUrl: 'login.html',
        controller: 'login'
    	})
	.otherwise({
	templateUrl: 'login.html',
        controller: 'login'
	});
})
.factory('mySocket', function (socketFactory) {
	var myIoSocket = io.connect('/webapp');	//Tên namespace webapp
	mySocket = socketFactory({
		ioSocket: myIoSocket
		});
	return mySocket;
})
.controller('login', function($scope, mySocket) {
	$scope.name = "John Doe";
	var account = {
		username : 'admin',
		password : 'admin'
		};
	$scope.validate = function(usern, pwd){
		if (usern === account.username && pwd === account.password  ) {
			window.location.href="/home.html"
			return true;
			}
		return false;
		}
})

.controller('Home', function($scope, mySocket) {
	
////Khu 1 -- Khu cài đặt tham số 
    	//cài đặt một số tham số test chơi
	//dùng để đặt các giá trị mặc định
    	$scope.nhietdo = "Chưa kết nối";
	$scope.doam = "Chưa kết nối";
	$scope.trangthairelay1 = "Chưa kết nối";
	$scope.trangthairelay2 = "Chưa kết nối";
	$scope.trangthairelay3 = "Chưa kết nối";
	$scope.trangthairelay4 = "Chưa kết nối";
	$scope.trangthai4relay = "Chưa kết nối";
	
	
//khu 2 -- gởi json về cho index.js đển chuyển về cho arduino
	//Cách gửi tham số 1: dùng biến toàn cục! $scope.<tên biến> là biến toàn cục
	$scope.dongrelay1 = function() {
		console.log("ham dongrelay1 duoc thuc thi")
		mySocket.emit("DRL1")		//gởi chuỗi về arduino
		}
	$scope.ngatrelay1 = function() {
		console.log("ham ngatrelay1 duoc thuc thi")
		mySocket.emit("NRL1")		//gởi chuỗi về arduino
		}
	/////////////////////////////////////////////////////////////
	$scope.dongrelay2 = function() {
		console.log("ham dongrelay2 duoc thuc thi")
		mySocket.emit("DRL2")		//gởi chuỗi về arduino
		}
	$scope.ngatrelay2 = function() {
		console.log("ham ngatrelay2 duoc thuc thi")
		mySocket.emit("NRL2")		//gởi chuỗi về arduino
		}
	/////////////////////////////////////////////////////////////
	$scope.dongrelay3 = function() {
		console.log("ham dongrelay3 duoc thuc thi")
		mySocket.emit("DRL3")		//gởi chuỗi về arduino
		}
	$scope.ngatrelay3 = function() {
		console.log("ham ngatrelay3 duoc thuc thi")
		mySocket.emit("NRL3")		//gởi chuỗi về arduino
		}
	//////////////////////////////////////////////////////////////
	$scope.dongrelay4 = function() {
		console.log("ham dongrelay4 duoc thuc thi")
		mySocket.emit("DRL4")		//gởi chuỗi về arduino
		}
	$scope.ngatrelay4 = function() {
		console.log("ham ngatrelay4 duoc thuc thi")
		mySocket.emit("NRL4")		//gởi chuỗi về arduino
		}
	///////////////////////////////////////////////////////////////
	$scope.dong4relay = function() {
		console.log("ham dong4relay duoc thuc thi")
		mySocket.emit("DTC")		//gởi chuỗi về arduino
		}
	$scope.ngat4relay = function() {
		console.log("ham ngat4relay duoc thuc thi")
		mySocket.emit("NTC")		//gởi chuỗi về arduino
		}
	//////////////////////////////////////////////////////////////
	$scope.cncb = function() {
		console.log("ham cncb duoc thuc thi")
		mySocket.emit("CNCB")		//gởi chuỗi về arduino
		}
	$scope.cntb = function() {
		console.log("ham cntb duoc thuc thi")
		mySocket.emit("CNTB")		//gởi chuỗi về arduino
		}
//Khu 3 -- Nhận dữ liệu từ Arduno gửi lên (thông qua ESP8266 rồi socket server truyền tải!)
	//các sự kiện từ Arduino gửi lên (thông qua esp8266, thông qua server)
	
	//Khi nhận được lệnh CBIEN
	mySocket.on('CBIEN', function(json) {
		console.log("recv NHIETDO_DOAM", json)
		$scope.nhietdo = json.nhiet_do
		$scope.doam = json.do_am
		})
	//Khi nhận được lệnh P_HOI
	mySocket.on('P_HOI', function(json) {
		console.log("recv trangthairelay", json)
		$scope.trangthairelay1 = (json.tt_relay1 == 1) ? "Thiết bị này đã BẬT" : "Thiết bị này đã TẮT"
		$scope.trangthairelay2 = (json.tt_relay2 == 1) ? "Thiết bị này đã BẬT" : "Thiết bị này đã TẮT"
		$scope.trangthairelay3 = (json.tt_relay3 == 1) ? "Thiết bị này đã BẬT" : "Thiết bị này đã TẮT"
		$scope.trangthairelay4 = (json.tt_relay4 == 1) ? "Thiết bị này đã BẬT" : "Thiết bị này đã TẮT"
		$scope.trangthai4relay = (json.tt_tatca == 1) ? "Hãy kiểm các thiết bị có được BẬT chưa !" : "Hãy kiểm các thiết bị có được TẮT chưa !"
		})
	
// Khu 4 -- Những dòng code sẽ được thực thi khi kết nối với Arduino (thông qua socket server)
	mySocket.on('connect', function() {
		console.log("connected")
		mySocket.emit("CNCB") 	//gởi ký tự CNCB để yêu cầu cập nhật cảm biến nhiệt độ độ ẩm
		mySocket.emit("CNTB") 	//gởi ký tự CNCB để yêu cầu cập nhật cảm biến nhiệt độ độ ẩm
		})
		
});
