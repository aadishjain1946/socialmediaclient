registerapp.controller('registercontroller', ($scope, registermodel) => {
    document.querySelector("#reglod").style.display = "none";
    $scope.Submitdet = ()=>{
        console.log("mcgbhdfj");
        var USERid = $scope.userid;
        var USERpass = $scope.password;
        var USERname = $scope.name;
        document.querySelector("#uID").value = "";
        document.querySelector("#uPass").value = "";
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
            registermodel.submit(USERid, USERpass, USERname);
        }
    }

})