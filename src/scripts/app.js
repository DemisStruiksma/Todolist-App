window.onload = function(){
    const addItems = document.querySelector('.addBtn');
    const todosList = document.querySelector('.todo-list');
    const prioList = document.querySelector('.prios')

    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const prios = JSON.parse(localStorage.getItem('prios')) || [];

    const checkAll = document.querySelector('.checkAllBtn');
    const deleteAll = document.querySelector('.deleteAllBtn');
    const clearBtn = document.querySelector('.clearBtn');
    const prioBtn = document.querySelector('.prio');

    const priosOnly = document.querySelector('.showPrios')
    const showAll = document.querySelector('.showAll');
    const form = document.querySelector('.addTodos-form')

    function addItem(e) {
      e.preventDefault();
      const text = document.querySelector(['[name=item]']).value;
      const todo = {
        text,
        done: false
      }

      todos.push(todo);
      populateList(todos, todosList);
      localStorage.setItem('todos', JSON.stringify(todos));
      form.reset();
    }


    function populateList(todos = [], todosList) {

        todosList.innerHTML = todos.map((todo, i) => {
          return `
          <li>          
            <input class="checkbox" type="checkbox" data-index=${i} id="item${i}" ${todo.done ? 'checked' : ''} />
            <label for="item${i}">${todo.text}</label>
          </li>
        `;
        }).join('');
      }

    function prioritize(e) {
      e.preventDefault();
      const text = document.querySelector(['[name=item]']).value;
      const prio = {
        text,
        done: false
      }

      prios.push(prio);
      populateList2(prios, prioList);
      localStorage.setItem('prios', JSON.stringify(prios));
      form.reset();
    }

    function populateList2(prios = [], prioList) {

      prioList.innerHTML = prios.map((prio, i) => {
        return `
        <li>          
          <input class="checkbox" type="checkbox" data-index=${i} id="item${i}" ${prio.done ? 'checked' : ''} />
          <label for="item${i}">${prio.text} &#9733;</label>
        </li>
      `;
      }).join('');
    }

    function toggleDone(e) {
      if (!e.target.matches('input[type=checkbox]')) return;
      const el = e.target;
      const index = el.dataset.index;
      todos[index].done = !todos[index].done;
      localStorage.setItem('todos', JSON.stringify(todos));
      populateList(todos, todosList);
    }

    function prioToggleDone(e) {
      if (!e.target.matches('input[type=checkbox]')) return;
      const el = e.target;
      const index = el.dataset.index;
      prios[index].done = !prios[index].done;
      localStorage.setItem('prios', JSON.stringify(prios));
      populateList2(prios, prioList);
    }

    function checkingAll(e) {
      e.preventDefault();
      todos.forEach(todo => todo.done = true);
      prios.forEach(prio => prio.done = true);
      localStorage.setItem('todos', JSON.stringify(todos));
      localStorage.setItem('prios', JSON.stringify(prios));
      populateList(todos, todosList);
      populateList2(prios, prioList);
    }

    function deletingAll(e) {
      localStorage.removeItem('todos');
      localStorage.removeItem('prios');
      location.reload();
    }

    // this function is in progress and doesn't work yet. 
    // meant to clear todos that are marked as checked
    function clearTodos(){
      const inputs = document.querySelectorAll('li');
      const inputArray = Array.from(inputs);
      // console.log(inputArray);
     
      inputArray.forEach((input) => {
        if(input.hasChildNodes() && input.firstElementChild.hasAttribute('checked')){
          // let childs = input.firstElementChild.hasAttribute('checked');
          // childs.remove() && input.remove();
          // let done = 
          items.forEach((item) => {
            if(item.done === true){
              for(i = 0; i < item.done.length; i++){
                // item.done[i].classList.add('childRemove');
            //     localStorage.removeItem("items")
            //  location.reload();
                alert('test')
              }
            //  console.log(item);
            //  localStorage.removeItem(item)
            //  location.reload();
            // item.done = removeItem();
            }
          });
          
         };
      });
     
      localStorage.setItem('items', JSON.stringify(items));
      populateList(items, itemsList);
        
    }

    function showPriosOnly(){
      todosList.classList.add('remove');
    }

    function showAllTodos(){
      todosList.classList.remove('remove');
    }

    showAll.addEventListener('click', showAllTodos)
    priosOnly.addEventListener('click', showPriosOnly);
    prioBtn.addEventListener('click', prioritize);
    clearBtn.addEventListener('click', clearTodos);
    addItems.addEventListener('click', addItem);
    todosList.addEventListener('click', toggleDone);
    prioList.addEventListener('click', prioToggleDone);
    checkAll.addEventListener('click', checkingAll);
    deleteAll.addEventListener('click', deletingAll);
    populateList(todos, todosList);
    populateList2(prios, prioList);
  }