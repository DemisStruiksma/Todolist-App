window.onload = function(){
    const addItems = document.querySelector('.add-todos');
    const itemsList = document.querySelector('.todo-list');
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const checkAll = document.querySelector('.checkAllBtn');
    const uncheckAll = document.querySelector('.uncheckAllBtn');
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
      todosList.innerHTML = todos.map((todo, i) => {
        return `
        <li>
        <button type="button" class="fav">★</button>
          <input type="checkbox" data-index=${i} id="item${i}" ${todo.done ? 'checked' : ''} />
          <label for="item${i}">${todo.text}</label>
        </li>
      `;
      }).join('');
    }

    function toggleDone(e) {
      if (!e.target.matches('input')) return;
      const el = e.target;
      const index = el.dataset.index;
      items[index].done = !items[index].done;
      localStorage.setItem('items', JSON.stringify(items));
      populateList(items, itemsList);
    }

    function favorite(){
        
    }

    function checkingAll(e) {
      items.forEach(item => item.done = true);
      localStorage.setItem('items', JSON.stringify(items));
      populateList(items, itemsList);
    }

    function uncheckingAll(e) {
      items.forEach(item => item.done = false);
      localStorage.setItem('items', JSON.stringify(items));
      populateList(items, itemsList);
    }

    function deletingAll(e) {
      localStorage.removeItem('items');
      location.reload();
    }

    addItems.addEventListener('submit', addItem);
    itemsList.addEventListener('click', toggleDone);
    checkAll.addEventListener('click', checkingAll);
    uncheckAll.addEventListener('click', uncheckingAll);
    deleteAll.addEventListener('click', deletingAll);
    populateList(items, itemsList);
}