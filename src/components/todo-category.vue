<script setup lang="ts">
import { useTodoStore } from '@/stores/todo-store'
import { createTodos } from '@/composables/createTodos'
import { ref } from 'vue'

const todos = useTodoStore()

const { inputName, nullChecker, createTask, createCategory, editTask, editInputs, addTask } =
  createTodos(todos)

const editingTaskId = ref<number | null>(null)

function toggleModifying(id: number) {
  editingTaskId.value = editingTaskId.value === id ? null : id
}
</script>

<template>
  <!-- Input Box -->
  <div class="input-area">
    <input v-model="inputName" @keyup.enter="createCategory" placeholder="Create a Category" />
    <button @click="createCategory">Add Category</button>
  </div>

  <!-- Null Checker -->
  <div class="input-area" v-if="nullChecker">
    <h1>No Categories</h1>
  </div>

  <!-- Printables -->
  <div class="layout-wrapper" v-else>
    <!-- All Tasks-->
    <div class="all-tasks-box">
      <div class="all-tasks-title">All Tasks</div>
      <div v-for="category of todos.allCategories" :key="category.id">
        <div v-for="task of category.categoryItems" :key="task.id" class="all-task-box">
          <input type="checkbox" v-model="task.itemStatus" />
          <h4 v-show="editingTaskId !== task.id" class="all-task-title">{{ task.itemName }}</h4>
          <h5 v-show="editingTaskId === task.id">
            <input
              placeholder="Edit Task Name"
              v-model="editInputs[task.id]"
              @keyup.enter="
                () => {
                  editTask(task.id)
                  toggleModifying(task.id)
                }
              "
            />
          </h5>
          <div class="editTask">
            <button @click="toggleModifying(task.id)">✍️</button>
            <button @click="todos.removeTodo(task.id)">X</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Boxes -->
    <div class="categories-container">
      <div
        v-for="category of todos.allCategories"
        :key="category.id"
        class="category-box"
        @mouseover="todos.setCurrentCategory(category)"
      >
        <h3 class="category-title">{{ category.categoryName }}</h3>

        <div>
          <input
            class="task-input"
            v-model="addTask[category.id]"
            @keyup.enter="
              () => {
                createTask(category.id)
              }
            "
            placeholder="Add a task"
          />
        </div>

        <div>Unfinished Tasks:</div>
        <div
          draggable="true"
          v-for="task of category.categoryItems.filter((t) => !t.itemStatus)"
          :key="task.id"
          class="task-box"
        >
          <input type="checkbox" v-model="task.itemStatus" />
          <h4 v-show="editingTaskId !== task.id" class="task-title">{{ task.itemName }}</h4>
          <h5 v-show="editingTaskId === task.id">
            <input
              placeholder="Edit Task Name"
              v-model="editInputs[task.id]"
              @keyup.enter="
                () => {
                  editTask(task.id)
                  toggleModifying(task.id)
                }
              "
            />
          </h5>
          <div class="editTask">
            <button @click="toggleModifying(task.id)">✍️</button>
            <button @click="todos.removeTodo(task.id)">X</button>
          </div>
        </div>

        <div>Finished Tasks:</div>
        <div
          draggable="true"
          v-for="task of category.categoryItems.filter((t) => t.itemStatus)"
          :key="task.id"
          class="task-box"
        >
          <input type="checkbox" v-model="task.itemStatus" />
          <h4 v-show="editingTaskId !== task.id" class="task-title">{{ task.itemName }}</h4>
          <h5 v-show="editingTaskId === task.id">
            <input
              placeholder="Edit Task Name"
              v-model="editInputs[task.id]"
              @keyup.enter="
                () => {
                  editTask(task.id)
                  toggleModifying(task.id)
                }
              "
            />
          </h5>
          <div class="editTask">
            <button @click="toggleModifying(task.id)">✍️</button>
            <button @click="todos.removeTodo(task.id)">X</button>
          </div>
        </div>

        <button class="deleteCategory" @click="todos.removeCategory(category.id)">
          Remove Category
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.layout-wrapper {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  padding: 1rem;
  align-items: flex-start;
  flex-wrap: nowrap;
  width: 100%;
}

.all-tasks-box {
  flex-shrink: 0;
  min-width: 200px;
  max-width: 250px;
  max-height: 70vh;
  width: 100%;
  border: 2px solid #333;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 2rem;
  background-color: #f9f9f9;
  overflow-y: auto;
}

.all-tasks-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.all-task-box {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.2rem;
  border: 1px solid #000;
  padding: 3px;
  flex-wrap: nowrap;
  word-break: break-word;
}

.all-task-title {
  flex: 1;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
  margin: 0;
  padding-right: 95px;
}

.input-area {
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.categories-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1rem;
  justify-content: flex-start;
  align-items: flex-start;
  max-height: 70vh;
  overflow-y: auto;
  width: 100%;
}

.category-box {
  position: relative;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border: 1px solid #000000;
  padding: 1rem;
  width: 280px;
  border-radius: 6px;
  padding-bottom: 60px;
}

.task-box {
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  border: 1px solid #000000;
  padding: 3px;
}

.task-title {
  flex: 1;
  min-width: 0;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  padding-right: 95px;
  margin: 0;
}

.editTask {
  position: absolute;
  display: flex;
  right: 3px;
  gap: 0.1rem;
}

.editTask button {
  padding: 4px 8px;
  font-size: 10px;
  min-width: 30px;
  border-radius: 4px;
  cursor: pointer;
}

.category-title {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  overflow-wrap: break-word;
  white-space: normal;
  text-align: center;
}

.task-input {
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.3rem;
}

.task-list {
  flex-grow: 1;
  overflow-y: auto;
}

.deleteCategory {
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 10px;
  left: 10px;
  right: 10px;
  font-size: 0.9rem;
}
</style>
