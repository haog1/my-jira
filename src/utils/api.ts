import qs from "qs";

import * as auth from "utils/auth-provider";
interface apiProps {
  baseUrl: string;
}

interface HttpRequestConfig extends RequestInit {
  data?: object;
  token?: string;
}

export const api: apiProps = {
  baseUrl: process.env.REACT_APP_API_URL || "",
};

export const request = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: HttpRequestConfig
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${api.baseUrl}/${endpoint}`, config)
    .then(async (res) => {
      if (res.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "Please sign in" });
      } else {
        const data = await res.json();
        if (res.ok) {
          return data;
        }
        return Promise.reject(data);
      }
    })
    .catch((err) => {});
};
