import React, { useEffect, useContext } from "react";
import Header from "../components/header/Header";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContextProvider";
import { useUserList } from "./user/UserListProvider";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export const Admin = () => {
  const { isLogin, roles, userInfo } = useContext(LoginContext);
  const navigate = useNavigate();
  const { userList, deleteUser } = useUserList();

  console.log(userList)

  useEffect(() => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    if (userInfo?.username != "admin0515") {
      alert("권한이 없습니다.");
      navigate("/");
      return;
    }
  }, [isLogin, roles]);

  return (
    <>
      {isLogin && roles.isAdmin && (
        <>
          <Header />
          <div className="container" style={{ width: "1600px", marginTop: "100px" }}>
            <h1 style={{marginBottom:"30px"}}>
              <MdOutlineAdminPanelSettings />
              관리자 페이지
            </h1>

            <hr style={{marginBottom:"50px"}} />
            <div >
              <table>
                <thead>
                  <tr>
                    <th align="center" >ID</th>
                    <th align="center">아이디</th>
                    <th align="center">이름</th>
                    <th align="center">이메일</th>
                    <th align="center">등급</th>
                    <th align="center">성별</th>
                    <th align="center">사용자 삭제</th>
                  </tr>
                </thead>

                <br></br>

                <tbody>
                  {userList
                    .filter(user => user.username !== "admin0515")
                    .map((user, index) => (
                      <tr key={index}>
                        <td align="center">{user.id}</td>
                        <td align="center">{user.username}</td>
                        <td align="center">{user.name}</td>
                        <td align="center">{user.email}</td>
                        <td align="center">{user.role}</td>
                        <td align="center">{user.gender}</td>
                        <td align="center">
                          <button onClick={() => deleteUser(user.username)} className="btn-admin">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Admin;
