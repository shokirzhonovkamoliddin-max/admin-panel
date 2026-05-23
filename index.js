const elFor = document.querySelector(".form");

const API = "https://fakestoreapi.com/auth/login";

elFor.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.querySelector(".username").value.trim();
  const password = document.querySelector(".passwd").value.trim();

  if (!username || !password) {
    Toastify({
      text: "Invalid username or password",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #8c092c, #600c0f)",
      },
      onClick: function () {},
    }).showToast();

    return;
  }

  const user = {
    username: username,
    password: password,
  };

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (data.token) {
        localStorage.setItem("token", data.token);

        window.location.href = "./admin.html";
      }
    })
    .catch((error) => {
      Toastify({
        text: "Invalid username or password",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #8c092c, #600c0f)",
        },
        onClick: function () {},
      }).showToast();

      console.log(error);
    });

  console.log(username, password);
});



//johnd
//m38rmF$