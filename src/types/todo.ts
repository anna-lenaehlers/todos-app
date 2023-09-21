type Todo = {
  id: string;
  title: string;
  priority: Priority;
  checked?: boolean;
  due?: Date;
};

enum Priority {
  Niedrig = "Niedrig",
  Mittel = "Mittel",
  Hoch = "Hoch",
}

export type { Todo };
export { Priority };
