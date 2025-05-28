import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import "./Message.css";
import * as auth from "../../api/auth";

const MessageBox = () => {
  const [activeTab, setActiveTab] = useState("received");
  const [userInfo, setUserInfo] = useState();
  const [messageList, setMessageList] = useState([]);

  const getUserInfo = async () => {
    try {
      const response = await auth.info();
      const data = response.data;
      setUserInfo(data);
    } catch (error) {
      console.error("사용자 정보를 불러올 수 없습니다.", error);
    }
  };

  const getMessageList = async () => {
    try {
      const response = await auth.messageList();
      const data = response.data;

      setMessageList(data);
    } catch (e) {
      console.error(e)
    }
  }

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
    getUserInfo();
    getMessageList()
  }, []);

  return (
    <>
      <Header />

      <div className="messageBox-container">
        <p>쪽지함</p>

        <div className="messageBox-tabs">
          <button
            className={`messageBox-tab-button ${activeTab === "received" ? "active" : ""
              }`}
            onClick={() => setActiveTab("received")}
          >
            받은 쪽지
          </button>
          <button
            className={`messageBox-tab-button ${activeTab === "sent" ? "active" : ""
              }`}
            onClick={() => setActiveTab("sent")}
          >
            보낸 쪽지
          </button>
        </div>

        <div className="messageBox-tab-content">
          {activeTab === "received" && (
            <div>
              <table>
                <thead className="asd">
                  <tr>
                    <th align="center">보낸 사람</th>
                    <th align="center">제목</th>
                    <th align="center">내용</th>
                    <th align="center">날짜</th>
                  </tr>
                </thead>

                <br></br>

                <tbody>
                  {userInfo?.messageList?.length > 0 ? (
                    userInfo.messageList
                      .filter((message) => message.receiver === userInfo?.username)
                      .map((message, index) => (
                        <tr key={index}>
                          <td align="center">{message.receiver}</td>
                          <td align="center">{message.title}</td>
                          <td align="center">{message.content}</td>
                          <td align="center" style={{ color: "gray" }}>
                            {formatDate(message.createdAt)}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="5" align="center" style={{ color: "gray" }}>
                        받은 쪽지가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>{" "}
            </div>
          )}
          {activeTab === "sent" && (
            <div>
              <table>
                <thead className="asd">
                  <tr>
                    <th align="center">받은 사람</th>
                    <th align="center">제목</th>
                    <th align="center">내용</th>
                    <th align="center">날짜</th>
                  </tr>
                </thead>

                <br></br>

                <tbody>
                  {messageList > 0 ? (
                    messageList
                      .filter((message) => message.sender === userInfo?.name)
                      .map((message, index) => (
                        <tr key={index}>
                          <td align="center">{message.receiver}</td>
                          <td align="center">{message.title}</td>
                          <td align="center">{message.content}</td>
                          <td align="center" style={{ color: "gray" }}>
                            {formatDate(message.createdAt)}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="5" align="center" style={{ color: "gray" }}>
                        보낸 쪽지가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>{" "}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MessageBox;
