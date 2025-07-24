import { Category } from './category.model';

export interface ToDoTask {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  isCompleted: boolean;
  categoryId: number;
  category?: Category;
}

