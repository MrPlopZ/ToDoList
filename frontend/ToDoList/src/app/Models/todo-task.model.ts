export interface Category {
  id: number;
  name: string;
}

export interface ToDoTask {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  dueDate?: Date;
  categoryId: number;
  category?: Category;
}
