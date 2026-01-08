import toast from "react-hot-toast";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { appsstate, authState, banksState, IUser, ledgersState, ledgerStatsState, notsstate, plansState, serversstate, sessioninitials } from "@/states";
import { useCallback, useState } from "react";
import crypto from "crypto";
import { ADDENVURL, ADDLEDGERURL, CHANGEPASSWORdURL, CREATEAPPURL, CREATESERVERURL, CURRENTSUSCRIBTIONURL, DELETEAPPURL, DELETEENVURL, DELETELEDGERURL, DELETEPROJECTURL, DELETESERVERURL, FETCHAPPSURL, FETCHENVURL, FETCHLOGSURL, FETCHREQUESTSURL, FETCHSERVERSURL, GETAPPBYIDURL, GETBANKSURL, GETLEDGERBYIDURL, GETLEDGERSURL, GETPLANSURL, GETSERVERBYIDURL, GETSHELLSTATSURL, GETTRANASCTIONSURL, GETUSERSETIINGSURL, GETUSERSURL, LOGOUT, SETPLAYSTATUSSURL, SIGNUPURL, SUSCRIBEURL, UPDATEAPPURL, UPDATEBIOURL, UPDATEENVURL, UPDATELEDGERHIDDENSTATUSURL, UPDATELEDGERURL, UPDATESERVERURL, UPDATEUSERSETIINGSURL } from "./const";
// import { encrypt, encryptUserKey, generateKey, handleDecrypt, handleDecryptEnv, handleEncrypt, handleEncryptEnv } from "@/utils";
import _, { method, set } from "lodash";
import { plansVar } from "@/more";
import { generateKeyPair, handleDecryptKeyPairData, handleDecryptKeyPairLongData } from "./src/cryptic";

export const useFetch = () => {
  const {session} = useAuth()
 const router = useRouter();
  let apifetch = async ({
    url,
    options,
    auth = false,
    authToast,
    reqdata,
    requestEncriptedResponse
  }: {
    url: string;
    options?: any;
    auth?: boolean;
    authToast?: string | undefined | null;
    reqdata?: boolean;
    requestEncriptedResponse?:boolean
  }) => {
    // let token = localStorage.getItem("findtech_user_token") || "";
   let privateKey;
    let publicKey;
    if(requestEncriptedResponse){
      let key_= await generateKeyPair()
        console.log(key_,"key_key_")
        privateKey = key_.privateKey;
      publicKey = key_.publicKey;
    }
console.log(`${publicKey}`)

    let encrypt = requestEncriptedResponse && privateKey && publicKey;
    
    let response: any = await fetch(url, {
      credentials: "include",
      ...options,
      headers: {
        "Content-Type": "application/json",
        // ...((encrypt)?{"res-pkey":`${publicKey}`}:{}),

        authorization: `Bearer ${session?.token||""}`,

        ...(options?.headers || {}),
      },
    });
    let data: any = {};
 
    try {
      data = await response.json();
      console.log("response data",data)
// if(data.encryptedDat && encrypt){
  
//   // handleDecryptKeyPairLongData accept a json and retuens the decrypted json js object
//  data = await  handleDecryptKeyPairLongData({encryptedString:data,privateKey})
// }
    } catch (e) {}
    if (reqdata) {
      response.responseData = data;
      return response;
    }
    if (data?.auth && auth) {
      toast(authToast || "Please login to continue", {
        icon: "⚠️",
      });
    }
    if (data?.auth && auth) {
      router.push("/login");
    }
    return data;
  };

  return { apifetch };
};
export interface ISettings {
      twofactor: boolean
  notifications: boolean
  darkMode: boolean
  emailUpdates: boolean
  serverDownAlert: boolean
  performanceAlert: boolean
  weeklyReport: boolean
  productUpdate: boolean
  securityAlert: boolean
  autoSync: boolean
}
export const  useMediawQuery = (useMediaQuery:any)=>( {
     isMobileMicroDevice: useMediaQuery({
        query: "(max-device-width: 250px)",
      }),
     isMobileMicroPlusDevice: useMediaQuery({
        query: "(max-device-width: 290px)",
      }),
     isMobileMiniDevice: useMediaQuery({
        query: "(max-device-width: 350px)",
      }),
     isMobileMiniPlusDevice: useMediaQuery({
        query: "(max-device-width: 390px)",
      }),
     isMobileDevice: useMediaQuery({
        query: "(max-device-width: 480px)",
      }),
    
     isMobileDevicePlus: useMediaQuery({
        query: "(max-device-width: 550px)",
      }),
    
       isTabletDevice: useMediaQuery({
        query: "(max-device-width: 768px)",
      }),
       isTabletPlusDevice: useMediaQuery({
        query: "(max-device-width: 900px)",
      }),
  
       isLaptop : useMediaQuery({
        query: "(max-device-width: 1024px)",
    }),
    
     isDesktop :useMediaQuery({
        query: "(max-device-width: 1200px)",
      })
    
      , isBigScreen: useMediaQuery({
        query: "(max-device-width: 1201px )",
      })
})

export const useAuth=()=>{
  const [nots, setNots] = useAtom(notsstate);
  const [session, setSession] = useAtom(authState);
  let  router =   useRouter()

const login =({user,token,password}:{user:IUser,token:string,password?:string|null})=>{

  setSession({user,token,password})

}
const updateUser =({user}:{user:IUser})=>{

  setSession((prev :any)=>{

    return {...prev,user:{...((prev||{})?.user||{}),...user}}


  })

}
const updateSettings =({settings}:{settings:Record<string,any>})=>{

  setSession((prev :any)=>{

    return {...prev,settings:{...((prev||{})?.settings||{}),...settings}}


  })

}

const updateKey = (secret:string)=>{
  
  setSession((prev :any)=>{

    return {...prev,secretPhrase:secret}


  })

  if(secret){
  setTimeout(()=>{
  setSession((prev :any)=>{

    return {...prev,secretPhrase:null}


  })
  },1000*60 *3)
  }
}
const logout =()=>{

  setSession(sessioninitials)
  // setProjects(projectInitial)
  setNots({})

  router.push("/")


}


return {updateSettings,updateKey,logout,updateUser,login,session,isAuthenticated:session?.user && session?.token}

}



export const useAuthHelpers=  ()=>{
  const {apifetch} = useFetch()
  const {logout:lg} = useAuth()
  const [logOutLoading,setLogOutLoading] = useState(false)

  let logout = async ()=>{

    try {
  setLogOutLoading(true)
      await  apifetch({url:LOGOUT});
      await lg()
  
    }catch(e){
        toast.error(e?.message||"could not log out")
    }finally{
      setLogOutLoading(false)
    }
  }


  return {logout,logOutLoading}


}

export const useLedgers = ()=>{

const {apifetch} = useFetch()
const [addledgerLoading,setAddledgerLoading] = useState(false)
const [updateledgerLoading,setUpdateledgerLoading] = useState(false)
const [updateledgerHideStatusLoading,setUpdateledgerHideStatusLoading] = useState(false)
const [getbanksLoading,setGetBanksLoading] = useState(false)
const [deleteledgerLoading,setDeleteledgerLoading] = useState(false)
const [getledgerOneLoading,setGetledgerOneLoading] = useState(false)
const [getledgersLoading,setGetledgersLoading] = useState(false)

  const [ledgers, setLedgers] = useAtom(ledgersState);
  const [banks, setBanks] = useAtom(banksState);
  const {session} = useAuth()

  const lookupAccount = async ()=>{
   
  }
  const getTransactions = async ()=>{
   
  }
 const  addLedger = async (body:Record<string,any>)=>{
try{

  // let key = generateKey()
 
  // let hashedKey =await  handleEncrypt({data:key,passphrase:session?.secretPhrase as string})
  
  
setAddledgerLoading(true)
  let data = await  apifetch({url:ADDLEDGERURL,options:{method:"POST",body:JSON.stringify(body)}})
  if(data.success){
    toast.success(data?.message||"ledger created")
    setLedgers((prev)=>{

      // return {...prev,data:[...prev.data,data.data]}
        return {...prev,data:_.uniqBy([data.data,...prev.data],"_id")}
    })
    return data
  }else{
    toast.error(data?.message||"An error occured")

  }
}catch(e:any){
  toast.error(e?.message||"An error occured")
  throw(e)


}finally{
  setAddledgerLoading(false)
}

  }
 const  updateLedger = async (id:string,body:Record<string,any>)=>{
try{

  // let key = generateKey()
 
  // let hashedKey =await  handleEncrypt({data:key,passphrase:session?.secretPhrase as string})
  
  
setUpdateledgerLoading(true)
  let data = await  apifetch({url:UPDATELEDGERURL+`?id=${encodeURIComponent(id)}`,options:{method:"POST",body:JSON.stringify(body)}})
  if(data.success){
    toast.success(data?.message||"ledger updated")
    setLedgers((prev)=>{

      return {...prev,data:_.uniqBy([data.data,...prev.data],"_id")}
    })
    return data
  }else{
    toast.error(data?.message||"An error occured")

  }
}catch(e:any){
  toast.error(e?.message||"An error occured")
  throw(e)


}finally{
  setUpdateledgerLoading(false)
}

  }
 const  updateHideStatusLedger = async (id:string,ishidden)=>{
try{

  // let key = generateKey()
 
  // let hashedKey =await  handleEncrypt({data:key,passphrase:session?.secretPhrase as string})
  
  
setUpdateledgerHideStatusLoading(true)
  let data = await  apifetch({url:UPDATELEDGERHIDDENSTATUSURL+`?id=${encodeURIComponent(id)}&ishidden=${encodeURIComponent(ishidden)}`,options:{method:"GET"}})
  if(data.success){
    toast.success(data?.message||"ledger hide status updated")
    setLedgers((prev)=>{

      return {...prev,data:_.uniqBy([data.data,...prev.data],"_id")}
    })
    return data
  }else{
    toast.error(data?.message||"An error occured")

  }
}catch(e:any){
  toast.error(e?.message||"An error occured")
  throw(e)


}finally{
  setUpdateledgerHideStatusLoading(false)
}

  }
const getBanks = async ({ name }: { name?: string }) => {
  setGetBanksLoading(true);

  try {
    const query = name ? `?name=${encodeURIComponent(name)}` : "";
    const data = await apifetch({ url: GETBANKSURL + query });

    if (!data?.success) {
      throw new Error(data?.message || "Failed to fetch banks");
    }
   setBanks((prev)=>{

      return {...prev,data:_.uniqBy([...prev.data,...(data.data||[])],"_id")}
    })
    return data;
  } catch (e: any) {
    toast.error(e?.message || "An error occurred");
    throw e;
  } finally {
    setGetBanksLoading(false);
  }
};


 const  deleteLedger = async (id:string)=>{
try{

 
  
setDeleteledgerLoading(true)
  let data = await  apifetch({url:DELETELEDGERURL+`?id=${id}`,options:{method:"DELETE",
    // body:JSON.stringify({...body,hashedKey})
  }})
  if(data.success){
    toast.success(data?.message||"ledger deleted")
    setLedgers((prev)=>{

      return {...prev,data:prev.data.filter((e:any)=>{return e._id!=id})}
    })

    return data
  }else{
    toast.error(data?.message||"An error occured")

  }
}catch(e:any){
  throw(e)

      // toast.error(e?.message||"An error occured")

}finally{
  setDeleteledgerLoading(false)
}

  }
 const  getLedegerById = async (id:string)=>{
try{

 
  
setGetledgerOneLoading(true)
  let data = await  apifetch({url:GETLEDGERBYIDURL+`?id=${id}`,requestEncriptedResponse:true})
  if(data.success){
   
    // toast.success(data?.message||"project deleted")
    // setEnvsProject((prev)=>{

    //   return {...prev,data:prev.data.filter((e:any)=>{return e._id!=id})}
    // })
  }else{
    toast.error(data?.message||"An error occured")

  }
   return data
}catch(e:any){
  throw(e)

      // toast.error(e?.message||"An error occured")

}finally{
  setGetledgerOneLoading(false)
}

  }
 const  getLedgers = async ()=>{
try{
setGetledgersLoading(true)
  let data = await  apifetch({url:GETLEDGERSURL})
  if(data.success){
      setLedgers((prev)=>{

      return {...prev,...data.data,data:_.uniqBy([...prev.data,...data.data],"_id")}
    })
    // toast.success(data?.message||"project created")
    
  }else{
    toast.error(data?.message||"An error occured")

  }
}catch(e:any){

      toast.error(e?.message||"An error occured")

}finally{
  setGetledgersLoading(false)
}

  }
// 


return {
  addLedger,getTransactions,lookupAccount,deleteLedger,updateHideStatusLedger,updateledgerHideStatusLoading,deleteledgerLoading,getLedegerById,getLedgers,getBanks,addledgerLoading,setAddledgerLoading,updateLedger,updateledgerLoading
}
  

}



export const useSettings = ()=>{
const{session,updateUser,updateSettings}=useAuth()
let {apifetch} = useFetch()
  const updateBio = async ({body}:{body:Record<string,string>})=>{
    try{
let v =await apifetch({url:UPDATEBIOURL,options:{method:"POST",body:JSON.stringify(body)}})
if(v.success){
  console.log(v,"vvvvvv")
  toast.success(v?.message||"Bio updated successfully")
  updateUser({user:v?.data||{}})
  return v
}else{
  toast.error(v?.message||"An error occured")
}



    }catch(e:any){
       toast.error(e?.message||"An error occured")

    }
  }
  const changePassword = async ({body}:{body:Record<string,string>})=>{
    try{
let v =await apifetch({url:CHANGEPASSWORdURL,options:{method:"POST",body:JSON.stringify(body)}})
if(v.success){
 
  toast.success(v?.message||"password updated successfully")
  updateUser({user:v?.data||{}})
  return v
}else{
  toast.error(v?.message||"An error occured")
}



    }catch(e:any){
       toast.error(e?.message||"An error occured")

    }
  }
  const updateUserSetting = async ({body}:{body:Record<string,any>})=>{
    try{
      updateSettings({settings:{[body.key as keyof ISettings]:body.value}})
let v =await apifetch({url:UPDATEUSERSETIINGSURL,options:{method:"POST",body:JSON.stringify({[body.key as keyof ISettings]:body.value})}})
if(v.success){
  console.log(v,"vvvvvv")
  toast.success(v?.message||"Settings updated successfully")
  return v
}else{
        updateSettings({settings:{[body.key as keyof ISettings]:body.prevalue}})
  toast.error(v?.message||"An error occured")
}


}catch(e:any){
      updateSettings({settings:{[body.key as keyof ISettings]:body.prevalue}})
       toast.error(e?.message||"An error occured")

    }
  }
  const getUserSettings = async ()=>{
    try{
      let v =await apifetch({url:GETUSERSETIINGSURL})
      if(v.success){

        console.log("settings,",v)
  updateSettings({settings:v.data||{}})
  console.log(v,"vvvvvv")
  // toast.success(v?.message||"Settings updated successfully")
  return v
}else{
        // updateSettings({settings:{[body.key as keyof ISettings]:body.prevalue}})
  toast.error(v?.message||"An error occured")
}


}catch(e:any){
      // updateSettings({settings:{[body.key as keyof ISettings]:body.prevalue}})
       toast.error(e?.message||"An error occured")

    }
  }

  return {updateBio,updateUserSetting,getUserSettings,changePassword}
}


export const useUsers = ()=>{



  let {apifetch} = useFetch()
  const getUsers = async ({body}:{body:Record<string,any>})=>{
        try{
      let v =await apifetch({url:GETUSERSURL,options:{method:"POST",body:JSON.stringify(body)}})
      if(v.success){

  // toast.success(v?.message||"Settings updated successfully")
  return v
}else{
        // updateSettings({settings:{[body.key as keyof ISettings]:body.prevalue}})
  toast.error(v?.message||"An error occured")
}


}catch(e:any){
      // updateSettings({settings:{[body.key as keyof ISettings]:body.prevalue}})
       toast.error(e?.message||"An error occured")

    }
  }


  return {getUsers}


}




export const usePayment =()=>{
const {apifetch}= useFetch()
const [plans,setplans]= useAtom(plansState)
 const fetchPlans = async ()=>{
  let response = await apifetch({url:GETPLANSURL})

  if(response.success){
    setplans(()=>{
return response.data

    })

  }
 }

 const plansmemo = useCallback((annually=false)=>{
  let v = plansVar.map(e=>{
let d = plans.find(ee=>ee.title.toLowerCase() == e.name.toLowerCase() && ee.interval==(annually?"annually":"monthly"))
if(d){
  // let obj = {
  //   annually?
  // }
return {...e,...d}
}

console.log(d,plans)

return {...e,title:e.name}
  })

  return v
 },[plans])

 const getcheckoutUrl = async ({plan_code}:{plan_code:string})=>{
   let response = await apifetch({url:SUSCRIBEURL,options:{body:JSON.stringify({plan_code}),method:"POST"}})
   console.log(response,"rrrrr")
if(response.success){
    //  const data = await res.json();
    window.location.href = response.data.authorization_url;
}
   return response

 }

 const getcurrentsubscription= async ()=>{

  // let plans = plansmemo()

  try{

    let response = await apifetch({url:CURRENTSUSCRIBTIONURL})
  
    if(response.success && response.data){
      let data = response.data

      if(data.interval=="annually"){

        let v = plansmemo(true).find(e=>e.title.toLowerCase()==data.title.toLowerCase())
        return {...v,...data}

      }

      let v = plansmemo(false).find(e=>e.title.toLowerCase()==data.title.toLowerCase())
        return {...v,...data}

    }else{
      return plansVar[0]
    }
  }catch(e){
       return plansVar[0]
}
 }

 const gettransactions = async ()=>{
  try{

    let response = await apifetch({url:GETTRANASCTIONSURL})

    return response
  }catch(e){

  }
 }


 return {fetchPlans,getcheckoutUrl,plansmemo,getcurrentsubscription,gettransactions}
}