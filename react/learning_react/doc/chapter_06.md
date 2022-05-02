# CHAPTER_06 리액트 상태 관리

이번 장에서는 상태를 도입합으로써 애플리케이션에 생명을 붙어 넣는다.
상태가 있는 컴포넌트를 만드는 방법을 배우고, 컴포넌트 트리의 아래 방향으로 상태를 전달하는 방법과 사용자 상호작용을 컴포넌트 트리의 위쪽으로 돌려보내는 방법을 살펴 본다.

사용자로부터 폼 데이터를 얻는 기술도 배운다

그리고 상태가 있는 콘텍스트 프로바이더를 통해 애플리케이션에서 관심사를 분리하는 방법에 대해 살펴본다.

<br>

## 6.1 별점 컴포넌트 만들기
```
npm i react-icons
```


일단 별 5개를 랜더링 해보자.
```jsx
import React from 'react';
import { FaStar } from 'react-icons/fa';

export default function StarRating() {
  return [
    <FaStar color='red' />,
    <FaStar color='red' />,
    <FaStar color='red' />,
    <FaStar color='grey' />,
    <FaStar color='grey' />,
  ]
}
```

선택된 프로퍼티에 따라 자동으로 별을 만들어 내느 컴포넌트를 하나 만들자.
```jsx
const Star = ({ selected = false }) => (
  <FaStar color={ selected ? 'red' : 'grey' } />
)
```

totalStars 프로퍼티를 StarRating 컴포넌트에 추가해서 전체 별 개수를 지정할 수 있게 하자
```jsx
const createArray = length => [...Array(length)];

export default function StarRating({ totalStars = 5}) {
  return createArray(totalStars).map((n, i) => <Star key={i} />);
} 
```

<br>

## 6.2 useState 훅
상태를 리액트 함수 컴포넌트에 넣을 때는 훅스라고 부르는 ㅣ액트 기능을 사용한다.

훅스에는 컴포넌트 트리와 별도로 재사용 가능한 코드 로직이 들어 있다.

훅스를 사용하면 우리가 만든 컴포넌트에 기는을 끼워 넣을 수 있다.

우리가 가장 먼저 다룰 훅은, 상태를 리액트 컴포넌트에 추가하고 싶을 때 사용할 수 있는 리액트 useState 훅이다.

```jsx
import React, { useState } from 'react';
```

사용자가 선택한 별점을 저장하는 selectedStars 라는 상태 변수를 만들것이다.
- useState 훅은 배령ㄹ을 반환하는 호출 가능한 함수다
- 이 배열의 첫 번째 값이 우리가 사용하려는 상태 변수다.

```jsx
export default function StarRating({ totalStars = 5}) {
  const [ selectedStars ] = useState(3);
  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star key={i} selected={ selectedStars>i}/>
      ))}
      <p>
        {selectedStars} / {totalStars}
      </p>
    </>
  )
}
```

사용자로부터 다른 점수를 얻기 위해서는 사용자가 아무 별이나 클릭할 수 있게 해야한다.
```jsx
const Star = ({ selected = false, onSelect = f => f}) => (
  <FaStar color={selected ? 'red' : 'grey'} onClick={onSelect}> 
)
```

Start 컴포넌트를 클릭 할 수 있으므로, 이 성질을 활용해 StarRating의 상태를 바꿔보자
- useState 훅이 반환하는 배열의 두 번째 원소는 상태 값을 변경할 때 쓸 수 있는 함수다.
- 이 경우도 배열을 구조 분해해서 함수에 원하는 이름을 붙일 수 있다.
- 훅스에서 기억할 가장 중요한 내용은 훅이 걸린 컴포넌트를 렌더러와 연결시킨다는 점이다.
- setSelectedStars 함수를 사용해 selectedStars의 값을 바꿀 때마다 StarRating 함수 컴포넌트가 훅에 의해 다시 호출되면서 렌더링이 다시 이뤄진다.
- 이때 새로운 렌더링은 selectedStars의 새 값을 활용해 이뤄진다.
- 훅이 걸린 데이터가 변경되면 데이터에 대한 훅이 걸린 컴포넌트에 새 값을 전달하면서 컴포넌트를 다시 렌더링해준다.
```jsx
export default function StarRating({ totalStars = 5 }) {
  const [selectedStars, setSelectedStars] = useState(0);

  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={selectedStars>i}
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
      <p>
        {selectedStars} / {totalStars}
      </p>
    </>
  )
}
```

<br>

## 6.3 재사용성을 높이기 위한 리팩터링
컴포넌트를 npm에 올려서 세상 누구나 사용자로부터 평점을 받을 때 이 컴포넌트를 활용하고 싶다면, 몇 가지 용례를 더 생각해봐야 한다.

**첫번째, style 프로퍼티를 생각해보자**
- 모든 리액트 엘리먼트는 스타일 프로퍼티를 제공한다.
- 대부분의 컴포넌트도 스타일 프로퍼트를 제공한다.
- 따라서 전체 컴포넌트의 스타일을 변경하는게 타당해 보인다.
```jsx
export default function App() {
  return <StarRating style={{ backgroundColor: 'lightblue' }} />;
}
```

```jsx
export default function StarRating({ style={}, totalStars=5 }) {
  const [selectedStars, setSelectedStars] = useState(0);
  return (
    <div style={{ padding: '5px', ...style }}>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={ selectedStars>i }
          onSelect={() => setSelectedStars(i + 1)}
        />
        <p>
          {selectedStars} / {totalStars}
        </p>
      ))}
    </div>
  )
}
```

추가로, 모든 별표 컴포넌트에 대해 다른 일반적인 프로퍼티를 구현하려고 아래와 같이 시도하는 개발자가 있을 수 있다.
- 다양한 조건이 있을것다.
- 가장 중요한건 우리가 만든 컴포넌트의 사용자가 미래에 컴포넌트를 어떻게 사용할지 생각해보는것이다.
```jsx
export default function App() {
  return (
    <StarRating 
      style={{ backgroundColor: 'lightblue' }}
      onDoubleClick={ e => alert('double click' )}
    /> 
  )
}
```

```jsx
export default function StarRating({ style={}, totalStars=5, ...props }) {
  const [selectedStars, setSelectedStars] = useState(0);
  return (
    <div style={{ padding: 5, ...style}} {}>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={ selectedStars>i }
          onSelect={() => setSelectedStars(i + 1)}
        />
        <p>
          {selectedStars} / {totalStars}
        </p>
      ))}
    </div>
  )
}
```

<br>

## 6.4 컴포넌트 트리 안의 상태
모든 컴포넌트에 상태를 넣는 것은 좋은 생각이 아니다.

상태 데이터가 너무 많은 컴포넌트에 분산되면 버그를 추적하거나 애플리케이션의 기능을 변경하기 어려워진다.

이런 일이 어려워지는 이유는 컴포넌트 트리에서 어느 부분에 상태가 존재하는지를 제대로 알기 어려워지기 때문이다.

애플리케이션의 상태나 어떤 특성의 상태를 한곳에서 관리할 수 있으면 상태를 이해하기가 더 쉬워진다.

상태를 한곳에서 관리하는 방법이 몇가지가 있다.

처음 살펴볼 것은 상태를 컴포넌트 트리에 저장하고, 자식 컴포넌트들에게 프롭으로 전달하는 방법이다.

<br>

색의 목록을 관리하는 작은 애플리케이션을 만들어보자.

```json
// color-data.json
{
  "colors": [
    {
      "id": "a1",
      "title": "해질녘 바다",
      "color": "#00c4e2",
      "rating": 5
    },
    {
      "id": "a2",
      "title": "잔디",
      "color": "#26ac56",
      "rating": 3
    },
    {
      "id": "a3",
      "title": "밝은 빨강",
      "color": "#ff0000",
      "rating": 0
    }        
  ]
}
```

<br>

### 6.4.1 상태를 컴포넌트 트리의 아래로 내려보기
```js
// ColorCard.js
import React, { useState } from 'react';
import colorData from './color-data.json';
import ColorList from './ColorList.js';

export default function ColorCard() {
  const [colors] = useState(colorData);
  return <ColorList colors={colors} />;
}
```

ColorList는 프롭으로 App 컴포넌트에게서 색을 전달 받는다.
```js
// ColorList.js
import React from 'react';
import Color from './Color';

export default function ColorList({ colors=[] }) {
  if (!colors.length) {
    return <div>표시할 색상이 없습니다.</div>
  }

  return (
    <div>
      { colors.map(color => <Color key={color.id} />) }
    </div>
  );
}
```

Color 컴포넌트는 title, color, rating이라는 세 프로퍼티를 받는다.
```js
// Color.js
export default function Color({ title, color, rating }) {
  return (
    <section>
      <h1>{title}</h1>
      <div style={{ height: 50, backgroundColor: color }} />
      <StarRating selectedStars={rating} />
    </section>
  )
}
```

StarRating 컴포넌트는 이 rating 값을 선택된 별의 개수로 표시해준다.
```js
// PureRating.js
export default function PureRating({ totalStars=5, selectedStars=0 }) {
  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
        />
      ))}
      <p>
        {selectedStars} / {totalStars}
      </p>
    </>
  )
} 
```

<br>

### 6.4.2 상호작용을 컴포넌트 트리 위쪽으로 전달하기

```js
// PureStar.js
import React from 'react';
import { FaStar } from 'react-icons/fa';

const createArray = length => [...Array(length)];
const Star = ({ selected = false, onSelect = f => f}) => (
  <FaStar color={selected ? 'red' : 'grey'} onClick={onSelect} /> 
)

export default function StarRating({ totalStars=5, selectedStars=0, onRate= f => f}) {
  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={ selectedStars > i }
          onSelect={ () => onRate(i + i)}
        />
      ))}
      <p>
        {selectedStars} / {totalStars}
      </p>
    </>
  )
}
```

```js
// Color.js
import PureStar from './PureStar';
import { FaTrash } from 'react-icons/fa';

export default function Color({
  id,
  title,
  color,
  rating,
  onRemove = f => f,
  onRate = f => f
}) {
  return (
    <section>
      <h1>{title}</h1>
      <button onClick={() => onRemove(id)}><FaTrash /></button>
      <div style={{ height: 50, backgroundColor: color }} />
      <PureStar selectedStars={rating} onRate={rating => onRate(id, rating)}/>
    </section>
  )
}
```

```js
// ColorList.js
import React from 'react';
import Color from './Color';

export default function ColorList({
  colors=[],
  onRemoveColor = f=>f,
  onRateColor = f=>f
}) {
  if (!colors.length) {
    return <div>표시할 색상이 없습니다.</div>
  }

  return (
    <div>
      { 
        colors.map(color => 
          <Color
            key={color.id}
            {...color}
            onRemove={onRemoveColor}
            onRate={onRateColor}
          />
        ) 
      }
    </div>
  );
}
```

```js
// ColorCard.js
import React, { useState } from 'react';
import colorData from '../static/color-data.json';
import ColorList from './ColorList.js';

export default function ColorCard() {
  const [colors, setColors] = useState(colorData.colors);
  
  return <ColorList 
    colors={colors}
    onRateColor={(id, rating) => {
      const newColors = colors.map(color => 
        color.id === id ? { ...color, rating } : color
      );
      setColors(newColors)
    }}
    onRemoveColor={id => {
      const newColors = colors.filter(color => color.id !== id);
      setColors(newColors)
    }}
  />;
}
```

## 6.5 폼 만들기
```jsx
<form>
  <input type="text" placeholder="color title..." required />
  <input type="color" required />
  <button></button>
</form>
```

### 6.5.1 참조 사용하기
리액트에서 폼 컴포넌트를 만들어야 할 떄는 몇가지 패턴을 사용할 수 있다.

이런 패턴 중에는 참고(ref)라는 리액트 기는을 사용해 직접 DOM에 접근하는 방법이 포함된다.

리액트에서 참조는 커뫂넌트 생명주기 값을 저장하는 객체이다.

리액트 참조를 제공할 때 쓸 수 있는 userRef 훅을 제공한다.
- ref 프로퍼티를 사용하면 이런 참조의 값을 직접 JSX 에서 설정할 수 있다.
```js
// AddColorForm.js
import React, { useRef } from 'react';

export default function AddColorForm({ onNewColor = f => f}) {
  const txtTitle = useRef();
  const hexColor = useRef();
  const submit = e => {
    e.preventDefault();
    const title = txtTitle.current.value;
    const color = hexColor.current.value;

    onNewColor(title, color);
    txtTitle.current.value = '';
    color.current.value = '';
  };
  return (
    <form onSubmit={submit}>
      <input ref={txtTitle} type="text" placeholder="color title..." required />
      <input ref={hexColor} type="color" required />
      <button>ADD</button>
    </form>
  )
}
```

<br>

### 6.5.2 제어가 되는 컴포넌트
제어가 되는 컴포넌트에서는 폼 값을 DOM이 아니라 리액트로 관리한다.

제어가 되는 컴포넌트를 쓸 때는 참조를 사용할 필요도 없고, 명령형 코드를 작성할 필요도 없다.

제어가 되는 컴포넌트를 사용하면 튼튼한 폼 검증 기능 등의 추가가 훨씬 더 쉬워진다.
- 리액트가 폼의 상태를 모두 제어하기 때문에 이런 컴포넌트를 제어가 되는 컴포넌트라고 부른다.
- 여기서 제어가 되는 컴포넌트가 아주 여러 번 다시 렌더링된다는 점을 언급할만한 가치가 있다.
```js
import React, { useState } from 'react';

export default function AddColorForm({ onNewColor = f => f}) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#000000');
  const submit = e => {
    e.preventDefault();
    onNewColor(title, color);
    setTitle('');
    setColor('');
  };
  return (
    <form onSubmit={submit}>
      <input
        value={title}
        onChange={event => setTitle(event.target.value)}
        type="text"
        placeholder="color title..."
        required
      />
      <input
        value={color}
        onChange={event => setColor(event.target.value)}
        type="color"
        required
      />
      <button>ADD</button>
    </form>
  )
}
```

### 6.5.3 커스텀 훅 만들기
```js
value={title}
onChange={event => setTitle(event.target.value)}
```

제어가 되는 폼 컴포넌트를 만들 때 필요한 세부 사항을 커스텀 훅으로 묶을 수 있다.

제어가 되는 폼 입력을 만들 때 필요한 중복을 추상화해 없애 주는 우리만의 useInput 훅을 만들 수 있다.
- 아래의 훅은 커스텀 훅이다.
```js
// useInput.js
import { useState } from 'react';

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  return [
    { value, onChange: e => setValue(e.target.value) },
    () => setValue(initialValue)
  ];
}
```
```js
// AddColorForm.js
import React from 'react';
import { useInput } from '../hooks/useInput';

export default function AddColorForm({ onNewColor = f => f}) {
  const [titleProps, resetTitle] = useInput('');
  const [colorProps, resetColor] = useInput('#000000');
  const submit = e => {
    e.preventDefault();
    onNewColor(titleProps, colorProps);
    resetTitle('');
    resetColor('');
  };
  return (
    <form onSubmit={submit}>
      <input
        {...titleProps}
        type="text"
        placeholder="color title..."
        required
      />
      <input
        {...colorProps}
        type="color"
        required
      />
      <button>ADD</button>
    </form>
  )
}
```

### 6.5.4 색을 상태에 추가하기
제어가 되는 폼 컴포넌트나 제어가 되지 않는 폼 컴포넌트 모두 title, color의 값을 onNewColor 함수를 통해 부모 컴포넌트에게 전달한다.

부모는 제어가 되는 폼 컴포넌트나 제어가 되지 않는 폼 컴포넌트 중 어떤 것을 사용했는지에 대해 관심이 없다.

단지 새 색의 값을 알고 싶을 뿐이다.

```js
// ColorForm.js
import React, { useState } from 'react';
import colorData from '../static/color-data.json';
import ColorList from './ColorList';
import AddColorForm from './AddColorForm';
import { v4 } from 'uuid';

export default function ColorForm() {
  const [colors, setColors] = useState(colorData);

  return (
    <>
      <AddColorForm
        onNewColor={(title, color) => {
          const newColors = [
            ...colors,
            {
              id: v4(),
              rating: 0,
              title: title.value,
              color: color.value
            }
          ];
          setColors(newColors);
        }}
      />
      <ColorList 
        colors={colors}
        onRateColor={(id, rating) => {
          const newColors = colors.map(color => 
            color.id === id ? { ...color, rating } : color
          );
          setColors(newColors)
        }}
        onRemoveColor={id => {
          const newColors = colors.filter(color => color.id !== id);
          setColors(newColors);
        }}
      />
    </>
  )
}
```

<br>

## 6.6 리액트 콘텍스트
모든 리액트 개발자는 어떻게 상태를 양방향으로 전달할 수 있는지 알아야만 한다.

상태 데이터를 그 데이터가 필요한 컴포넌트에 도달할 때까지 프롭 형태로 모든 중간 컴포넌트를 거쳐서 전달하는 과정은 샌프란시스코에서 워싱턴 DC로 기차를 타고 가는것과 같다

리액트에서 콘텍스트는 데이터를 위한 제트기와 같다

콘텍스트 프로바이더를 만들어서 데이터를 리액트 콘텍스트에 넣을 수 있다.

콘텍스트 프로파이터는 컴포넌트 트리 전체나 트리 일부를 감싸는 리액트 컴포넌트이다.

콘텍스트 프로바이더는 데이터가 비행기에 타는 출발지 공항이라고 할 수 있다.

그리고 콘텍스트 프로바이더는 데이터 허브이기도 하다.
모든 비행기는 콘텍스트 프로바이더에서 출발해 다른 목적지로 간다.

각 목적지를 콘텍스트 소비자라고 한다.

콘텍스트 소비자는 콘텍스트에게서 데이터를 읽어들이는 리액트 컴포넌트이다.

콘텍스트 소비자는 여러분의 데이터가 착륙해서 작업을 수행할 도착지 공항이다.

콘텍스트르를 사용하면 데이터를 한 위치에 저장할 수 있지만, 데이터를 사용하지 않을 여러 컴포넌트를 거쳐서 최종 컴포넌트에 전달할 필요가 없어진다.

### 6.6.1 콘텍스트에 색 넣기
리액트에서 콘텍스트를 사용하려면 먼저 콘텍스트 프로바이더에게 데이터를 넣고, 프로바이더를 컴포넌트 트리에 추가해야 한다.

리액트에서는 콘텍스트 객체를 만들 때 쓰는 createContext 라는 함수가 있다.

만들어진 콘텍스트 객체에는 콘텍스트 Provider와 콘텍스트 Consumer라는 2가지 컴포넌트가 들어 있다.
- 콘텍스트 Provider가 꼭 전체 애플리케이션을 감쌀 필요는 없다.
- 콘텍스트 Provider로 컴포넌트 트리 중 일부만 감싸도 좋을 뿐 아니라, 그렇게 하면 애플리케이션이 더 효율적으로 작동한다.
- Provider는 자신이 감싸는 컴포넌트의 자식들에게만 콘텍스트를 제공한다.
- 콘텍스트 프로바이더를 여럿 사용해도 된다.
```js
// index.js
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import colors from './static/color-data.json';
import App from './App';

export const ColorContext = createContext();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ColorContext.Provider value={{ colors }}>
      <App />
  </ColorContext.Provider>
);
```

### 6.6.2 useContext를 통해 색 얻기
훅스를 추가하면 콘텍스트를 편하게 다룰 수 있다.

useContext 훅을 사용해 콘텍스트에서 값을 얻을 수 있다.

useContext는 콘텍스트 Consumer로부터 필요한 값을 얻는다.