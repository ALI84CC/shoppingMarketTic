import http from "../../http-common";

interface Login {
  email: string,
  password:string,
}

interface ReturnDataLogin {
  result: {acessToken: string},
  user:{email:string, username:string, id:number}
}

interface SaveLoginUser{
  acessToken:string,
  user:{email:string, username:string, id:number}
}


const AuthService= {
 async autenticate(data:Login){
  const response = await http.post<ReturnDataLogin>("/login",data)

  return response.data
 },

 setLoggedUser(data: ReturnDataLogin){
  const parsedData= JSON.stringify(data)
  localStorage.setItem("user",parsedData)
 },

 getLoggedUser(){
  const data = localStorage.getItem("user")
  if(!data) return null
  try{
    const parsedData: SaveLoginUser = JSON.parse(data)
    return parsedData
  } catch (error){
    console.error(error)
    return null
  }
 },

 cleanLoggedUser(){
  localStorage.clear()
 }
}


export default AuthService
