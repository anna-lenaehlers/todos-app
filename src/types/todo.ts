class Todo {
  title: string;
  priority: string;
  checked: boolean;
  due: number;
  created: number;

  constructor(title: string, priority: string, due: number) {
    this.title = title;
    this.priority = priority;
    this.checked = false;
    this.due = due;
    this.created = new Date().getTime();
  }
}

enum Priority {
  Niedrig = "Niedrig",
  Mittel = "Mittel",
  Hoch = "Hoch",
}

export { Todo, Priority };
