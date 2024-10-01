// 비밀번호 확인
function submitRegistrationForm() {
  var password = document.getElementById("password").value;
  var confirm_password = document.getElementById("confirm_password").value;
  if (password !== confirm_password) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  var formData = {
    user_id: document.getElementById("username").value,
    password: password,
    name: document.getElementById("fullname").value,
    phone: document.getElementById("phone").value,
    birth: document.getElementById("dob").value.replaceAll("-", ""),
    apartment: document.getElementById("apartment").value,
    dong: document.getElementById("dong").value,
    ho: document.getElementById("hosu").value,
  };
  console.log(formData);
  // 회원가입 API 호출
  fetch("http://localhost:32001/v1/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(function (response) {
      console.log(response.status);
      if (response.status === 409) {
        alert("이미 존재하는 아이디입니다.");
      } else if (response.status === 201) {
        window.location.href = "./consent.html";
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

// 중복 확인
function checkUsernameAvailability() {
  var username = document.getElementById("username").value;

  var requestData = {
    user_id: username,
  };

  fetch("http://localhost:32001/v1/api/id_check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then(function (response) {
      if (response.status === 409) {
        alert("이미 존재하는 아이디입니다.");
      } else if (response.status === 200) {
        alert("사용 가능한 아이디입니다.");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("login-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;

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
          window.location.href = "./main.html";
        })
        .catch(function (error) {
          alert("아이디 또는 비밀번호가 일치하지 않습니다. 다시 시도하세요.");
          console.error("Error:", error);
        });
    });
});
