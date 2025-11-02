-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT DEFAULT 'Pr. Otávio Amorim',
  category TEXT NOT NULL,
  image_url TEXT,
  read_time TEXT DEFAULT '5 min',
  featured INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Create index on featured posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Insert initial blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, category, image_url, read_time, featured) VALUES
(
  'A Casa de Oração Para Todas as Nações',
  'casa-de-oracao-para-todas-nacoes',
  'Deus está chamando Seu povo para uma vida de oração profunda e transformadora. Descubra o que significa ser uma casa de oração.',
  '<p>A visão de uma casa de oração para todas as nações não é nova - ela está enraizada profundamente nas Escrituras e no coração de Deus desde o princípio.</p><h3>O Chamado de Isaías</h3><p>Em Isaías 56:7, Deus declara: "Pois a minha casa será chamada casa de oração para todos os povos." Esta não era apenas uma promessa para Israel, mas uma declaração profética sobre o propósito eterno do povo de Deus.</p><h3>Jesus Restaura a Visão</h3><p>Quando Jesus entrou no templo e expulsou os cambistas, Ele citou esta mesma passagem de Isaías. Ele estava restaurando não apenas o espaço físico, mas a visão espiritual do que a casa de Deus deveria ser.</p><blockquote>"A minha casa será chamada casa de oração, mas vós a tendes convertido em covil de salteadores." - Mateus 21:13</blockquote><h3>Uma Casa Para Todas as Nações</h3><p>Na HPC Atlanta, abraçamos esta visão bíblica. Não somos apenas uma igreja brasileira em Atlanta - somos uma casa de oração que acolhe todas as nações, todas as culturas, todos os povos.</p><p><em>Pastor Otávio Amorim</em></p>',
  'Mensagens',
  'https://page.gensparksite.com/v1/base64_upload/b962530fc486ec44113a0438919408aa',
  '5 min',
  1
),
(
  'O Poder da Adoração Autêntica',
  'poder-da-adoracao-autentica',
  'A verdadeira adoração transcende músicas e rituais. É um estilo de vida que transforma nosso coração e nossa comunidade.',
  '<p>Vivemos em uma era onde adoração frequentemente é confundida com entretenimento religioso. Mas Deus está chamando Seu povo de volta ao fundamento da adoração autêntica.</p><h3>O Que é Adoração Verdadeira?</h3><p>Jesus disse à mulher samaritana: "Deus é Espírito, e é necessário que os seus adoradores o adorem em espírito e em verdade" (João 4:24).</p><p>Adoração em espírito significa que vem do nosso interior mais profundo, não apenas de nossos lábios. Adoração em verdade significa que alinha com quem Deus realmente é, não com quem imaginamos que Ele seja.</p><p><em>Pastor Otávio Amorim</em></p>',
  'Adoração',
  'https://page.gensparksite.com/v1/base64_upload/b49314cd2e986919e25794a9b6e028fc',
  '4 min',
  1
),
(
  'Batismo: Declaração Pública de Fé',
  'batismo-declaracao-publica-fe',
  'O batismo é mais que ritual religioso - é poderosa declaração de transformação e compromisso com Cristo.',
  '<p>O batismo é um dos momentos mais significativos na jornada de um cristão. Não é mera tradição religiosa, mas comando claro de Jesus e símbolo poderoso de nossa nova vida Nele.</p><h3>O Mandamento de Jesus</h3><p>Antes de ascender aos céus, Jesus deixou instrução clara: "Portanto, ide e fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo" (Mateus 28:19).</p><p><em>Pastor Otávio Amorim</em></p>',
  'Batismo',
  'https://page.gensparksite.com/v1/base64_upload/ae40562804a7da5523cd995eb819d9b5',
  '6 min',
  0
);
