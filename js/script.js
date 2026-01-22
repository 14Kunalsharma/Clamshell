/* ===============================
   LOGIN PAGE HANDLING
================================ */

const loginBtn = document.getElementById("login-btn");

if (loginBtn) {
  loginBtn.addEventListener("click", function () {
    const btn = this;
    const formBox = document.querySelector(".login-form-hidden");

    // STEP 1: Login → show form
    if (btn.innerText === "Login") {
      formBox.style.display = "block";
      btn.innerText = "Continue";
      return;
    }

    // STEP 2: Validate
    const userId = document.getElementById("user-id").value.trim();
    const password = document.getElementById("password").value.trim();

    if (userId === "" || password === "") {
      alert("Please enter User ID and Password");
      return;
    }

    // STEP 3: Redirect to dashboard
    window.location.href = "main-dashboard.html";
  });
}


/* ===============================
   SIDEBAR CONTENT SWITCHING
================================ */

const items = document.querySelectorAll(".products li");
const content = document.getElementById("content-area");

const pages = {
  welcome: `
    <div class="welcome-card">
      <h1>Welcome Nancy!</h1>
      <p>Select a module from the sidebar</p>
    </div>
  `,
  language: `<h1>Language Select</h1><p>Select your preferred language.</p>`,
  role: `<h1>Role Selection</h1><p>Select your role.</p>`,
  attestation: `<h1>Attestation</h1><p>Please confirm your details.</p>`
};

// default page
if (content) {
  content.innerHTML = pages.welcome;
}

// sidebar click
items.forEach(item => {
  item.addEventListener("click", () => {
    const key = item.dataset.page;
    if (content) {
      content.innerHTML = pages[key] || "<p>Page coming soon</p>";
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


/* ===============================
   DEBUG (optional)
================================ */
// console.log("JS loaded successfully");

