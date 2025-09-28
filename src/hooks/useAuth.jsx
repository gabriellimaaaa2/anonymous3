import { useState, useEffect, createContext, useContext } from 'react'
import Cookies from 'js-cookie'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se há um usuário logado ao carregar a página
    const savedUser = Cookies.get('anonymous_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Erro ao carregar usuário:', error)
        Cookies.remove('anonymous_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      // Simular autenticação
      // Em produção, fazer chamada para API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simular verificação de credenciais
      const users = JSON.parse(localStorage.getItem('anonymous_users') || '[]')
      const existingUser = users.find(u => u.username === username && u.password === password)
      
      if (!existingUser) {
        return false
      }
      
      const userData = {
        id: existingUser.id,
        username: existingUser.username,
        createdAt: existingUser.createdAt
      }
      
      setUser(userData)
      Cookies.set('anonymous_user', JSON.stringify(userData), { expires: 7 })
      
      return true
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    }
  }

  const register = async (username, password) => {
    try {
      // Simular registro
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Verificar se usuário já existe
      const users = JSON.parse(localStorage.getItem('anonymous_users') || '[]')
      const existingUser = users.find(u => u.username === username)
      
      if (existingUser) {
        throw new Error('Usuário já existe')
      }
      
      // Criar novo usuário
      const newUser = {
        id: Date.now(),
        username,
        password,
        createdAt: new Date().toISOString()
      }
      
      users.push(newUser)
      localStorage.setItem('anonymous_users', JSON.stringify(users))
      
      // Fazer login automático
      const userData = {
        id: newUser.id,
        username: newUser.username,
        createdAt: newUser.createdAt
      }
      
      setUser(userData)
      Cookies.set('anonymous_user', JSON.stringify(userData), { expires: 7 })
      
      return true
    } catch (error) {
      console.error('Erro no registro:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    Cookies.remove('anonymous_user')
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
