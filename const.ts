export const APPNAME = "StemGate"
export const APPNAME_3 = "stemgate"
export const APPNAME_4 = "stemGate"
export const APPNAME_5 = "STEMGATE"
export const APPNAME_2 = "SG"
export const APPMAIL = "netiflow"
const production = false
export const SERVERDOMAIN =production?"https://balancer-zyqr.onrender.com": "http://172.20.10.3:5002";
export const DOMAIN = production?"https://netiflow.vercel.app":"http://localhost:3000";
export const LIBAPIDOMAIN = production?"https://netiflow.vercel.app":"http://localhost:3000";
export const BALANCERHOST = production?"balancer-router.onrender.com":"localhost:5003";
export const BALANCERPROTOCOL = production?"https://":"http://"
export const DOMAINAPI = DOMAIN +"/api";
export const GITHUBURL = DOMAINAPI + "/auth/github"
export const GOOGLEURL = DOMAINAPI + "/auth/google"
export const GOOGLECALLBACKURL = DOMAINAPI + "/auth/google/callback"
export const GITHUBCALLBACKURL = DOMAINAPI + "/auth/github/callback"
export const SIGNUPURL =DOMAINAPI+"/auth/signup"
export const LOGINURL =DOMAINAPI+"/auth/login"
export const CREATESECRETPHRASEURL =DOMAINAPI+"/auth/create-secret-phrase"
export const VERIFYSECRETPHRASEURL =DOMAINAPI+"/auth/verify-secret-phrase"
export const VERIFYOTP =DOMAINAPI+"/auth/verify-otp"
export const VERIFYEMAILURL =DOMAINAPI+"/auth/verify-email"
export const RESENDOTP =DOMAINAPI+"/auth/resend-otp"
export const RESETPASSWORD =DOMAINAPI+"/auth/reset-password"
export const FORGOTPASSWORD =DOMAINAPI+"/auth/forgot-password"
export const LOGOUT =DOMAINAPI+"/auth/logout"
export const ADDLEDGERURL = DOMAINAPI +"/ledger/add"
export const UPDATELEDGERURL = DOMAINAPI +"/ledger/update"
export const UPDATELEDGERHIDDENSTATUSURL = DOMAINAPI +"/ledger/update-hide-status"
export const GETBANKSURL = DOMAINAPI +"/ledger/banks"
export const GETLEDGERBYIDURL = DOMAINAPI +"/ledger/one"
export const GETLEDGERSURL= DOMAINAPI +"/ledger"
export enum OTPTYPE {
  forgotPassword = "forgotPassword",
  emailVerification = "emailVerification",
}

export const CREATEAPPURL = DOMAINAPI +"/apps/create"
export const UPDATEAPPURL = DOMAINAPI +"/apps/update"
export const CREATESERVERURL = DOMAINAPI +"/apps/create/server"
export const UPDATESERVERURL = DOMAINAPI +"/apps/update/server"
export const ADDENVURL = DOMAINAPI +"/projects/env/add"
export const FETCHENVURL = DOMAINAPI +"/projects/env"
export const UPDATEENVURL = DOMAINAPI +"/projects/env/update"
export const DELETEENVURL = DOMAINAPI +"/projects/env"
export const UPDATEBIOURL = DOMAINAPI +"/auth/update-user-biodata"
export const CHANGEPASSWORdURL = DOMAINAPI +"/auth/change-password"
export const UPDATEUSERSETIINGSURL = DOMAINAPI +"/auth/user-settings"
export const GETUSERSETIINGSURL = DOMAINAPI +"/auth/user-settings"
export const GETUSERSURL = DOMAINAPI +"/auth/find-users"
export const DELETEPROJECTURL = DOMAINAPI +"/projects"
export const DELETELEDGERURL = DOMAINAPI +"/ledger"
export const DELETEAPPURL = DOMAINAPI +"/apps"
export const DELETESERVERURL = DOMAINAPI +"/apps/server"
export const GETAPPBYIDURL = DOMAINAPI +"/apps/one"
export const GETSERVERBYIDURL = DOMAINAPI +"/apps/one/server"
export const GETSHELLSTATSURL = DOMAINAPI +"/apps/shell-stat"
export const FETCHAPPSURL = DOMAINAPI +"/apps"
export const FETCHSERVERSURL = DOMAINAPI +"/apps/servers"
export const SETPLAYSTATUSSURL = DOMAINAPI +"/apps/set-play-status"
export const FETCHLOGSURL = DOMAINAPI +"/apps/logs"
export const FETCHREQUESTSURL = DOMAINAPI +"/apps/requests"
export const INVITECOLABURL = DOMAINAPI +"/projects/invite-collab"
export const GETCOLABURL = DOMAINAPI +"/projects/get-collab"
export const GETTEAMMEMBERSURL = DOMAINAPI +"/projects/get-team-members"
export const REMOVETEAMMEMBERSURL = DOMAINAPI +"/projects/remove-team-members"
export const ACCEPTCOLABURL = DOMAINAPI +"/projects/accept-collab"
export const DECLINECOLABINVITEURL = DOMAINAPI +"/projects/decline-collab-invite"
export const NOTIFICATIONURL = DOMAINAPI +"/nots"
export const GETPLANSURL = DOMAINAPI +"/payment/plans"
export const SUSCRIBEURL = DOMAINAPI +"/payment/suscribe"
export const CURRENTSUSCRIBTIONURL = DOMAINAPI +"/payment/current-subscription"
export const GETTRANASCTIONSURL = DOMAINAPI +"/payment/transactions"

// export const APPNAME = "Xavren"

export const  creditVersion =true
export const  creditDurationMonth =3



export const SUBDOMAINSUPPORT = false

export const getbalancerurl =(appname:string)=>{



  if(SUBDOMAINSUPPORT){
return `${BALANCERPROTOCOL}${appname}.${BALANCERHOST}`
  }
else{
return `${BALANCERPROTOCOL}${BALANCERHOST}/${appname}`
}
}