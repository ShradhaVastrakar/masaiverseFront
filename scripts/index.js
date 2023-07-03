let url = "https://masaiback-git-main-shradhavastrakar.vercel.app"


let form = document.querySelector("#userForm")

form.addEventListener("submit", (e)=>{
    e.preventDefault()
 
    let obj={
        name:form.name.value,
        age:form.age.value,
        place:form.place.value,
        image:form.image.value,
        profession:form.profession.value,
        batch:form.batch.value,
        profession:form.profession.value,
       }
       userPostData(obj)
       console.log(obj)
})

async function userPostData(obj){
    try {
        let data=await fetch(`${url}/users`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        })
        
            alert("Successfully registered, Your masaiverse ticket has been booked")
            
        
    } catch (error) {
        console.log(error)
    }
    }