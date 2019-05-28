userapp.factory('usermodel', ($http, $q, SERVER) => {
    return {
        imageload(token, b) {
            let defer = $q.defer();
            $http.post(SERVER + "/login/imageload", {
                method: "POST",
                body: JSON.stringify({
                    token: token,
                    buser: b
                })
            }).then((data) => {
                defer.resolve(data);
            }, (error) => {
                defer.reject(error);
            });
            return defer.promise;
        },
        fetchname(token) {
            let defer = $q.defer();
            $http.post(SERVER + "/login/find", {
                method: "POST",
                body: JSON.stringify({
                    token: token
                })
            }).then((data) => {
                defer.resolve(data);
            }, (error) => {
                defer.reject(error);
            });
            return defer.promise;
        },
        blockload(token) {
            let defer = $q.defer();
            $http.post(SERVER + "/login/blockload", {
                method: "POST",
                body: JSON.stringify({
                    token: token,
                })
            }).then((data) => {
                defer.resolve(data);
            }, (error) => {
                defer.reject(error);
            });
            return defer.promise;
        },
        block(token, blockid) {
            var pr = fetch(SERVER + "/login/block?token=" + token + "&blockid=" + blockid)
            pr.then((Response) => {
                Response.text().then((data) => {
                    var val = JSON.parse(data);
                    if ((val.status) != 'S') {
                        window.alert(val.message);
                    }
                    // else if ((val.status) == 'S')
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            });

        },
        like(imgid) {
            var pr = fetch(SERVER + "/login/like?imgid=" + imgid)
            pr.then((Response) => {
                Response.text().then((data) => {
                    var val = JSON.parse(data);
                    if ((val.status) != 'S') {
                        window.alert(val.message);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            });

        },
        superlike(imgid) {
            var pr = fetch(SERVER + "/login/superlike?imgid=" + imgid)
            pr.then((Response) => {
                Response.text().then((data) => {
                    var val = JSON.parse(data);
                    if ((val.status) != 'S') {
                        window.alert(val.message);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            });

        },
        checkpass(user, ps) {
            var pr = fetch(SERVER + "/login/login", {
                method: "POST",
                body: JSON.stringify({
                    userId: user.userId,
                    password: ps
                })
            });
            pr.then((Response) => {
                document.querySelector("#reglod").style.display = "none";

                Response.text().then((data) => {
                    var val = JSON.parse(data);
                    if ((val.status) != 'S') {
                        document.querySelector("#Opass").classList.add("alert-danger");
                        window.alert("PASSWORD INCORRECT!!!!");
                        document.querySelector("#Opass").value = "";
                    }
                    else if ((val.status) == 'S')
                        document.querySelector("#Opass").classList.add("alert-success");
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            })
        },
        changesubmit(user, ps) {
            var pr = fetch(SERVER + "/login/update", {
                method: "POST",
                body: JSON.stringify({
                    userId: user.userId,
                    password: ps
                })
            });
            pr.then((Response) => {

                document.querySelector("#reglod").style.display = "none";

                Response.text().then((data) => {
                    var val = JSON.parse(data);
                    if ((val.status) == 'S') {
                        window.alert("PASSWORD CHANGED SUCCESSFULY");
                        window.open("user.html", "_self");
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            })

        }
    }
})