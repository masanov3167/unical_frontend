import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";

import { getCookie } from "./functions";
import { variables } from "./variables";

import { IApiReturn } from "../types/api";
import {  useQuery } from "react-query";

export const poster = async <T,K>(
  url: string,
  body: { data: K, json: boolean },
  nav?: NavigateFunction
) : Promise<IApiReturn<T>> =>  {
  const result: IApiReturn<T> = { ok: false, data: null, msg: 'error' };

  try {
    const headers: Record<string, string> = {
      'Content-Type': body.json ? 'application/json' : 'multipart/form-data',
    };

    if (nav) {
      const token = await getCookie('token');
      if (!token) {
        nav('/login');
      }
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.post(`${variables.baseUrl}/${url}`, body.data, {
      headers,
    });

    if (response.status === 401) {
      //token eskirgan bo'lsa tozalab loginga navigate qilish kerak
    }

    if (response.status === 201 || response.status === 200) {
      result.ok = true;
      result.data = response.data as T; 
      result.msg = 'ok';
    } else {
      result.msg = response.data?.message || 'Request failed';
    }

    return result;
  } catch (error) {
    result.msg = String(error);
    return result;
  }
};

export const getter = async <T>(url: string, nav: NavigateFunction):Promise<IApiReturn<T>> => {
  const result: IApiReturn<T> = { ok: false, data: null, msg: '' };

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = await getCookie('token');
    if (!token) {
      nav('/login');
    }

    headers['Authorization'] = `Bearer ${token}`;

    const response = await axios.get(`${variables.baseUrl}/${url}`, {
      headers,
    });

    if (response.status === 200) {
      result.ok = true;
      result.data = response.data as T; 
      result.msg = response.data.message ?? 'ok';
    } else {
      result.msg = response.data?.message || 'Request failed';
    }
    return result
  } catch (error) {
    result.msg = String(error)
    return result;
  }
};

export const deleter = async (url: string, nav?: NavigateFunction): Promise<IApiReturn<number>> => {
  const result: IApiReturn<number> = { ok: false, data: null, msg: 'error' };

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (nav) {
      const token = await getCookie('token');
      if (!token) {
        nav('/login');
      }
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.delete(`${variables.baseUrl}/${url}`, {
      headers,
    });

    if (response.status === 200) {
      result.ok = true;
      result.data =  response.data.id  as number;
      result.msg = 'ok';
    } else {
      result.msg = response.data?.message || 'Request failed';
    }
    return result;
  } catch (error) {
    result.msg = String(error)
    return result;
  }
};

export const putter = async <T,K>(
  url: string,
  body: { data: K, json: boolean },
  nav?: NavigateFunction
):Promise<IApiReturn<T>> => {
  const result: IApiReturn<T> = { ok: false, data: null, msg: 'error' };

  try {
    const headers: Record<string, string> = {
      'Content-Type': body.json ? 'application/json' : 'multipart/form-data',
    };

    if (nav) {
      const token = await getCookie('token');
      if (!token) {
        nav('/login');
      }
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.put(`${variables.baseUrl}/${url}`, body.data, {
      headers,
    });

    if (response.status === 201 || response.status === 200) {
      result.ok = true;
      result.data = response.data as T;
      result.msg = 'ok';
    } else {
      result.msg = response.data?.message || 'Request failed';
    }

    return result;
  } catch (error) {
    result.msg = String(error)
    return result;
  }
};

export const useGet = <T>(
  url: string,
  enabled?: boolean
): {
  error: Error | null;
  data: T | undefined;
  isLoading: boolean;
  refetch: () => void;
} => {
  const nav = useNavigate();

  const { isLoading, error, data, refetch } = useQuery<T, Error>(
    url,
    async () => {
      const result = await getter(url, nav);
      if (result.ok && result.data) {
        return result.data as T; 
      } else {
        throw new Error(result.msg ?? 'Failed to fetch data');
      }
    },
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );

  return { error, data, isLoading, refetch }; 
};