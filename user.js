const api = "https://fakestoreapi.com/users";

const tbody = document.querySelector("tbody");

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
      })
      
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