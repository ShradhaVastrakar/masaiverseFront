let page = 1
let token = localStorage.getItem("token")
let bag = []
let url = "https://masaiback-git-main-shradhavastrakar.vercel.app"


fetchedData();


async function fetchedData() {
    try {
      let data = await fetch(`${url}/users?_page=${page}&_limit=5`, {
        method: "GET",
      });
      if (data.ok == true) {
        let res = await data.json();
        bag = res
        renderData(res)
      }else{
          alert("something went wrong")
      }
    } catch (error) {
      console.log(error)
    }
  }



  function renderData(data){
    let container=document.querySelector("#container")
    container.innerHTML=""

    data.map((item)=>{
       let div2=document.createElement("div")
       let div1=document.createElement("div")

       let img=document.createElement("img")
       img.setAttribute("src",item.image)

       let name=document.createElement("h1")
       name.innerText=item.name

       let age=document.createElement("p")
       age.innerText=`Age: ${item.age}`

       let profession=document.createElement("p")
       profession.innerText=`Profession: ${item.profession}`

       let place=document.createElement("p")
       place.innerText=`Place: ${item.place}`

       let batch=document.createElement("p")
       batch.innerText=`Batch: ${item.batch}`

      
       let edtBtn=document.createElement("button")
       edtBtn.innerText="Edit"
       edtBtn.setAttribute("class","edit")
       edtBtn.setAttribute("data-id",item.id)

       let dltBtn=document.createElement("button")
       dltBtn.innerText="Delete"
       dltBtn.setAttribute("class","delete")
       dltBtn.setAttribute("data-id",item.id)

    
       div1.append(img,name,age,profession,place,batch,edtBtn,dltBtn)
       div2.append(div1)
       container.append(div2)
   })

   const editButtons = document.querySelectorAll('.edit');
      
   editButtons.forEach(button => {
     button.addEventListener('click', () => {
       const userId = button.dataset.id;
       window.location.href = `editUser.html?id=${userId}`;
    console.log(userId)
     });
   });

   

       let allDltBtn=document.querySelectorAll(".delete")
       for(let dltbtn of allDltBtn){
        dltbtn.addEventListener("click",(e)=>{
            let id=e.target.dataset.id
            deleteData(id)
        })
       }
}


async function deleteData(id){
    try {
        let data=await fetch(`${url}/users/${id}`,{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
                 Authorization:`Bearer ${token}`
              },
        })
        if(data.ok){
            renderData(data)
        }
    
    } catch (error) {
        console.log(error)
    }
}




document.querySelector("#sort").addEventListener("change",(e)=>{
    let val=e.target.value
    let sortData
    if(val==""){
        renderData(bag)
    }
    if(val=="asc"){
         sortData=bag.sort((a,b)=>a.age-b.age)
    }else if(val=="desc"){
        sortData=bag.sort((a,b)=>b.age-a.age)
    }
    renderData(sortData)
})

document.querySelector("#filter").addEventListener("change",(e)=>{
    let val=e.target.value
    if(val==""){
        renderData(bag)
    }else{
        let filterData=bag.filter((el)=>{
            return el.profession==val
        })
        renderData(filterData)
    }
})


let searchBtn=document.querySelector("#searchbtn")
searchBtn.addEventListener("click",function(){
   let val=document.querySelector("#search").value
   searchData(val)
})

function searchData(val){
    if(val==""){
        renderData(bag)
    }else{
      let searchData=bag.filter((el)=>{
        return el.name.toLowerCase().includes(val.toLowerCase())
      })
     renderData(searchData)
    }
}

let logout = () => {
    window.location.href = "index.html"
}