//const devAPIServer = "https://apipd.app.co.id:443/MLS%20Service%20Dev";
var devAPIServer = "https://apipd.app.co.id:443/MLS%20Service"
const getToken = () => localStorage.getItem('token');
const isLogIn = () =>  localStorage.getItem('isLogIn');
const getUser = () =>  localStorage.getItem('userDetail');
const getUserObject = () => (!isEmptyObject(JSON.parse(getUser()))) ? JSON.parse(getUser()) : JSON.parse('{"data":{"FullName": "", "UserID": ""}}') ;
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

const fetchPlus = (url, options = {}, retries) =>
  fetch(url, 
        Object.assign(options,
                      {retryOptions:  {
                  maxAttempts: retries,        // Max 3 retries (4 total attempts)
                  initialDelay: 500,    // Start with 500ms delay
                  backoffFactor: 2.0, // Double delay each time (500ms, 1s, 2s)
                  maxAge: 60000,        // Give up after 60 seconds total retry time
                  retryAfterUnload: true  // Allow retries to continue even if page closes
                  }
              })
            )
              
    //fetch(url, options)
    .then((res) => {
      if (res.status === 401) {
          funcLogout();
      }
      if (res.ok) {
        return res.json()
      }
      if (retries > 0) {
        return fetchPlus(url, options, retries - 1)
      }
      throw new Error(res.status)
    })
    .catch((error) => console.error(error.message));

function indoDate(datetime){
    return new Date(datetime).toLocaleString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                           })
}

const addOneDay = (dateString) => {
  let [day, month, year] = dateString.split('-')
  const currentDate = new Date(+year, +month - 1, +day)
  currentDate.setDate(currentDate.getDate()+1);
  return padZero(currentDate.getDate()) + '-' + padZero(currentDate.getMonth() + 1) + '-' + currentDate.getUTCFullYear();
}

const currentDate = () => {
  let currentDate = new Date();
  return padZero(currentDate.getDate()) + '-' + padZero(currentDate.getMonth() + 1) + '-' + currentDate.getUTCFullYear();
}

const convertDate = (dateString) => {
  let currentDate = new Date(dateString);
  return padZero(currentDate.getDate()) + '-' + padZero(currentDate.getMonth() + 1) + '-' + currentDate.getUTCFullYear();
}

const padZero = (num) => num < 10 ? '0' + num : num;

// Arrow function to get the parameter
// of the specified key
getParameter = (key) => {

    // Address of the current window
    address = window.location.search

    // Returns a URLSearchParams object instance
    parameterList = new URLSearchParams(address)

    // Returning the respected value associated
    // with the provided key
    return parameterList.get(key)
}

