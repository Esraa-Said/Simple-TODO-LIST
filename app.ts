const add = document.querySelector(
  "#container #add-task button"
) as HTMLButtonElement;
const input = document.querySelector(
  "#container #add-task input"
) as HTMLInputElement;
const taskList = document.querySelector(
  "#container #items ul"
) as HTMLUListElement;

class Task {
  constructor(public title: string, public completed: boolean = false) {}

  toggleCompleted() {
    this.completed = !this.completed;
  }
}
class TodoList {
  private items: Task[] = [];

  addItem(title: string) {
    const newItem = new Task(title);
    this.items.push(newItem);
    this.render();
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.render();
  }

  render() {
    taskList.innerHTML = "";
    this.items.forEach((task, index) => {
      const li = document.createElement("li");

      // complete
      const completeButton = document.createElement("input");
      completeButton.type = "checkbox";
      completeButton.checked = task.completed;
      completeButton.addEventListener("click", () => {
        task.toggleCompleted();
        this.render();
      });
      if (task.completed) {
        li.classList.add("completed");
      }
      li.appendChild(completeButton);

      // title
      const taskName = document.createElement("span");
      taskName.textContent = task.title;
      li.appendChild(taskName);

      // remove
      const removeButton = document.createElement("i");
      removeButton.className = "uil uil-trash";
      removeButton.addEventListener("click", () => {
        this.removeItem(index);
      });
      li.appendChild(removeButton);
      taskList.appendChild(li);
    });
  }
}

const todoList = new TodoList();
add.addEventListener("click", () => {
  const taskTitle = input.value.trim();
  if (taskTitle) {
    todoList.addItem(taskTitle);
    input.value = "";
  }
});

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    add.click();
  }
});
