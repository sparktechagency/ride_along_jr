import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface BaseQueryArgs extends AxiosRequestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
}

// Type for the args that will be passed to axios (base query arguments)

const baseQueryWithRath: BaseQueryFn<BaseQueryArgs, unknown, unknown> = async (
  args,
  api,
  extraOptions
) => {
  try {
    const token = await AsyncStorage.getItem("token");

    // console.log(token);

    const result: AxiosResponse = await axios({
      baseURL: "http://10.10.10.70:5051/api",
      // baseURL: "http://157.245.63.191/api",
      ...args,
      url: args.url,
      method: args.method,
      data: args.body,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        ...args.headers,
      },
    });

    // console.log(result);

    return { data: result?.data };
  } catch (error: any) {
    if (error?.status === 401) {
      localStorage.removeItem("token");
    }
    if (error.response?.data) {
      // if (typeof error.response?.data === "string") {
      //   const withCurly = (error.response.data += "}");

      //   return { error: JSON.parse(withCurly) };
      // } else {
      return { error: error.response?.data };
    }
    // }
    return {
      error: {
        status: error.response?.status || 500,
        data: error.message || "Something went wrong",
      },
    };
  }
};

// Define the `createApi` with appropriate types
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRath,
  endpoints: () => ({}),
  tagTypes: ["user"],
});

// export const imageUrl = 'http://192.168.12.160:7000/';
const imageUrl = "http://10.10.10.70:5051";

export const makeImage = (image: string | null | undefined) => {
  if (!image) return null;
  return `${imageUrl}/${image}`;
};
