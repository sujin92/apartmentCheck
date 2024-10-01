document.addEventListener("DOMContentLoaded", function () {
  function handleMainCheck(mainCheckId, membersId) {
    var mainCheck = document.getElementById(mainCheckId);
    var checkboxes = document.querySelectorAll(
      "#" + membersId + ' input[type="checkbox"]'
    );

    mainCheck.addEventListener("click", function () {
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = mainCheck.checked;
      });
    });
  }

  handleMainCheck("mainCheck", "members01");
  handleMainCheck("mainCheck02", "members02");
});

document.addEventListener("DOMContentLoaded", function () {
  openTab("categories");
});

function openTab(tabName) {
  var i, tabContent, tabLinks;
  tabContent = document.getElementsByClassName("tabContent");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  tabLinks = document
    .getElementsByClassName("tabs")[0]
    .getElementsByTagName("button");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove("active");
  }
  document.getElementById(tabName).style.display = "block";
  document.getElementById(tabName + "Tab").classList.add("active");
}
