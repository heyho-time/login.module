import http from "services/http";
import axios from "axios";
import cookies from "js-cookie";

class UserService extends http {
  constructor() {
    super();
  }

  async me() {
    const accessToken = super.checkAccessToken();

    const result = await super.axiosModule({
      method: "get",
      url: "/users/me",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return result;
  }

  async read(id: number) {
    const result = await super.axiosModule({
      method: "get",
      url: "/users/" + id,
    });

    return result;
  }
}

export default new UserService();
