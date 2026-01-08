// atoms/counterAtom.ts
// import { atom } from "recoil"
import { atom } from "jotai";;

import { atomWithStorage } from 'jotai/utils';
import { ISettings } from "../hooks";
import { at } from "lodash";
interface IEnv{
    title:string,
    id?:string|number
    value:string
    edit?:boolean
    view?:boolean
 
}

interface IPagination{
    nextPage:number
    hasMore:false
    data:any[]
}

interface ILedgerStats{
  total: number
  approved: number


}
export interface IApp{
    name:string,
    id?:string
    _id:string
    createdAt:string
    updatedAt:string
    type?:string
    active:boolean
    region?:string
    monitor?:string
    server?:string
    status:string
    uptime:number
    description?: string

  requests: number
  avgresponseTime?: number
  servers: number
  user?: IUser|string
  primaryUrl?: string
}
interface IServer{
    name:string,
    location:string,
    id:string
    _id:string
    createdAt:string
    updatedAt:string
    type:string
    active?:boolean
    region?:string
    server?:string
    uptime:number
    description?: string
  status:string
  requests?: number
  avgresponseTime?: number
  servers?: number
  user: IUser
  primaryUrl?: string
}
interface IApps extends IPagination{
data:IApp[]
}
export interface IServers extends IPagination{
data:IServer[]
}
export interface ILedgers extends IPagination{
data:any[]
}
export interface IBanks extends IPagination{
data:any[]
}
interface IEnvProject{
    name:string,
    id:string
    _id:string
    key:string
    createdAt:string
}
interface ITeam{
    permission:string,
    id:string
    email:string
    name:string
    createdAt:string
}
export interface IUser{

bvnIsVerified?:boolean
    email:string
    username?:string
    _id?:string
    lastname?:string
    firstname?:string
    SGId?:string
    name:string
    createdAt:string
    secretPhrase?:string
}
export const envsstate = atom<IEnv[]>([{
  

    title:"secret",id:"",value:"qwersdgtfhgggfxdzsxczxczxczxczxczxczxczxc"
   ,
}]);


export const  appsstate = atom<IApps>({nextPage:1,hasMore:false,data:[]})
export const  serversstate = atom<IServers>({nextPage:1,hasMore:false,data:[]})


export const notsstate = atom<any>({
  

    // title:"secret",id:"",value:"qwersdgtfhgggfxdzsxczxczxczxczxczxczxczxc"
   
});
export const ledgerStatsState = atom<ILedgerStats>({
    total:0,
approved:0
  

    // title:"secret",id:"",value:"qwersdgtfhgggfxdzsxczxczxczxczxczxczxczxc"
   
});
export const ledgersState = atom<ILedgers>({data:[],  nextPage:0,
    hasMore:false});
export const banksState = atom<IBanks>({data:[],  nextPage:0,
    hasMore:false});


export const plansState = atom<any>([]);


export const sessioninitials ={
    user:
    null,
token:null,
password:null,
secretPhrase:null,
settings:null

  

   ,
}
export const authState = atomWithStorage<{user:IUser|null,token:string|null,password?:string|null,secretPhrase?:string|null,settings?:ISettings|null}|null>("auth",sessioninitials);




