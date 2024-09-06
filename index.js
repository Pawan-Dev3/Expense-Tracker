const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");
    const menuBtn = document.getElementById("menu-btn");
    const closeBtn = document.getElementById("close-btn");
    const dashboardHeader = document.getElementById("dashboard-header");
    // const closeTourBtn = document.querySelector(".tour");
    // const tourVideo = document.getElementById("tourVideo");


    // document.addEventListener("DOMContentLoaded", () => {
    //   tourVideo.play();
    // });

    menuBtn.addEventListener("click", () => {
      sidebar.classList.remove("hidden");
      sidebar.style.display = "inline";
      menuBtn.style.display = "none";
      menuBtn.classList.add("hidden");
      closeBtn.classList.remove("hidden");
    });

    closeBtn.addEventListener("click", () => {
      sidebar.classList.add("hidden");
      menuBtn.style.display = "inline";
      sidebar.style.display = "none";
      menuBtn.classList.remove("hidden");
      closeBtn.classList.add("hidden");
    });

    function loadPage(url) {
      document.getElementById("content-frame").src = url;
    }

    function logout() {
      sessionStorage.removeItem("loggedIn");
      window.location.href = "home.html";
    }

    function checkLogin() {
      const loggedIn = sessionStorage.getItem("loggedIn");
      if (!loggedIn) {
        window.location.href = "home.html";
      }
    }
checkLogin();
