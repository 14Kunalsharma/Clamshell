document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     LOGIN PAGE
  ================================ */

  const loginBtn = document.getElementById("login-btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", function () {

      const formBox = document.querySelector(".login-form-hidden");

      if (this.innerText === "Login") {
        formBox.style.display = "block";
        this.innerText = "Continue";
        return;
      }

      const userId = document.getElementById("user-id").value.trim();
      const password = document.getElementById("password").value.trim();

      if (userId === "" || password === "") {
        alert("Please enter User ID and Password");
        return;
      }

      window.location.href = "main-dashboard.html";
    });
  }

  /* ===============================
     SIDEBAR NAVIGATION
  ================================ */

  const items = document.querySelectorAll(".products li");
  const contentArea = document.getElementById("content-area");
  const dashboardCards = document.querySelector(".cards");

  // DEFAULT → Welcome Nancy
  if (contentArea) {
    contentArea.innerHTML = `
      <section class="welcome-card">
        <h1>Welcome Nancy!</h1>
        <p>Select a module from the sidebar.</p>
      </section>
    `;
  }

  // Sidebar Click
  items.forEach(item => {
    item.addEventListener("click", () => {

      const page = item.dataset.page;

      items.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      // Hide cards when clicking any menu
      if (dashboardCards) {
        dashboardCards.style.display = "none";
      }

      // Welcome Select Page
      if (page === "welcome") {
        contentArea.innerHTML = `
          <h2>Welcome Select</h2>
          <p>This is Welcome Select Page</p>
        `;
      }

      else if (page === "language") {
        contentArea.innerHTML = `<h2>Language Select</h2>`;
      }

      else if (page === "role") {
        contentArea.innerHTML = `<h2>Role Selection</h2>`;
      }

      else if (page === "attestation") {
        contentArea.innerHTML = `<h2>Attestation</h2>`;
      }

      else {
        contentArea.innerHTML = `<p>Page Coming Soon...</p>`;
      }

    });
  });

  /* ===============================
     CARD CLICK NAVIGATION
  ================================ */

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      const link = card.getAttribute("data-link");
      if (link) {
        window.location.href = link;
      }
    });
  });

});
