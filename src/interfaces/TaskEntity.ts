export interface TaskFieldEntity {
  description: string;
  checked: boolean;
}

export interface TaskEntity {
  id: string;
  data: TaskFieldEntity
}