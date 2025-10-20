const getToken = () => localStorage.getItem('token');
const isLogIn = () =>  localStorage.getItem('isLogIn');
const getUser = () =>  localStorage.getItem('userDetail');
const getUserObject = () => (!isEmptyObject(JSON.parse(getUser()))) ? JSON.parse(getUser()) : JSON.parse('{"data":{"FullName": "", "UserID": ""}}') ;
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}