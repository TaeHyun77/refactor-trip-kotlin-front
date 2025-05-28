import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { usePostSave } from "../../contexts/PostSaveProvider";
import Header from "../../components/header/Header";
import "./ComPostForm.css";


const PostForm = () => {
  const { isLogin, userInfo } = useContext(LoginContext);
  const navigate = useNavigate();
  const postSave = usePostSave();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [inputValue, setInputValue] = useState("");

  // 이미지 저장
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Choose a file");

  const onPost = (e) => {
    e.preventDefault(); // submit 기본 동작 방지
    const form = e.target;
    const title = form.title.value;
    const content = form.content.value;
    const writer = userInfo?.name;
    const mbti = form.mbti.value;
    const place = form.place.value;
    const travelStartDate = form.startDate.value;
    const travelEndDate = form.endDate.value;
    const people = form.people.value;
    const postCategory = "together";

    if (Number(form.people.value) < 1) {
      alert("모집 인원은 1명 이상이어야 합니다.");
      return;
    }

    const formData = new FormData();

    // JSON 형태로 변환
    const postData = {
      title,
      content,
      writer,
      mbti,
      place,
      travelStartDate,
      travelEndDate,
      people,
      postCategory,
    };

    formData.append(
      "postData",
      new Blob([JSON.stringify(postData)], { type: "application/json" })
    );

    formData.append("postCategory", postCategory);

    // 선택된 이미지 파일 추가
    if (file) {
      formData.append("file", file);
    }

    postSave(formData);
  };

  // 날짜 선택
  const changeDate = (e) => {
    const startDateFormat = moment(e[0]).format("YYYY/MM/DD");
    const endDateFormat = moment(e[1]).format("YYYY/MM/DD");
    setStartDate(startDateFormat);
    setEndDate(endDateFormat);
  };

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  useEffect(() => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
  }, [isLogin, navigate]);

  return (
    <div>
      <Header />
      <div className="post-insert-form">
        <h2>동행 게시글 작성</h2>
        <hr />
        <form onSubmit={onPost}>
          <table>
            <tbody>
              <tr>
                <td>여행기간</td>
                <td>
                  <Calendar
                    onChange={changeDate}
                    selectRange={true}
                    formatDay={(locale, date) => moment(date).format("DD")}
                  />

                  <div className="date-input-container">
                    <input
                      type="text"
                      className="start-date"
                      name="startDate"
                      placeholder="출발일"
                      value={startDate || ""}
                      disabled
                    />
                    <input
                      type="text"
                      className="end-date"
                      name="endDate"
                      placeholder="귀국일"
                      value={endDate || ""}
                      disabled
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td>제목</td>
                <td>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="input-field"
                    placeholder="제목을 입력하세요"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>작성자</td>
                <td>
                  <input
                    id="writer"
                    name="writer"
                    className="input-field"
                    defaultValue={userInfo?.name}
                    required
                    readOnly
                  />
                </td>
              </tr>

              <tr>
                <td>내용</td>
                <td>
                  <textarea
                    id="content"
                    name="content"
                    className="textarea-field"
                    cols="40"
                    rows="5"
                    placeholder="내용을 입력하세요"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>모집인원</td>
                <td>
                  <input
                    type="number"
                    id="people"
                    name="people"
                    className="input-field"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>MBTI</td>
                <td>
                  <input
                    type="text"
                    id="mbti"
                    name="mbti"
                    className="input-field"
                    placeholder="MBTI를 입력하세요"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>여행지</td>
                <td>
                  <input
                    type="text"
                    id="place"
                    name="place"
                    className="input-field"
                    placeholder="여행지를 입력하세요"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>게시글 이미지</td>
                <td>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*"
                    onChange={onFileChange}
                    style={{ display: "none" }}
                  />

                  <label
                    htmlFor="file"
                    className="image-btn"
                  >
                    {fileName}
                  </label>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="button-container">
            <button className="submit-button">등록</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
