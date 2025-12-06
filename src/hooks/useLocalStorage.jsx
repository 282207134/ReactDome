import { useState, useEffect } from 'react'

/**
 * useLocalStorage 自定义 Hook
 * 作用：在状态变化时同步到 localStorage，实现持久化
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('读取 localStorage 失败:', error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error('写入 localStorage 失败:', error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
