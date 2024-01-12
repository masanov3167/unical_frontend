import { userType } from "../types/user";

export const setCookie = (key: string, value: any, expiresInMinutes: number) => {
    try{
        const date = new Date();
        date.setTime(date.getTime() + (expiresInMinutes * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${key}=${JSON.stringify(value)};${expires};path=/`;
    }catch(e){
        console.log(e);
    }
  };
  
  export const getCookie = (key: string): any | null => {
    try{
        const name = `${key}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
    
        for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            const value = cookie.substring(name.length, cookie.length);
            return JSON.parse(value);
        }
        }
        return null;
    }catch{
        return null
    }
  };
  
  export const removeCookie = (key: string) => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  export function decodeJWT(token: string): userType | undefined {
    try {
      const tokenParts = token.split(".");
      if (tokenParts.length === 3) return JSON.parse(atob(tokenParts[1]));
    } catch (error) {
        console.log(error);
    }
  }