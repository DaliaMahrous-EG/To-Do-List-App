const input = document.querySelector("input")
const addBtn = document.querySelector(".add-button")
const todosHtml = document.querySelector(".todos")
const emptyImg = document.querySelector(".empty-img")
const deletAll = document.querySelector(".delet-all")
const filters = document.querySelectorAll(".filter")
let filter = '';


// Local Stroge ToDo
let todosJson = JSON.parse(localStorage.getItem("todos")) || [] ;



function getTodoHtml(todo , index){
if(filter && filter != todo.status){
    return '';
}

    let checked = todo.status === "completed" ? "checked" : "";
    return /*html*/`
    <li class="todo">
        <label for="${index}">
        <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
        <span class="${checked}">${todo.name}</span>
        </label>
        <button class="delete-btn" data-index="${index}" onclick="remove(this)">
        <li class="fa fa-time"></li>
        </button>

    </li>`

}

function showTodos(){
    if(todosJson.length === 0){
        todosHtml.innerHTML ="";
        emptyImg.style.display ="block"
    }else{
        todosHtml.innerHTML = todosJson.map(getTodoHtml).join('')
        emptyImg.style.display  ="none"
    }
}

function addTodo(todo){
    input.value =""
    todosJson.unshift({name: todo, status: "pending"})
    localStorage.setItem("todos" , JSON.stringify(todosJson))
    showTodos();
}

input.addEventListener("keyup", e =>{
    let todo = input.value.trim();
    if(!todo || e.key != "Enter"){
        return
    }
    addTodo(todo)

})

addBtn.addEventListener("click", () =>{
    let todo = input.value.trim();
    if(!todo){
        return
    }
    addTodo(todo)
})

function updateStatus(todo){
    let todoName = todo.parentElement.lastElementChild
    if(todo.checked){
        todoName.classList.add("checked")
        todosJson[todo.id].status = "completed"
    }else{
        todoName.classList.remove("checked")
        todosJson[todo.id].status = "pending"
    }
    localStorage.setItem("todos", JSON.stringify(todosJson))
}
function remove(todo){
    const index = todo.dataset.index
    todosJson.splice(index, 1)
    showTodos();
    localStorage.setItem("todos", JSON.stringify(todosJson))
}

filters.forEach((el) => {
    el.addEventListener("click" , (e) =>{
        if(el.classList.contains('active')){
            el.classList.remove("active")
            filter = "";
        }else{
            filters.forEach(tag => tag.classList.remove('active'))
            el.classList.add('active')
            filter = e.target.dataset.filter
        }
        showTodos() 
    })
    
});

deletAll.addEventListener("click", () =>{
    todosJson = [];
    localStorage.setItem("todos" , JSON.stringify(todosJson))
    showTodos()
})