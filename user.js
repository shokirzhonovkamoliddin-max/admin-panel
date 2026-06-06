const api = "https://fakestoreapi.com/users";

const tbody = document.querySelector("tbody");
const modal = document.querySelector(".modal");
const text = document.querySelector(".modal_text");
const getUsers = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      showUsers(data);
    })
    .catch((error) => {
      Toastify({
        text: " invalid api ",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
      }).showToast();

      console.log(error);
    });
};

getUsers(api);

function showUsers(users) {
  tbody.innerHTML = "";

  users.forEach((user) => {
    const { id, email, username, password, phone } = user;

    tbody.innerHTML += `
      <tr>
        <td>${id}</td>
        <td>${email}</td>
        <td>${username}</td>
        <td>${password}</td>
        <td>${phone}</td>

        <td>
          <button class="edit" >Edit</button>
          <button class="view" onclick='view(${id})' >View</button>
          <button class="delete" onclick='deleteuser(${id})' >Delete</button>
        </td>
      </tr>
    `;
  });
}

function deleteuser(id) {
  if (window.confirm("Are u sure delete it ?")) {
    fetch(`https://fakestoreapi.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Toastify({
            text: "Successfully deleted",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
              background: "linear-gradient(to right, #188c09, #58a514)",
            },
          }).showToast();

          getUsers(api);
        }
      });
  } else {
    Toastify({
      text: " deleteni bosmading",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #680707, #450707)",
      },
    }).showToast();
  }
}

function view(id) {
  fetch(`https://fakestoreapi.com/users/${id}`)
    .then((res) => res.json())
    .then((user) => {
      modal.style.display = "flex";

      text.innerHTML = `
        <p> ${user.email}</p>
        <p> ${user.phone}</p>
        <p> ${user.name.firstname} ${user.name.lastname}</p>
        <p> ${user.address.city}</p>

        <button onclick="closeModal()">Yopish</button>
      `;
    });
}

function closeModal() {
  modal.style.display = "none";
}
