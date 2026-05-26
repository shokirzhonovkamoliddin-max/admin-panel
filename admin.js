const API = "https://fakestoreapi.com/products";

const tbody = document.querySelector("tbody");

const getProducts = (url) => {
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
          <button onclick='deletepro(${id})' >Delete</button>
        </td>
      </tr>
    `;
  });
}

const elform = document.querySelector(".form");

elform.addEventListener("submit", (e) => {
  e.preventDefault();

  const image = elform["img"].value.trim();
  const title = elform["title"].value.trim();
  const price = elform["price"].value.trim();
  const category = elform["category"].value.trim();
  const descrption = elform["description"].value.trim();

  const produkt = {
    image: image,
    title: title,
    price: price,
    category: category,
    description: descrption,
  };

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produkt),
  })
    .then((response) => {
      console.log(response.status);
      return response.json();
    })
    .then((data) => {
      Toastify({
        text: "succesfully added",
        duration: 3000,
        gravity: "top",
        position: "left",
        style: {
          background: "linear-gradient(to right, #188c09, #58a514)",
        },
      }).showToast();

      console.log(data);
    });
});

// delete item

function deletepro(id) {
  if (window.confirm(" Are u shure delet it ?")) {
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
      if(data) {
            Toastify({
        text: "succesfully deleted ",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #188c09, #58a514)",
        },
      }).showToast();

      }        
      });
  } else {
        Toastify({
        text: "some error occured",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #680707, #450707)",
        },
      }).showToast();
    
  }
}
