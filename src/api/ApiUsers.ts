import {handleResponseCollection, handleResponseItem} from "@/api/ApiRessource";
import {LoginType} from "@/types/LoginType";

export function getUser(id: string): Promise<LoginType>{
  return handleResponseItem('users/' + id)
}

export function getUsers():Promise<LoginType[]>{
  return handleResponseCollection('users/')
}

export function createCookieSymfony(){
  return handleResponseItem('create-cookie')
}
