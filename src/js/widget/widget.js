export class Widget {
    constructor(element) {
        this._element = element;
        this._tasks = [];
        this._isPinnedTasks();
    }
    
    _addTask() {
        let text = this._element.querySelector('input');
        if (text.value) {
            const task = {
                'id': this._tasks.length + 1,
                'text':text.value,
                'pinned':false,
            }
            this._tasks.push(task);
            this._createTask(task);
            text.value='';
            text.removeAttribute('placeholder');
        }
        else {
            text.setAttribute('placeholder','текст не должен быть пустым');
        }
    }

    _createTask(task) {
        let allTasks;
        if (!task.pinned) {
            allTasks = this._element.querySelector('div.all-tasks-block');
        } else {
            allTasks = this._element.querySelector('div.pinned-block');
        }
        const label = document.createElement('label');
        const span = document.createElement('span');
        label.classList.add('task');
        label.setAttribute('id',`task_${task.id}`);
        label.textContent = task.text;
        const checkBox = document.createElement('input');
        checkBox.setAttribute('type','checkbox');
        if (task.pinned) checkBox.setAttribute('checked',true)
        span.classList.add('checkmark');
        label.appendChild(checkBox);
        label.appendChild(span);
        allTasks.appendChild(label);
        checkBox.addEventListener('click', ()=>{
            this._pinTask(task);            
        })
    }

    _isPinnedTasks() {
        if (this._tasks.filter((task)=>task.pinned).length === 0) {
            document.querySelector('div.pinned-block').innerHTML="<p class='font-monospace text-danger'>No pinned tasks</p>";
        } else {
            if (this._element.querySelector('p')) this._element.querySelector('p').remove()
        }
    }

    _pinTask(task) {
        !task.pinned ? task.pinned=true : task.pinned=false;
        document.getElementById(`task_${task.id}`).remove();
        this._createTask(task);
        this._isPinnedTasks();
    }

    _filterTask() {
        if (this._tasks.length != 0) {
            let text = this._element.querySelector('input');
            let taskBlock = this._element.querySelector('div.all-tasks-block');
            taskBlock.innerHTML = ""
            if (text.value.trim() === '') {
                this._tasks.filter((task)=>!task.pinned).forEach((task) => {
                    this._createTask(task);
                });
            } else {
                const filtered = Array.from(this._tasks).filter((task)=>!task.pinned).filter((task)=>task.text.startsWith(text.value));
                filtered.forEach((task) => {
                    this._createTask(task);
                });
            }
        }
    }
}