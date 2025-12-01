import { useTheme } from '../context/ThemeContext.jsx'

/**
 * 主题切换组件，使用 useContext 获取共享状态
 */
function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="theme-toggle">
      <span>当前主题: {theme === 'light' ? '浅色' : '深色'}</span>
      <button onClick={toggleTheme} style={{ marginLeft: '10px' }}>
        切换主题
      </button>
    </div>
  )
}

export default ThemeSwitcher
