import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Send, 
  ArrowLeft, 
  MessageCircle, 
  Shield, 
  UserPlus,
  CheckCircle,
  Sparkles
} from 'lucide-react'

const MessagePage = () => {
  const { username } = useParams()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [userExists, setUserExists] = useState(true)

  useEffect(() => {
    // Verificar se o usuário existe
    checkUserExists()
  }, [username])

  const checkUserExists = async () => {
    try {
      // Simular verificação de usuário
      // Em produção, fazer uma chamada para a API
      setUserExists(true)
    } catch (error) {
      setUserExists(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!message.trim()) return
    
    setLoading(true)
    
    try {
      // Simular envio da mensagem
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSent(true)
      setMessage('')
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!userExists) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <Card className="bg-gray-900/80 border-red-500/30 backdrop-blur-sm max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-red-400 mb-2">Usuário não encontrado</h2>
            <p className="text-gray-300 mb-6">
              O usuário @{username} não existe ou foi removido.
            </p>
            <Link to="/">
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-black">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao início
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <Card className="bg-gray-900/80 border-green-500/30 backdrop-blur-sm max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-green-400 mb-2">Mensagem Enviada!</h2>
            <p className="text-gray-300 mb-6">
              Sua mensagem anônima foi enviada para @{username} com sucesso!
            </p>
            
            <div className="space-y-3">
              <Button
                onClick={() => {
                  setSent(false)
                  setMessage('')
                }}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-black"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar outra mensagem
              </Button>
              
              <Link to="/register">
                <Button
                  variant="outline"
                  className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Criar minha conta também
                </Button>
              </Link>
              
              <Link to="/">
                <Button variant="ghost" className="w-full text-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao início
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>
          
          <div className="w-20 h-20 mx-auto border-3 border-yellow-400 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-xl mb-4">
            <span className="text-2xl font-bold text-black">ANM</span>
          </div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
            Enviar Mensagem Anônima
          </h1>
          
          <p className="text-gray-300 text-lg">
            para <span className="text-yellow-400 font-semibold">@{username}</span>
          </p>
        </div>

        {/* Formulário de Mensagem */}
        <Card className="bg-gray-900/80 border-yellow-400/30 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Sua Mensagem Secreta
            </CardTitle>
            <CardDescription className="text-gray-300">
              Escreva sua mensagem anônima. O destinatário não saberá quem enviou!
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem anônima aqui..."
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 min-h-32 resize-none"
                  maxLength={500}
                  required
                />
                <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                  <span>Máximo 500 caracteres</span>
                  <span>{message.length}/500</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || !message.trim()}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-4 text-lg"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                    Enviando...
                  </div>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    ENVIAR MENSAGEM ANÔNIMA
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recursos de Segurança */}
        <Card className="bg-gray-900/50 border-gray-600 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-lg font-semibold text-green-400">100% Anônimo e Seguro</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>Sua identidade permanece completamente oculta</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>Nenhuma informação pessoal é coletada</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>Mensagens são criptografadas</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>Sistema seguro e confiável</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border-yellow-400/30">
          <CardContent className="p-6 text-center">
            <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-yellow-400 mb-2">
              Quer receber mensagens também?
            </h3>
            <p className="text-gray-300 mb-4">
              Crie sua conta gratuita e comece a receber mensagens anônimas!
            </p>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold">
                <UserPlus className="w-4 h-4 mr-2" />
                CRIAR MINHA CONTA GRÁTIS
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MessagePage
