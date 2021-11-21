## 목차
1. 컴포넌트 다시 생각하기


# 컴포넌트, 다시 생각하기(Rethinking Components)
https://www.youtube.com/watch?v=HYgKBvLr49c&ab_channel=FEConfKorea

https://drive.google.com/file/d/1utf1DLnWiNlRkyrkf9sRj6x9WqlH3nPT/view

당근마켓 / 원지혁


## 바라보기(How to view)
케이크를 만드려면?
- 케이크를 만드려면 밀가루, 설탕, 계란이 필요하다.
  - 케이크는 밀가루, 설탕, 계란에 의존한다
  - 케이크의 의존성: 밀가루, 설탕, 계란

React 컴포넌트의 의존성 파악하기
- 기능적 분류
- 특징적 분류
  - 스타일: 컴포넌트의 CSS 스타일
  - 로직: UI 조작에 필요한 커스텀 로직
  - 전역 상태 관리: 현재 UI 를 표현하기 위해 유저의 액션을 통해 초래된 상태
  - 리모트 데이터 스키마: API 서버에서 내려주는 데이터의 모양

경험의 차이

딸기 케이크
- 케이크에 딸기를 새로 얹어볼까요?
  - 케이크에 딸기를 추가하려면 딸기 뿐 아니라 생크림도 추가로 필요하다
  - 딸기 케이크는 생크림에 추가적으로 의존한다
  - 딸기 케이키의 숨은 의존성: 생크림

React 컴포넌트에 새로운 정보를 추가해볼까?
- React 컴포넌트에 정보를 추가하려면 새로운 정보뿐 아니라 ?도 필요하다
- 정보를 표현하는 React 컴포넌트의 숨은 의존성: ?


`<Article />` 컴포넌트에 정보 새로 추가하기
```
1. 리모트 데이터: `<Article />` 컴포넌트의 Props 수정
2. React 컴포넌트: `<Article />` 의 렌더링 부분 수정
3. 숨은 의존성: `<Article />` 의 Props 수정
4. 숨은 의존성: `<PageArticleList />` 의 useEffect 훅 수정
```
- 정보를 표현하기 위해 위와 같은 내용을 필연적으로 수정하게됨

리모트 데이터 스키마의 숨은 의존성

React 컴포넌트의 전체 의존성
```
루트 컴포넌트

스타일 / 로직 / 전역 상태 / 리모트 데이터 스키마

{(...)} => useSomething();

<Component />
```

## 함께 두기(Co-locate)
1. Keep Locality: 비슷한 관심사라면 가까운 곳에
```
루트 컴포넌트

전역 상태 / 리모트 데이터 스키마

{(...)} => useSomething();

스타일 / 로직 / <Component />
```
- 로직과 스타일 Co-locate
- 하나의 컴포넌트가 뚱뚱해지는 것을 걱정한다면, 같은 폴더내에 상위나 하위에 다른 파일로 분리하는 것을 권함.

2. 데이터를 ID 기반으로 정리하기 (Abstraction by Normalization)
- 데이터 정리하기, Normalization
- yarn add normalizr
- ID 기반으로 데이터를 불러오기
  - Global ID 또는 Node ID
  - 도메인 내에서 유일성을 갖는 ID 체계
```
리모트 데이터 스키마와의 의존성
- 리모트 데이터 스키마 > 루트 컴포넌트 > 다른 컴포넌트 > 내 컴포넌트

위에서는 ID만 받고, 모양(스키마)은 전역 상태에서 받자
- props 를 통해 id 를 받고
- 데이터 저장소에서 id 를 통해 해당 데이터를 받아오게함
- 이를 통해 루트 컴포넌트와의 의존성을 끊을 수 있음
```

3. 의존한다면 그대로 드러내기(Make Explicit)
- Global ID 를 통해 컴포넌트 간 의존성 느슨히 만들기

4. 모델 기준으로 컴포넌트 분리하기(Separating Components by Model)
- 함께 변해야하는 것들과 따로 변해야하는 것들

```
재사용셩(Reuse)
- 개발할때 편리하기 위한 것보다 변경할 때 편리하기 위해
- 기존에 있던 컴포넌트를 재사용할까, 복사해서 새 컴포넌트로 분리할까?
```
- 같은 모델을 의존하는 컴포넌트: 재사용
- 다른 모델을 의존하는 같은 컴포넌트: 분리


## 결론
Keep Locality: 비슷한 관심사라면 가까운 곳에

Abstraction by Normalization: 데이터를 ID 기반으로 정리하기

Make Explicit: 의존한다면 그대로 드러내기

Seperating Components by Model: 모델 기준으로 컴포넌트 분리하기


## 추가
GraphQL Fragment

GOI

Relay as a Data Layer Framework

더 나은 데이터 일관성과 아름다운 로딩 표현을 더 쉽게 만들기 때문에

GraphQL Fragment 도입을 고려함