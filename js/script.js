document.getElementById('login-btn').addEventListener('click', function () {
  const btn = document.getElementsByClassName("login-button")[0];

  if (btn.innerText === "Continue") {
    // Continue click hone par redirect
    window.location.href = "main-dashboard.html";
  } else {
    // Pehli click par UI change
    btn.innerText = "Continue";
    document.getElementsByClassName("login-form-hidden")[0].style.display = "block";
  }
});

const items = document.querySelectorAll(".products li");
const content = document.getElementById("content-area");

const pages = {
  welcome: `
    <h1>Welcome Nancy!</h1>
    <p>This is the welcome screen.</p>
  `,
  language: `
    <h1>Language Select</h1>
    <p>Select your preferred language.</p>
  `,
  role: `
    <h1>Role Selection</h1>
    <p>Select your role.</p>
  `,
  attestation: `
    <h1>Attestation</h1>
    <p>Please confirm your details.</p>
  `
};

items.forEach(item => {
  item.addEventListener("click", () => {
    const key = item.dataset.page;
    content.innerHTML = pages[key];
  });
});
