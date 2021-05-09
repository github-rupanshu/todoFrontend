//-------------------------------------------class to store a todo
class TODO {

  constructor(desc) {
      this.id = TODO.generateId,
          this.desc = desc,
          this.completed = false
  }
  static get generateId() {
      TODO.counter = (TODO.counter || 0) + 1;
      return TODO.counter;
  }
};
let todoArray = [];  // array to store todo objects

const addBtn = document.querySelector(".add-btn");

//-------------------------------------------event listner for add btn
addBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const desc = document.querySelector(".todo-input");
  //console.log(desc.value)
  if (desc.value.trim() ==="") {
      alert("cannot create empty todo");
      return;
  }
  addTodo(desc.value.trim());
  desc.value = "";

});
////-------------------------------------------function to add todo to arraylist of todo object
function addTodo(item) {

  let todo = new TODO(item);
  todoArray.push(todo);
  renderTodos(todo);

};
//addTodo("sample todo");
// //-------------------------------------------function to render added to html dom 
function renderTodos(todo) {

  const todoList = document.getElementsByClassName("list")[0];
  const li = document.createElement("li");
  let sts="";
  if(todo.completed){
       sts="checked"
  }
  li.innerHTML = `<div>
      <input type="checkbox" id="${todo.id}" class="checkbox-round" onchange="updateSts(this)"${sts} name="chk" value="desc">
      <label class="label-for-check" for="${todo.id}" >
          <p>${todo.desc}</p>
      </label>
      </div>
      <a class="del-btn" onclick=deleteTodo(this) id="del-${todo.id}" >
      <span><i class="far fa-times-circle "></i></span>
      </a>`;

  li.setAttribute("class", "listItems");
  li.setAttribute("id", `item-${todo.id}`);
  todoList.prepend(li);
  updateCounter();

};
////-------------------------------------------function to update count of  task 
function updateCounter() {
  let  countAll = todoArray.length ;
  let cc = 0;
  let cu = 0;
  for (let i = 0; i < todoArray.length; i++) {
      if (todoArray[i].completed) {
          cc++;
      }else{
          cu++;
      }
  }
  document.querySelector(".bottomContainer #all span").innerHTML =countAll;
  document.querySelector(".bottomContainer #c span").innerHTML =cc;
  document.querySelector(".bottomContainer #u span").innerHTML =cu;
  if(todoArray.length===0){
      document.querySelector(".list").innerHTML = "<h2 id='notodo'>Please Add Todo's</h2>";
  }else if(document.contains(document.getElementById('notodo'))){
      document.getElementById('notodo').remove();
  }

};


// checkbox event listner to update status for todo
function updateSts(checkbox) {
  const todo = find(checkbox.id, todoArray);
  if (checkbox.checked === true) {
      //console.log(todo.elem.completed,"checked");
      todo.elem.completed = true;
      //console.log(todo.elem.completed, "checked");

  } else {

      todo.elem.completed = false;
      //updateCounter(); 
      //console.log(todo.elem.completed, "uncheck");
  }
  updateCounter();

};
////-------------------------------------------function to find element inside array  and return index and elem both 
function find(key, myArray) {
  for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id.toString() === key) {
          return {
              elem: myArray[i],
              index: i
          };
      }
  }
};

////------------------------------------------- dunction for event listner invoced on click of delte btn
function deleteTodo(delBtn) {
  const id = delBtn.id.split("-")[1];
  const todo = find(id, todoArray);
  todoArray.splice(todo.index, 1);
  delBtn.parentElement.remove();
  updateCounter();

};

////-------------------------------------------function to check all checkboxs
function checkAll() {
  const cbs = document.getElementsByName("chk");
  for (let i = 0; i < cbs.length; i++) {
      cbs[i].checked = true;
      todoArray[i].completed = true;
  }
  updateCounter();
}
//------------------------------------------- function to remove all todo which are completed
function clearCompleted() {
  for (let i = 0; i < todoArray.length; i++) {
      if (todoArray[i].completed) {
          const listItem = document.getElementById(`item-${todoArray[i].id}`);
          if(document.contains(listItem)){
              listItem.remove();
              delete todoArray[i];
          }
          
      }
  }
  // to remove empty because we used delete arrayName[index] to delete 
  todoArray = todoArray.filter(Boolean); 
  updateCounter();
  
}
//-------------------------------------------function called on click on status element on todo 
//-------------------------------------------they will render todo according to status
function getAll(elem){
  const sts = elem.id;
  if(sts==="all"){
      document.querySelector(".list").innerHTML = "";
      for (let i = 0; i < todoArray.length; i++) {
          renderTodos(todoArray[i]);
      }
      document.getElementById('check-all').style.pointerEvents = 'auto';
      document.getElementById('clear-comp').style.pointerEvents = 'auto';
      
  }else if(sts==="c"){
      document.querySelector(".list").innerHTML = "";
      
      for (let i=0; i < todoArray.length; i++) {
          if(todoArray[i].completed){
              renderTodos(todoArray[i]);
              
          }
      }
      // to disable checkall button because in completed list todos all todos are already checked
      //and to enable clear complted element 
      document.getElementById('check-all').style.pointerEvents = 'none'; 
      document.getElementById('clear-comp').style.pointerEvents = 'auto';
     
  }else if(sts==="u") {
      document.querySelector(".list").innerHTML = "";
      for (let i = 0; i < todoArray.length; i++) {
          if(!todoArray[i].completed){
              renderTodos(todoArray[i]);
          }
      }
      //disable clear complted element  and enable check all element
      document.getElementById('clear-comp').style.pointerEvents = 'none';
      document.getElementById('check-all').style.pointerEvents = 'auto';
  }
  updateCounter();
  
}
updateCounter();
