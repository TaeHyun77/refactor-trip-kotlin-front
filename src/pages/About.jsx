import React from "react";
import Header from "../components/header/Header";
import "./About.css"

const About = () => {
  return (
    <>
      <Header />
      <div className="containerAbout">
        <h1>가보자Go를 소개합니다 !</h1>
        <hr />
        <p> 회원가입 후 동행, 자유 게시글을 작성해보세요</p>
        <p> 마이페이지에서 팔로우, 팔로잉 목록 및 쪽지를 관리해보세요 </p>
        <p> 게시글의 프로필 보기에서 게시글 작성자의 정보를 확인해보세요</p>
        <p> 게시글에 댓글을 남겨보세요 !</p>
        <p> 동행 게시글에서 동행에 참여해보세요 !</p>
      </div>
    </>
  );
};

export default About;
