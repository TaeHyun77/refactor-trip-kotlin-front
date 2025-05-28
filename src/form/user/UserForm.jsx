import React, { useEffect, useState } from "react";
import * as auth from "../../api/auth";
import { useNavigate } from "react-router-dom";
import "./UserForm.css";
import { LuPencilLine } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { LuSubtitles } from "react-icons/lu";

export const UserForm = ({ userInfo, updateUser }) => {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);
  const [activeTab, setActiveTab] = useState("post");

  const [postList, setPostList] = useState([]);

  const fetchProfileImage = async (username) => {
    try {
      const response = await auth.getImage(username);
      const imgPath = response.data.profileImage;
      setProfileImage(`http://localhost:8080${imgPath}`);
    } catch (error) {
      console.error("프로필 이미지 요청 실패:", error);
    }
  };

  const getPostList = async () => {
    try {
      const response = await auth.postList();
      const data = response.data;

      setPostList(data);
    } catch (error) {
      console.error("작성한 게시글 목록을 불러오지 못했습니다.:", error);
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

  const handlePostWriteClick = () => {
    navigate(`/post-write`);
  };

  const handlePostClick = (postId) => {
    navigate(`/post`);
  };

  const handleFollow = () => {
    navigate(`/Follow`);
  };

  useEffect(() => {
    if (userInfo?.username) {
      fetchProfileImage(userInfo.username);
      getPostList();
    }
  }, [userInfo]);

  return (
    <div className="userInfoContainer">
      <div className="userInfoForm">
        <div className="login-wrapper">
          <div className="info">
            <div className="Profile">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="userProfileImage" />
              ) : (
                <p>프로필 이미지를 불러올 수 없습니다.</p>
              )}
            </div>
            <div className="userInfo">
              <p className="username">{userInfo?.username}</p>
              <p className="email">{userInfo?.email}</p>
              <div className="userInfo-info" style={{ display: "flex" }}>
                <p className="age">
                  {userInfo?.age} · {userInfo?.gender}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="my_self_wrapper">
          <div className="my_self">
            {userInfo?.selfIntro ? (
              <p>{userInfo?.selfIntro}</p>
            ) : (
              <p>자기소개를 입력해보세요 !</p>
            )}
          </div>
          <button
            className="btn_my_self"
            onClick={() => navigate(`/UserUpdate`)}
          >
            자기소개 작성
          </button>
        </div>


        <div className="follow">
          <p>
            <span onClick={handleFollow} style={{ cursor: "pointer" }}>
              팔로워 {userInfo?.followers.length}
            </span>
            &ensp; · &ensp;
            <span onClick={handleFollow} style={{ cursor: "pointer" }}>
              팔로잉 {userInfo?.followings.length}
            </span>
          </p>
          <button
            className="btn_message_box"
            onClick={() => navigate(`/MessageBox`)}
          >
            쪽지함
          </button>
        </div>

        <button
          className="update_user_btn"
          onClick={() => navigate(`/UserUpdate`)}
        >
          <LuPencilLine /> 프로필 수정
        </button>

        <div className="tabs">
          <button
            className={`tab-button ${activeTab === "post" ? "active" : ""}`}
            onClick={() => setActiveTab("post")}
          >
            게시글
          </button>
          <button
            className={`tab-button ${activeTab === "participation" ? "active" : ""
              }`}
            onClick={() => setActiveTab("participation")}
          >
            참여한 동행
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "post" && (
            <div className="userInfo-post">
              {postList ? (
                <div className="postCards">
                  {postList
                    .filter((post) => post?.writer === userInfo?.name)
                    .map((post) => (
                      <div
                        key={post.id}
                        className="postCardList"
                        onClick={() => handlePostClick(post.id)}
                      >
                        <p>
                          <LuSubtitles className="icon" /> {post.title}
                        </p>
                        <p style={{ fontSize: "12px", color: "gray" }}>
                          <CiCalendar className="icon" /> {post.travelStartDate} ~{" "}
                          {post.travelEndDate}
                        </p>
                        <p
                          className=""
                          style={{
                            fontSize: "12px",
                            color: "gray",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>
                            {post.place} · {" "}
                            {formatDate(post.createdAt)}
                          </span>
                          <span> 조회수: {post.count}</span>
                        </p>
                      </div>
                    ))}
                </div>
              ) : (
                <>
                  <p>아직 작성한 동행글이 없습니다.</p>
                  <p>동행 글을 작성해보세요 !</p>
                  <button
                    className="user-post-btn"
                    onClick={handlePostWriteClick}
                  >
                    동행글 작성
                  </button>
                </>
              )}
            </div>
          )}
          {activeTab === "participation" && (
            <div className="userInfo-post">
              {postList ? (
                <div className="postCards">
                  {postList
                    .filter((post) =>
                      post?.participantList?.some(
                        (participant) => participant.username === userInfo?.username
                      )
                    )
                    .map((post) => (
                      <div
                        key={post.id}
                        className="postCardList"
                        onClick={() => handlePostClick(post.id)}
                      >
                        <p>
                          {" "}
                          <LuSubtitles className="icon" /> {post.title}
                        </p>
                        <p style={{ fontSize: "12px", color: "gray" }}>
                          <CiCalendar className="icon" /> {post.travelStartDate} ~{" "}
                          {post.travelEndDate}
                        </p>
                        <p
                          className=""
                          style={{
                            fontSize: "12px",
                            color: "gray",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>
                            {post.place} ·{" "}
                            {formatDate(post.createdAt)}
                          </span>
                          <span> 조회수: {post.count}</span>
                        </p>
                      </div>
                    ))}
                </div>
              ) : (
                <>
                  <p>아직 참여한 동행이 없습니다.</p>
                  <p>동행에 참여해보세요 !</p>
                  <button className="user-post-btn" onClick={handlePostClick}>
                    동행 참여
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
