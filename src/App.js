import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { PostSaveProvider } from "./contexts/PostSaveProvider";

import ComPostForm from "./form/post/ComPostForm";
import PostForm from "./form/post/PostForm";

import KakaoMap from "./components/map/KakaoMap";
import PostInfo from "./pages/post/PostInfo";
import PostUpdateForm from "./form/post/PostUpdateForm";
import ComPostUpdateForm from "./form/post/ComPostUpdateForm";
import LoginContextProvider from "./contexts/LoginContextProvider";
import UserUpdateForm from "./form/user/UserUpdateForm";

import About from "./pages/About";
import Admin from "./pages/Admin";
import Home from "./pages/home/Home";
import Join from "./pages/Authentication/Join";
import Login from "./pages/Authentication/Login";
import Post from "./pages/postList/PostList";
import PostCom from "./pages/postList/ComPostList";
import User from "./pages/user/User";
import { UserListProvider } from "./pages/user/UserListProvider";

import Follow from "./components/follow/Follow";
import Message from "./form/message/MessageForm";
import MessageBox from "./components/message/Message";

const App = () => {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/user" element={<User />} />
          <Route path="/post" element={<Post />} />
          <Route path="/postInfo/:id" element={<PostInfo />} />
          <Route path="/PostUpdateForm" element={<PostUpdateForm />} />
          <Route path="/ComPostUpdateForm" element={<ComPostUpdateForm />} />
          <Route path="/postCom" element={<PostCom />} />
          <Route path="/kakao/search" element={<KakaoMap />} />
          <Route path="/UserUpdate" element={<UserUpdateForm />} />
          <Route path="/Follow" element={<Follow />} />
          <Route path="/Message" element={<Message />} />
          <Route path="/MessageBox" element={<MessageBox />} />

          {/* 게시글 작성 함수 넘기는 용도 */}
          <Route
            path="/post-write"
            element={
              <PostSaveProvider>
                <ComPostForm />
              </PostSaveProvider>
            }
          />

          <Route
            path="/free-post-write"
            element={
              <PostSaveProvider>
                <PostForm />
              </PostSaveProvider>
            }
          />

          <Route
            path="/admin"
            element={
              <UserListProvider>
                <Admin />
              </UserListProvider>
            }
          />

          <Route
            path="/about"
            element={
              <UserListProvider>
                <About />
              </UserListProvider>
            }
          />
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
};

export default App;
