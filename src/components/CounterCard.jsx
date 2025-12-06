import { useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.jsx'
import { useTimer } from '../hooks/useTimer.jsx'

/**
 * 计数器组件
 * 演示 useState、useEffect 以及自定义 Hook 的使用
 */
function CounterCard() {
  // 1. useState: 最基础的状态管理 Hook
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)

  // 2. 自定义 Hook: useLocalStorage - 将状态持久化到本地存储
  const [savedCount, setSavedCount] = useLocalStorage('counter', 0)

  // 3. 自定义 Hook: useTimer - 计时器
  const { time, isRunning, start, pause, reset } = useTimer()

  // 4. useEffect: 在 count 变化时执行副作用
  useEffect(() => {
    document.title = `计数: ${count}`
    
    // 清理函数（组件卸载或依赖项变化时执行）
    return () => {
      document.title = 'React 完整示例项目'
    }
  }, [count]) // 依赖数组：仅当 count 改变时重新执行

  // 增加计数
  const increment = () => {
    setCount((prevCount) => prevCount + step)
  }

  // 减少计数
  const decrement = () => {
    setCount((prevCount) => prevCount - step)
  }

  // 重置计数
  const resetCount = () => {
    setCount(0)
  }

  // 保存到本地存储
  const saveToLocal = () => {
    setSavedCount(count)
  }

  // 从本地存储加载
  const loadFromLocal = () => {
    setCount(savedCount)
  }

  const handleStepChange = (event) => {
    const value = Number(event.target.value)
    setStep(Number.isNaN(value) ? 1 : Math.max(1, value))
  }

  return (
    <div>
      <h3>基础计数器（useState + useEffect）</h3>
      
      <div className="counter">
        <button onClick={decrement}>-{step}</button>
        <div className="counter-value">{count}</div>
        <button onClick={increment}>+{step}</button>
        <button onClick={resetCount}>重置</button>
      </div>

      <div style={{ margin: '15px 0' }}>
        <label>
          步长: 
          <input 
            type="number" 
            value={step} 
            onChange={handleStepChange}
            style={{ width: '60px', marginLeft: '10px' }}
            min="1"
          />
        </label>
      </div>

      <h3>本地存储示例（自定义 Hook）</h3>
      <div>
        <button onClick={saveToLocal}>保存当前计数</button>
        <button onClick={loadFromLocal}>加载已保存计数</button>
        <p>已保存的值: {savedCount}</p>
      </div>

      <h3>计时器示例（自定义 Hook）</h3>
      <div className="timer">{time}s</div>
      <div>
        {!isRunning ? (
          <button onClick={start}>开始</button>
        ) : (
          <button onClick={pause}>暂停</button>
        )}
        <button onClick={reset}>重置计时器</button>
      </div>
    </div>
  )
}

export default CounterCard
