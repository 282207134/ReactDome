import { useState, useTransition, useDeferredValue, useMemo } from 'react'
import articles from '../data/articles.js'

/**
 * useTransition + useDeferredValue 示例：搜索建议
 */
function TransitionSearch() {
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const deferredQuery = useDeferredValue(query)

  // 搜索处理函数：使用 startTransition 降低优先级
  const handleSearch = (event) => {
    const value = event.target.value
    startTransition(() => {
      setQuery(value)
    })
  }

  // 使用 useMemo 避免不必要的重复计算
  const filteredArticles = useMemo(() => {
    return articles.filter((article) =>
      article.title.toLowerCase().includes(deferredQuery.toLowerCase())
    )
  }, [deferredQuery])

  return (
    <div>
      <h3>搜索建议（useTransition + useDeferredValue）</h3>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="输入文章标题关键字..."
      />
      {isPending && <p className="loading">正在计算...</p>}
      <ul>
        {filteredArticles.slice(0, 20).map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default TransitionSearch
