import http from "services/http";
import { SignupAgreements } from "types/type";

class AuthService extends http {
  constructor() {
    super();
  }
  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  async refresh() {
    const refreshToken = super.checkRefreshToken();

    const result = await super.axiosModule({
      method: "get",
      url: "/auth/refresh",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    super.getToken(result.data);
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
    const result = await super.axiosModule({
      method: "post",
      url: "/auth/signup",
      data: {
        email,
        password,
        name,
        phoneNumber,
        agreements,
      },
    });

    super.getToken(result.data);
    return result;
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login(email: string, password: string) {
    const result = await super.axiosModule({
      method: "post",
      url: "/auth/login",
      data: {
        email,
        password,
      },
    });

    super.getToken(result.data);
    return result;
  }
}

export default new AuthService();
