const formData=document.getElementsByClassName('authForm')[0]
const submitButton=document.getElementById('submit-button')
const message=document.getElementById('message')
const backendURL=window.localStorage.getItem('backend')


const root=window.localStorage.getItem('root')


console.log(backendURL)

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
        if (username.length<1 || password.length<1 || email.length<1){
            message.innerText="Please fill all the fields"  
            return
        }
        console.log(data)
        const maxAge=3*24*60*60
        fetch(backendURL+'saveUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            if (data.error){
                message.innerText=data.error+"*"
                throw new Error(data.error)
                return
            }
            document.cookie=`LOGIN_INFO=${data.token}; path=/; max-age=${maxAge*1000};secure=true;`;
            alert(data.message.username+" is registered successfully")
            window.location.href = root+""
        }).catch((err)=>{
            message.innerText=err+"*"
            console.log(err)
        })
    }
})