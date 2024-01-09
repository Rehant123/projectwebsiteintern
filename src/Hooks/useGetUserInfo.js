export const useGetUserInfo=()=>{
    const {username,isAuth} = JSON.parse(localStorage.getItem("auth"))||{};
    
return {username,isAuth}
}  