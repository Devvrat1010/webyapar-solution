const formData=document.getElementsByClassName('authForm')[0]
const submitButton=document.getElementById('submit-button')
submitButton.addEventListener('click',async (e)=>{
    e.preventDefault()
    const email=formData.email.value
    const password=formData.password.value
    const data={
        email: email,
        password: password
    }
    const maxAge=3*24*60*60
    fetch('http://localhost:3000/loginUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response)=>
        response.json()
    )
    .then((res)=>{
        document.cookie=`LOGIN_INFO=${res.token}; path=/; max-age=${60 * 60 * 24 * 14};secure=true;`;
        window.location.href = "http://127.0.0.1:5500/frontend/index.html";
        
    })
    .catch((err)=>{
        console.log(err)
    })

})