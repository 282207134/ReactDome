import { useFetch } from '../hooks/useFetch.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

/**
 * 数据获取示例
 * 演示自定义 Hook useFetch 和 useContext
 */
function DataFetcher() {
  const { data, loading, error } = useFetch('/users.json')
  const { theme } = useTheme()

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  if (error) {
    return <div className="error">错误: {error}</div>
  }

  return (
    <div>
      <h3>数据获取示例（自定义 useFetch Hook）</h3>
      <p>当前主题: {theme === 'light' ? '浅色' : '深色'}</p>
      
      <div className="user-list">
        {data &&
          data.map((user) => (
            <div key={user.id} className="user-card">
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              <p>{user.bio}</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default DataFetcher
