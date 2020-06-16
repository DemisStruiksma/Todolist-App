window.onload = function(){
    const addItems = document.querySelector('.addBtn');
    const itemsList = document.querySelector('.todo-list');
    const prioList = document.querySelector('.prios')

    const items = JSON.parse(localStorage.getItem('items')) || [];
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
      const item = {
        text,
        done: false
      }

      items.push(item);
      populateList(items, itemsList);
      localStorage.setItem('items', JSON.stringify(items));
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
      items[index].done = !items[index].done;
      localStorage.setItem('items', JSON.stringify(items));
      populateList(items, itemsList);
      populateList2(prios, prioList);
    }

    function checkingAll(e) {
      e.preventDefault();
      items.forEach(item => item.done = true);
      prios.forEach(prio => prio.done = true);
      localStorage.setItem('items', JSON.stringify(items));
      localStorage.setItem('prios', JSON.stringify(prios));
      populateList(items, itemsList);
      populateList2(prios, prioList);
    }

    function deletingAll(e) {
      localStorage.removeItem('items');
      localStorage.removeItem('prios');
      location.reload();
      form.classList.remove('active');
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
      itemsList.classList.add('remove');
    }

    function showAllTodos(){
      itemsList.classList.remove('remove');
    }

    showAll.addEventListener('click', showAllTodos)
    priosOnly.addEventListener('click', showPriosOnly);
    prioBtn.addEventListener('click', prioritize);
    clearBtn.addEventListener('click', clearTodos);
    addItems.addEventListener('click', addItem);
    itemsList.addEventListener('click', toggleDone);
    checkAll.addEventListener('click', checkingAll);
    deleteAll.addEventListener('click', deletingAll);
    populateList(items, itemsList);
    populateList2(prios, prioList);
  }