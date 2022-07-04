> _침착맨을 너무 사랑한 나머지 침착맨(침투부) 플레이어를 만들어 보았다. 유튜브 API를 활용해 침착맨 채널의 정보를 실시간으로 따왔다._

오로지 침착맨에게 집중하고 싶은 분들을 위해 만들었읍니다.

***

## 메인화면

![](https://images.velog.io/images/boyfromthewell/post/0488b663-59bb-47cc-9e10-2ffeb3f8ac8c/image.png) 
침착맨 채널의 재생목록을 업로드 최신순으로 50개까지 불러온다. 유튜브 API에서 가져올수 있는 재생목록이 최대 50개까지 지원이 안되서 아쉽다.  
(일상 재롱 재생목록 진짜 재밌는데 따흑,,,,)  
10개씩 페이지네이션 되어있다.  

## 수정 (04.12)

> 기존에 침착맨 채널의 재생목록을 50개까지 불러오지 못했지만 pageToken 유튜브 api 속성을 활용해 해당 채널의 모든 재생목록(약 190개...무친 개방장)을 불러옵니다.  

![재생](https://user-images.githubusercontent.com/86250281/162775949-4a7cebd6-78d0-434e-8641-4e0eb25dbc01.png)
![](https://images.velog.io/images/boyfromthewell/post/e0dc0ae7-c8d4-45a3-8749-71400d79ffed/dog-admin-zero.gif)  
해당 이미지로 로딩 UI도 구현했는데 로딩이 너무 빨라서 잘 안보인다
***
## 즉-시 재생목록 검색

![](https://velog.velcdn.com/images/boyfromthewell/post/e3ad57f3-cec2-43c2-8e9a-3d957e05c051/image.png)  
자동완성 기능으로 즉-시 해당 재생목록 이동  

***
## 재생목록 동영상 즉-시 감상

![](https://images.velog.io/images/boyfromthewell/post/78cb643e-58ca-4e89-a12c-d4bf8a08c74d/image.png)  '쇼핑맨' 재생목록의 동영상을 감상 할것이다.

![](https://images.velog.io/images/boyfromthewell/post/046b040f-7331-4ea5-821a-c707def56a40/image.png)  들어가게 되면 디폴트로 조회수가 높은순으로 해당 재생목록의 동영상이 전부 나온다.  
조회수가 50만이 넘어갔다면 추천 딱지가 붙도록 구현해놓았다. 기준은 내맘이다.

### 조회순, 최신순, 오래된순

>select의 value값(조회순, 최신순, 오래된순) 에 따라 데이터를 필터링해 return 한 데이터를 다시 렌더링 해주는 방식으로 구현하였다.

![](https://images.velog.io/images/boyfromthewell/post/21a1511b-1031-416f-bebd-f43712bc18ea/image.png)  
select 태그를 통해 구현하였다.

![](https://images.velog.io/images/boyfromthewell/post/a7291283-924b-44fa-a9a4-1d42199784b3/image.png)  
10년이면 강산이 변한다 했다, 최신 동영상으로 즉-시 감상 가능하다

![](https://images.velog.io/images/boyfromthewell/post/c0ab044d-c423-4781-921d-99606dcb48ec/image.png)  
구관이 명관이다 라는 말이 있다. 오래된 동영상 순으로 즉-시 감상 가능하다. 

![](https://images.velog.io/images/boyfromthewell/post/097c2fd4-df32-462d-bc01-c8281a350b62/image.png)  
현재 날짜와 업로드한 날짜의 차이를 계산하는 함수를 만들어 7일이내 업로드된 영상이면 New 딱지가 붙도록 하였다.
***
## 즉-시 영상 감상

![](https://images.velog.io/images/boyfromthewell/post/c26fbdfa-09cf-46a2-b081-7143579515f6/image.png)  
보고싶은 영상을 클릭하면 풀스크린 QHD 화질로 우리의 개방장을 즉-시 감상 가능하다.  
털보아저씨에게 오로지 집중하기 위해 UI를 최소화 하였다.


***

<img src="https://velog.velcdn.com/images/boyfromthewell/post/d1f90b0e-6f92-44dc-9f91-e0dd21600ec5/image.jpg" width="30%"> 
모바일 환경 에서도 무한으로 즐길 수 있다.  
  
***
  
>배포 링크: https://boyfromthewell.github.io/Dog-Admin-Player/

> _**유튜브 API를 다뤄보고 바로 만들어보고 싶어서 만들었고, 간단한 기능밖에 없어서 큰 어려움은 없이 토이프로젝트를 즐겁게 만들었던거 같다!!!! CSS가 근데 제일 싫다!!!**_

