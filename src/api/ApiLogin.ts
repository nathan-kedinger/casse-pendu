import axios from "axios";
import {LoginType} from "@/types/LoginType";


const baseUrl = import.meta.env.VITE_APP_URL_API ;

export function loginPost(credentials: LoginType){
    axios.post(baseUrl + 'login_check', credentials, {
      withCredentials: true
    })
      .then(response => {
      return localStorage.setItem('userToken', response.data.token);
    })
      .catch(error => {
        console.error('Erreur d\'authentification', error);
      });
}


