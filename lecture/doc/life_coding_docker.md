# 생활 코딩 DOCKER
https://www.youtube.com/playlist?list=PLuHgQVnccGMDeMJsGq2O-55Ymtx0IdKWf

이 강의는 도커의 사용자가 되는것이다.

<br>

## DOCKER INSTALL

https://docs.docker.com/

OS 에 따른 설치
- Linux 인 경우 가상 머신 없이 동작 (도커는 리눅스 위에서 동작하므로 가상 머신 미설치 및 동작)
- Linux 가 아닌 경우 가상 머신 위에 동작 (도커는 리눅스 위에서 동작하므로 가상 머신 설치 및 동작)
- OS 에 따라 도커는 자동으로 가상 머신 설치 및 실행된다.

<br>

```
docker
```
- 위 명령어를 통해 도커가 설치되었는지 확인할 수 있다. (터미널 내)

## 기본 구조
docker hub
- app store 와 비슷한 개념
- docker 에 필요한 image 를 찾아 다운 받을 수 있다.

image
- docker hub 에서 설치한 프로그램
- pull: image 를 docker hub 에서 다운 받는 행위
- 하나의 이미지는 여러개의 container 를 만들 수 잇다.

container
- image 를 실행한 것
- run: image 를 실행시키는 행위

## image pull
https://docs.docker.com/reference/

dashboard -> explore
- official image 표시는 는 도커에서 인증하고 관리하는 이미지를 뜻한다

<br>

```
// docker pull [OPTIONS] NAME[:TAG|@DIGEST]
docker pull httpd

// check download
docker images
```

## container run
```
// docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
docker run httpd

docker run --name ws2 httpd

docker ps         // 생성한 컨테이너를 보기 위해

// docker stop [OPTIONS] CONTAINER [CONTAINER...]
docker stop ws2

docker ps -a

docker start ws2

docker logs ws2

docker logs -f ws2

// docker rm [OPTIONS] CONTAINER [CONTAINER...]
docker stop ws2

docker rm ws2

docker rm --force ws2 // 정지 없이 삭제 가능

docker rmi httpd      // 이미지 삭제
```
