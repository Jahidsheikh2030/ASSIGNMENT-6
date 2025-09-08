const listCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => {
        if (Array.isArray(data.categories)) {
            displayList(data.categories);
        } else {
            console.error("API data format unexpected:", data);
        }
    })
    .catch(err => console.error(err));
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








