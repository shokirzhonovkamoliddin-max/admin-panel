const API = "https://fakestoreapi.com/products";

const tbody = document.querySelector("tbody");

const getProducts = async (url) => {
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      showProducts(data);
    })
    .catch((error) => {
      Toastify({
        text: "Invalid api Call",
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
      }).showToast();

      console.log(error);
    });
};

getProducts(API);

function showProducts(products) {
  tbody.innerHTML = "";

  products.forEach((product) => {
    const { id, image, title, price, category, description } = product;

    tbody.innerHTML += `
      <tr>
        <td>${id}</td>

        <td>
          <img src="${image}" width="50">
        </td>

        <td>${title}</td>

        <td>$${price}</td>

        <td>${category}</td>

        <td>${description}</td>

        <td>
          <button>Edit</button>
          <button>Delete</button>
        </td>
      </tr>
    `;
  });
}