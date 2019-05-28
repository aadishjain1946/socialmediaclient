userapp.controller('usercontroller', ($scope, usermodel, SERVER, SocketService) => {
    if (Notification.permission !== 'granted')
        Notification.requestPermission();
    if (localStorage.USER == " ") {
        window.alert("please login first");
        window.open("../../index.html", "_self");
    }
    else {
        $scope.imgdata = [];
        var user = JSON.parse(localStorage.USER);
        let promise1 = usermodel.blockload(user.token);
        promise1.then(data => {
            var val = data.data;
            var a = val.record;
            var b = JSON.parse(a).data;
            load(user.token, b);
        }, error => {
            console.log(error);
        })
        function load(tk, b) {
            let promise = usermodel.imageload(tk, b);
            promise.then(data => {
                var d = data.data['record'];
                for (i = 0; i < d.length; i++) {
                    d[i].imageID = d[i].imageId;
                    d[i].imageId = SERVER + "/" + d[i].imageId;
                }
                $scope.imgdata = data.data['record'];
            }, error => {
                $scope.error = error;
            })
        }
        let prom = usermodel.fetchname(user.token);
        prom.then(data => {
            var val = data.data;
            document.querySelector("#Name").innerHTML = val.record.Uname;
            SocketService.emit('room', { roomId: 'aj123' });
        }, error => {
            $scope.error = error;
        })
        function checkPass() {
            document.querySelector("#reglod").style.display = "block";

            document.querySelector("#Opass").classList.remove("alert-success");
            document.querySelector("#Opass").classList.remove("alert-danger");
            var ps = $scope.oldpass;
            var user = JSON.parse(localStorage.USER);
            usermodel.checkpass(user, ps);
        }
        $scope.changeSubmit = () => {
            console.log("dghfed")
            document.querySelector("#reglod").style.display = "block";

            var ps = $scope.newpass;
            var user = JSON.parse(localStorage.USER);
            usermodel.changesubmit(user, ps);
        }
        $scope.logout = () => {
            localStorage.USER = " ";
            console.log(localStorage.USER);
            window.open("../../index.html", "_self");
        }
        $scope.block = (obj) => {
            var blockid = obj.target.attributes.id.value;
            usermodel.block(user.token, blockid);
        }
        $scope.sockettalk = (obj) => {
            var id = obj.target.attributes.id.value;
            var imageid = obj.target.attributes.gh.value;
            usermodel.like(imageid);
            SocketService.emit('toBackEnd', { roomId: id, action: 'L' });
        }
        $scope.supersockettalk = (obj) => {
            var id = obj.target.attributes.id.value;
            var imageid = obj.target.attributes.gh.value;
            usermodel.superlike(imageid);
            SocketService.emit('toBackEnd', { roomId: id, action: 'SL' });
        }
        SocketService.on('message', function (msg) {
            console.log("aagya mere paas bhi", msg);
            if (msg.action == 'L') {
                console.log("assa")
                if (Notification.permission !== 'granted')
                    Notification.requestPermission();
                else {
                    Notification.requestPermission(function () {
                        // console.log("Notify User");
                        var notify = new Notification('Notification title', {
                            icon: '',
                            body: 'Hey there! Someone like your image'
                        });
                        // setTimeout(function(){
                        //     notify.close();
                        // },1000);

                    });
                }
            }
            else if (msg.action == 'SL') {
                if (Notification.permission !== 'granted')
                    Notification.requestPermission();
                else {
                    Notification.requestPermission(function () {
                        // console.log("Notify User");
                        var notify = new Notification('Notification title', {
                            icon: '',
                            body: 'Hey there!' + msg.roomID + 'like your image'
                        });
                        // setTimeout(function(){
                        //     notify.close();
                        // },1000);

                    });
                }
            }
            // $scope.array.push(msg)
        });
    }
})