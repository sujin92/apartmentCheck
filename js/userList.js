var accessToken;

document.addEventListener("DOMContentLoaded", function () {
  accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    fetchMemberList(accessToken);
  } else {
    window.location.href = "./managerLogin.html";
  }
});

function fetchMemberList(accessToken) {
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
      console.log(accessToken);

      var memberTable = document.getElementById("memberTable");
      var tbody = memberTable.getElementsByTagName("tbody")[0];
      tbody.innerHTML = "";

      var members = data.body.content;
      members.forEach(function (member, index) {
        var row = document.createElement("tr");
        row.innerHTML = `
              <th class="tg-9act"><input type="checkbox" /></th>
              <td class="tg-yf1d">${index + 1}</td>
              <td class="tg-yf1d">${member.name}</td>
              <td class="tg-yf1d">${member.birth}</td>
              <td class="tg-uj0o">${member.phone}</td>
              <td class="tg-uj0o">${member.apartment}</td>
              <td class="tg-uj0o">${member.dong}</td>
              <td class="tg-uj0o">${member.ho}</td>
          `;
        tbody.appendChild(row);
      });
    })
    .catch(function (error) {
      console.error("오류 발생:", error);
    });
}
