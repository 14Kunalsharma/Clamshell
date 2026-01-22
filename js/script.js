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
  const pages = document.querySelectorAll(".page");

  items.forEach(item => {
    item.addEventListener("click", () => {
      pages.forEach(p => p.classList.remove("active"));
      document.getElementById(item.dataset.page).classList.add("active");
    });
  });
