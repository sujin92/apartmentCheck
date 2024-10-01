//관리자페이지 로그인
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("login-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var username = document.getElementById("usernameManager").value;
      var password = document.getElementById("passwordManager").value;

      var formData = {
        user_id: username,
        password: password,
      };

      fetch("http://localhost:32001/v1/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("서버 응답 오류");
          }
        })
        .then(function (data) {
          var accessToken = data.body.access_token;
          localStorage.setItem("accessToken", accessToken);
          fetchMemberList(accessToken);
          window.location.href = "./managerMain.html";
        })
        .catch(function (error) {
          alert("아이디 또는 비밀번호가 일치하지 않습니다. 다시 시도하세요.");
          console.error("Error:", error);
        });
    });
});
