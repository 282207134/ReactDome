import CounterCard from './components/CounterCard.jsx'
import TodoReducer from './components/TodoReducer.jsx'
import RefDemo from './components/RefDemo.jsx'
import TransitionSearch from './components/TransitionSearch.jsx'
import DataFetcher from './components/DataFetcher.jsx'
import FormWithId from './components/FormWithId.jsx'
import ExpensiveCalculation from './components/ExpensiveCalculation.jsx'
import ThemeSwitcher from './components/ThemeSwitcher.jsx'
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx'
import './App.css'

function AppContent() {
  const { theme } = useTheme()

  return (
    <div className={`app ${theme === 'dark' ? 'dark-theme' : ''}`} id="top">
      <header className="app-header">
        <h1>React 官方 API 中文示例</h1>
        <p>
          该项目对照 React 中文官网 (zh-hans.react.dev) 中的各类 Hooks、组件与 API，提供了可运
          行的示例，便于快速上手与复习。
        </p>
        <ThemeSwitcher />
      </header>

      <section className="section">
        <h2>useState / useEffect / 自定义 Hook</h2>
        <CounterCard />
      </section>

      <section className="section">
        <h2>useReducer / useMemo</h2>
        <TodoReducer />
      </section>

      <section className="section">
        <h2>useRef / useLayoutEffect</h2>
        <RefDemo />
      </section>

      <section className="section">
        <h2>useTransition / useDeferredValue</h2>
        <TransitionSearch />
      </section>

      <section className="section">
        <h2>useContext / useFetch (自定义)</h2>
        <DataFetcher />
      </section>

      <section className="section">
        <h2>useId / 可访问性示例</h2>
        <FormWithId />
      </section>

      <section className="section">
        <h2>useCallback / useMemo 计算优化</h2>
        <ExpensiveCalculation />
      </section>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
