import { ref, computed } from 'vue'
import { useTodoStore } from '@/stores/todo-store'

export function useTodos() {
  const todos = useTodoStore()

  const inputName = ref('')
  const editInputs = ref<Record<number, string>>({})
  const addTask = ref<Record<number, string>>({})

  const nullChecker = computed(() => todos.categoryCount === 0)

  function createCategory() {
    todos.addCategory(inputName.value)
    inputName.value = ''
  }

  function createTask(id: number) {
    if (id === todos.currentCategory?.id) {
      const newTask = addTask.value[id]
      if (newTask?.trim()) {
        todos.addTodo(newTask.trim())
        addTask.value[id] = ''
      }
    }
  }

  function editTask(id: number) {
    const newName = editInputs.value[id]
    if (newName?.trim()) {
      todos.editTask(newName.trim(), id)
      editInputs.value[id] = ''
    }
  }

  return {
    todos,
    inputName,
    nullChecker,
    editTask,
    createTask,
    createCategory,
    editInputs,
    addTask,
  }
}
