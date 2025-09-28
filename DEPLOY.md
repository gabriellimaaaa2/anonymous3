# 🚀 Guia de Deploy - ANONYMOUS

Este guia contém instruções detalhadas para fazer o deploy da aplicação ANONYMOUS.

## 📋 Pré-requisitos

- Conta no GitHub
- Node.js 18+ instalado
- Credenciais do Supabase e Stripe

## 🔧 Configuração Inicial

### 1. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais reais:

```env
# Supabase
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_aqui

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_sua_chave_publica_aqui

# Domínio da aplicação
VITE_APP_BASE_URL=https://seudominio.com
```

### 2. Testar Localmente

```bash
# Instalar dependências
pnpm install

# Executar em desenvolvimento
pnpm run dev

# Fazer build para produção
pnpm run build
```

## 🌐 Deploy no GitHub Pages

### Opção 1: Deploy Manual

1. **Fazer build da aplicação:**
```bash
pnpm run build
```

2. **Criar repositório no GitHub:**
- Vá para github.com
- Clique em "New repository"
- Nome: `anonymous-app` (ou outro nome)
- Marque como público
- Clique em "Create repository"

3. **Subir arquivos:**
```bash
git init
git add .
git commit -m "Deploy inicial do ANONYMOUS"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/anonymous-app.git
git push -u origin main
```

4. **Configurar GitHub Pages:**
- Vá em Settings > Pages
- Source: Deploy from a branch
- Branch: main / root
- Clique em Save

### Opção 2: Deploy Automático com GitHub Actions

1. **Criar arquivo `.github/workflows/deploy.yml`:**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8
        
    - name: Install dependencies
      run: pnpm install
      
    - name: Build
      run: pnpm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        VITE_STRIPE_PUBLISHABLE_KEY: ${{ secrets.VITE_STRIPE_PUBLISHABLE_KEY }}
        VITE_APP_BASE_URL: ${{ secrets.VITE_APP_BASE_URL }}
        
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

2. **Configurar Secrets no GitHub:**
- Vá em Settings > Secrets and variables > Actions
- Adicione cada variável de ambiente como secret

## 🔥 Deploy no Vercel

1. **Instalar Vercel CLI:**
```bash
npm i -g vercel
```

2. **Fazer login:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel --prod
```

4. **Configurar variáveis de ambiente:**
- Vá no dashboard do Vercel
- Selecione seu projeto
- Settings > Environment Variables
- Adicione todas as variáveis do arquivo `.env`

## 🌍 Deploy no Netlify

### Opção 1: Drag & Drop

1. Faça o build: `pnpm run build`
2. Vá para netlify.com
3. Arraste a pasta `dist` para o deploy

### Opção 2: Git Integration

1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. Build command: `pnpm run build`
4. Publish directory: `dist`

## 🔧 Configurações Importantes

### Redirecionamentos (para SPA)

Crie um arquivo `public/_redirects`:
```
/*    /index.html   200
```

### Domínio Personalizado

1. **No GitHub Pages:**
- Settings > Pages > Custom domain
- Adicione seu domínio
- Aguarde verificação DNS

2. **No Vercel/Netlify:**
- Dashboard > Domain settings
- Adicione seu domínio
- Configure DNS conforme instruções

### SSL/HTTPS

- GitHub Pages: Automático
- Vercel: Automático
- Netlify: Automático

## 📊 Monitoramento

### Analytics (Opcional)

Adicione Google Analytics ou similar:

```javascript
// Em src/main.jsx
import { analytics } from './lib/analytics'

// Configurar tracking
analytics.page()
```

### Error Tracking (Opcional)

Configure Sentry ou similar para monitorar erros em produção.

## 🔒 Segurança

### Variáveis de Ambiente

- ✅ Use `VITE_` para variáveis públicas
- ❌ Nunca exponha chaves secretas no frontend
- ✅ Configure CORS no Supabase
- ✅ Use HTTPS em produção

### Headers de Segurança

Configure headers no seu provedor:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## 📱 PWA (Opcional)

Para transformar em PWA, adicione:

1. **Manifest.json**
2. **Service Worker**
3. **Ícones de diferentes tamanhos**

## 🚨 Troubleshooting

### Problemas Comuns

1. **Build falha:**
   - Verifique se todas as dependências estão instaladas
   - Confirme que as variáveis de ambiente estão corretas

2. **Roteamento não funciona:**
   - Configure redirecionamentos para SPA
   - Adicione arquivo `_redirects` ou configuração no servidor

3. **Imagens não carregam:**
   - Verifique se estão na pasta `public` ou `src/assets`
   - Confirme os imports das imagens

4. **API não funciona:**
   - Verifique CORS no Supabase
   - Confirme URLs das APIs
   - Teste variáveis de ambiente

### Logs e Debug

- **Vercel:** `vercel logs`
- **Netlify:** Dashboard > Functions > Logs
- **GitHub Pages:** Actions tab para ver builds

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs de build
2. Teste localmente primeiro
3. Confirme todas as configurações
4. Consulte a documentação do provedor

---

**🎉 Parabéns! Sua aplicação ANONYMOUS está no ar!**

Lembre-se de:
- Testar todas as funcionalidades em produção
- Configurar monitoramento
- Fazer backup das configurações
- Documentar o processo para futuras atualizações
