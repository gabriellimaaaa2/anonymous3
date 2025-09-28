# ANONYMOUS - Mensagens Anônimas

Uma aplicação web moderna para envio e recebimento de mensagens anônimas com sistema de monetização integrado.

## 🚀 Características

- **Interface Moderna**: Design responsivo com tema preto e dourado
- **Mensagens Anônimas**: Sistema completo de envio e recebimento
- **Monetização**: Pagamento de R$ 5,00 para revelar identidade do remetente
- **Integração Instagram**: Botões para compartilhar no Instagram
- **Autenticação Segura**: Sistema de login e registro
- **Responsivo**: Otimizado para dispositivos móveis

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Roteamento**: React Router DOM
- **Ícones**: Lucide React
- **Autenticação**: Cookies + LocalStorage
- **Animações**: CSS personalizado + Framer Motion

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou pnpm

### Passos para instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/anonymous.git
cd anonymous
```

2. **Instale as dependências**
```bash
pnpm install
# ou
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

4. **Edite o arquivo .env com suas credenciais**

5. **Execute a aplicação**
```bash
pnpm run dev
# ou
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## ⚙️ Configuração

### Variáveis de Ambiente

Edite o arquivo `.env` com suas credenciais:

```env
# Supabase (Banco de Dados)
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima

# Stripe (Pagamentos)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_sua_chave_publica

# Configuração da App
VITE_APP_BASE_URL=https://seudominio.com
```

### Como obter as credenciais:

#### Supabase (Banco de Dados)
1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Vá em Settings > API
5. Copie a URL e a chave anônima

#### Stripe (Pagamentos)
1. Acesse [stripe.com](https://stripe.com)
2. Crie uma conta
3. Vá no Dashboard > Developers > API keys
4. Copie a chave pública (Publishable key)

## 🚀 Deploy

### GitHub Pages (Frontend)

1. **Faça o build da aplicação**
```bash
pnpm run build
```

2. **Suba os arquivos para o GitHub**
```bash
git add .
git commit -m "Deploy inicial"
git push origin main
```

3. **Configure o GitHub Pages**
- Vá em Settings > Pages
- Selecione a branch `main`
- A aplicação estará disponível em `https://seu-usuario.github.io/anonymous`

### Outras opções de deploy

- **Vercel**: Conecte seu repositório GitHub
- **Netlify**: Arraste a pasta `dist` após o build
- **Firebase Hosting**: Use o Firebase CLI

## 📱 Funcionalidades

### Para Usuários

1. **Registro/Login**: Crie uma conta com username e senha
2. **Dashboard**: Visualize mensagens recebidas
3. **Link Personalizado**: Compartilhe seu link para receber mensagens
4. **Revelação de Identidade**: Pague R$ 5,00 para descobrir quem enviou
5. **Integração Instagram**: Compartilhe diretamente no Instagram

### Para Remetentes

1. **Envio Anônimo**: Envie mensagens sem revelar identidade
2. **Interface Simples**: Design otimizado para mobile
3. **Call-to-Action**: Convite para criar conta própria

## 🎨 Design

- **Cores Principais**: Preto (#000000) e Dourado (#fbbf24)
- **Tipografia**: Inter (sistema)
- **Ícones**: Lucide React
- **Animações**: Transições suaves e micro-interações
- **Responsividade**: Mobile-first design

## 🔒 Segurança

- Senhas não são expostas no frontend
- Cookies seguros para autenticação
- Validação de dados no cliente
- HTTPS obrigatório em produção

## 📊 Monetização

- **Preço Fixo**: R$ 5,00 por revelação
- **Pagamento**: Integração com Stripe
- **Informações Geradas**: Nomes e cidades aleatórias do Nordeste
- **Conversão**: Interface otimizada para vendas

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte e dúvidas:

- **Email**: suporte@anonymous.com
- **Instagram**: @anonymous_app
- **Issues**: Use o sistema de issues do GitHub

## 🎯 Roadmap

- [ ] Sistema de notificações push
- [ ] Integração com WhatsApp
- [ ] Modo escuro/claro
- [ ] Sistema de badges e conquistas
- [ ] API pública para desenvolvedores
- [ ] App mobile nativo

---

**Desenvolvido com ❤️ para conectar pessoas de forma anônima e segura.**
