import type { NextPage } from "next";
import Image from "next/image";
import { useQuery } from "react-query";

import { AuthService, UserService } from "../src/services";

import styles from "../styles/Home.module.css";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { data: signup_res } = useQuery("userinfo", () =>
    AuthService.signup(
      "heyhsssssss2@gmail.com",
      "12!!S3fd7",
      "hasry",
      "01092929292",
      {
        privacy: true,
        ad: false,
      }
    )
  );
  console.log(signup_res);

  // console.log(process.env.NEXT_PUBLIC_API_HOST); dotenv 받아야 나옴

  // useEffect(() => {
  //   axios
  //     .post("https://coupang.numble.it/api/auth/signup", {
  //       email: "soh3089fds@naver.com",
  //       password: "123456",
  //       name: "harryfds",
  //       phoneNumber: "01092929292",
  //       agreements: {
  //         privacy: true,
  //         ad: false,
  //       },
  //     })
  //     .then(function (response) {
  //       console.log(response, "<<<<<res");
  //     });
  // }, []); 그냥 통신하면 된다...

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
