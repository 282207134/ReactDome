# React 钩子实践指南

> 配套项目：React 完整示例项目（/src）

## 目录

1. [Hooks 总览](#hooks-总览)
2. [基础 Hooks](#基础-hooks)
3. [额外 Hooks](#额外-hooks)
4. [自定义 Hooks](#自定义-hooks)
5. [Context API](#context-api)
6. [常见模式](#常见模式)
7. [调试建议](#调试建议)

---

## Hooks 总览

| Hook | 场景 | 示例文件 |
|------|------|----------|
| useState | 组件状态 | CounterCard.jsx |
| useEffect | 副作用 | CounterCard.jsx, useFetch.jsx |
| useContext | 跨组件状态共享 | ThemeContext.jsx, ThemeSwitcher.jsx |
| useReducer | 复杂状态逻辑 | TodoReducer.jsx |
| useCallback | 缓存函数引用 | ExpensiveCalculation.jsx |
| useMemo | 缓存计算结果 | TodoReducer.jsx, ExpensiveCalculation.jsx |
| useRef | 持久化引用，操作 DOM | RefDemo.jsx, useTimer.jsx |
| useLayoutEffect | 同步执行副作用 | RefDemo.jsx |
| useId | 生成稳定的 ID | FormWithId.jsx |
| useTransition | 低优先级更新 | TransitionSearch.jsx |
| useDeferredValue | 延迟更新数据 | TransitionSearch.jsx |

---

## 基础 Hooks

### useState

- **场景**: 需要在组件内部存储和更新数据
- **示例**: `CounterCard.jsx`
- **最佳实践**: 状态取决于前一个值时，使用函数式更新

```jsx
const [count, setCount] = useState(0)
setCount(prev => prev + 1)
```

### useEffect

- **场景**: 数据获取、订阅、DOM 操作、定时器
- **示例**: `useFetch.jsx`, `CounterCard.jsx`
- **最佳实践**: 使用清理函数，避免内存泄漏

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('tick')
  }, 1000)

  return () => clearInterval(timer)
}, [])
```

### useContext

- **场景**: 组件树中深层共享数据，无需 props drilling
- **示例**: `ThemeContext.jsx`
- **最佳实践**: 提供自定义 Hook（如 useTheme）封装 useContext

```jsx
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme 必须在 ThemeProvider 内部使用')
  return context
}
```

---

## 额外 Hooks

### useReducer

- **场景**: 状态逻辑复杂，包含多种转换
- **示例**: `TodoReducer.jsx`
- **模式**: 状态 + action + reducer 函数组成

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, action.payload]
    case 'remove':
      return state.filter(item => item.id !== action.payload)
    default:
      return state
  }
}

const [state, dispatch] = useReducer(reducer, initialState)
```

### useCallback vs useMemo

- **useCallback**: 缓存函数引用
- **useMemo**: 缓存计算结果
- **示例**: `ExpensiveCalculation.jsx`

```jsx
const memoizedValue = useMemo(() => compute(value), [value])
const memoizedHandler = useCallback(() => doSomething(value), [value])
```

### useRef & useLayoutEffect

- **useRef**: 存储可变值、访问 DOM
- **useLayoutEffect**: 在浏览器绘制前同步执行
- **示例**: `RefDemo.jsx`

```jsx
const divRef = useRef(null)

useLayoutEffect(() => {
  if (divRef.current) {
    setHeight(divRef.current.offsetHeight)
  }
})
```

### useTransition & useDeferredValue

- **场景**: 大量数据渲染，避免阻塞输入
- **示例**: `TransitionSearch.jsx`

```jsx
const [isPending, startTransition] = useTransition()
const deferredQuery = useDeferredValue(query)

startTransition(() => {
  setQuery(value)
})
```

---

## 自定义 Hooks

### useLocalStorage

- **场景**: 状态持久化
- **示例**: `hooks/useLocalStorage.jsx`
- **模式**: 使用 useState 初始化，useEffect 同步

### useTimer

- **场景**: 计时/倒计时
- **示例**: `hooks/useTimer.jsx`
- **模式**: useRef 保存定时器 ID

### useFetch

- **场景**: 数据请求
- **示例**: `hooks/useFetch.jsx`
- **模式**: useEffect 管理请求与清理

---

## Context API

- **ThemeContext**: 管理主题（light/dark）
- **ThemeProvider**: 包裹根组件，提供上下文
- **useTheme**: 其他组件使用主题

```jsx
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

---

## 常见模式

### 1. 表单处理

- 使用 useState 管理表单值
- 使用 useId 生成 label 与 input 的关联

### 2. 数据列表渲染

- 提取为纯函数组件
- 使用 useMemo 提前计算过滤结果
- useTransition 避免卡顿

### 3. 副作用清理

- fetch 请求：使用 AbortController 或标记变量
- 订阅事件：在清理函数中移除监听
- 定时器：清除 setInterval/setTimeout

---

## 调试建议

1. **启用 React DevTools**: 查看 Hooks 调用顺序
2. **使用 ESLint Hooks 规则**: 防止违规调用
3. **拆分复杂组件**: 更容易定位问题
4. **console.log + useRef**: 记录渲染次数
5. **React.StrictMode**: 捕捉潜在问题

---

## 参考链接

- [React 中文官网](https://zh-hans.react.dev/reference/react)
- [Hooks FAQ](https://zh-hans.react.dev/reference/react/hooks)
- [useEffect 完全指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
- [React 性能优化](https://reactjs.org/docs/optimizing-performance.html)

---

**本指南配套的代码示例全部可以在 `src` 目录中找到。建议边阅读边调试，加深理解。**
