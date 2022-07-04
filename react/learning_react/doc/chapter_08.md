# CHAPTER_08 데이터 포함시키기
이번 장에서는 데이터의 근원으로부터 데이터를 적재하고 다루는 여러가지 기법을 살펴본다.

## 8.1 데이터 요청하기
fetch를 사용한 데이터 요청
```js
function userInfo(userName: string) {
  fetch(`https://api.github.com/users/${userName}`)
    .then(res => res.json())
    .then(console.log)
    .catch(console.err)
}
```

async/await를 사용한 데이터 요청
```js
async function requestUser(userName) {
	try {
    const res = await fetch(`https://api.github.com/users/${userName}`);
    const userData = await res.json();
  	console.log(userData);
  } catch (error) {
    console.error(error);
  }
}
```

<br>

### 8.1.1 요청으로 데이터 보내기
fetch example code
```js
fetch('/create/user', {
  method: 'POST',
  body: JSON.stringify({ userName, password, bio })
})
```

<br>

### 8.1.2 fetch로 파일 업로드 하기
파일을 업로드하려면 multipart-formdata라는 다른 HTTP 요청을 보내야 한다.

이런 유형의 요청은 서버에게 요청 본문에 하나 이상의 파일이 들어가 있다고 알려준다.

```js
const formData = new FormData();
formData.append('userName', 'carrot!!!');
formData.append('fullName', 'carrot!!!');
formData.append('avatar', 'imgFile');

fetch('/create/user', {
  method: 'POST',
  body: formData
});
```

<br>

### 8.1.3 권한 요청
요청을 하기 위해 권한을 얻어야 하는 경우가 있다.

보통 사용자는 자신을 식별하도록 서비스가 부여한 유일한 토큰을 요청마다 덧붙여서 자기 신원을 나타낸다.

이런 토큰은 일반적으로 Authorization 헤더에 추가된다.
```js
fetch(`https://api.github.com/users/${userName}`, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

```js
// GitHubUser
import React, { useState, useEffect } from 'react';

export default function GitHubUser({ login }) {
  const [data, setData] = useState();

  useEffect(() => {
    if (!login) {
      return;
    }

    fetch(`https://api.github.com/users/${login}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.err)
  }, [login]);

  if (data) {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  }
  return null;
}
```
리액트에서 컴포넌트가 null을 반환하면 아무 것도 렌더링하지 말라는 뜻이다.

### 8.1.4 데이터 로컬 스토리지에 저장하기
웹 스토리지 API를 사용하면 브라우저에 데이터를 저장할 수 있다.
- window.localStorage
  - 사용자가 제거하기 전까지 데이터를 무기한 보관한다.
- window.sessionStorage
  - 데이터를 사용자 세션에만 자장
  - 탭을 닫거나 브라우저를 재시작하면 sessionStorage에 있는 데이터는 사라진다.

일반적으로 이런 함수에서는 성능 유지를 위해 데이터의 크기를 제한하는 편이 낫다.

```js
import React, { useState, useEffect } from 'react';

const loadJSON = key => key && JSON.parse(window.sessionStorage.getItem(key));
const saveJSON = (key, data) => window.sessionStorage.setItem(key, JSON.stringify(data));

export default function GitHubUser({ login }) {
  const [data, setData] = useState(loadJSON(`user:${login}`));
  
  useEffect(() => {
    if (!data) {
      return;
    }
    if (data.login === login) {
      return;
    }
    const { name, avatar_url, location } = data;

    saveJSON(`user:${login}`, { name, avatar_url, location });
  }, [data]);

  useEffect(() => {
    if (!login) {
      return;
    }

    fetch(`https://api.github.com/users/${login}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.err)
  }, [login]);

  if (data) {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  }
  return null;
}
```

### 8.1.5 프라미스 상태 처리하기
HTTP 요청과 프라미스에는 아래와 같이 3가지 상태가 있다.
- 진행중(pending)
- 성공(처리 완료)
- 실패(거부)

HTTP 요청을 보낼 때는 3가지 경우를 모두 처리해야 한다.

모든 요청은 3가지 상태를 지니므로 모든 HTTP 요청을 재사용가능한 훅이나 컴포넌트로 처리하거나 리액트 기능인 서스펜스(suspense)로 처리할 수도 있다.

```js
import React, { useState, useEffect } from 'react';

export default function GitHubUser({ login }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!login) {
      return;
    }
    setLoading(true);
    fetch(`https://api.github.com/users/${login}`)
      .then(res => res.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(console.err)
  }, [login]);

  if (loading) {
    return <h1>loading....</h1>
  }

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <img
        src={data.avatar_url}
        alt={data.login}
        style={{ width: 200 }}
      />
      <div>
        <h1>{data.login}</h1>
        {data.name && <p>{data.location}</p>}
      </div>
    </div>
  );
}
```

## 8.2 렌더 프롭
렌더 프롭(render props)은 말 그대로 렌더링되는 프로퍼티를 뜻한다.

이 말은 컴포넌트나 렌더링할 컴포넌트를 반환할 함수 컴포넌트인데 프로퍼티로 전달되는 컴포넌트를 가리킨다.