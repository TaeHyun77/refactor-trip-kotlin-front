import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import * as auth from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import { LuSubtitles } from "react-icons/lu";

import Header from "../../components/header/Header";
import { LoginContext } from "../../contexts/LoginContextProvider";

import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]); // 게시글 목록
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isLogin, userInfo, logout } = useContext(LoginContext);
  const [profileImage, setProfileImage] = useState(null);

  const goToPostForm = () => {
    navigate("/post");
  };

  const handleMyPageClick = () => {
    navigate("/user");
  };

  // 게시글 목록 api
  const getPosts = async () => {
    try {
      const response = await axios.get("/post/list");
      const data = response.data;

      const filteredPosts = data
        .filter((post) => post.postCategory === "together")
        .slice(0, 3);

      setPosts(filteredPosts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  // 사용자 프로필
  const fetchProfileImage = async (username) => {
    try {
      const response = await auth.getImage(username);
      const imgPath = response.data.profileImage;
      setProfileImage(`http://localhost:8080${imgPath}`);
    } catch (error) {
      console.error("프로필 이미지 요청 실패:", error);
    }
  };

  // 날짜 형식 변경 함수
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (userInfo?.username) {
      fetchProfileImage(userInfo.username)
    }
  }, [userInfo])

  useEffect(() => {
    console.log("변경된 profileImage: ", profileImage);
  }, [profileImage]);

  return (
    <>
      <Header />
      <div className="HomeContainer">
        <div className="home-wrapper">
          <div className="home-title">
            <span>가보자Go</span>에 오신걸 환영합니다
          </div>
          <div className="home-contents">
            동행을 구해 함께 여행을 떠나보세요 !
          </div>

          <button className="write-post-btn" onClick={goToPostForm}>
            가보자Go
          </button>
        </div>

        <div className="layout-container">
          <div className="home-container">
            <div className="post-card-container">
              {posts.length === 0 ? (
                <div>게시글이 없습니다.</div>
              ) : (
                posts.map((post) => (
                  <Link to={`/postInfo/${post.id}`}>
                    <div
                      className="post-card"
                      key={post.id}
                      style={{
                        backgroundImage: post.postImage
                          ? `url(${`http://localhost:8080${post.postImage}`})`
                          : "none", // 이미지가 없을 때 기본값
                      }}
                    >
                      <div className="post-card-content">
                        <div className="post-card-title">
                          <LuSubtitles className="icon" /> {post.title}
                        </div>

                        <div className="post-card-period">
                          <span>
                            <CiCalendar className="icon" /> {post.travelStartDate} ~{" "}
                            {post.travelEndDate}
                          </span>
                        </div>
                        <br />

                        <div className="post-card-details">
                          <div>
                            {formatDate(post.createdAt)}{"  "}{post.writer}

                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          <div className="home-login-form">
            {isLogin ? (
              <div className="home-login-wrapper">
                <div className="info">
                  <div className="Profile">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="HomeProfileImage" />
                    ) : (
                      <p>No Image</p>
                    )}
                  </div>
                  <div className="userInfo">
                    <p className="homeUsername">{userInfo.username}</p>
                    <p className="homeEmail">{userInfo.email}</p>
                    <p className="home-participation">
                      <span onClick={handleMyPageClick}>마이페이지</span>
                    </p>
                  </div>
                </div>

                <button className="logout-button" onClick={() => logout()}>
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="non-login-wrapper">
                <p className="info-text">
                  가보자GO의 기능을 편리하게 이용해보세요
                </p>
                <Link to="/login">
                  <button className="login">가보자GO 로그인</button>
                </Link>
                <p className="signup-text">
                  아직 회원이 아니신가요? <a href="/join">회원가입</a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
