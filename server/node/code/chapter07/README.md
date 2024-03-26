```
- express-handlebars
- express
- mongodb
```

```
src/
  - configs/
  - services/
  - views/
  - app.js  # controller 역할
```

handlebars.engine 에 layoutsDir 항목을 추가하면 기본 레이아웃 디렉터리를 변경할 수 있음
```
app.engine('handlebars', handlebars.engine({
  layoutsDir: 'views'
}));
```

혹은 기본 레이아웃을 사용하고 싶지 않으면 라우터의 결과 객체에 layout: false를 추가하면됨
```
res.render(
  "home",
  {
    title: 'hello',
    message: 'world',
    layout: false,
  }
);
```

화면 기획하기?
- 어떤 기능을 담을지
- 혼자 개발을 하는 경우라면 개발을 하다가 다시 기획을 해보고, 개발을 하고 기획을 해보고 하는 것도 괜찮음
- 그러나 기획자가 따로 있고 여러분은 개발자 역할이라면 기획자가 작성한 기획서를 꼼꼼히 보고, 개발 시에 문제가 되는 부분이 있는지 없는지 판단해서 기획자에게 알려줘야함

게시판은 어떤 기능이 필요할까?
- 리스트 화면 기획
  - 게시판
  - 검색
  - 글쓰기
  - 게시물 리스트
  - 페이지 네이선
- 글쓰기 화면
  - 게시판에 노출될 제목
  - 게시글 제목
  - 게시글 이름
  - 게시글 비밀 번호
  - 게시글 내용
  - 저장, 취소 바튼
- 게시글 상세 화면
  - 노출될 제목
...

UI 화면 만들기
- API 바로 만드는 것도 좋지만, UI 를 먼저 만들고 기능을 붙이면서 코드를 추가하면 웹브라우저에서 바로 데이터를 확인할 수 있기 때문에 좋다.