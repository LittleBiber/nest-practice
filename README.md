강의파일 없이 혼자 구글링으로 구현해보기

카카오지도
외부API
로그인 페이지
성공하면 홈페이지로 리다이렉트
실패하면 alert 띄워주기
회원가입 페이지
가입 성공하면 홈페이지로 리다이렉트
이미 가입했으면 alert 띄워주기

게시판 구현
R 게시글 전체 보기 /board _
R 특정 게시글만 보기 /board/:id
C 게시글 작성 /post _
이미지, 글 내용
로그인 안되면 alert 띄워주기
U 게시글 수정 /post
작성자 본인이 아니면 alert 띄워주기
D 게시글 삭제 \*
로그인 안되면 alert 띄워주기

필요한 스키마
유저
id
email
password
게시판
id
userId
title
description
