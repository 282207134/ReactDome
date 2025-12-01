# React 完整示例项目 - 中文文档

> 基于 React 18 官方文档的完整示例项目，涵盖所有常用 Hooks、组件和 API 的实际应用。

---

## 📚 项目简介

本项目对照 [React 中文官网](https://zh-hans.react.dev/reference/react) 中的各类 Hooks、组件与 API，提供了完整的、可运行的示例代码，便于开发者快速上手与复习。

### ✨ 特性

- ✅ **完整的 Hooks 示例**：包含 useState、useEffect、useContext、useReducer、useMemo、useCallback、useRef、useTransition、useDeferredValue、useId、useLayoutEffect 等
- ✅ **自定义 Hooks**：useLocalStorage、useTimer、useFetch 等实用自定义 Hooks
- ✅ **全中文注释**：每一行代码都有详细的中文注释
- ✅ **实际应用场景**：计数器、待办事项、表单处理、数据获取、搜索过滤等
- ✅ **Context API**：全局状态管理示例（主题切换）
- ✅ **性能优化**：useMemo、useCallback 的正确使用
- ✅ **现代工具链**：Vite + React 18

---

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

项目将在 `http://localhost:3000` 启动。

### 3. 构建生产版本

```bash
npm run build
```

### 4. 预览生产版本

```bash
npm run preview
```

---

## 📂 项目结构

```
react-complete-demo/
├── public/
│   └── users.json              # 模拟数据文件
├── src/
│   ├── components/             # 组件目录
│   │   ├── CounterCard.jsx     # 计数器（useState + useEffect）
│   │   ├── TodoReducer.jsx     # 待办事项（useReducer + useMemo）
│   │   ├── RefDemo.jsx         # useRef + useLayoutEffect
│   │   ├── TransitionSearch.jsx # useTransition + useDeferredValue
│   │   ├── DataFetcher.jsx     # 数据获取（useFetch）
│   │   ├── FormWithId.jsx      # useId 可访问性示例
│   │   ├── ExpensiveCalculation.jsx # useMemo + useCallback 性能优化
│   │   └── ThemeSwitcher.jsx   # 主题切换（useContext）
│   ├── context/
│   │   └── ThemeContext.jsx    # 全局主题 Context
│   ├── hooks/                  # 自定义 Hooks
│   │   ├── useLocalStorage.jsx # 本地存储 Hook
│   │   ├── useTimer.jsx        # 计时器 Hook
│   │   └── useFetch.jsx        # 数据获取 Hook
│   ├── data/
│   │   └── articles.js         # 模拟数据
│   ├── App.jsx                 # 根组件
│   ├── App.css                 # 样式文件
│   └── main.jsx                # 入口文件
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🎯 核心功能示例

### 1. useState + useEffect

**文件**: `src/components/CounterCard.jsx`

**功能**:
- 基础计数器，演示状态管理
- 使用 useEffect 在 count 变化时更新文档标题
- 清理函数的使用

**代码片段**:

```jsx
const [count, setCount] = useState(0)

useEffect(() => {
  document.title = `计数: ${count}`
  
  return () => {
    document.title = 'React 完整示例项目'
  }
}, [count])
```

---

### 2. useReducer + useMemo

**文件**: `src/components/TodoReducer.jsx`

**功能**:
- 待办事项列表，使用 useReducer 管理复杂状态
- useMemo 缓存计算的统计数据

**代码片段**:

```jsx
const [todos, dispatch] = useReducer(todoReducer, initialTodos)

const stats = useMemo(() => {
  const completed = todos.filter(todo => todo.completed).length
  return {
    total: todos.length,
    completed,
    pending: todos.length - completed
  }
}, [todos])
```

---

### 3. useRef + useLayoutEffect

**文件**: `src/components/RefDemo.jsx`

**功能**:
- 使用 useRef 访问 DOM 元素
- 使用 useLayoutEffect 在渲染前测量元素尺寸
- 保持不触发重渲染的可变引用

**代码片段**:

```jsx
const divRef = useRef(null)
const renderCount = useRef(0)

useLayoutEffect(() => {
  if (divRef.current) {
    setHeight(divRef.current.offsetHeight)
  }
})
```

---

### 4. useTransition + useDeferredValue

**文件**: `src/components/TransitionSearch.jsx`

**功能**:
- 搜索功能，使用 useTransition 降低更新优先级
- useDeferredValue 延迟更新搜索结果

**代码片段**:

```jsx
const [query, setQuery] = useState('')
const [isPending, startTransition] = useTransition()
const deferredQuery = useDeferredValue(query)

const handleSearch = (event) => {
  const value = event.target.value
  startTransition(() => {
    setQuery(value)
  })
}
```

---

### 5. useContext

**文件**: `src/context/ThemeContext.jsx`, `src/components/ThemeSwitcher.jsx`

**功能**:
- 全局主题管理
- 跨组件共享状态

**代码片段**:

```jsx
// 创建 Context
const ThemeContext = createContext(null)

// 提供者
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 消费者
export function useTheme() {
  return useContext(ThemeContext)
}
```

---

### 6. useId

**文件**: `src/components/FormWithId.jsx`

**功能**:
- 生成唯一 ID，用于表单可访问性
- 关联 label 和 input

**代码片段**:

```jsx
const nameId = useId()

return (
  <div>
    <label htmlFor={nameId}>姓名:</label>
    <input id={nameId} type="text" />
  </div>
)
```

---

### 7. useMemo + useCallback

**文件**: `src/components/ExpensiveCalculation.jsx`

**功能**:
- useMemo 缓存计算结果，避免重复计算
- useCallback 缓存函数引用，避免子组件不必要的重渲染

**代码片段**:

```jsx
const memoizedValue = useMemo(() => slowFactorial(number), [number])

const handleNumberChange = useCallback((event) => {
  setNumber(Number(event.target.value))
}, [])
```

---

## 🔧 自定义 Hooks

### 1. useLocalStorage

**文件**: `src/hooks/useLocalStorage.jsx`

**功能**: 将状态持久化到 localStorage

**用法**:

```jsx
const [savedCount, setSavedCount] = useLocalStorage('counter', 0)
```

---

### 2. useTimer

**文件**: `src/hooks/useTimer.jsx`

**功能**: 可控制的计时器

**用法**:

```jsx
const { time, isRunning, start, pause, reset } = useTimer()
```

---

### 3. useFetch

**文件**: `src/hooks/useFetch.jsx`

**功能**: 封装数据获取逻辑，处理加载和错误状态

**用法**:

```jsx
const { data, loading, error } = useFetch('/api/users')
```

---

## 📖 React Hooks 完整列表

### 基础 Hooks

| Hook | 用途 | 示例组件 |
|------|------|----------|
| `useState` | 管理组件状态 | CounterCard.jsx |
| `useEffect` | 处理副作用（数据获取、订阅等） | CounterCard.jsx, useFetch.jsx |
| `useContext` | 读取和订阅 Context | ThemeSwitcher.jsx |

### 额外的 Hooks

| Hook | 用途 | 示例组件 |
|------|------|----------|
| `useReducer` | 管理复杂状态逻辑 | TodoReducer.jsx |
| `useCallback` | 缓存函数引用 | ExpensiveCalculation.jsx |
| `useMemo` | 缓存计算结果 | TodoReducer.jsx, ExpensiveCalculation.jsx |
| `useRef` | 持久化可变引用，访问 DOM | RefDemo.jsx, useTimer.jsx |
| `useLayoutEffect` | 同步执行副作用（DOM 测量） | RefDemo.jsx |
| `useId` | 生成唯一 ID | FormWithId.jsx |
| `useTransition` | 标记低优先级更新 | TransitionSearch.jsx |
| `useDeferredValue` | 延迟更新值 | TransitionSearch.jsx |

---

## 🎨 样式说明

项目使用原生 CSS，样式文件为 `src/App.css`。

**主要特性**:
- 响应式设计
- 渐变色背景
- 悬停动画
- 深色模式支持（通过 Context）

---

## 🌟 学习建议

1. **按顺序学习**: 从 useState/useEffect 开始，逐步深入
2. **阅读注释**: 每个文件都有详细的中文注释
3. **动手修改**: 修改代码，观察效果变化
4. **对照官网**: 参考 [React 中文官网](https://zh-hans.react.dev/reference/react)
5. **实践应用**: 将学到的 Hooks 应用到自己的项目中

---

## 📚 参考资源

- [React 中文官网](https://zh-hans.react.dev/)
- [React Hooks API 参考](https://zh-hans.react.dev/reference/react)
- [React 内置 Hooks](https://zh-hans.react.dev/reference/react/hooks)
- [Vite 官方文档](https://vitejs.dev/)

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📄 许可证

MIT License

---

## 👨‍💻 作者

React 学习示例项目

如有问题或建议，欢迎交流！
