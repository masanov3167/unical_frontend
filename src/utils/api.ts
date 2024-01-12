import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";

import { getCookie } from "./functions";
import { variables } from "./variables";

import { postBodyType, returnDeleteType, returnGetType, returnGetTypeData, returnPostType, returnPutType } from "../types/api";
import { QueryKey, useQuery } from "react-query";

export const poster = async (
  url: string,
  body: { data: postBodyType, json: boolean },
  nav?: NavigateFunction
) => {
  const result: returnPostType = { ok: false, data: null, msg: 'error' };

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
      result.data = response.data; 
      result.msg = 'ok';
    } else {
      result.msg = response.data.message || 'Request failed';
    }

    return result;
  } catch (error) {
    result.msg = JSON.stringify(error)
    return result;
  }
};

export const getter = async (url: string, nav: NavigateFunction) => {
  const result: returnGetType = { ok: false, data: null, msg: '' };

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
      result.data = response.data; 
      result.msg = response.data.message ?? 'ok';
      return result;
    } else {
      throw new Error(response.data.message ?? 'Request failed');
    }
  } catch (error) {
    result.msg = String(error)
    return result;
  }
};

export const deleter = async (url: string, nav?: NavigateFunction) => {
  const result: returnDeleteType = { ok: false, data: null, msg: 'error' };

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
      result.data = { id: response.data.id };
      result.msg = 'ok';
      return result;
    } else {
      result.msg = response.data.message ?? response.statusText; 
      return result;
    }
  } catch (error) {
    result.msg = JSON.stringify(error);
    return result;
  }
};

export const putter = async (
  url: string,
  body: { data: postBodyType, json: boolean },
  nav?: NavigateFunction
) => {
  const result: returnPutType = { ok: false, data: null, msg: 'error' };

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
      result.data = response.data;
      result.msg = 'ok';
    } else {
      result.msg = response.data.message || 'Request failed';
    }

    return result;
  } catch (error) {
    result.msg = JSON.stringify(error);
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
        return result.data as T; // Type assertion
      } else {
        throw new Error(result.msg ?? 'Failed to fetch data');
      }
    },
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );

  return { error, data, isLoading, refetch }; // Use 'isLoading' for consistency
};