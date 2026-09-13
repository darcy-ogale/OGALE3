const foods = [ 
    { name: "Classic Burger", price: 45, img: "burger1.jpg" }, 
    { name: "Chicken Burger", price: 60, img: "burger2.jpg" }, 
    { name: "Chicken Meal", price: 99, img: "chicken1.jpg" }, 
    { name: "Double Chicken", price: 120, img: "chicken2.jpg" }, 
]; 
 
let quantity = 1; 
let selectedFood = null; 
 
const screens = document.querySelectorAll(".screen"); 
function showScreen(screen) { 
    screens.forEach((s) => s.classList.remove("active")); 
    screen.classList.add("active"); 
} 
 
const screenWelcome = document.getElementById("screen-welcome"); 
// When the page finishes loading, show the welcome screen.
window.addEventListener("load", function () { 
    console.log("Page has fully loaded, including images and stylesheets."); 
    showScreen(screenWelcome); 
}); 
 
const screenMenu = document.getElementById("screen-menu"); 
const orderNowBtn = document.getElementById("orderNowBtn"); 
 
function goToMenu() { 
    showScreen(screenMenu); 
    orderNowBtn.removeEventListener("click", goToMenu); 
} 
 
// When the Order Now button is clicked, open the food menu.
orderNowBtn.addEventListener("click", goToMenu); 
 
// When the menu is scrolled to the bottom, show a message on screen
const scrollMessage = document.getElementById("scrollMessage");

screenMenu.addEventListener("scroll", function () { 
    const scrolledToBottom = 
        screenMenu.scrollTop + screenMenu.clientHeight >= screenMenu.scrollHeight - 5; 
 
    if (scrolledToBottom) { 
        console.log("You've reached the last food item!"); 
        scrollMessage.classList.add("show");
    } else {
        scrollMessage.classList.remove("show");
    } 
}); 
 
const foodCards = document.querySelectorAll(".food-box"); 
 
foodCards.forEach(function (card) { 
    const price = card.querySelectorAll("p")[1]; 
    price.style.display = "none"; 
 
    // When the mouse moves over a food card, show its price.
    card.addEventListener("mouseover", function () { 
        price.style.display = "block"; 
    }); 
 
    // When the mouse leaves the food card, hide its price.
    card.addEventListener("mouseout", function () { 
        price.style.display = "none"; 
    }); 
 
    // When a food card is clicked, select that food and open its details.
    card.addEventListener("click", function () { 
        selectedFood = foods[Number(card.dataset.food)]; 
        openDetailScreen(); 
    }); 
}); 
 
const screenDetail = document.getElementById("screen-detail"); 
const quantityNumber = document.getElementById("quantityNumber"); 
 
function openDetailScreen() { 
    quantity = 1; 
    quantityNumber.value = quantity; 
 
    document.getElementById("detailImg").src = selectedFood.img; 
    document.getElementById("detailName").textContent = selectedFood.name; 
    document.getElementById("detailPrice").textContent = "₱" + selectedFood.price; 
 
    const orderBtn = document.getElementById("orderBtn"); 
    const addedMessage = document.getElementById("addedMessage"); 
 
    orderBtn.classList.remove("order-added"); 
    addedMessage.classList.remove("show"); 
 
    showScreen(screenDetail); 
} 
 
// When the quantity is changed, update the selected quantity.
quantityNumber.addEventListener("input", function () { 
    quantity = Number(quantityNumber.value); 
 
    if (quantity < 1 || quantityNumber.value === "") { 
        quantity = 1; 
        quantityNumber.value = 1; 
    } 
}); 
 
const orderBtn = document.getElementById("orderBtn"); 
const addedMessage = document.getElementById("addedMessage"); 
 
// When Add to Order is clicked, calculate the total and show the total screen.
orderBtn.addEventListener("click", function () { 
    orderBtn.classList.add("order-added"); 
    addedMessage.classList.add("show"); 
 
    const total = selectedFood.price * quantity; 
    document.getElementById("totalAmount").textContent = "₱" + total; 
 
    const screenTotal = document.getElementById("screen-total"); 
 
    setTimeout(function () { 
        showScreen(screenTotal); 
    }, 1000); 
});
