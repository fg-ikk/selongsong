//const devAPIServer = "https://apipd.app.co.id:443/MLS%20Service%20Dev";
var devAPIServer = "https://apipd.app.co.id:443/MLS%20Service"
const getToken = () => localStorage.getItem('token');
const isLogIn = () =>  localStorage.getItem('isLogIn');
const getUser = () =>  localStorage.getItem('userDetail');
const getUserObject = () => (!isEmptyObject(JSON.parse(getUser()))) ? JSON.parse(getUser()) : JSON.parse('{"data":{"FullName": "", "UserID": ""}}') ;
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}