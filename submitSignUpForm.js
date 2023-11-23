const formData=document.getElementsByClassName('authForm')[0]
const submitButton=document.getElementById('submit-button')
submitButton.addEventListener('click',async (e)=>{
    e.preventDefault()
    const username=formData.username.value
    const email=formData.email.value
    const password=formData.password.value
    const confirmPassword=formData.confirmPassword.value
    if (password !== confirmPassword) {
        alert("Passwords don't match")
        return
    }
    else{
        const data={
            username: username,
            email: email,
            password: password
        }
        const maxAge=3*24*60*60
        
        fetch('http://localhost:3000/saveUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            document.cookie=`LOGIN_INFO=${data.token}; path=/; max-age=${maxAge*1000};secure=true;`;
            alert(data.message.username+" is registered successfully")
            window.location.href = "http://127.0.0.1:5500/frontend/"
        }).catch((err)=>{
            console.log(err)
        })
    }
})