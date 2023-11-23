
const backendURL="https://backend-webyapar.onrender.com/"

const jwtToken = document.cookie.split('; ').find(row => row.startsWith('LOGIN_INFO')).split('=')[1];

const loggedIn = document.getElementsByClassName('loginRoute')[0]
const signUp = document.querySelector('.signUpRoute')

signUp.addEventListener('click',()=>{
    window.location.href = "/webyapar-solution-frontend/library.html";
})

const loggedInFunctions=()=>{
    loggedIn.addEventListener('click',()=>{
        document.cookie=`LOGIN_INFO=; path=/; max-age=0;secure=true;`;
        window.location.href = "/webyapar-solution-frontend/login.html";
    })

}

if (jwtToken){
    signUp.href="library.html"
    loggedIn.innerText="Logout"
    signUp.childNodes[1].innerText="Library"
    loggedInFunctions()
}

fetch(backendURL+'checkUser', {
    method: 'GET',
    headers: {
        'Authorization': jwtToken , 
        'Content-Type': 'application/json',
    },
}).then((response)=>{
    return response.json()
}).then((data)=>{
    const username=document.getElementById('username')
    username.innerText=data.data[0].username
    localStorage.setItem('username',data.data[0].username)
}).catch((err)=>{
    loggedIn.innerText="Login"
    console.log(err,"not logged in i guess")
})