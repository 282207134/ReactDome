import { useState, useMemo, useCallback } from 'react'

/**
 * useMemo + useCallback 示例
 * useMemo: 缓存昂贵计算
 * useCallback: 缓存函数引用，避免不必要的子组件重新渲染
 */
function ExpensiveCalculation() {
  const [number, setNumber] = useState(20)
  const [themeDark, setThemeDark] = useState(false)

  // 模拟重计算（迭代版本，避免栈溢出）
  const slowFactorial = (n) => {
    console.log('执行昂贵计算...')
    const start = performance.now()
    while (performance.now() - start < 50) {
      // 占用 CPU，模拟复杂计算
    }
    if (n <= 0) return 1
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }

  const memoizedValue = useMemo(() => slowFactorial(number), [number])

  const handleNumberChange = useCallback((event) => {
    setNumber(Number(event.target.value))
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeDark((prevTheme) => !prevTheme)
  }, [])

  const themeStyles = useMemo(() => ({
    backgroundColor: themeDark ? '#333' : '#fff',
    color: themeDark ? '#fff' : '#333',
    padding: '15px',
    borderRadius: '8px'
  }), [themeDark])

  return (
    <div>
      <h3>性能优化示例（useMemo + useCallback）</h3>
      <div style={{ marginBottom: '15px' }}>
        <label>
          计算阶乘:
          <input type="number" value={number} onChange={handleNumberChange} min="0" max="25" />
        </label>
      </div>
      <div style={themeStyles}>
        <p>结果: {memoizedValue}</p>
        <button onClick={toggleTheme}>切换主题样式</button>
      </div>
    </div>
  )
}

export default ExpensiveCalculation
