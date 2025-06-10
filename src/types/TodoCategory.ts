import type { TodoItems } from './TodoItem'

export type TodoCategory = {
  id: number
  categoryName: string
  categoryItems: TodoItems[]
}
