import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MessageCircle, 
  Eye, 
  Copy, 
  LogOut, 
  Share, 
  Instagram,
  ExternalLink,
  Clock,
  User
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import linkImage from '../assets/LINK.jpg'
import responderImage from '../assets/RESPONDER.jpg'

const Dashboard = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [copySuccess, setCopySuccess] = useState('')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    
    loadMessages()
  }, [user, navigate])

  const loadMessages = async () => {
    try {
      // Simular carregamento de mensagens
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            content: "Oi! Você é muito legal, queria te conhecer melhor 😊",
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
            revealed: false,
            sender: null
          },
          {
            id: 2,
            content: "Admiro muito seu trabalho, continue assim!",
            createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
            revealed: true,
            sender: { name: "Maria Silva", city: "Fortaleza", state: "CE" }
          },
          {
            id: 3,
            content: "Você tem um sorriso lindo! 💕",
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
            revealed: false,
            sender: null
          }
        ])
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error)
      setLoading(false)
    }
  }

  const copyLink = async () => {
    const link = `${window.location.origin}/message/${user.username}`
    try {
      await navigator.clipboard.writeText(link)
      setCopySuccess('Link copiado!')
      setTimeout(() => setCopySuccess(''), 2000)
    } catch (err) {
      setCopySuccess('Erro ao copiar')
    }
  }

  const shareToInstagram = (type = 'link') => {
    const text = type === 'link' 
      ? `Mande uma mensagem anônima para mim! 🕵️‍♂️\n\n${window.location.origin}/message/${user.username}\n\n#anonymous #mensagemanônima`
      : `Obrigado pela mensagem! Quer saber quem foi? 👀\n\n${window.location.origin}/message/${user.username}\n\n#anonymous #mensagemanônima`
    
    const imageUrl = type === 'link' ? linkImage : responderImage
    
    // Criar um link que abre o Instagram com o texto
    const instagramUrl = `https://www.instagram.com/`
    window.open(instagramUrl, '_blank')
    
    // Copiar texto para facilitar o post
    navigator.clipboard.writeText(text)
    alert('Texto copiado! Cole no seu post do Instagram.')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const formatTime = (date) => {
    const now = new Date()
    const diff = now - date
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days > 0) return `${days}d atrás`
    if (hours > 0) return `${hours}h atrás`
    return 'Agora mesmo'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Carregando suas mensagens...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Olá, {user?.username}!
            </h1>
            <p className="text-gray-400">Suas mensagens anônimas</p>
          </div>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Link de Compartilhamento */}
        <Card className="bg-gray-900/80 border-yellow-400/30 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center">
              <Share className="w-5 h-5 mr-2" />
              Seu Link Personalizado
            </CardTitle>
            <CardDescription className="text-gray-300">
              Compartilhe este link para receber mensagens anônimas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-gray-800 p-3 rounded-lg border border-gray-600">
                <code className="text-yellow-400 text-sm break-all">
                  {window.location.origin}/message/{user?.username}
                </code>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={copyLink}
                  className="bg-yellow-600 hover:bg-yellow-700 text-black"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copySuccess || 'Copiar'}
                </Button>
                
                <Button
                  onClick={() => shareToInstagram('link')}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gray-900/50 border-yellow-400/20">
            <CardContent className="p-4 text-center">
              <MessageCircle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{messages.length}</div>
              <div className="text-gray-400 text-sm">Mensagens Recebidas</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-yellow-400/20">
            <CardContent className="p-4 text-center">
              <Eye className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {messages.filter(m => m.revealed).length}
              </div>
              <div className="text-gray-400 text-sm">Identidades Reveladas</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-yellow-400/20">
            <CardContent className="p-4 text-center">
              <User className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {messages.filter(m => !m.revealed).length}
              </div>
              <div className="text-gray-400 text-sm">Mistérios Pendentes</div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Mensagens */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Suas Mensagens</h2>
            <Button
              onClick={() => shareToInstagram('response')}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
            >
              <Instagram className="w-4 h-4 mr-2" />
              Responder no Instagram
            </Button>
          </div>
          
          {messages.length === 0 ? (
            <Card className="bg-gray-900/50 border-gray-600">
              <CardContent className="p-8 text-center">
                <MessageCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  Nenhuma mensagem ainda
                </h3>
                <p className="text-gray-500 mb-4">
                  Compartilhe seu link para começar a receber mensagens anônimas!
                </p>
                <Button
                  onClick={copyLink}
                  className="bg-yellow-600 hover:bg-yellow-700 text-black"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Link
                </Button>
              </CardContent>
            </Card>
          ) : (
            messages.map((message) => (
              <Card key={message.id} className="bg-gray-900/80 border-gray-600 hover:border-yellow-400/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatTime(message.createdAt)}
                    </div>
                    
                    {message.revealed ? (
                      <Badge className="bg-green-600 text-white">
                        <Eye className="w-3 h-3 mr-1" />
                        Revelado
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Anônimo
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-white text-lg mb-4 leading-relaxed">
                    "{message.content}"
                  </p>
                  
                  {message.revealed && message.sender ? (
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-green-500/30">
                      <div className="flex items-center text-green-400 mb-2">
                        <User className="w-4 h-4 mr-2" />
                        <span className="font-semibold">Remetente Revelado</span>
                      </div>
                      <div className="text-white">
                        <p><strong>Nome:</strong> {message.sender.name}</p>
                        <p><strong>Cidade:</strong> {message.sender.city} - {message.sender.state}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div className="text-gray-400">
                        <p className="text-sm">Quer saber quem enviou esta mensagem?</p>
                      </div>
                      
                      <Link to={`/payment/${message.id}`}>
                        <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold">
                          <Eye className="w-4 h-4 mr-2" />
                          Descobrir por R$ 5,00
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
