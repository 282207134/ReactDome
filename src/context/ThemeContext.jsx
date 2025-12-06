import { createContext, useState, useContext } from 'react'

// 创建主题上下文
const ThemeContext = createContext(null)

/**
 * 主题提供者组件
 * 使用 createContext 和 useContext 来共享全局状态
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  // 切换主题函数
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * 自定义 Hook：使用主题上下文
 * 这样其他组件就不需要直接导入 ThemeContext，只需调用此 Hook
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme 必须在 ThemeProvider 内部使用')
  }
  return context
}
