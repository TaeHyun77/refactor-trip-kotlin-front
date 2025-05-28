import React, { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { LuSubtitles } from "react-icons/lu";
import { TbPencilCheck } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import * as auth from "../../api/auth";
import Header from "../../components/header/Header";
import "./PostList.css";

// 동행 게시판
const Post = () => {
  const navigate = useNavigate();

  const [postList, setPostList] = useState([]);
  const [userInfo, setUserInfo] = useState();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [startDate, setStartDate] = useState(""); // 필터링할 시작 날짜
  const [endDate, setEndDate] = useState(""); // 필터링할 종료 날짜

  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 8;

  const offset = currentPage * postsPerPage;
  const currentPagePosts = filteredPosts.slice(offset, offset + postsPerPage);
  const pageCount = Math.ceil(filteredPosts.length / postsPerPage);

  const [nightsText, setNightsText] = useState("");

  const getPostList = async () => {
    try {
      const response = await auth.postList();
      const data = response.data;

      // postCategory가 "together"인 게시글만 필터링
      const filtered = data.filter((post) => post.postCategory === "together");
      setPostList(filtered);
      setFilteredPosts(filtered);

    } catch (error) {
      console.error("Failed to fetch post list:", error);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // 날짜 계산 함수
  const calculateNights = (start, end) => {
    if (!start || !end) {
      return "0박";
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays > 0 ? `${differenceInDays}박` : "0박";
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const filtered = postList.filter((post) => {
      const isWithinDateRange =
        (!startDate || startDate >= post.startDate) &&
        (!endDate || endDate <= post.endDate);

      const matchesSearchTerm =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());

      return isWithinDateRange && matchesSearchTerm;
    });

    setFilteredPosts(filtered);
    setCurrentPage(0);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setNightsText(calculateNights(e.target.value, endDate));
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setNightsText(calculateNights(startDate, e.target.value));
  };

  const handleClick = () => {
    navigate("/post-write");
  };

  const handleCardClick = (postId) => {
    navigate(`/postInfo/${postId}`);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <>
      <Header />
      <div className="PostContainer">
        <div className="title-button-container">
          <BsPencilSquare style={{ margin: "0px 20px 30px 0px" }} />
          <h2 style={{ marginBottom: "30px" }}>동행 게시판</h2>
          <div className="search-and-button-container">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="게시글 제목 검색"
                className="search-input"
              />
              <div className="date-range-container">
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="post-date-input"
                  placeholder="시작 날짜"
                />
                <span className="nights-text">{nightsText || "0박"}</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  className="post-date-input"
                  placeholder="종료 날짜"
                />
              </div>

              <button type="submit" className="search-button">
                검색
              </button>
            </form>
            <button onClick={handleClick}>새 글 작성</button>
          </div>
        </div>
        <hr style={{ marginBottom: "50px;" }} />

        <div className="postCard-container">
          {currentPagePosts.map((post, index) => (
            <div
              key={index}
              className="postCard"
              onClick={() => handleCardClick(post.id)}
            >
              <div className="collectPostImage">
                {post.postImage ? (
                  <img
                    src={`http://localhost:8080${post.postImage}`}
                    alt="postImage"
                    className="postImage"
                  />
                ) : (
                  <p>No Image</p>
                )}
              </div>

              <div classname="post-content" style={{ padding: "20px 0 0 2px" }}>
                <p>
                  <LuSubtitles className="icon" /> {post.title}
                </p>
                <div className="card-footer">
                  <p>
                    <TbPencilCheck className="icon" /> {post.writer}
                  </p>
                </div>
                <p style={{ fontSize: "12px", color: "gray" }}>
                  <CiCalendar className="icon" /> {post.travelStartDate} ~{" "}{post.travelEndDate}
                </p>

                <div className="right-info">
                  <p>조회수: {post?.viewCnt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ReactPaginate
          previousLabel={"이전"}
          nextLabel={"다음"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousClassName={"pagination-prev"}
          nextClassName={"pagination-next"}
        />
      </div>
    </>
  );
};

export default Post;
