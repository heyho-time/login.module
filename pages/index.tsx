import type { NextPage } from "next";
import axios from "axios";
import Image from "next/image";
import { useQuery } from "react-query";

import { AuthService, UserService } from "../src/services";

import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import authService from "../src/services/auth.service";

const Home: NextPage = () => {
  // const { data: signup_res } = useQuery(
  //   "userinfo",
  //   () =>
  //     AuthService.signup(
  //       "wszzsassg@gmail.com",
  //       "12faW@@",
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

  // console.log(process.env.NEXT_PUBLIC_API_HOST); dotenv 받아야 나옴

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
  //  그냥 통신하면 된다...

  // console.log(data, "userinfo");

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Hello World!</h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>src/services</code>,
          <code className={styles.code}>src/hooks</code>
        </p>
      </main>

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
    </div>
  );
};

export default Home;
