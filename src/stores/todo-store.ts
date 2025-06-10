import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { TodoCategory } from '@/types/TodoCategory'
//import type { TodoItems } from '@/types/TodoItem'

export const useTodoStore = defineStore('todo', () => {
  const currentCategory = ref<TodoCategory | null>(null)
  const allCategories = ref<TodoCategory[]>([])

  const categoryCount = computed(() => allCategories.value.length)
  const itemCount = computed(() => currentCategory.value?.categoryItems.length)

  const stored = localStorage.getItem('allCategories')
  if (stored) {
    allCategories.value = JSON.parse(stored)
  }

  watch(
    allCategories,
    (newVal) => {
      localStorage.setItem('allCategories', JSON.stringify(newVal))
    },
    { deep: true },
  )

  function setCurrentCategory(todo: TodoCategory) {
    currentCategory.value = todo
  }

  function addCategory(categoryName: string) {
    allCategories.value.push({ id: Date.now(), categoryName, categoryItems: [] })
  }

  function addTodo(name: string) {
    if (!currentCategory.value) return

    const exist = currentCategory.value.categoryItems.some(
      (t) => t.itemName.trim().toLocaleLowerCase() === name.trim().toLocaleLowerCase(),
    )

    if (exist) {
      alert('Task Already Exists')
      return false
    }

    currentCategory.value.categoryItems.push({
      id: Date.now(),
      itemName: name,
      itemStatus: false,
    })
  }

  function removeTodo(id: number) {
    if (!currentCategory.value) return

    currentCategory.value.categoryItems = currentCategory.value.categoryItems.filter(
      (t) => t.id !== id,
    )
  }

  function removeCategory(id: number) {
    allCategories.value = allCategories.value.filter((t) => t.id !== id)
  }

  function editTask(newName: string, id: number) {
    if (!currentCategory.value) return

    const task = currentCategory.value.categoryItems.find((t) => t.id === id)

    if (task) task.itemName = newName
  }

  return {
    currentCategory,
    allCategories,
    categoryCount,
    itemCount,
    setCurrentCategory,
    addCategory,
    addTodo,
    removeTodo,
    removeCategory,
    editTask,
  }
})
