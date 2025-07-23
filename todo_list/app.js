const userInputField = document.querySelector("#userinput")
const addButton = document.querySelector("#add");
const todoContainer = document.querySelector(".todo-container");
const userNameError = document.querySelector("#username-error");

document.addEventListener("DOMContentLoaded", () => {
    showData();
});

addButton.addEventListener("click",(e) => {
    const  userInput = userInputField.value;
    const isValid = validateUserinput(userInput.toString());
    if(!isValid){
        e.preventDefault();
    }
    else{
        createTodo(userInput);
        userInputField.value = "";
    }
    
})

todoContainer.addEventListener("click",(e) => {
    if(e.target.tagName == "P"){
        e.target.classList.toggle("strike");
        saveData();
    }
})



function  validateUserinput(data){
    if(data.length < 1){
        userNameError.innerText = "it should not be empty";
        return false;
    }
    userNameError.innerText = "";
    return true;
    
} 

function createTodo(item){
    const container = document.createElement("div");
    const todoItem = document.createElement("p");
    const deleteBtn = document.createElement("button");
    
    todoItem.classList.add("todo-text");
    deleteBtn.classList.add("todo-dlt");
    container.classList.add("todo-item");

    todoItem.textContent = item;
    deleteBtn.textContent = "Delete"


    container.appendChild(todoItem);
    container.appendChild(deleteBtn);


    todoContainer.appendChild(container);
    saveData();
}

function saveData(){
    localStorage.setItem("todo",todoContainer.innerHTML);
}

function showData() {
    todoContainer.innerHTML = localStorage.getItem("todo");
    
    // Re-bind event listeners to Delete buttons
    const deleteButtons = document.querySelectorAll(".todo-dlt");
    deleteButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.target.parentElement.remove();
            saveData();
        });
    });
}


showData();