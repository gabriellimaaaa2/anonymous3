import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Eye, 
  ArrowLeft, 
  CreditCard, 
  Shield, 
  CheckCircle,
  User,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react'

const PaymentPage = () => {
  const { messageId } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [revealedInfo, setRevealedInfo] = useState(null)
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: ''
  })

  useEffect(() => {
    loadMessage()
  }, [messageId])

  const loadMessage = async () => {
    try {
      // Simular carregamento da mensagem
      setTimeout(() => {
        setMessage({
          id: messageId,
          content: "Oi! Você é muito legal, queria te conhecer melhor 😊",
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          revealed: false
        })
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Erro ao carregar mensagem:', error)
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target
    
    // Formatação automática para campos específicos
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
      value = value.substring(0, 19) // Limitar a 16 dígitos + espaços
    } else if (name === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2')
      value = value.substring(0, 5) // MM/YY
    } else if (name === 'cvv') {
      value = value.replace(/\D/g, '').substring(0, 4)
    }
    
    setPaymentData({
      ...paymentData,
      [name]: value
    })
  }

  const generateRandomSender = () => {
    const maleNames = [
      'João Silva', 'Pedro Santos', 'Carlos Oliveira', 'Rafael Costa', 'Lucas Ferreira',
      'Gabriel Almeida', 'Bruno Rodrigues', 'Mateus Lima', 'André Souza', 'Felipe Martins'
    ]
    
    const femaleNames = [
      'Maria Silva', 'Ana Santos', 'Juliana Oliveira', 'Camila Costa', 'Larissa Ferreira',
      'Beatriz Almeida', 'Fernanda Rodrigues', 'Gabriela Lima', 'Carolina Souza', 'Amanda Martins'
    ]
    
    const cities = [
      { city: 'Fortaleza', state: 'CE' },
      { city: 'Recife', state: 'PE' },
      { city: 'Salvador', state: 'BA' },
      { city: 'Teresina', state: 'PI' },
      { city: 'São Luís', state: 'MA' },
      { city: 'Maceió', state: 'AL' },
      { city: 'Aracaju', state: 'SE' },
      { city: 'João Pessoa', state: 'PB' },
      { city: 'Natal', state: 'RN' }
    ]
    
    const allNames = [...maleNames, ...femaleNames]
    const randomName = allNames[Math.floor(Math.random() * allNames.length)]
    const randomLocation = cities[Math.floor(Math.random() * cities.length)]
    
    return {
      name: randomName,
      city: randomLocation.city,
      state: randomLocation.state
    }
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setProcessing(true)
    
    try {
      // Simular processamento do pagamento
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Gerar informações aleatórias do remetente
      const senderInfo = generateRandomSender()
      setRevealedInfo(senderInfo)
      setPaymentSuccess(true)
      
    } catch (error) {
      console.error('Erro no pagamento:', error)
      alert('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setProcessing(false)
    }
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
          <p className="text-gray-300">Carregando mensagem...</p>
        </div>
      </div>
    )
  }

  if (paymentSuccess && revealedInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
        <div className="max-w-2xl mx-auto">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao dashboard
          </Link>

          <Card className="bg-gray-900/80 border-green-500/30 backdrop-blur-sm mb-6">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">Pagamento Confirmado!</h2>
              <p className="text-gray-300 mb-6">
                A identidade do remetente foi revelada com sucesso.
              </p>
            </CardContent>
          </Card>

          {/* Mensagem Original */}
          <Card className="bg-gray-900/80 border-gray-600 mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Mensagem Original</CardTitle>
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatTime(message.createdAt)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white text-lg leading-relaxed mb-4">
                "{message.content}"
              </p>
            </CardContent>
          </Card>

          {/* Informações Reveladas */}
          <Card className="bg-gradient-to-r from-green-900/50 to-green-800/50 border-green-500/50">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Remetente Revelado
              </CardTitle>
              <CardDescription className="text-green-200">
                Informações do usuário que enviou esta mensagem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-green-900/30 rounded-lg border border-green-500/30">
                  <User className="w-6 h-6 text-green-400 mr-3" />
                  <div>
                    <p className="text-sm text-green-200">Nome</p>
                    <p className="text-lg font-semibold text-white">{revealedInfo.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-green-900/30 rounded-lg border border-green-500/30">
                  <MapPin className="w-6 h-6 text-green-400 mr-3" />
                  <div>
                    <p className="text-sm text-green-200">Localização</p>
                    <p className="text-lg font-semibold text-white">
                      {revealedInfo.city} - {revealedInfo.state}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <div className="flex items-center text-yellow-400 mb-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span className="font-semibold">Informação Importante</span>
                </div>
                <p className="text-yellow-200 text-sm">
                  Estas informações são geradas aleatoriamente para preservar a privacidade real dos usuários, 
                  mas representam dados plausíveis da região Nordeste do Brasil.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Link to="/dashboard">
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold px-8 py-3">
                Ver Todas as Mensagens
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-2xl mx-auto">
        <Link 
          to="/dashboard" 
          className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao dashboard
        </Link>

        {/* Mensagem a ser revelada */}
        <Card className="bg-gray-900/80 border-gray-600 mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Mensagem Anônima</CardTitle>
              <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                <Eye className="w-3 h-3 mr-1" />
                Não revelado
              </Badge>
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {formatTime(message.createdAt)}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-white text-lg leading-relaxed mb-4">
              "{message.content}"
            </p>
            <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg">
              <div className="flex items-center text-yellow-400 mb-2">
                <Eye className="w-5 h-5 mr-2" />
                <span className="font-semibold">Descubra quem mandou essa mensagem!</span>
              </div>
              <p className="text-yellow-200">
                Por apenas <strong>R$ 5,00</strong>, você pode revelar a identidade de quem enviou esta mensagem.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Formulário de Pagamento */}
        <Card className="bg-gray-900/80 border-yellow-400/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Pagamento Seguro - R$ 5,00
            </CardTitle>
            <CardDescription className="text-gray-300">
              Preencha os dados do cartão para revelar a identidade do remetente
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handlePayment} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="name" className="text-gray-300">Nome no cartão</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={paymentData.name}
                    onChange={handleInputChange}
                    placeholder="Nome completo"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="cardNumber" className="text-gray-300">Número do cartão</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    value={paymentData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="expiryDate" className="text-gray-300">Validade</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="text"
                    value={paymentData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/AA"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="cvv" className="text-gray-300">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    type="text"
                    value={paymentData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="email" className="text-gray-300">E-mail para recibo</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={paymentData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
                    required
                  />
                </div>
              </div>

              {/* Resumo do Pagamento */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Revelação de identidade</span>
                  <span className="text-white font-semibold">R$ 5,00</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-yellow-400">Total</span>
                  <span className="text-yellow-400">R$ 5,00</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={processing}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-4 text-lg"
              >
                {processing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                    Processando pagamento...
                  </div>
                ) : (
                  <>
                    <Eye className="w-5 h-5 mr-2" />
                    REVELAR IDENTIDADE - R$ 5,00
                  </>
                )}
              </Button>
            </form>

            {/* Segurança */}
            <div className="mt-6 flex items-center justify-center text-sm text-gray-400">
              <Shield className="w-4 h-4 mr-2" />
              <span>Pagamento 100% seguro e criptografado</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PaymentPage
