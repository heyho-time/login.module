import axios from "axios";
import cookies from "js-cookie";

type AxiosOptions = {
  method: string;
  url: string;
  headers?: {
    Authorization: string;
  };
  data?: object;
};

export default class http {
  setToken(data: { access: string; refresh: string }) {
    cookies.set("accessToken", data.access, { expires: 1 });
    cookies.set("refreshToken", data.refresh, { expires: 7 });
  }

  checkRefreshToken() {
    const refreshToken = cookies.get("refreshToken");
    if (!refreshToken) {
      return;
    }
    return refreshToken;
  }

  checkAccessToken() {
    const accessToken = cookies.get("accessToken");
    if (!accessToken) {
      return;
    }
    return accessToken;
  }

  async axiosModule(options: AxiosOptions) {
    const response = await axios({
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
      ...options,
    });

    return response.data;
  }
}

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
});
