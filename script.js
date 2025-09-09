// Card Items Loading
const loadCardItems = () => {
    const plantUrl = 'https://openapi.programming-hero.com/api/plants'
    const spinner = document.getElementById("card-spinner");
    const itemsContainer = document.getElementById('card-container');

    spinner.classList.remove("hidden");
    itemsContainer.innerHTML = "";

    fetch(plantUrl)
        .then(res => res.json())
        .then((data) => {
            displayCardItems(data.plants)
        }).finally(() => {
            spinner.classList.add("hidden");
        });
}

const displayCardItems = items => {
    const itemsContainer = document.getElementById('card-container');
    items.forEach((item) => {
        const cardsDiv = document.createElement('div');
        cardsDiv.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-sm', 'hover:shadow-2xl', 'transition-shadow', 'duration-500', 'max-w-[375px]', 'md:max-w-[320px]', 'mx-auto', 'flex-col', 'justify-between', 'flex');
        cardsDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-full h-[300px] object-cover rounded-lg">
                        <h1 class="font-bold pt-2 cursor-pointer" onclick="openModal(${item.id})">${item.name}</h1>

                        <p class="text-[14px] text-[#1F2937] my-2 text-justify ">${item.description}</p>
                        <div class="flex justify-between items-center">
                            <p> <span
                                    class="bg-[#DCFCE7] text-[#15803D] font-semibold text-[14px] px-3 py-1 rounded-3xl">${item.category}<span>
                            </p>
                            <p class="text-[14px] font-bold my-2 ">${item.price}</p>
                        </div>
                        <button onclick="cartTotalPrice({name: '${item.name}', price: '${item.price}'})"
                            class=" text-white  bg-[#15803D] hover:bg-[#a6b333] border-none rounded-4xl my-4 p-2 text-center w-full ">Add
                            to Cart
                        </button>
        `;
        itemsContainer.appendChild(cardsDiv);
    });
}
loadCardItems();


// Categories List Loading

const loadCategories = () => {
    const categoriesUrl = 'https://openapi.programming-hero.com/api/categories'
    fetch(categoriesUrl)
        .then(res => res.json())
        .then((data) => {
            displayCategories(data.categories)
        })
}

const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-list');
    categoriesContainer.innerHTML = '';
    const updatedCategories = [{ category_name: "All Trees" }, ...categories];

    updatedCategories.forEach((category, index) => {
        const li = document.createElement('li');
        li.classList.add('cursor-pointer', 'hover:text-yellow-700',);
        li.innerText = category.category_name;

        if (index === 0) {
            li.classList.add('bg-green-600', 'text-white', 'p-2', 'rounded-md');
            loadPlants('All Trees');
        }
        li.addEventListener('click', () => {
            const allLi = categoriesContainer.querySelectorAll('li');
            allLi.forEach(item => item.classList.remove('bg-green-600', 'text-white', 'p-2', 'rounded-md'));
            li.classList.add('bg-green-600', 'text-white', 'p-2', 'rounded-md');

            loadPlants(category.category_name);

        });
        categoriesContainer.appendChild(li);

    });
}
// Filter card items based on selected category
const loadPlants = (selectedCategory) => {
    const plantUrl = 'https://openapi.programming-hero.com/api/plants';
    const spinner = document.getElementById("card-spinner");
    const itemsContainer = document.getElementById('card-container');

    spinner.classList.remove("hidden");
    itemsContainer.innerHTML = "";
    fetch(plantUrl)
        .then(res => res.json())
        .then((data) => {
            let filteredItems = [];
            if (selectedCategory === 'All Trees') {
                filteredItems = data.plants;
            } else {
                filteredItems = data.plants.filter(plant => plant.category === selectedCategory);
            }
            const itemsContainer = document.getElementById('card-container');
            itemsContainer.innerHTML = '';
            displayCardItems(filteredItems);
        }).finally(() => {
            spinner.classList.add("hidden");
        });
};

loadCategories();

/// Modal Open Function

const openModal = (id) => {
    const plantUrl = 'https://openapi.programming-hero.com/api/plants';
    fetch(plantUrl)
        .then(res => res.json())
        .then(data => {
            const plant = data.plants.find(p => p.id === id);
            const modalContent = document.getElementById('modal-content');
            modalContent.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}" class="w-full md:w-full h-[350px] md:h-[450px] object-cover rounded-lg mb-4">
            <h2 class="text-xl font-bold mb-2">${plant.name}</h2>
            <p class="mb-2">${plant.description}</p>
            <p><strong>Category:</strong> ${plant.category}</p>
            <p><strong>Price:</strong> ${plant.price}</p>
        `;
            document.getElementById('tree_modal').showModal();
            const modalCartButton = document.getElementById('modal-cart-button');
            modalCartButton.onclick = function () {
                cartTotalPrice({ name: plant.name, price: plant.price });
                document.getElementById('tree_modal').close();
            };
        });
};

// Cart Functionality
let cart = [];
let treeQuantity = 1;
let total = 0;

function cartTotalPrice(tree) {
    cart.push(tree);
    total += parseFloat(tree.price) * treeQuantity;
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");

    cartList.innerHTML = "";
    cart.forEach((tree, index) => {
        const div = document.createElement("div");
        div.className = "bg-[#F0FDF4] p-3 rounded-lg shadow-sm max-w-[300px] md:max-w-[210px] mx-auto my-2";

        div.innerHTML = `
      <div class="flex gap-3 justify-between items-center mb-3">
        <div>
          <h2 class="font-bold">${tree.name}</h2>
          <p class="text-[14px] text-[#8C8C8C]">৳${tree.price} x ${treeQuantity}</p>
        </div>
        <div>
          <button onclick="removeFromCart(${index})">
            <i class="fa-solid fa-xmark text-[#8C8C8C] text-[22px] hover:scale-120"></i>
          </button>
        </div>
       </div>
    `;
        cartList.appendChild(div);
    });

    cartTotal.textContent = total;
}

function removeFromCart(index) {
    total -= parseFloat(cart[index].price);

    cart.splice(index, 1);

    updateCart();
}

const showCart = document.getElementById('mobile-cart-dropdown')
if (window.innerWidth > 576 && showCart) {
    showCart.remove();
}