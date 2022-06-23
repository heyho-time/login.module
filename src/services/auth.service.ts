import axios from "axios";
import cookies from "js-cookie";
import { SignupAgreements, EmailPw } from "types/type";

const getToken = (data: { access: string; refresh: string }) => {
  cookies.set("accessToken", data.access, { expires: 1 });
  cookies.set("refreshToken", data.refresh, { expires: 7 });
};

class AuthService {
  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  async refresh() {
    const refreshToken = cookies.get("refreshToken");
    if (!refreshToken) {
      return;
    }

    const result = await axios.post(
      process.env.NEXT_PUBLIC_API_HOST + "/auth/refresh",
      null,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    getToken(result.data);
    return result;
  }

  /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
  async signup(
    email: string,
    password: string,
    name: string,
    phoneNumber: string,
    agreements: SignupAgreements
  ) {
    const result = await axios.post(
      process.env.NEXT_PUBLIC_API_HOST + "/auth/signup",
      {
        email,
        password,
        name,
        phoneNumber,
        agreements,
      }
    );

    getToken(result.data);
    return result;
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login(email: string, password: string) {
    const result = await axios.post(
      process.env.NEXT_PUBLIC_API_HOST + "/auth/login",
      { email, password }
    );

    getToken(result.data);
    return result;
  }
}

export default new AuthService();
