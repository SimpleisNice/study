# Image Lazy Loading 관하여

목적
- CSR 에서 img 관련 처리를 위하여 (흰색 화면이 장시간 노출되는것은 불편하다.!) 

## HTML img
[참고 링크](https://developer.mozilla.org/ko/docs/Web/HTML/Element/img)

```html
<img class="fit-picture"
     src="/media/cc0-images/grapefruit-slice-332-332.jpg"
     alt="Grapefruit slice atop a pile of other slices">
```
- src 특성은 필수이며, 포함하고자 하는 이미지로의 경로를 지정
- alt 특성은 이미지의 텍스트 설명이며 필수는 아니지만, 스크린 리더가 alt의 값을 읽어 사용자에게 이미지를 설명하므로, 접근성 차원에서 매우 유용합니다. 또한 네트워크 오류, 콘텐츠 차단, 죽은 링크 등 이미지를 표시할 수 없는 경우에도 이 속성의 값을 대신 보여준다.

### 지원하는 이미지 형식

[Image file type and format guide](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)

### 이미지를 가져올 수 없을 때

이미지를 불러오거나 그릴 때 오류가 발생했고, onerror 속성에 오류 처리기를 등록했다면, [error](https://developer.mozilla.org/en-US/docs/Web/API/Element/error_event) 이벤트와 함께 처리기를 호출한다.

오류는 다양한 사황에서 발생하며, 그 중 일부 원인은 아래와 같다.
- src 속성이 비어 있거나 null
- src 의 URL 이 현재 사용자가 보는 페이지의 URL 과 같은
- 지정한 이미지가 손상돼 불러올 수 없음
- 이미지의 메타 데이터가 손상돼 원본 크기를 알아낼 수 없고, <img> 요소의 속성에도 크기를 지정하지 않음
- 사요자 에이전트가 지원하지 않는 이미지 형식

### 특성
이 요소는 [전역 특성](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes)을 포함한다.
- 전역 특성(Global attributes)은 모든 HTML에서 공통으로 사용할 수 있는 특성




# 참고
https://helloinyong.tistory.com/297