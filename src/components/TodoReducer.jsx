import { useReducer, useMemo, useState } from 'react'

/**
 * useReducer 示例：待办事项列表
 * 同时结合 useMemo 计算派生状态
 */
const initialTodos = [
  { id: 1, text: '阅读 React 文档', completed: false },
  { id: 2, text: '实现自定义 Hook', completed: true }
]

function todoReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, { id: Date.now(), text: action.payload, completed: false }]
    case 'toggle':
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      )
    case 'delete':
      return state.filter((todo) => todo.id !== action.payload)
    default:
      return state
  }
}

function TodoReducer() {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos)
  const [text, setText] = useState('')

  // useMemo: 仅当 todos 改变时重新计算
  const stats = useMemo(() => {
    const completed = todos.filter((todo) => todo.completed).length
    return {
      total: todos.length,
      completed,
      pending: todos.length - completed
    }
  }, [todos])

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch({ type: 'add', payload: text })
      setText('')
    }
  }

  return (
    <div>
      <h3>待办事项（useReducer + useMemo）</h3>
      <div className="form-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入任务..."
        />
        <button onClick={handleAddTodo}>添加任务</button>
      </div>

      <div>
        <p>总数: {stats.total}</p>
        <p>已完成: {stats.completed}</p>
        <p>未完成: {stats.pending}</p>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'toggle', payload: todo.id })}
            />
            <span className="todo-text">{todo.text}</span>
            <button onClick={() => dispatch({ type: 'delete', payload: todo.id })}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoReducer
