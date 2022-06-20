yarn
yarn dev

---

## 로그인을 위한 Data Fetching 모듈

- Interface에 맞게 Class 및 Function 들을 만들어보며 지속가능한 모듈 설계와 프론트엔드에서의 객체지향에 대해 고민해본다.

1. AuthService 리팩토링.
2. 재사용성, 확장성을 고려해 개선된 모듈을 설계해보기.
3. 이후 추가될 수 있을 OrderService, ItemService등을 편하고 직관적으로 대응할 수 있도록 하나의 부모클래스를 extend하는 방법으로 구현해보기.

## useRequest

- API request를 보내주는 모듈.
- react-query에 의존성 역전 원칙을 적용하기 위해 사용한다.

다른 요청들에도 공통적으로 간편하게 적용할 수 있는 인터페이스를 고민하고 구현해보자.

## 주요항목

- 제공된 스펙을 모두 구현했는가.
- 구현된 기능들은 정상작동 하는가.
- 함수/변수/클래스/컴포넌트의 이름이 의미있게 지어졌는가.
- 코드파일이 적절한 책임 단위로 쪼개어졌는가.
- 코드의 형식이 일관되는가.
- 각 함수는 적절한 위치에서 적절하게 선언/정의되었는가.
- 인터페이스가 충분히 간결하며 직관적인가.
- 인터페이스가 기능의 추가 및 변경에 대응하기 용이한가.

## tip

1. AuthService와 UserService의 공통적인, 유의미한 부분을 찾아 추상화해보세요.
   이를 부모 클래스로 정의해 확장해보세요. (객체지향 - 상속) (부모 클래스 정의 외의 추상화도 시도해보세요!)

2. 하나의 모듈(= 파일, 클래스, 메소드, 변수)이 하나의 역할만 수행하도록 바꿔보세요. (응집도 높이기)

3. 만들어진 구조를 통해 여러 범용적인 기능들을 추가해보세요. (ex: CRUD)
   잘 대응되지 않는 기능이 있다면, 구조의 문제점을 파악하고 개선해보세요.

좋은 모듈 설계에 대한 참고자료 : https://www.youtube.com/watch?v=aSAGOH2u2rs

## Cors issue

https://evan-moon.github.io/2020/05/21/about-cors/

https://xiubindev.tistory.com/115

---

### 22.6.21

react-query를 이용해 data fetching모듈 사용해봤다.

내일은 type 지정해 리팩토링 예정.
cors 에러에 대해 알아보자!

```jsx
// index.tsx
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



// auth.service.ts
async signup(
    email: string,
    password: string,
    name: string,
    phoneNumber: string,
    agreements: SignupAgreements
  ) {
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_API_HOST + "/auth/signup",
      {
        email,
        password,
        name,
        phoneNumber,
        agreements,
      }
    );

    cookies.set("accessToken", data.access, { expires: 1 });
    cookies.set("refreshToken", data.refresh, { expires: 7 });
    return data.data;
  }
```

이게 맞는 것 같은데 계속 cors에러에 막힌다.
postman에서 실행하면 된다.;;

<img width="35%" src="https://user-images.githubusercontent.com/75261551/174643079-62685829-f06b-469e-b522-d40215d51ae5.png" />
