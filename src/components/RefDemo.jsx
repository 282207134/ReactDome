import { useRef, useLayoutEffect, useState } from 'react'

/**
 * useRef 和 useLayoutEffect 示例
 * useRef: 不触发重新渲染的可变引用
 * useLayoutEffect: 在浏览器重绘之前同步执行
 */
function RefDemo() {
  const inputRef = useRef(null)
  const divRef = useRef(null)
  const renderCount = useRef(0)
  const [height, setHeight] = useState(0)
  const [message, setMessage] = useState('React 让 UI 构建更简单！')

  // useLayoutEffect 在 DOM 更新后、浏览器绘制前同步执行
  useLayoutEffect(() => {
    if (divRef.current) {
      setHeight(divRef.current.offsetHeight)
    }
  }, [message])

  // 每次渲染时增加计数（不触发重新渲染）
  renderCount.current += 1

  const focusInput = () => {
    inputRef.current.focus()
  }

  const scrollToDiv = () => {
    divRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <h3>useRef 示例</h3>
      <p>组件渲染次数: {renderCount.current}</p>

      <div style={{ marginBottom: '15px' }}>
        <input ref={inputRef} type="text" placeholder="输入框" />
        <button onClick={focusInput}>聚焦输入框</button>
      </div>

      <h3>useLayoutEffect 示例</h3>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <div
        ref={divRef}
        style={{
          padding: '20px',
          background: '#f0f0ff',
          borderRadius: '5px',
          marginBottom: '10px'
        }}
      >
        <p>{message}</p>
        <p>当前高度: {height}px</p>
      </div>

      <button onClick={scrollToDiv}>滚动到此 Div</button>
    </div>
  )
}

export default RefDemo
