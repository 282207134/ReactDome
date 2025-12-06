// 模拟大量文章数据，用于搜索示例
const articles = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  title: `React 技巧 ${index + 1}`,
  content: `这是关于 React 的第 ${index + 1} 个技巧，涵盖从基础到高级的各种实践。`
}))

export default articles
