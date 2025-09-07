

// Card Items Loading
const loadCardItems = () => {
    const plantUrl = 'https://openapi.programming-hero.com/api/plants'
    fetch(plantUrl)
        .then(res => res.json())
        .then((data) => {
            displayCardItems(data.plants)
        })
}

const displayCardItems = items => {
    const itemsContainer = document.getElementById('card-container');
    items.forEach((item) => {
        const cardsDiv = document.createElement('div');
        cardsDiv.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-sm', 'hover:shadow-2xl', 'transition-shadow', 'duration-500', 'max-w-[375px]', 'md:max-w-[320px]', 'mx-auto' , 'flex-col' , 'justify-between', 'flex');
        cardsDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-full h-[300px] object-cover rounded-lg">
                        <h1 class="font-bold">${item.name}</h1>
                        <p class="text-[14px] text-[#1F2937] my-2 text-justify ">${item.description}</p>
                        <div class="flex justify-between items-center">
                            <p> <span
                                    class="bg-[#DCFCE7] text-[#15803D] font-semibold text-[14px] px-3 py-1 rounded-3xl">${item.category}<span>
                            </p>
                            <p class="text-[14px] font-bold my-2 ">${item.price}</p>
                        </div>
                        <button
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
    console.log(categories);    
    categoriesContainer.innerHTML = '';
    categories.forEach((category) => {
        const li = document.createElement('li');
        li.classList.add('cursor-pointer', 'hover:text-green-700', 'focus:text-white', 'focus:bg-green-600', 'focus:p-3', 'focus:rounded-md');
        li.innerText = category.category_name;
        categoriesContainer.appendChild(li);
    });
}
loadCategories();