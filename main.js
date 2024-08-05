// get total

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let submit = document.getElementById("submit");
let count = document.getElementById("count");
let category = document.getElementById("category");
let mode = 'create';
let tmp;

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value + -discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.value = "";
    total.innerHTML = "";
    total.style.background = "#6e6d6d";
  }
}
//creat produkt

let dataPro;
if (localStorage.produkt != null) {
  dataPro = JSON.parse(localStorage.produkt);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newPro.count < 100 
  
   
  ) {
    if (mode === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mode = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }

    clearData();
  }

  localStorage.setItem("produkt", JSON.stringify(dataPro));

  showData();
};
// save data
// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//read

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `  <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].ads}</td>

            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td> <button onclick= "updateData(${i})" id="update">update</button> </td>
            <td> <button onclick="deletData(${i})" id="delete">delte</button> </td>


        </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDeletAll = document.getElementById("deletAll");
  if (dataPro.length > 0) {
    btnDeletAll.innerHTML = `
    <button onclick="deletAll()">Delete All (${dataPro.length})</button>
    `;
  } else {
    btnDeletAll.innerHTML = ``;
  }
}

showData();
//count
//delte

function deletData(i) {
  dataPro.splice(i, 1);
  localStorage.produkt = JSON.stringify(dataPro);
  showData();
}

function deletAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// count

//update

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "update";

  mode = 'update';
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//search

let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id === "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "Category";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `  <tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].ads}</td>
  
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td> <button onclick= "updateData(${i})" id="update">update</button> </td>
              <td> <button onclick="deletData(${i})" id="delete">delte</button> </td>
  
  
          </tr>`;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `  <tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].ads}</td>
    
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td> <button onclick= "updateData(${i})" id="update">update</button> </td>
              <td> <button onclick="deletData(${i})" id="delete">delte</button> </td>
    
    
          </tr>`;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
//clean data
