import { Category } from './category.model';
import { Project } from './project.model';

export interface ToDoTask {
  id: number;
  title: string;
  description?: string; 
  dueDate?: string; 
  isCompleted: boolean;
  categoryId: number;
  categoryName?: string;
  projectId: number;
  projectName?: string;
}

