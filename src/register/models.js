registerapp.factory('registermodel',(SERVER)=>{
    return{
        submit(USERid, USERpass, USERname) {
            document.querySelector("#reglod").style.display = "block";
            var pr = fetch(SERVER+'/register/register', {
                method: "POST",
                body: JSON.stringify({
                    userId: USERid,
                    password: USERpass,
                    Uname: USERname
                })
                // console.log(body);
            });
            pr.then(response => {
                response.text().then((data) => {
                    document.querySelector("#reglod").style.display = "none";
                    Data = JSON.parse(data);
                    if ((Data.status) != 'S') {
                        window.alert("USER ID exists or Something Went wrong please try again");
                    }
                    else if ((Data.status) == 'S') {
                        window.alert("SUCESSFULLY REGISTERD PLEASE LOGIN!!");
                        // console.log(Data);
                        window.open("../login/login.html", "_self");
                    }
                }).catch(err => {
                    console.log("error", err);
                })
            }).catch(err => {
                console.log(err);
            })
        }
    }
})