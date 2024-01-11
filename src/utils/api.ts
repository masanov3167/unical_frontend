import { NavigateFunction } from "react-router-dom";
import { postBodyType, returnDeleteType, returnGetType, returnPostType, returnPutType } from "../types/api";
import { getCookie } from "./functions";
import { variables } from "./variables";

export const poster = async (
    url: string,
    body: {data: postBodyType, json: boolean},
    nav?:NavigateFunction
  ) => {
      const result: returnPostType = { ok: false, data: null, msg: "error" };
    try {
      const headers: Record<string, string> = {
        "Content-Type": body.json ? "application/json" :"multipart/form-data",
      };

      if(nav){
        const token = await getCookie("token")
        if (!token) {
          nav("/login")
        }
        headers["Authorization"] = `Bearer ${token}`;
      }      
      const response = await fetch(
        `${variables.baseUrl}/${url}`,
        {
          method: "POST",
          headers,
          body: body.json ? JSON.stringify(body.data) : body.data,
        }
      );
        
      if (response.status === 401) {
          //cookieni tozalab loginga navigate
        }
        
        const data = await response.json();      
        if (!(response.status === 201 || response.status === 200)) {          
            result.msg = String(data.message);
            return result
        } 
        result.ok = true;
        result.data = data;
        result.msg = "ok";
        return result;
    } catch (error) {
      console.log(error);
      result.msg = String(error)
      return result;
    }
};

export const getter = async (url: string, nav: NavigateFunction) => {
  const result: returnGetType = { ok: false, data: null, msg: "" };
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const token = getCookie("token");
    if (!token) {
      nav("/login");
    }
    
    headers["Authorization"] = `Bearer ${token}`;
    const response = await fetch(
      `${variables.baseUrl}/${url}`,
      {
        method: "GET",
        headers,
      }
    );
    const data = await response.json();   
    if(response.status === 401){
      //tokenni tozalab naviagte login
    }     
    if (response.status === 200) {
      result.ok = true;
      result.data = data;
      result.msg = data?.message ?? "ok" ;
      return result;
    }
     throw new Error(data?.message ?? "Error")
  } catch (error) {
    result.msg = String(error);
    return result;
  }
};

export const deleter = async (url: string, nav?: NavigateFunction) => {
  const result: returnDeleteType = { ok: false, data: null, msg: "error" };
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (nav) {
      const token = getCookie("token");
      if(!token){
        nav("/login");
      }
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(
      `${variables.baseUrl}/${url}`,
      {
        method: "DELETE",
        headers,
      }
    );
    if (response.status === 401) {
      //tokenni tozalab loginga qaytarish kerak
    }
    console.log(response);
    
    const data = await response.json().catch(() => {
      return {message: response.statusText}
    });
    
    if (response.status === 200) {
      result.ok = true;
      result.data = {id: data.id};
      result.msg = "ok";
      return result;
    } else {
      result.msg = data?.message ?? "error"
      return result;
    }
  } catch (error) {
    result.msg = String(error)
    return result;
  }
};

export const putter = async (
  url: string,
  body: {data: postBodyType, json: boolean},
  nav?:NavigateFunction
) => {
    const result: returnPutType = { ok: false, data: null, msg: "error" };
  try {
    const headers: Record<string, string> = {
      "Content-Type": body.json ? "application/json" :"multipart/form-data",
    };

    if(nav){
      const token = await getCookie("token")
      if (!token) {
        nav("/login")
      }
      headers["Authorization"] = `Bearer ${token}`;
    }      
    const response = await fetch(
      `${variables.baseUrl}/${url}`,
      {
        method: "PUT",
        headers,
        body: body.json ? JSON.stringify(body.data) : body.data,
      }
    );
      
    if (response.status === 401) {
        //cookieni tozalab loginga navigate
      }
      
      const data = await response.json();      
      if (!(response.status === 201 || response.status === 200)) {          
          result.msg = String(data.message);
          return result
      } 
      result.ok = true;
      result.data = data;
      result.msg = "ok";
      return result;
  } catch (error) {
    console.log(error);
    result.msg = String(error)
    return result;
  }
};