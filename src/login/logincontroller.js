loginapp.controller("logincontroller", ($scope, loginmodel) => {
    document.querySelector("#reglod").style.display = "none";
    $scope.Submitdet = () => {
        var USERid = $scope.loginid;
        var USERpass = $scope.pass;
        $scope.loginid = "";
        $scope.pass = "";
        if (!(USERid) && !(USERpass)) {
            window.alert("!!BOTH FIELD REQUIRED!!");
        }
        else if (!(USERid)) {
            window.alert("!!FIELD REQUIRED!!");
        }
        else if (!(USERpass)) {
            window.alert("!!FIELD REQUIRED!!");
        }
        else {
            loginmodel.submit(USERid, USERpass);
        }
    }
})
