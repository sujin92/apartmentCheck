function fetchMemberList(accessToken) {
  console.log(accessToken);
  fetch("http://localhost:32001/v1/api/admin/user_all?page=0", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("서버 응답 오류: " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      console.log("회원 목록:");
      console.log(data.body.content);
    })
    .catch(function (error) {
      console.error("오류 발생:", error);
    });
}
