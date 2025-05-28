import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import "./MessageForm.css";
import * as auth from "../../api/auth";

const Message = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const user = location.state?.user;

  const [userInfo, setUserInfo] = useState();

  const onMessage = (e) => {
    e.preventDefault();

    const form = e.target;

    const title = form.title.value.trim();
    const receiverName = form.receiverName.value.trim();
    const senderName = userInfo?.name;
    const content = form.content.value.trim();

    console.log(receiverName)

    const message = {
      receiver: receiverName,
      sender: senderName,
      title: title,
      content: content,
    };

    sendMessage(message);
  };

  const getUserInfo = async () => {
    try {
      const response = await auth.info();
      const data = response.data;
      setUserInfo(data);
    } catch (error) {
      console.error("사용자 정보를 불러올 수 없습니다.", error);
    }
  };

  const sendMessage = async (message) => {

    let response;
    let data;

    try {
      response = await auth.sendMessage(message);
    } catch (error) {
      console.error(`쪽지 작성 중 에러 발생 ${error}`);
      alert(`쪽지 작성 중 오류 발생`);
      return;
    }

    data = response.data;
    const status = response.status;

    if (status === 200) {
      console.log(`쪽지 작성 성공`);
      alert("쪽지 작성 성공");
      navigate("/user")
    } else {
      console.log(`쪽지글 작성 실패`);
      alert("쪽지 작성 실패");
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Header />
      <form className="message-form" onSubmit={(e) => onMessage(e)}>
        <div className="messageContainer">
          <p>쪽지 보내기</p>

          <div>
            <input
              type="text"
              id="title"
              className="title"
              placeholder="제목"
              name="title"
              autoComplete="title"
              required
            />
          </div>

          <div>
            <input
              type="text"
              id="receiverName"
              className="receiverName"
              placeholder="받는 사람"
              name="receiverName"
              defaultValue={user}
              autoComplete="receiverName"
              required
            />
          </div>

          <textarea
            id="content"
            name="content"
            className="content"
            cols="40"
            rows="5"
            placeholder="내용을 입력하세요"
            required
          />

          <div className="message-button-group">
            <button className="message-send-button">작성</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Message;
