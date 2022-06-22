export type SignupAgreements = {
  privacy: boolean;
  ad:
    | {
        email: boolean;
        sms: boolean;
        app: boolean;
      }
    | false;
};

export type userInfo = {};

export type EmailPw = {
  email: string;
  password: string;
};
