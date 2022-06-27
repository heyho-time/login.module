import http, { instance } from "services/http";
import axios from "axios";
import { SignupAgreements } from "types/type";
import cookies from "js-cookie";

class AuthService extends http {
  constructor() {
    super();
  }
  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  async refresh() {
    const refreshToken = super.checkRefreshToken();

    const result = await instance.get("/auth/refresh", {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    // const result = await super.axiosModule({
    //   method: "get",
    //   url: "/auth/refresh",
    //   headers: {
    //     Authorization: `Bearer ${refreshToken}`,
    //   },
    // });

    super.setToken(result.data);
    return result;
  }

  /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
  // 리팩토리 전
  // async signup(
  //   email: string,
  //   password: string,
  //   name: string,
  //   phoneNumber: string,
  //   agreements: SignupAgreements
  // ) {
  //   const { data } = await axios.post(
  //     process.env.NEXT_PUBLIC_API_HOST + "/auth/signup",
  //     { email, password, name, phoneNumber, agreements }
  //   );

  //   cookies.set("accessToken", data.access, { expires: 1 });
  //   cookies.set("refreshToken", data.refresh, { expires: 7 });
  //   return data;
  // }

  async signup(
    email: string,
    password: string,
    name: string,
    phoneNumber: string,
    agreements: SignupAgreements
  ) {
    const result = await instance.post("/auth/signup", {
      email,
      password,
      name,
      phoneNumber,
      agreements,
    });

    // 인스턴스 쓰기전
    // const result = await super.axiosModule({
    //   method: "post",
    //   url: "/auth/signup",
    //   data: {
    //     email,
    //     password,
    //     name,
    //     phoneNumber,
    //     agreements,
    //   },
    // });

    super.setToken(result.data);
    return result;
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login(email: string, password: string) {
    const result = await instance.post("/auth/login", {
      email,
      password,
    });
    // const result = await super.axiosModule({
    //   method: "post",
    //   url: "/auth/login",
    //   data: {
    //     email,
    //     password,
    //   },
    // });

    super.setToken(result.data);
    return result;
  }
}

export default new AuthService();
