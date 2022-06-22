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

(Cross-Origin Resource Sharing)

https://evan-moon.github.io/2020/05/21/about-cors/

https://xiubindev.tistory.com/115

교차 출처(다른 출처) 리소스 공유라고 해석할 수 있다.

SOP(Same-Origin Policy)(같은 출처에서만 리소스를 공유할 수 있다)

웹 생태계에는 다른 출처로의 리소스 요청을 제한하는 것과 관련된 두 가지 정책이 있다. Cors, SOP이다.

여기서 중요한 사실 한 가지는 이렇게 출처를 비교하는 로직이 서버에 구현된 스펙이 아니라 브라우저에 구현되어 있는 스펙이라는 것이다.

만약 우리가 CORS 정책을 위반하는 리소스 요청을 하더라도 해당 서버가 같은 출처에서 보낸 요청만 받겠다는 로직을 가지고 있는 경우가 아니라면 서버는 정상적으로 응답을 하고, 이후 브라우저가 이 응답을 분석해서 CORS 정책 위반이라고 판단되면 그 응답을 사용하지 않고 그냥 버리는 순서인 것이다.

서버가 이 요청에 대한 응답을 할 때 응답 헤더의 Access-Control-Allow-Origin이라는 값에 “이 리소스를 접근하는 것이 허용된 출처”를 내려주고, 이후 응답을 받은 브라우저는 자신이 보냈던 요청의 Origin과 서버가 보내준 응답의 Access-Control-Allow-Origin을 비교해본 후 이 응답이 유효한 응답인지 아닌지를 결정한다.

1. 정석대로 서버에서 Access-Control-Allow-Origin 헤더에 알맞은 값을 세팅 (ex. Access-Control-Allow-Origin: https://harry.github.io )

## 출처란?

서버의 위치를 의미하는 https://google.com과 같은 URL들은 마치 하나의 문자열 같아 보여도, 사실은 여러 개의 구성 요소로 이루어져있다.

<img width="50%" src="https://user-images.githubusercontent.com/75261551/174922205-3ae8e99a-1b8d-403e-bcc9-500d2efb7020.png" />

이때 출처는 Protocol과 Host, 그리고 위 그림에는 나와있지 않지만 :80, :443과 같은 포트 번호까지 모두 합친 것을 의미한다.

## env issue

process.env는 실행시 로드되기 때문에 .env의 설정을 바꾸게 되면 React 프로젝트를 다시 구동해야된다.

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

<img width="50%" src="https://user-images.githubusercontent.com/75261551/174643079-62685829-f06b-469e-b522-d40215d51ae5.png" />

## 22.6.22

```jsx
// auth.service.ts
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
    cookies.set("accessToken", result.data.access, { expires: 1 });
    cookies.set("refreshToken", result.data.refresh, { expires: 7 });
    return result;
  }
```

{ data } 를 result로 풀었더니 통신이 된다..
근데 cors에러를 한번 내뿜고 몇 초 후에 response 온다.
