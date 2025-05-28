import api from './api'; // api.js 파일에서 만든 api 객체 사용


// ------------ 사용자 -------------

// 로그인
export const login = (username, password) => api.post(`/login?username=${username}&password=${password}`);

// 회원가입
export const join = (data) => api.post(`/member/register`, data);

// 유저 정보 수정
export const update = (data) => api.post(`/member/update`, data) // json 형식

// 유저 정보 삭제
export const remove = (username) => api.delete(`/user/delete/${username}`)

// 유저 정보
export const info = () => api.get(`/member/info`)

// 유저 리스트
export const list = () => api.get("/user/userList");

// 사용자 프로필 이미지
export const getImage = (username) => api.get(`/member/profileImage/${username}`);

// 사용자 프로필 이미지 변경
export const uploadProfileImage = (username, data) => api.post(`/file/uploadProfileImage/${username}`, data);

// 팔로우
export const follow = (selfUsername, otherUsername) => api.post(`/follow/follow/${selfUsername}/${otherUsername}`)

// 팔로우 취소
export const followCancel = (selfId, otherId) => api.delete(`/follow/delete/${selfId}/${otherId}`)


// ------------ 게시물 -------------

// 게시물 저장
export const postSave = (data) => api.post(`/post/write`, data);

// 게시글 수정
export const updatePost = (postId, data) => api.post(`/post/${postId}`, data) // json 형식

// 게시물 삭제
export const removePost = (id) => api.delete(`/post/remove/${id}`)

// 게시물 상세
export const postInfo = (id) => api.get(`/post/${id}`);

// 게시물 리스트
export const postList = () => api.get("/post/list");

// 게시글 조회수 업데이트
export const viewCount = (id, username) => api.post(`/post/view/${id}/${username}`);

// 동행 참여
export const participate = (postId, data) => api.post(`/participant/participate/${postId}`, data)

// 동행 참여 취소, delete는 body를 지원하지 않음 
export const participateCancel = (postId, username) => api.delete(`/participant/cancel/${postId}/${username}`);


// ------------ 댓글 -------------

// 댓글 작성
export const addComment = (postId, data) => api.post(`/comment/write/${postId}`, data);

// 댓글 수정
export const updateComment = (commentId, data) => api.post(`/comment/update/${commentId}`, data);

// 댓글 삭제
export const removeComment = (id) => api.delete(`/comment/delete/${id}`)

// 댓글 리스트
export const CommentList = (postId) => api.get(`/comment/list/${postId}`);

// 이미지 업로더
export const uploadImage = () => api.get(`/file/upload`)


// ------------ 쪽지 -------------

export const sendMessage = (data) => api.post(`/message/send`, data)

export const messageList = () => api.get(`/message/list`)