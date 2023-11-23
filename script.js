const reader = new FileReader();
const fileInput = document.getElementById("file");
const img = document.getElementById("img");

let loggedIn=false
// get request in js
const allImages=document.getElementsByClassName('images')[0]

const currentUser=localStorage.getItem('username')

// console.log(currentUser,"currentUser")

const getImage = async () => {

    const data=await fetch('http://localhost:3000/getImage?username='+currentUser)
    const check=await data.json()
    const im=check[0].image
    // for (let i=0;i<3;i++){
    //     console.log(check[0].image[i])
    //     im.push(check[0].image[i])
    // }
    // console.log(im,"imaaaaa")
    im.forEach(element => {
        const img=document.createElement('img')
        const imgContainer=document.createElement('div')
        imgContainer.className='imgContainer'
        img.className='mainImage'
        img.src=element 
        allImages.appendChild(imgContainer)
        imgContainer.appendChild(img)
        imageFunctions(imgContainer,img)
    });
}


const imageFunctions=(imgContainer,img)=>{
    const imageFunctionsContainer=document.createElement('div')
    imageFunctionsContainer.className='imageFunctionsContainer'
    const imageRotate=document.createElement('button')
    const imageExpand=document.createElement('button')
    const imageDelete=document.createElement('button')

    imgContainer.appendChild(imageFunctionsContainer)

    imageFunctionsContainer.appendChild(imageRotate)
    imageFunctionsContainer.appendChild(imageExpand)
    imageFunctionsContainer.appendChild(imageDelete)

    imageRotate.className='imageFunctions'
    imageRotate.classList.add('getStarted')
    imageRotate.innerText='rotate'
    
    
    imageExpand.className='imageFunctions'
    imageExpand.classList.add('getStarted')
    imageExpand.innerText='expand'
    
    imageDelete.className='imageFunctions'
    imageDelete.classList.add('getStarted')
    imageDelete.innerText='delete'
    let num=0
    expandOnClick(img,imageExpand,imgContainer)
    rotateOnClick(img,imageRotate,num)
    deleteOnClick(img,imageDelete,imgContainer)

}

const deleteOnClick=(img,imageDelete,imgContainer)=>{
    imageDelete.addEventListener('click',()=>{
        // imgContainer.remove()
        fetch('http://localhost:3000/deleteImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({image:img.src})
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log(data,"data")
            imgContainer.remove()
        }).catch((err)=>{
            console.log(err)
        })
    })
}

const rotateOnClick=(img,imageRotate,num)=>{
    imageRotate.addEventListener('click',()=>{
        num+=90
        img.style.rotate=num.toString()+'deg'        

    })
}


const expandOnClick=(img,imageExpand,imgContainer)=>{
    imageExpand.addEventListener('click',()=>{
        img.classList.toggle('expand')
    })
}

const postImage = async (imgData) => {
    const data={
        "image":imgData,
        "username":currentUser
    }
    const res = await fetch("http://localhost:3000/saveImage", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    const json = await res.json();
}

function getCookie() {
    try{
        const jwtToken = document.cookie.split('; ').find(row => row.startsWith('LOGIN_INFO')).split('=')[1];
        if (jwtToken) {
            getImage()
            return true
        }
        else{
            
            return false
        }
    }
    catch(err){
        const message=document.getElementsByClassName('message')[0]
        message.innerText="Unauthorized Access 😕"
        const files=document.getElementsByClassName('files')[0]
        files.style.display='none'  
        return false
    }
    
}
loggedIn=getCookie()


reader.onload = e => {
    postImage(e.target.result);
}

fileInput.addEventListener('change', e => {
  const f = e.target.files[0];
  reader.readAsDataURL(f);
})


