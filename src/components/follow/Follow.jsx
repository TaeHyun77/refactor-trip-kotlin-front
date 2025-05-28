import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../../api/auth";
import Header from "../header/Header";
import "./Follow.css";
import { FaRegUserCircle } from "react-icons/fa";


const Follow = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("follower");
  const [userInfo, setUserInfo] = useState();

  const getUserInfo = async () => {
    try {
      const response = await auth.info();
      const data = response.data;
      console.log("사용자 정보를 찾을 수 없습니다.:", data);
      setUserInfo(data);

      console.log(userInfo?.followers)
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  // 팔로우 취소
  const handleFollowCancel = async (writerName) => {
    try {
      const response = await auth.followCancel(writerName);

      if (response.status === 200) {
        alert("팔로우 취소 성공!");

        setUserInfo((prev) => ({
          ...prev,
          follow: prev.follow.filter((user) => user !== writerName),
        }));
      } else {
        alert("팔로우 취소 실패!");
      }
    } catch (error) {
      console.error("언팔로우 실패:", error);
    }
  };

  const handleMessage = (user) => {
    navigate('/Message', { state: { user } });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserInfo();
    };

    fetchData();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="followContainer">
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === "follower" ? "active" : ""}`}
            onClick={() => setActiveTab("follower")}
          >
            팔로워
          </button>
          <button
            className={`tab-button ${activeTab === "following" ? "active" : ""
              }`}
            onClick={() => setActiveTab("following")}
          >
            팔로잉
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "follower" && (
            <div className="follow-list">
              {userInfo.followers.length > 0 ? (
                userInfo.followers.map((user) => {
                  const isMutual = userInfo.followings.includes(user); 
                  return (
                    <div key={user} className="follow-card">
                      <p className="user-name">
                        <span className="icon-and-name">
                          <FaRegUserCircle className="user-icon" />
                          {user}{isMutual && <span style={{marginLeft: "5px"}}>⭐️</span>}
                        </span>
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="followMsg">팔로워가 없습니다.</p>
              )}
            </div>
          )}

          {activeTab === "following" && (
            <div className="follow-list">
              {userInfo.followings.length > 0 ? (
                userInfo.followings.map((user) => {
                  const isMutual = userInfo.followers.includes(user);
                  return (
                    <div className="follow-card" key={user}>
                      <p className="user-name">
                        <span className="icon-and-name">
                          <FaRegUserCircle className="user-icon" />
                          {user}{isMutual && <span style={{marginLeft: "5px"}}>⭐️</span>}
                        </span>
                      </p>
                      <div>
                        <button
                          className="follow-button"
                          onClick={() => handleFollowCancel(user)}
                        >
                          팔로우 취소
                        </button>
                        <button
                          className="message-button"
                          onClick={() => handleMessage(user)}
                        >
                          쪽지 작성
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="followMsg">팔로잉한 사용자가 없습니다.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Follow;
