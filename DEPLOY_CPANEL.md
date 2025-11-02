# 🚀 Deploy HPC Atlanta para cPanel - Guia Completo

**Última Atualização:** 2025-11-02  
**Status:** ⚠️ ATENÇÃO - Cloudflare Workers NÃO funciona em cPanel tradicional

---

## ⚠️ IMPORTANTE - Leia Antes de Prosseguir

### 🚫 Limitação Crítica do cPanel

Este projeto foi desenvolvido com **Cloudflare Workers/Pages** e **NÃO funcionará** diretamente no cPanel tradicional porque:

1. **Cloudflare Workers Runtime** - O código usa Cloudflare Workers API que não existe no Node.js tradicional
2. **Cloudflare D1 Database** - Banco de dados específico da Cloudflare, não funciona fora da plataforma
3. **Edge Runtime** - Arquitetura serverless que não existe em hospedagem compartilhada

### ✅ Opções Viáveis

#### Opção 1: Deploy no Cloudflare Pages (RECOMENDADO)
**Vantagens:**
- ✅ Funciona 100% sem modificações
- ✅ Gratuito (free tier generoso)
- ✅ Performance global (CDN edge)
- ✅ HTTPS automático
- ✅ Deploy automático via Git
- ✅ Banco de dados D1 incluído

**Como fazer:**
1. Setup Cloudflare API key
2. Deploy com `npx wrangler pages deploy dist --project-name webapp`
3. Pronto! URL: `https://webapp.pages.dev`

---

#### Opção 2: Converter para Node.js + cPanel (REQUER MODIFICAÇÕES)
**Modificações necessárias:**

1. **Substituir Cloudflare D1 por MySQL/PostgreSQL**
   - cPanel geralmente oferece MySQL
   - Reescrever queries SQL para MySQL syntax
   - Configurar conexão com banco via credenciais cPanel

2. **Substituir Hono por Express.js**
   - Express é mais compatível com Node.js tradicional
   - Adaptar rotas e middleware

3. **Configurar Node.js no cPanel**
   - Verificar se cPanel tem suporte a Node.js
   - Configurar aplicação Node.js via cPanel
   - Configurar variáveis de ambiente

**Tempo estimado:** 4-8 horas de retrabalho

---

#### Opção 3: Frontend Estático + Backend em Cloudflare
**Arquitetura híbrida:**

1. **Frontend no cPanel** (HTML/CSS/JS estáticos)
   - Homepage, páginas públicas
   - Servido como arquivos estáticos

2. **Backend em Cloudflare Workers** (API + Admin)
   - Blog API (CRUD posts)
   - Autenticação
   - Admin panel
   - Banco de dados D1

**Configuração:**
- Frontend chama API Cloudflare via CORS
- URL da API: `https://api-webapp.pages.dev`
- cPanel serve apenas arquivos estáticos

---

## 📋 Se Escolher Opção 1: Deploy Cloudflare Pages

### Passo 1: Setup GitHub
```bash
cd /home/user/webapp

# Inicializar git (se ainda não estiver)
git init
git add .
git commit -m "Initial commit"

# Setup GitHub authentication
# Call: setup_github_environment

# Push para GitHub
git remote add origin https://github.com/SEU_USUARIO/hpc-atlanta.git
git push -u origin main
```

### Passo 2: Setup Cloudflare
```bash
# Call: setup_cloudflare_api_key

# Verificar autenticação
npx wrangler whoami

# Criar projeto Cloudflare Pages
npx wrangler pages project create webapp --production-branch main

# Deploy
npm run build
npx wrangler pages deploy dist --project-name webapp
```

### Passo 3: Domínio Personalizado (Opcional)
```bash
# Adicionar domínio personalizado
npx wrangler pages domain add hpcatlanta.com --project-name webapp
```

**URLs resultantes:**
- Production: `https://webapp.pages.dev`
- Custom domain: `https://hpcatlanta.com` (se configurado)

---

## 📋 Se Escolher Opção 2: Converter para cPanel + Node.js

### Arquivo 1: Criar package.json para Node.js
```json
{
  "name": "hpc-atlanta",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.0",
    "jsonwebtoken": "^9.0.2",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5"
  }
}
```

### Arquivo 2: Criar server.js para Express
```javascript
import express from 'express';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MySQL Connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'pastor' && password === 'HPC@2025!') {
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, error: 'Credenciais inválidas' });
  }
});

// Blog Posts Routes
app.get('/api/posts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
    res.json({ success: true, posts: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { title, excerpt, content, category, image_url, read_time, featured } = req.body;
    
    // Generate slug
    const slug = title.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    const [result] = await pool.query(
      'INSERT INTO blog_posts (title, slug, excerpt, content, category, image_url, read_time, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, slug, excerpt, content, category, image_url, read_time, featured ? 1 : 0]
    );
    
    res.json({ success: true, post: { id: result.insertId, slug } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Arquivo 3: Criar .env para cPanel
```env
# Database (configurar com credenciais do cPanel)
DB_HOST=localhost
DB_USER=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql
DB_NAME=seu_banco_mysql

# JWT Secret
JWT_SECRET=hpc-atlanta-blog-secret-key-2025

# Port
PORT=3000
```

### Arquivo 4: MySQL Schema
```sql
-- Executar no phpMyAdmin do cPanel

CREATE TABLE IF NOT EXISTS blog_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  author VARCHAR(100) DEFAULT 'Pr. Otávio Amorim',
  category VARCHAR(50) NOT NULL,
  image_url TEXT,
  read_time VARCHAR(20) DEFAULT '5 min',
  featured TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Insert initial posts
INSERT INTO blog_posts (title, slug, excerpt, content, category, image_url, read_time, featured) VALUES
('A Casa de Oração Para Todas as Nações', 'casa-de-oracao-para-todas-nacoes', 'Deus está chamando Seu povo para uma vida de oração profunda e transformadora.', '<p>Conteúdo completo...</p>', 'Mensagens', 'https://example.com/image.jpg', '5 min', 1);
```

### Passo a Passo no cPanel:

1. **Upload dos arquivos**
   - Fazer upload via FTP ou File Manager do cPanel
   - Pasta: `public_html/` ou `public_html/hpc-atlanta/`

2. **Configurar Node.js no cPanel**
   - Acessar "Setup Node.js App" no cPanel
   - Application root: `/home/usuario/public_html/hpc-atlanta`
   - Application URL: `hpcatlanta.com`
   - Application startup file: `server.js`
   - Node.js version: 18.x ou superior

3. **Criar banco de dados MySQL**
   - Acessar "MySQL Databases" no cPanel
   - Criar banco: `hpc_atlanta`
   - Criar usuário e senha
   - Associar usuário ao banco
   - Importar SQL schema via phpMyAdmin

4. **Configurar variáveis de ambiente**
   - No painel Node.js App do cPanel
   - Adicionar variáveis do arquivo `.env`

5. **Instalar dependências**
   ```bash
   # Via SSH do cPanel
   cd ~/public_html/hpc-atlanta
   npm install
   ```

6. **Iniciar aplicação**
   - Clicar em "Start" no painel Node.js App
   - Verificar logs para erros

---

## 📋 Se Escolher Opção 3: Frontend Estático no cPanel

### Arquivos para Upload no cPanel:

1. **Estrutura de pastas:**
```
public_html/
├── index.html (homepage)
├── admin/
│   ├── index.html (login page)
│   ├── dashboard.html
│   └── posts/
│       └── new.html
├── blog/
│   └── index.html (listing)
├── css/
│   └── style.css
└── js/
    └── app.js
```

2. **Atualizar URLs da API no JavaScript:**
```javascript
// Em vez de rotas relativas
const API_URL = 'https://api-webapp.pages.dev';

// Todas as chamadas fetch
fetch(`${API_URL}/api/posts`)
fetch(`${API_URL}/api/auth/login`)
```

3. **Deploy API no Cloudflare:**
```bash
# Deploy apenas o backend
npx wrangler pages deploy dist --project-name api-webapp
```

4. **Upload Frontend no cPanel:**
- Via FTP ou File Manager
- Copiar arquivos HTML/CSS/JS estáticos
- Configurar domínio no cPanel

---

## 📦 Pacote para GitHub

Independente da opção escolhida, vamos preparar o GitHub:

```bash
cd /home/user/webapp

# Garantir que .gitignore está correto
cat .gitignore

# Adicionar tudo e commitar
git add .
git commit -m "Preparar projeto para deploy em produção"

# Setup GitHub (se ainda não fez)
# Call: setup_github_environment

# Criar repositório e push
git remote add origin https://github.com/SEU_USUARIO/hpc-atlanta.git
git branch -M main
git push -u origin main
```

---

## 🎯 Recomendação Final

**Para o projeto HPC Atlanta, recomendo FORTEMENTE a Opção 1 (Cloudflare Pages):**

### ✅ Prós:
- Zero modificações no código
- Gratuito e performático
- HTTPS automático
- Deploy em 5 minutos
- Escalável globalmente
- Banco de dados incluído

### ❌ Contras do cPanel:
- Requer reescrita completa do backend
- Dependente de MySQL em vez de D1
- Performance limitada (servidor único)
- Custo mensal de hospedagem
- Configuração mais complexa

---

## 📞 Próximos Passos

**Me diga qual opção você prefere:**

1. **Deploy no Cloudflare Pages** (recomendado, 5 minutos)
2. **Converter para Node.js + MySQL + cPanel** (4-8 horas)
3. **Híbrido: Frontend cPanel + API Cloudflare** (1-2 horas)

Após sua escolha, vou guiar você passo a passo no processo!

---

**Criado em:** 2025-11-02  
**Versão:** 1.0
