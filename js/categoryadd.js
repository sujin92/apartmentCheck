document.addEventListener("DOMContentLoaded", function () {
  var accessToken = localStorage.getItem("accessToken");
  var selectedTopLevelCategory = null;

  if (accessToken) {
    fetchTopLevelCategories(accessToken);
  } else {
    window.location.href = "./managerLogin.html";
  }

  //삭제
  var deleteBtn = document.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", function () {
    deleteSelectedCategories(accessToken);
  });

  function fetchTopLevelCategories(accessToken) {
    fetch("http://localhost:32001/v1/api/category/get_category?parent_id=-1", {
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
        console.log("최상위 메뉴 데이터:", data);

        var large001 = document.querySelector(".large001");
        large001.innerHTML = "";

        var topLevelCategories = data.body;
        topLevelCategories.forEach(function (category) {
          var listItem = document.createElement("li");
          listItem.innerHTML = `<input type="checkbox" /><span>${category.category_name}</span><i class="fa-solid fa-caret-right"></i>`;
          listItem.addEventListener("click", function () {
            clearSubCategories();
            selectedTopLevelCategory = category.uuid;
            fetchSubCategories(accessToken, category.uuid);
          });
          large001.appendChild(listItem);
        });
      })
      .catch(function (error) {
        console.error("오류 발생:", error);
      });
  }

  function fetchSubCategories(accessToken, parentId) {
    fetch(
      `http://localhost:32001/v1/api/category/get_category?parent_id=${parentId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw new Error("서버 응답 오류: " + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        console.log("선택된 최상위 메뉴의 하위 카테고리 데이터:", data);

        var middle001 = document.querySelector(".middle001");
        middle001.innerHTML = "";

        var subCategories = data.body;
        subCategories.forEach(function (subCategory) {
          var listItem = document.createElement("li");
          listItem.innerHTML = `<input type="checkbox" /><span>${subCategory.category_name}</span><i class="fa-solid fa-caret-right"></i>`;
          listItem.addEventListener("click", function () {
            fetchSmallCategories(accessToken, subCategory.uuid);
          });
          middle001.appendChild(listItem);
        });
      })
      .catch(function (error) {
        console.error("오류 발생:", error);
      });
  }

  function fetchSmallCategories(accessToken, parentId) {
    fetch(
      `http://localhost:32001/v1/api/category/get_category?parent_id=${parentId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw new Error("서버 응답 오류: " + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        console.log("선택된 중간 카테고리의 하위 카테고리 데이터:", data);

        var small001 = document.querySelector(".small001");
        small001.innerHTML = "";

        var subCategories = data.body;
        subCategories.forEach(function (subCategory) {
          var listItem = document.createElement("li");
          listItem.innerHTML = `<input type="checkbox" /><span>${subCategory.category_name}</span>`;
          small001.appendChild(listItem);
        });
      })
      .catch(function (error) {
        console.error("오류 발생:", error);
      });
  }

  function deleteSelectedCategories(accessToken) {
    var checkboxes = document.querySelectorAll(
      ".joinApproval input[type='checkbox']:checked"
    );
    checkboxes.forEach(function (checkbox) {
      var categoryUUID = checkbox.parentNode.parentNode.dataset.uuid;
      fetch("http://localhost:32001/v1/api/admin/delete_category", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uuid: categoryUUID,
        }),
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("서버 응답 오류: " + response.status);
          }
          return response.json();
        })
        .then(function (data) {
          console.log("카테고리 삭제 성공:", data);
          checkbox.parentNode.parentNode.remove();
        })
        .catch(function (error) {
          console.error("카테고리 삭제 오류:", error);
          console.log(checkboxes);
          console.log(categoryUUID);
          console.log(dataset);
        });
    });
  }

  function clearSubCategories() {
    var middle001 = document.querySelector(".middle001");
    var small001 = document.querySelector(".small001");
    middle001.innerHTML = "";
    small001.innerHTML = "";
  }
});
