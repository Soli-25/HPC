// Blog Posts Data for HPC Atlanta
// Pastor Otávio Amorim's Messages

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  readTime: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'A Casa de Oração Para Todas as Nações',
    slug: 'casa-de-oracao-para-todas-nacoes',
    excerpt: 'Deus está chamando Seu povo para uma vida de oração profunda e transformadora. Descubra o que significa ser uma casa de oração.',
    content: `
      <p>A visão de uma casa de oração para todas as nações não é nova - ela está enraizada profundamente nas Escrituras e no coração de Deus desde o princípio.</p>
      
      <h3>O Chamado de Isaías</h3>
      <p>Em Isaías 56:7, Deus declara: "Pois a minha casa será chamada casa de oração para todos os povos." Esta não era apenas uma promessa para Israel, mas uma declaração profética sobre o propósito eterno do povo de Deus.</p>
      
      <h3>Jesus Restaura a Visão</h3>
      <p>Quando Jesus entrou no templo e expulsou os cambistas, Ele citou esta mesma passagem de Isaías. Ele estava restaurando não apenas o espaço físico, mas a visão espiritual do que a casa de Deus deveria ser.</p>
      
      <blockquote>
        "A minha casa será chamada casa de oração, mas vós a tendes convertido em covil de salteadores." - Mateus 21:13
      </blockquote>
      
      <h3>Uma Casa Para Todas as Nações</h3>
      <p>Na HPC Atlanta, abraçamos esta visão bíblica. Não somos apenas uma igreja brasileira em Atlanta - somos uma casa de oração que acolhe todas as nações, todas as culturas, todos os povos.</p>
      
      <h3>O Que Isso Significa Praticamente?</h3>
      <ul>
        <li><strong>Prioridade na Oração:</strong> A oração não é apêndice de nossas atividades, mas o fundamento de tudo que fazemos.</li>
        <li><strong>Coração Missionário:</strong> Nosso olhar está voltado não apenas para nossa comunidade local, mas para o mundo inteiro.</li>
        <li><strong>Adoração Diversa:</strong> Celebramos a diversidade que Deus criou, reconhecendo que cada cultura traz expressão única de adoração.</li>
        <li><strong>Acolhimento Radical:</strong> Nenhuma pessoa está fora do alcance do amor de Deus ou da porta de nossa igreja.</li>
      </ul>
      
      <h3>Seu Papel Nesta Visão</h3>
      <p>Cada membro da HPC Atlanta é chamado a ser parte desta casa de oração. Não estamos construindo apenas uma congregação - estamos edificando um lugar espiritual onde céu e terra se encontram, onde nações são transformadas pela presença de Deus.</p>
      
      <h3>Desafio Para Esta Semana</h3>
      <p>Convido você a fazer desta sua oração pessoal: "Senhor, usa-me como pedra viva na construção de Tua casa de oração. Que minha vida seja altar de adoração e ponte para as nações."</p>
      
      <p><em>Pastor Otávio Amorim</em></p>
    `,
    author: 'Pr. Otávio Amorim',
    date: '2025-01-15',
    category: 'Mensagens',
    imageUrl: 'https://page.gensparksite.com/v1/base64_upload/b962530fc486ec44113a0438919408aa',
    readTime: '5 min',
    featured: true
  },
  {
    id: '2',
    title: 'O Poder da Adoração Autêntica',
    slug: 'poder-da-adoracao-autentica',
    excerpt: 'A verdadeira adoração transcende músicas e rituais. É um estilo de vida que transforma nosso coração e nossa comunidade.',
    content: `
      <p>Vivemos em uma era onde adoração frequentemente é confundida com entretenimento religioso. Mas Deus está chamando Seu povo de volta ao fundamento da adoração autêntica.</p>
      
      <h3>O Que é Adoração Verdadeira?</h3>
      <p>Jesus disse à mulher samaritana: "Deus é Espírito, e é necessário que os seus adoradores o adorem em espírito e em verdade" (João 4:24).</p>
      
      <p>Adoração em espírito significa que vem do nosso interior mais profundo, não apenas de nossos lábios. Adoração em verdade significa que alinha com quem Deus realmente é, não com quem imaginamos que Ele seja.</p>
      
      <h3>Adoração Como Estilo de Vida</h3>
      <p>Paulo nos instrui: "Oferecei os vossos corpos como sacrifício vivo, santo e agradável a Deus; este é o vosso culto racional" (Romanos 12:1).</p>
      
      <p>Nossa adoração não se limita aos domingos pela manhã. Cada decisão, cada palavra, cada ação pode ser ato de adoração quando vivemos conscientes da presença de Deus.</p>
      
      <h3>O Impacto da Adoração Coletiva</h3>
      <p>Quando nos reunimos como corpo de Cristo em adoração autêntica, algo sobrenatural acontece:</p>
      <ul>
        <li>Barreiras são quebradas</li>
        <li>Corações são curados</li>
        <li>Fé é fortalecida</li>
        <li>A presença de Deus se manifesta poderosamente</li>
      </ul>
      
      <h3>Como Cultivar Adoração Autêntica</h3>
      <ol>
        <li><strong>Comece com intimidade pessoal:</strong> Desenvolva vida devocional diária consistente.</li>
        <li><strong>Cultive gratidão:</strong> Agradeça a Deus não apenas pelo que Ele faz, mas por quem Ele é.</li>
        <li><strong>Viva em obediência:</strong> Adoração sem obediência é hipocrisia.</li>
        <li><strong>Adore em comunidade:</strong> Participe fielmente dos cultos, contribuindo com sua voz e presença.</li>
      </ol>
      
      <h3>Convite</h3>
      <p>Neste domingo, venha não apenas cantar, mas adorar. Venha não apenas assistir, mas participar. Venha com expectativa de encontrar o Deus vivo que habita no louvor de Seu povo.</p>
      
      <p><em>Pastor Otávio Amorim</em></p>
    `,
    author: 'Pr. Otávio Amorim',
    date: '2025-01-08',
    category: 'Adoração',
    imageUrl: 'https://page.gensparksite.com/v1/base64_upload/b49314cd2e986919e25794a9b6e028fc',
    readTime: '4 min',
    featured: true
  },
  {
    id: '3',
    title: 'Batismo: Declaração Pública de Fé',
    slug: 'batismo-declaracao-publica-fe',
    excerpt: 'O batismo é mais que ritual religioso - é poderosa declaração de transformação e compromisso com Cristo.',
    content: `
      <p>O batismo é um dos momentos mais significativos na jornada de um cristão. Não é mera tradição religiosa, mas comando claro de Jesus e símbolo poderoso de nossa nova vida Nele.</p>
      
      <h3>O Mandamento de Jesus</h3>
      <p>Antes de ascender aos céus, Jesus deixou instrução clara: "Portanto, ide e fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo" (Mateus 28:19).</p>
      
      <h3>O Que o Batismo Simboliza?</h3>
      <p>O batismo nas águas é rico em significado bíblico:</p>
      
      <h4>1. Morte e Ressurreição</h4>
      <p>"Fomos, pois, sepultados com ele na morte pelo batismo; para que, como Cristo foi ressuscitado dentre os mortos pela glória do Pai, assim também andemos nós em novidade de vida" (Romanos 6:4).</p>
      
      <p>Quando você desce às águas, simboliza a morte de seu velho homem - a vida de pecado que você deixou para trás. Quando emerge das águas, simboliza ressurreição para nova vida em Cristo.</p>
      
      <h4>2. Lavamento e Purificação</h4>
      <p>Pedro proclamou no Pentecostes: "Arrependei-vos, e cada um de vós seja batizado em nome de Jesus Cristo para remissão dos vossos pecados" (Atos 2:38).</p>
      
      <h4>3. Identificação com Cristo</h4>
      <p>O batismo é declaração pública: "Eu pertenço a Jesus. Minha vida antiga acabou. Minha nova vida começou."</p>
      
      <h3>Por Que Adiar?</h3>
      <p>Muitos crentes adiam o batismo esperando "se tornarem melhores" primeiro. Mas o batismo não é para perfeitos - é para aqueles que reconheceram sua necessidade de Salvador.</p>
      
      <p>No livro de Atos, vemos padrão consistente: as pessoas eram batizadas imediatamente após crer. O carcereiro de Filipos foi batizado "na mesma hora da noite" (Atos 16:33).</p>
      
      <h3>Preparação Para o Batismo</h3>
      <p>Se você ainda não foi batizado, pergunte a si mesmo:</p>
      <ul>
        <li>Já entreguei minha vida a Jesus Cristo?</li>
        <li>Creio que Ele morreu por meus pecados e ressuscitou?</li>
        <li>Estou pronto para declarar publicamente minha fé?</li>
        <li>Comprometo-me a seguir Jesus todos os dias de minha vida?</li>
      </ul>
      
      <p>Se sua resposta é "sim", então você está pronto para o batismo!</p>
      
      <h3>Próximo Batismo na HPC</h3>
      <p>Estamos planejando nosso próximo batismo em breve. Se você sente que Deus está te chamando para dar este passo de obediência, não espere mais. Entre em contato conosco hoje mesmo.</p>
      
      <blockquote>
        "Se, com a tua boca, confessares Jesus como Senhor e, em teu coração, creres que Deus o ressuscitou dentre os mortos, serás salvo." - Romanos 10:9
      </blockquote>
      
      <p><em>Pastor Otávio Amorim</em></p>
    `,
    author: 'Pr. Otávio Amorim',
    date: '2025-01-01',
    category: 'Batismo',
    imageUrl: 'https://page.gensparksite.com/v1/base64_upload/ae40562804a7da5523cd995eb819d9b5',
    readTime: '6 min',
    featured: false
  }
];

// Helper function to get latest posts
export function getLatestPosts(count: number = 3): BlogPost[] {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

// Helper function to get featured posts
export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

// Helper function to get post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

// Helper function to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
