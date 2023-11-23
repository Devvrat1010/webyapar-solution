const formData=document.getElementsByClassName('authForm')[0]
const submitButton=document.getElementById('submit-button')
const message=document.getElementById('message')
// const backendURL="https://backend-webyapar.onrender.com/"
const backendURL=window.localStorage.getItem('backend')
const root=window.localStorage.getItem('root')

submitButton.addEventListener('click',async (e)=>{
    e.preventDefault()
    const email=formData.email.value
    const password=formData.password.value
    const data={
        email: email,
        password: password
    }
    const maxAge=3*24*60*60
    fetch(backendURL+'loginUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response)=>
        response.json()
    )
    .then((res)=>{
        if (res.error){
            message.innerText=res.error+"*"
            return
        }
        document.cookie=`LOGIN_INFO=${res.token}; path=/; max-age=${60 * 60 * 24 * 14};secure=true;`;
        window.location.href = root+"index.html";
    })
    .catch((err)=>{
        console.log(err)
    })

})