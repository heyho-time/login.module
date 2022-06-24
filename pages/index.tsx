import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import type { NextPage } from "next";
import Image from "next/image";

import styles from "../styles/Home.module.css";
import { AuthService } from "services";

const Home: NextPage = () => {
  // const { data: login_res } = useQuery(
  //   "login",
  //   () => AuthService.login("sg@gmail.com", "12fdsfaW@@"),
  //   {
  //     retry: false,
  //   }
  // );
  // console.log(login_res);

  // const { data: signup_res } = useQuery(
  //   "userinfo",
  //   () =>
  //     AuthService.signup(
  //       "sgfdsa@gmail.com",
  //       "12fdsf@@",
  //       "hryasd",
  //       "01092929292",
  //       {
  //         privacy: true,
  //         ad: false,
  //       }
  //     ),
  //   {
  //     retry: false,
  //   }
  // );
  // console.log(signup_res);
  // authService쪽에서 {data} 의 중괄호를 벗겨주고 result 그대로 가져옴.

  // useEffect(() => {
  //   axios
  //     .post("https://coupang.numble.it/api/auth/signup", {
  //       email: "soh3sssss@naver.com",
  //       password: "123dfs56",
  //       name: "hars",
  //       phoneNumber: "01092929292",
  //       agreements: {
  //         privacy: true,
  //         ad: false,
  //       },
  //     })
  //     .then(function (response) {
  //       console.log(response, "<<<<<res");
  //     });
  // }, []);

  return (
    <>
      <h1 className={styles.title}>Hello World!</h1>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/numble.png" alt="NUMBLE Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </>
  );
};

export default Home;
