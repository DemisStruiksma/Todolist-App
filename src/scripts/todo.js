window.onload = function(){
    const addItems = document.querySelector('.add-todos');
    const itemsList = document.querySelector('.todo-list');
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const check = document.querySelector('.checkAllBtn');
    const deleteAll = document.querySelector('.deleteAllBtn');

    function addItem(e) {
      e.preventDefault();
      const text = (this.querySelector(['[name=item]'])).value;
      const item = {
        text,
        done: false
      }
      items.push(item);
      populateList(items, itemsList);
      localStorage.setItem('items', JSON.stringify(items));
      this.reset();
    }

    function populateList(todos = [], todosList) {
      if(items.length < 1) {
        todosList.innerHTML =
        `
          <li>
            No todo items have been added yet.
          </li>
        `;
      } else {
        todosList.innerHTML = todos.map((todo, i) => {
          return `
          <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${todo.done ? 'checked' : ''} />
            <label for="item${i}">${todo.text}</label>
          </li>
        `;
        }).join('');
      }
    }

    function toggleDone(e) {
      if (!e.target.matches('input')) return;
      const el = e.target;
      const index = el.dataset.index;
      items[index].done = !items[index].done;
      localStorage.setItem('items', JSON.stringify(items));
      populateList(items, itemsList);
    }

    function checkingAll(e) {
      e.preventDefault()
      items.forEach(item => {
        if(item.done === true) {
          item.done = false;
          check.innerHTML = 'Check All';
        } else {
          item.done = true;
          check.innerHTML = 'Uncheck All';
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
      populateList(items, itemsList);
    }

    function deletingAll() {
      localStorage.removeItem('items');
      location.reload();
    }

    addItems.addEventListener('submit', addItem);
    itemsList.addEventListener('click', toggleDone);
    check.addEventListener('click', checkingAll);
    deleteAll.addEventListener('click', deletingAll);
    populateList(items, itemsList);
}