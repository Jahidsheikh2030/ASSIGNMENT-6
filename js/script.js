const listCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    
    .then(res => res.json())
    .then(data => {
        if (Array.isArray(data.categories)) {
            displayList(data.categories);
        }
    })
    
};

const displayList = (categories) => {
    const userList = document.getElementById("list-container");
    userList.innerHTML = "";
    const allLi = document.createElement('li');
    const allBtn = document.createElement('button');
    allBtn.textContent = "All Trees";
    allBtn.classList.add(
        "btn", "btn-block", "justify-start", "normal-case", "my-1", "text-left",
        "bg-green-700", "text-white", "hover:bg-green-800"
    );
    allLi.appendChild(allBtn);
    userList.appendChild(allLi);

    categories.forEach((item) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.textContent = item.category_name;
        btn.classList.add(
            "btn", "btn-block", "justify-start", "normal-case", "my-1", "text-left",
            "bg-transparent", "text-green-900", "hover:bg-green-100", "transition-colors", "duration-200"
        );
        li.appendChild(btn);
        userList.appendChild(li);
    });
};

listCategory();


const fetchAndDisplayPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data.plants)) {
                displayPlantCards(data.plants);
            }
        })
        
};


let categoryDescriptions = {};

fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => {
        if (Array.isArray(data.categories)) {
            data.categories.forEach(category => {
                categoryDescriptions[category.category_name] = category.small_description;
            });
        }
    });


const createCard = (tree) => {
    const card = document.createElement('div');
    card.classList.add(
        "w-60", "h-[350px]",
        "bg-white", "rounded-lg", "shadow-md", "p-2", "mb-2", "flex", "flex-col", "items-center"
    );

    const img = document.createElement('img');
    img.src = tree.image ;
    img.alt = tree.name ;
    img.classList.add("w-60", "h-40", "object-cover", "rounded-md", "mb-2");

    const title = document.createElement('h3');
    title.textContent = tree.name ;
    title.classList.add("text-lg", "font-semibold", "mb-1");

    const desc = document.createElement('p'); 
   
    desc.textContent = categoryDescriptions[tree.category] || tree.description ;
    desc.classList.add("text-gray-600", "text-sm", "mb-2");

    const category = document.createElement('span');
    category.textContent = tree.category ;
    category.classList.add("bg-green-100", "text-green-700", "px-3", "py-1", "rounded-full", "text-xs", "mb-2");

    const price = document.createElement('span');
    price.textContent = `฿${tree.price }`;
    price.classList.add("font-bold", "ml-2");

    const priceRow = document.createElement('div');
    priceRow.classList.add("flex", "items-center", "justify-between", "w-full", "mb-2");
    priceRow.appendChild(category);
    priceRow.appendChild(price);

    const addToCartBtn = document.createElement('button');
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.classList.add(
        "bg-green-600", "hover:bg-green-700", "text-white", "font-semibold",
        "py-2", "px-6", "rounded-full", "w-full", "mt-2"
    );

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(priceRow);
    card.appendChild(addToCartBtn);

    return card;
};

const displayPlantCards = (plants) => {
    const cardContainer = document.getElementById("card-container");
    
    cardContainer.innerHTML = "";
    plants.forEach(plant => {
        const card = createCard(plant);
        cardContainer.appendChild(card);
    });
};




const setupCategoryFilter = () => {
    const userList = document.getElementById("list-container");
    let allPlants = [];

    
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data.plants)) {
                allPlants = data.plants;
            }
        });

    userList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
           
            const buttons = userList.querySelectorAll("button");
            buttons.forEach(btn => {
                btn.classList.remove("bg-green-700", "text-white", "hover:bg-green-800");
                btn.classList.add("bg-transparent", "text-green-900", "hover:bg-green-100");
            });

           
            e.target.classList.remove("bg-transparent", "text-green-900", "hover:bg-green-100");
            e.target.classList.add("bg-green-700", "text-white", "hover:bg-green-800");

            
            const selectedCategory = e.target.textContent;
            if (selectedCategory === "All Trees") {
                displayPlantCards(allPlants);
            } else {
                const filtered = allPlants.filter(plant => plant.category === selectedCategory);
                displayPlantCards(filtered);
            }
        }
    });
};



document.addEventListener("DOMContentLoaded", () => {
    setupCategoryFilter();
});



// const createCard = (tree) => {
//     const card = document.createElement('div');
//     card.classList.add(
//         "w-72", "h-[420px]",
//         "bg-white", "rounded-lg", "shadow-md", "p-2", "mb-2", "flex", "flex-col", "items-center"
//     );

//     const img = document.createElement('img');
//     img.src = tree.image ;
//     img.alt = tree.name ;
//     img.classList.add("w-60", "h-40", "object-cover", "rounded-md", "mb-2");

//     const title = document.createElement('h3');
//     title.textContent = tree.name ;
//     title.classList.add("text-lg", "font-semibold", "mb-1");

//     const desc = document.createElement('p'); 
//     desc.textContent = tree.description ;
//     desc.classList.add("text-gray-600", "text-sm", "mb-2");

//     const category = document.createElement('span');
//     category.textContent = tree.category ;
//     category.classList.add("bg-green-100", "text-green-700", "px-3", "py-1", "rounded-full", "text-xs", "mb-2");

//     const price = document.createElement('span');
//     price.textContent = `฿${tree.price }`;
//     price.classList.add("font-bold", "ml-2");

//     const priceRow = document.createElement('div');
//     priceRow.classList.add("flex", "items-center", "justify-between", "w-full", "mb-2");
//     priceRow.appendChild(category);
//     priceRow.appendChild(price);

//     const addToCartBtn = document.createElement('button');
//     addToCartBtn.textContent = "Add to Cart";
//     addToCartBtn.classList.add(
//         "bg-green-600", "hover:bg-green-700", "text-white", "font-semibold",
//         "py-2", "px-6", "rounded-full", "w-full", "mt-2"
//     );

//     card.appendChild(img);
//     card.appendChild(title);
//     card.appendChild(desc);
//     card.appendChild(priceRow);
//     card.appendChild(addToCartBtn);

//     return card;
// };


document.addEventListener("DOMContentLoaded", fetchAndDisplayPlants);







