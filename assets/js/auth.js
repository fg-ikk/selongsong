
//getUser =  localStorage.getItem('userDetail');
//getToken =  localStorage.getItem('token');
//isLogIn =  localStorage.getItem('isLogIn');

if(getToken()==null){
    window.location.href = "login.html";
}


if(!isLogIn()){
    window.location.href = "login.html";
    localStorage.removeItem('token');
}
const funcLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLogIn');
        //isLogIn = false;
        window.location.href = "login.html";
}






if(getUser()=="undefined" || getUser()==null || isEmptyObject(JSON.parse(getUser()))){
    console.log("try getting user data");
    getUserDetail(getToken());
}


async function getUserDetail(token)
{
    await fetch(devAPIServer + '/api/tokenVerification', {
        method: 'GET',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        }
    })
    .then(response => {
        console.log(response.status); // Logs the numerical status code (e.g., 200, 404, 500)
        if (!response.ok) {
            // Handles non-2xx status codes (e.g., 404 Not Found, 500 Internal Server Error)
            console.log("Failed getting detail user");
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Or .text(), .blob(), etc., depending on content type)
        })
    .then(data => {
        
        
        console.log(data);
        localStorage.setItem('userDetail', JSON.stringify(data)); 
        //getUser =  localStorage.getItem('userDetail');
        //getUserObject = JSON.parse(getUser());
    
    })
    .catch(error => {
    console.error('Error:', error);
    console.log("Failed getting detail user");
    //getUserDetail(token);
    // Tangani error di sini
    })
    .finally(() => {
        //this.loading = false;
    });
}



