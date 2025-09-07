const userList = document.getElementById('list-container');

// Function to fetch and display the plant categories
const listCategory = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(data => {
            // Check if the data is an array before trying to display it
            if (Array.isArray(data.data)) {
                displayList(data.data);
            } else {
                console.error("Invalid data format from API. Expected an array.");
            }
        })
        .catch(err => console.error(err));
};

// Function to display the categories on the page
const displayList = (categories) => {
    // Clear previous content
    userList.innerHTML = "";

    // Loop through the array and display each category
    categories.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.category}`;
        li.classList.add("my-2", "p-2", "rounded-md", "cursor-pointer", "text-gray-600", "hover:bg-green-100", "transition-colors", "duration-200");
        userList.appendChild(li);
    });
};

// Call the function to start the process
listCategory();