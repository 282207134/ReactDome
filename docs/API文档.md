# React API 文档

> 本项目涵盖的所有 React Hooks、组件和 API 的详细说明

---

## 内置 Hooks

### 1. useState

**签名**:
```jsx
const [state, setState] = useState(initialState)
```

**参数**:
- `initialState`: 初始状态值，可以是任何类型。也可以是一个函数，该函数返回初始状态。

**返回值**:
- `state`: 当前状态值
- `setState`: 更新状态的函数

**更新状态的两种方式**:

```jsx
// 1. 直接传入新值
setState(newValue)

// 2. 函数式更新（推荐，尤其是依赖旧值时）
setState(prevState => prevState + 1)
```

**示例**: `src/components/CounterCard.jsx`

---

### 2. useEffect

**签名**:
```jsx
useEffect(setup, dependencies?)
```

**参数**:
- `setup`: 副作用函数，可返回清理函数
- `dependencies`: 依赖数组（可选）

**执行时机**:
- 首次渲染后
- 依赖项改变后
- 组件卸载时执行清理函数

**依赖数组说明**:

| 依赖数组 | 执行时机 |
|---------|---------|
| 不传 | 每次渲染后 |
| `[]` | 仅首次渲染后 |
| `[a, b]` | 首次渲染后 + a 或 b 改变后 |

**示例**:

```jsx
useEffect(() => {
  // 副作用逻辑
  const subscription = subscribe()
  
  // 清理函数
  return () => {
    subscription.unsubscribe()
  }
}, [dependency])
```

**示例文件**: `src/components/CounterCard.jsx`, `src/hooks/useFetch.jsx`

---

### 3. useContext

**签名**:
```jsx
const value = useContext(SomeContext)
```

**参数**:
- `SomeContext`: 使用 `createContext` 创建的上下文对象

**返回值**:
- 最近的 `<Context.Provider>` 提供的值

**完整示例**:

```jsx
// 创建 Context
const ThemeContext = createContext(null)

// 提供者
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 消费者
function Button() {
  const { theme, setTheme } = useContext(ThemeContext)
  return <button onClick={() => setTheme('dark')}>{theme}</button>
}
```

**示例文件**: `src/context/ThemeContext.jsx`, `src/components/ThemeSwitcher.jsx`

---

### 4. useReducer

**签名**:
```jsx
const [state, dispatch] = useReducer(reducer, initialState)
```

**参数**:
- `reducer`: `(state, action) => newState` 函数
- `initialState`: 初始状态

**返回值**:
- `state`: 当前状态
- `dispatch`: 派发 action 的函数

**Reducer 函数**:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new Error('Unknown action')
  }
}
```

**使用**:

```jsx
const [state, dispatch] = useReducer(reducer, { count: 0 })

dispatch({ type: 'increment' })
dispatch({ type: 'decrement' })
```

**示例文件**: `src/components/TodoReducer.jsx`

---

### 5. useCallback

**签名**:
```jsx
const cachedFn = useCallback(fn, dependencies)
```

**参数**:
- `fn`: 需要缓存的函数
- `dependencies`: 依赖数组

**返回值**:
- 缓存的函数引用

**用途**:
- 避免子组件不必要的重渲染
- 依赖于某些值但不想每次都重新创建的函数

**示例**:

```jsx
const handleClick = useCallback(() => {
  console.log(value)
}, [value])

return <ChildComponent onClick={handleClick} />
```

**示例文件**: `src/components/ExpensiveCalculation.jsx`

---

### 6. useMemo

**签名**:
```jsx
const cachedValue = useMemo(calculateValue, dependencies)
```

**参数**:
- `calculateValue`: 计算函数
- `dependencies`: 依赖数组

**返回值**:
- 缓存的计算结果

**用途**:
- 避免昂贵的重复计算
- 缓存引用类型（对象、数组），避免子组件重渲染

**示例**:

```jsx
const filteredList = useMemo(() => {
  return list.filter(item => item.active)
}, [list])
```

**示例文件**: `src/components/TodoReducer.jsx`, `src/components/ExpensiveCalculation.jsx`

---

### 7. useRef

**签名**:
```jsx
const ref = useRef(initialValue)
```

**参数**:
- `initialValue`: 初始值

**返回值**:
- 可变的 ref 对象 `{ current: initialValue }`

**用途**:
1. 访问 DOM 元素
2. 保存可变值（不触发重渲染）
3. 保存定时器 ID

**示例**:

```jsx
// 1. 访问 DOM
const inputRef = useRef(null)
inputRef.current.focus()

// 2. 保存可变值
const countRef = useRef(0)
countRef.current += 1

// 3. 保存定时器 ID
const timerRef = useRef(null)
timerRef.current = setInterval(() => {}, 1000)
```

**示例文件**: `src/components/RefDemo.jsx`, `src/hooks/useTimer.jsx`

---

### 8. useLayoutEffect

**签名**:
```jsx
useLayoutEffect(setup, dependencies?)
```

**参数**: 与 `useEffect` 相同

**执行时机**:
- 在所有 DOM 变更后**同步**执行
- 在浏览器绘制之前

**用途**:
- 测量 DOM 布局（尺寸、位置）
- 避免闪烁

**示例**:

```jsx
useLayoutEffect(() => {
  const rect = divRef.current.getBoundingClientRect()
  setPosition({ x: rect.left, y: rect.top })
}, [])
```

**示例文件**: `src/components/RefDemo.jsx`

---

### 9. useId

**签名**:
```jsx
const id = useId()
```

**返回值**:
- 唯一的字符串 ID

**用途**:
- 生成表单元素的 ID
- 关联 `<label>` 和 `<input>`
- 提高可访问性

**示例**:

```jsx
const nameId = useId()

return (
  <>
    <label htmlFor={nameId}>姓名</label>
    <input id={nameId} type="text" />
  </>
)
```

**示例文件**: `src/components/FormWithId.jsx`

---

### 10. useTransition

**签名**:
```jsx
const [isPending, startTransition] = useTransition()
```

**返回值**:
- `isPending`: 是否有待处理的过渡
- `startTransition`: 将状态更新标记为过渡（低优先级）

**用途**:
- 避免阻塞 UI
- 用户输入等高优先级操作不被阻塞

**示例**:

```jsx
const [isPending, startTransition] = useTransition()

const handleChange = (e) => {
  const value = e.target.value
  setInputValue(value) // 高优先级，立即更新
  
  startTransition(() => {
    setSearchQuery(value) // 低优先级，不阻塞输入
  })
}
```

**示例文件**: `src/components/TransitionSearch.jsx`

---

### 11. useDeferredValue

**签名**:
```jsx
const deferredValue = useDeferredValue(value)
```

**参数**:
- `value`: 需要延迟的值

**返回值**:
- 可能落后的值（在高优先级更新期间）

**用途**:
- 延迟更新 UI 的一部分
- 优化搜索、过滤等场景

**示例**:

```jsx
const [query, setQuery] = useState('')
const deferredQuery = useDeferredValue(query)

// query 立即更新，deferredQuery 延迟更新
const results = useMemo(() => {
  return data.filter(item => item.name.includes(deferredQuery))
}, [deferredQuery])
```

**示例文件**: `src/components/TransitionSearch.jsx`

---

## 自定义 Hooks

### useLocalStorage

**位置**: `src/hooks/useLocalStorage.jsx`

**签名**:
```jsx
const [value, setValue] = useLocalStorage(key, initialValue)
```

**参数**:
- `key`: localStorage 的键名
- `initialValue`: 初始值

**返回值**:
- `value`: 当前值
- `setValue`: 更新函数

**特性**:
- 自动同步到 localStorage
- 刷新页面后保留数据

---

### useTimer

**位置**: `src/hooks/useTimer.jsx`

**签名**:
```jsx
const { time, isRunning, start, pause, reset } = useTimer()
```

**返回值**:
- `time`: 当前时间（秒）
- `isRunning`: 是否正在运行
- `start`: 开始计时
- `pause`: 暂停计时
- `reset`: 重置计时器

---

### useFetch

**位置**: `src/hooks/useFetch.jsx`

**签名**:
```jsx
const { data, loading, error } = useFetch(url)
```

**参数**:
- `url`: 请求地址

**返回值**:
- `data`: 响应数据
- `loading`: 是否正在加载
- `error`: 错误信息

**特性**:
- 自动处理加载状态
- 自动处理错误
- 组件卸载时取消请求

---

## Context API

### ThemeContext

**位置**: `src/context/ThemeContext.jsx`

**提供的值**:

```jsx
{
  theme: 'light' | 'dark',
  toggleTheme: () => void
}
```

**使用方式**:

```jsx
// 1. 包裹应用
<ThemeProvider>
  <App />
</ThemeProvider>

// 2. 在组件中使用
const { theme, toggleTheme } = useTheme()
```

---

## 组件 API

### CounterCard

**位置**: `src/components/CounterCard.jsx`

**功能**:
- 计数器
- 本地存储
- 计时器

**Props**: 无

---

### TodoReducer

**位置**: `src/components/TodoReducer.jsx`

**功能**:
- 待办事项管理
- 统计功能

**Props**: 无

---

### RefDemo

**位置**: `src/components/RefDemo.jsx`

**功能**:
- 聚焦输入框
- 测量 DOM 尺寸
- 滚动到元素

**Props**: 无

---

### TransitionSearch

**位置**: `src/components/TransitionSearch.jsx`

**功能**:
- 搜索过滤
- 性能优化

**Props**: 无

---

### DataFetcher

**位置**: `src/components/DataFetcher.jsx`

**功能**:
- 数据获取
- 加载和错误状态

**Props**: 无

---

### FormWithId

**位置**: `src/components/FormWithId.jsx`

**功能**:
- 表单处理
- 可访问性

**Props**: 无

---

### ExpensiveCalculation

**位置**: `src/components/ExpensiveCalculation.jsx`

**功能**:
- 昂贵计算缓存
- 性能优化示例

**Props**: 无

---

## React 18 新特性

### 并发特性

1. **useTransition**: 标记低优先级更新
2. **useDeferredValue**: 延迟更新值
3. **自动批处理**: 减少重渲染次数

### Strict Mode

开启方式：

```jsx
import { StrictMode } from 'react'

<StrictMode>
  <App />
</StrictMode>
```

**作用**:
- 检测不安全的生命周期
- 检测过时的 API
- 检测副作用

---

## 参考链接

- [React 官方文档](https://zh-hans.react.dev/)
- [Hooks API 参考](https://zh-hans.react.dev/reference/react/hooks)
- [Context API](https://zh-hans.react.dev/reference/react/createContext)

---

**本文档基于项目代码编写，建议结合源码阅读。**
