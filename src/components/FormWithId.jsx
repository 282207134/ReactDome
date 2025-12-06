import { useId, useState } from 'react'

/**
 * useId 示例
 * useId 用于生成唯一 ID，特别是在可访问性场景中
 */
function FormWithId() {
  const nameId = useId()
  const emailId = useId()
  const bioId = useId()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`姓名: ${formData.name}\n邮箱: ${formData.email}\n简介: ${formData.bio}`)
  }

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  return (
    <div>
      <h3>表单示例（useId 用于可访问性）</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor={nameId}>姓名:</label>
          <input
            id={nameId}
            type="text"
            value={formData.name}
            onChange={handleChange('name')}
            placeholder="请输入姓名"
          />
        </div>

        <div className="form-group">
          <label htmlFor={emailId}>邮箱:</label>
          <input
            id={emailId}
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            placeholder="请输入邮箱"
          />
        </div>

        <div className="form-group">
          <label htmlFor={bioId}>简介:</label>
          <textarea
            id={bioId}
            value={formData.bio}
            onChange={handleChange('bio')}
            placeholder="请输入个人简介"
            rows="3"
            style={{ width: '100%' }}
          />
        </div>

        <button type="submit">提交</button>
      </form>
    </div>
  )
}

export default FormWithId
