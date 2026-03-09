let totalPriceBox = document.querySelector(".total-order");
let confirmBtn = document.querySelector(".confirm-button");
let carbonInfo = document.querySelector(".carbon-neutral-info");
let emptyPlaceholder = document.querySelector(".empty-Placeholder");

let cart = {};
let totalItem = 0;
let totalPrice = 0;

const allBtn = document.querySelectorAll(".button");
allBtn.forEach((item) => {
  item.addEventListener("click", () => {
    let itemName =
      item.parentElement.parentElement.lastElementChild.children[1].innerText;
    addCart(item);
    cngToQuantityUI(item, itemName);
    upDateCart();
    totalPriceBox.style.display = "flex";
    confirmBtn.style.display = "flex";
    carbonInfo.style.display = "flex";
    emptyPlaceholder.style.display = "none";
  });
});

function cngToQuantityUI(item, itemName) {
  item.style.display = "none";
  let div = document.createElement("div");
  div.setAttribute("class", "click");
  div.innerHTML = `<img src="image/Add Icon.png" alt="" class="addBtn">
                            <span class="itemVal">1</span>
                            <img src="image/Subtract Icon.png" alt="" class="subBtn">`;
  item.parentElement.append(div);

  let quantity = 1;
  const addBtn = div.querySelector(".addBtn");
  const subBtn = div.querySelector(".subBtn");
  const itemVal = div.querySelector(".itemVal");

  addBtn.addEventListener("click", () => {
    quantity++;
    itemVal.innerText = quantity;
    addCart(item);
    upDateCart();
  });
  subBtn.addEventListener("click", () => {
    cart[itemName].quantity--;
    if (cart[itemName].quantity <= 0) {
      delete cart[itemName];
      upDateCart();
    }
    quantity--;
    if (quantity <= 0) {
      div.remove();
      item.style.display = "flex";
    } else {
      itemVal.innerText = quantity;
      upDateCart();
    }
  });
}

function addCart(item) {
  let container = item.parentElement;
  let itemInfo = container.parentElement.lastElementChild;
  let itemName = itemInfo.childNodes[3].innerText;
  let itemPrice = itemInfo.lastElementChild.innerText.slice(1);
  let itemImgLink = container.firstElementChild.src;

  if (!cart[itemName]) {
    cart[itemName] = { price: itemPrice, quantity: 1, imgLink: itemImgLink };
  } else {
    cart[itemName].quantity++;
  }
}

function upDateCart() {
  let cartItemCon = document.querySelector(".cart-item-container");
  cartItemCon.innerHTML = "";

  totalItem = 0;
  totalPrice = 0;
  for (let item in cart) {
    
    let line = document.createElement("div");
    line.setAttribute("class", "line");
    let div = document.createElement("div");
    div.setAttribute("class", "cart-item");
    div.innerHTML = `<div class="item-info">
                        <span id="itemText">${item}</span>
                        <div class="quantityAndPrice">
                            <span>${cart[item].quantity}X</span>
                            <span>@$${cart[item].price}</span>
                            <span>$${(cart[item].quantity * cart[item].price).toFixed(2)}</span>
                        </div>
                    </div>
                    <img src="image/ButtonRemove.png" alt="" class="btn" id="deleteBtn">`;

    cartItemCon.append(div);
    cartItemCon.append(line);

    totalItem += cart[item].quantity;

    totalPrice += cart[item].quantity * cart[item].price;

    const deleteBtn = div.querySelector(".btn");
    deleteBtn.addEventListener("click", () => {
      delete cart[item];
      upDateCart();
      
      document.querySelectorAll(".item").forEach((i) => {
        if (i.lastElementChild.children[1].innerText == item) {
          
          i.firstElementChild.lastElementChild.style.display = "none";
          i.firstElementChild.children[1].style.display = "flex";
        }
      });
    });
  }

  let yourCart = document.querySelector(".your-cart");
  yourCart.innerText = `Your Cart (${totalItem})`;

  let total = document.getElementById("total");
  total.innerText = `$${totalPrice.toFixed(2)}`;
  if (totalItem <= 0) {
    totalPriceBox.style.display = "none";
    confirmBtn.style.display = "none";
    carbonInfo.style.display = "none";
    emptyPlaceholder.style.display = "flex";
  }
}
const overlay = document.getElementById("overlay");

confirmBtn.addEventListener("click", () => {
  confirmModelUpdate();
  overlay.style.display = "flex";
});

const confirmationModal = document.querySelector(".ConfirmationModal");
function confirmModelUpdate() {
  confirmationModal.style.display = "flex";
  for (const item in cart) {
    const div = document.createElement("div");
    div.setAttribute("class", "items");
    div.innerHTML = `<div class="confirm-item">
                        <div class="item-name-image">
                            <img src="${cart[item].imgLink}" alt="">
                            <div class="item-name-price-box">
                                <span>${item}</span>
                                <div class="amount">
                                    <span>${cart[item].quantity}x</span>
                                    <span>@$${cart[item].price}</span>
                                </div>
                            </div>
                        </div>
                        <div class="total-amount">$${(cart[item].quantity * cart[item].price).toFixed(2)}</div>
                    </div>
                    <div class="separator"></div>`;
    let confirmItems = document.querySelector(".confirmItems");
    confirmItems.prepend(div);
  }
  const totalAmount = document.getElementById("totalAmount");
  totalAmount.innerText = `$${totalPrice.toFixed(2)}`;
}

const stNewOrder = document.getElementById("stNewOrder");
stNewOrder.addEventListener("click", () => {
  // location.reload();
  overlay.style.display = "none";
  confirmationModal.style.display = "none";
  
  for (let key in cart) {
  delete cart[key];
}
  upDateCart()
  document.querySelectorAll(".click").forEach(i=>
    i.style.display = "none"
  )
  document.querySelectorAll(".button").forEach(i=>
    i.style.display = "flex"
  )

  document.querySelectorAll(".confirmItems div:not(:last-child)").forEach(e => e.remove());

});
