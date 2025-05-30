import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../api/auth";

const PostSaveContext = createContext();

export const PostSaveProvider = ({ children }) => {
  const navigate = useNavigate();

  const postSave = async (form) => {

    let response;
    let data;
    let postCategory = form.get("postCategory");

    try {
      response = await auth.postSave(form);
    } catch (error) {
      console.error(`${error}`);
      console.error(`게시글 작성 중 에러 발생`);
      alert(`게시글 작성 중 에러 발생`);
      return;
    }

    data = response.data;
    const status = response.status;
    console.log(data);
    console.log(`status : ${status}`);

    if (status === 200) {
      console.log(`게시글 작성 성공`);
      alert("게시글 작성 성공");

      if (postCategory == "free") {
        navigate("/post");
      } else {
        navigate("/postCom");
      }
    } else {
      console.log(`게시글 작성 실패`);
      alert("게시글 작성 실패");

      if (postCategory == "free") {
        navigate("/postCom");
      } else {
        navigate("/post");
      }
    }
  };

  return (
    <>
      <PostSaveContext.Provider value={postSave}>
        {children}
      </PostSaveContext.Provider>
    </>
  );
};

export const usePostSave = () => useContext(PostSaveContext);
