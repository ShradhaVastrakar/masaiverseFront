

let form = document.querySelector("#admin-form")
const loader = document.getElementById('loader');

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let obj={
        name:form.name.value,
        age:form.age.value
    }
    loginData(obj)
})

async function loginData(obj){
    try {
        let login_request = await fetch("https://reqres.in/api/users",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        })
        if(login_request.ok){
            let data=await login_request.json()
            let userToken=data.token
            localStorage.setItem("token",userToken)
            localStorage.setItem("isAdminLoggedIn",true)
            window.location.href="data.html"
        }else{
            document.querySelector("#loader").innerHTML="Loading..."
        }
    } catch (error) {
        console.log(error)
    }
}

let logout = () => {
    window.location.href = "index.html"
}