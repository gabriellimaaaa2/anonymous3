import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UserPlus, ArrowLeft, Eye, EyeOff, Check, X } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const validateForm = () => {
    if (formData.username.length < 3) {
      setError('Nome de usuário deve ter pelo menos 3 caracteres')
      return false
    }
    
    if (formData.password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres')
      return false
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    setError('')

    try {
      const success = await register(formData.username, formData.password)
      if (success) {
        navigate('/dashboard')
      }
    } catch (err) {
      if (err.message.includes('já existe')) {
        setError('Este nome já está em uso, tente outro')
      } else {
        setError('Erro ao criar conta. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  const passwordMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Botão Voltar */}
        <Link 
          to="/" 
          className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto border-3 border-yellow-400 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-xl mb-4">
            <span className="text-2xl font-bold text-black">ANM</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            CRIAR CONTA
          </h1>
        </div>

        <Card className="bg-gray-900/80 border-yellow-400/30 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-yellow-400">Junte-se ao ANONYMOUS</CardTitle>
            <CardDescription className="text-gray-300">
              Crie sua conta e comece a receber mensagens anônimas
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-gray-300">Nome de usuário</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Escolha um nome único"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
                  required
                />
                {formData.username.length > 0 && (
                  <div className="flex items-center mt-1 text-sm">
                    {formData.username.length >= 3 ? (
                      <><Check className="w-4 h-4 text-green-500 mr-1" /> Nome válido</>
                    ) : (
                      <><X className="w-4 h-4 text-red-500 mr-1" /> Mínimo 3 caracteres</>
                    )}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-300">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Crie uma senha segura"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formData.password.length > 0 && (
                  <div className="flex items-center mt-1 text-sm">
                    {formData.password.length >= 6 ? (
                      <><Check className="w-4 h-4 text-green-500 mr-1" /> Senha válida</>
                    ) : (
                      <><X className="w-4 h-4 text-red-500 mr-1" /> Mínimo 6 caracteres</>
                    )}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-gray-300">Repetir senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirme sua senha"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formData.confirmPassword.length > 0 && (
                  <div className="flex items-center mt-1 text-sm">
                    {passwordMatch ? (
                      <><Check className="w-4 h-4 text-green-500 mr-1" /> Senhas coincidem</>
                    ) : (
                      <><X className="w-4 h-4 text-red-500 mr-1" /> Senhas não coincidem</>
                    )}
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 rounded-lg transition-all duration-300"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                    Criando conta...
                  </div>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    CRIAR CONTA
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                  Entrar
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RegisterPage
