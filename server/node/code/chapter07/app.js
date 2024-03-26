const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const mongodbConnection = require('./src/configs/mongodb-connection');
// 서비스 파일
const postService = require('./src/services/post-service');
// req.body 와 POST 요청을 해석하기 위한 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// 템플릿 엔진으로 핸들바 등록, "handlebars"는 파일 확장자로 사용할 이름
app.engine(
  'handlebars',
  handlebars.create({
    helpers: require('./src/configs/handlebars-helpers'),
  }).engine,
)
// 웹페이지 로드 시 사용할 템플릿 엔진 설정, "handlebars"는 위와 동일
app.set('view engine', 'handlebars');

// 뷰 디렉터리를 views로 설정
// __dirname은 node를 실행하는 디렉토리 경로
app.set('views', __dirname + '/src/views');


let collection;

app.listen(3000, async () => {
  console.log('SERVER STARTED');
  const mongoClient = await mongodbConnection();
  collection = mongoClient.db().collection('post');
  console.log('MONGODB CONNECTED')
});

// 라우터 설정
// "/"는 라우팅하는 패스
// "localhost:3000/"으로 접근 시 콜백 함수를 실행
app.get('/', async (req, res) => {
  // "home"은 템플릿 파일의 이름
  // views 가 기본 경로이고 handlebars가 확장자이므로 view/home.handlebars 파일에 데이터를 렌더링함
  // 렌더링 시에 title과 message 값이 객체로 들어감
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || '';
  
  try {
    // postService.list 에서 글 목록과 페이지데이터를 가져옴
    const [posts, paginator] = await postService.list(collection, page, search);
    // 리스트 페이지 렌더링
    res.render('home', {
      title: '테스트 게시판',
      search,
      paginator,
      posts
    })
  } catch (error) {
    console.log(error);
    // 에러가 나는 경우 빈 값으로 렌더링
    res.render('home', {
      title: 'hello',
    })
  }
})

app.get('/write', (req, res) => {
  res.render('write', { title: 'test board', mode: 'create'})
})

app.post('/write', async (req, res) => {
  const post = req.body;
  const result = await postService.writePost(collection, post);
  console.log(result)
  res.redirect(`/detail/${result.insertedId}`)
})

app.get('/modify', async (req, res) => {
  const {id, title, writer, password, content} = req.body;
  const post = {
    title,
    writer,
    password,
    content,
    createDt: new Date().toISOString()
  }

  const result = postService.updatePost(collection, id, post);
  res.redirect('/detail/${id}')
})

app.get('/detail', (req, res)=> {
  res.render('detail', {
    title: 'test detail'
  })
})

app.get('/detail/:id', async (req, res) => {
  const result = await postService.getDetailPost(collection, req.params.id);
  res.render('detail', {
    title: "테스트 게시판",
    post: result,
  })
})

app.post('/check-password', async (req, res) => {
  const { id, password } = req.body;
  const post = await postService.getPostByIdAndPassword(collection, {
    id,
    password
  })

  if (!post) {
    return res.status(404).json({ isExist: fasle })
  } else {
    return res.json({ isExist: true})
  }
})