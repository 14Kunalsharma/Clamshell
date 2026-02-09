/************************************************
 LOGIN + GOOGLE SSO
*************************************************/

document.addEventListener("DOMContentLoaded", () => {

  const showLoginBtn = document.getElementById("show-login-btn");
  const loginBox = document.getElementById("login-box");
  const continueBtn = document.getElementById("continue-btn");

  if (loginBox) loginBox.style.display = "none";

  if (showLoginBtn && loginBox) {
    showLoginBtn.addEventListener("click", () => {
      loginBox.style.display = "flex";
      showLoginBtn.style.display = "none";
    });
  }

  if (continueBtn) {
    continueBtn.addEventListener("click", () => {

      const userId = document.getElementById("user-id")?.value.trim();
      const password = document.getElementById("password")?.value.trim();

      if (!userId || !password) {
        alert("Please enter User ID and Password");
        return;
      }

      localStorage.setItem("user", JSON.stringify({
        name: userId,
        email: userId
      }));

      window.location.href = "main-dashboard.html";
    });
  }
});

/************************************************
 GOOGLE SSO CALLBACK
*************************************************/

window.handleGoogleSSO = function (response) {

  const payload = JSON.parse(atob(response.credential.split(".")[1]));
  const name = payload.name;
  const email = payload.email;

  const isGmail = email.endsWith("@gmail.com");
  const isClamshell = email.endsWith("@clamshelllearning.com");

  if (!isGmail && !isClamshell) {
    alert("Only Gmail or clamshelllearning.com emails allowed");
    return;
  }

  localStorage.setItem("user", JSON.stringify({
    name,
    email
  }));

  window.location.href = "main-dashboard.html";
};

/************************************************
 DASHBOARD CODE
*************************************************/

if (document.getElementById("content-area")) {

  const ALL_COURSES = {
    mars: [
      "Prompt Engineering",
      "AI at Mars",
      "Asset Health Check",
      "Supplier Trust Guide",
      "Commercial Infographic"
    ],
    eisner: [
      "Client Portal",
      "Individual Engagement Letter",
      "SAP"
    ],
    friesland: [
      "TM Road Freight",
      "TM Ocean Freight",
      "TM Transport Settlement",
      "Foreign Trade",
      "Gen Course"
    ]
  };

  const items = document.querySelectorAll(".sidebar-section li");
  const contentArea = document.getElementById("content-area");
  const mainCards = document.querySelector(".cards");
  const allProductsBtn = document.getElementById("all-products-btn");
  const dashboardExtras = document.getElementById("dashboard-extras");
  const homeIcon = document.getElementById("home-icon");
  const searchInput = document.querySelector(".search");

  const profileName = document.getElementById("profile-name");
  const profileEmail = document.getElementById("profile-email");
  const profileIcon = document.getElementById("profile-icon");
  const profileMenu = document.getElementById("profile-menu");
  const logoutBtn = document.getElementById("logout-btn");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
    if (profileName) profileName.textContent = storedUser.name;
    if (profileEmail) profileEmail.textContent = storedUser.email;
  }

  showWelcomeNancy();

  function showWelcomeNancy() {
    contentArea.innerHTML = `
      <section class="welcome-card">
        <h1>Welcome ${storedUser?.name || "User"}!</h1>
      </section>
    `;
    if (mainCards) mainCards.style.display = "grid";
    if (dashboardExtras) dashboardExtras.style.display = "block";
  }

  function showWelcomeSelect() {
    contentArea.innerHTML = `
      <section class="welcome-card">
        <h1>Welcome Select</h1>
      </section>
    `;
    if (dashboardExtras) dashboardExtras.style.display = "none";
  }

  function showSinglePage(title) {
    contentArea.innerHTML = `
      <section class="welcome-card">
        <h1>${title}</h1>
      </section>
    `;
    if (dashboardExtras) dashboardExtras.style.display = "none";
  }

  function showCompanyPage(title, cardsArray) {
    let cardsHTML = "";
    cardsArray.forEach(course => {
      cardsHTML += `
        <div class="card pink">
          <h4>${course}</h4>
          <p>By Clamshell Team</p>
        </div>
      `;
    });

    contentArea.innerHTML = `
      <section class="welcome-card">
        <h1>${title}</h1>
      </section>
      <div class="cards">${cardsHTML}</div>
    `;

    if (dashboardExtras) dashboardExtras.style.display = "none";
  }

  if (homeIcon) {
    homeIcon.addEventListener("click", () => {
      items.forEach(i => i.classList.remove("active"));
      showWelcomeNancy();
    });
  }

  items.forEach(item => {
    item.addEventListener("click", () => {

      items.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      const page = item.dataset.page;

      if (page === "welcome") showWelcomeSelect();
      else if (page === "mars") showCompanyPage("Mars", ALL_COURSES.mars);
      else if (page === "eisner") showCompanyPage("Eisner Amper", ALL_COURSES.eisner);
      else if (page === "friesland") showCompanyPage("Friesland Campina", ALL_COURSES.friesland);
      else showSinglePage("Coming Soon");
    });
  });

  if (allProductsBtn) {
    allProductsBtn.addEventListener("click", showWelcomeNancy);
  }

  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      if (this.value.trim() === "") {
        showWelcomeNancy();
      }
    });
  }

  if (profileIcon) {
    profileIcon.addEventListener("click", e => {
      e.stopPropagation();
      profileMenu.classList.toggle("show");
    });
  }

  document.addEventListener("click", () => {
    if (profileMenu) profileMenu.classList.remove("show");
  });

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });
  }
}
