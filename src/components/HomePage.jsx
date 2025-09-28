import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Eye, MessageCircle, Shield, Sparkles } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center p-4">
      {/* Logo e Título Principal */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="relative mb-6">
          <div className="w-32 h-32 mx-auto border-4 border-yellow-400 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl">
            <span className="text-4xl font-bold text-black">ANM</span>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-black" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          ANONYMOUS
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-2">
          MANDE UMA MENSAGEM
        </p>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          ANÔNIMA
        </p>
        
        <div className="flex items-center justify-center mb-8">
          <Shield className="w-6 h-6 text-yellow-400 mr-2" />
          <span className="text-lg text-gray-300">MENSAGENS 100% SECRETAS!</span>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Link to="/register">
          <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            <MessageCircle className="w-5 h-5 mr-2" />
            CRIAR CONTA
          </Button>
        </Link>
        
        <Link to="/login">
          <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
            <Eye className="w-5 h-5 mr-2" />
            ENTRAR
          </Button>
        </Link>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
        <div className="bg-gray-900/50 p-6 rounded-2xl border border-yellow-400/20 backdrop-blur-sm">
          <MessageCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-yellow-400 mb-2">Mensagens Anônimas</h3>
          <p className="text-gray-300">Receba mensagens secretas de qualquer pessoa</p>
        </div>
        
        <div className="bg-gray-900/50 p-6 rounded-2xl border border-yellow-400/20 backdrop-blur-sm">
          <Eye className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-yellow-400 mb-2">Descubra o Remetente</h3>
          <p className="text-gray-300">Pague apenas R$ 5,00 para revelar quem enviou</p>
        </div>
        
        <div className="bg-gray-900/50 p-6 rounded-2xl border border-yellow-400/20 backdrop-blur-sm">
          <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-yellow-400 mb-2">100% Seguro</h3>
          <p className="text-gray-300">Suas informações estão protegidas</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center text-gray-500">
        <p>&copy; 2024 ANONYMOUS. Todos os direitos reservados.</p>
      </div>
    </div>
  )
}

export default HomePage
