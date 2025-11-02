// Authentication Configuration for HPC Atlanta Blog Admin

export const AUTH_CONFIG = {
  // Admin email where tokens will be sent
  ADMIN_EMAIL: 'infipros@solihull.pt',
  
  // JWT Secret (in production, use environment variable)
  JWT_SECRET: 'hpc-atlanta-blog-secret-key-2025',
  
  // Token expiration times
  ACCESS_TOKEN_EXPIRY: '7d', // 7 days
  REFRESH_TOKEN_EXPIRY: '30d', // 30 days
  
  // Admin credentials (temporary - will be replaced by token system)
  ADMIN_USERNAME: 'pastor',
  ADMIN_PASSWORD: 'HPC@2025!',
}

// Simple JWT implementation (no external dependencies)
export function generateToken(payload: any, expiresIn: string): string {
  const header = { alg: 'HS256', typ: 'JWT' }
  const exp = expiresIn === '7d' ? Date.now() + 7 * 24 * 60 * 60 * 1000 : Date.now() + 30 * 24 * 60 * 60 * 1000
  
  const tokenPayload = {
    ...payload,
    iat: Date.now(),
    exp: exp
  }
  
  const encodedHeader = btoa(JSON.stringify(header))
  const encodedPayload = btoa(JSON.stringify(tokenPayload))
  const signature = btoa(`${encodedHeader}.${encodedPayload}.${AUTH_CONFIG.JWT_SECRET}`)
  
  return `${encodedHeader}.${encodedPayload}.${signature}`
}

export function verifyToken(token: string): any {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const payload = JSON.parse(atob(parts[1]))
    
    // Check expiration
    if (payload.exp && payload.exp < Date.now()) {
      return null
    }
    
    return payload
  } catch (error) {
    return null
  }
}

// Email template for token
export function getTokenEmailTemplate(token: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .token-box { background: white; border: 2px solid #1a1a1a; padding: 20px; margin: 20px 0; border-radius: 8px; word-break: break-all; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏛️ HPC Atlanta</h1>
          <p>Token de Acesso ao Painel Administrativo</p>
        </div>
        <div class="content">
          <h2>Olá, Pastor Otávio!</h2>
          <p>Seu token de acesso ao painel administrativo do blog foi gerado com sucesso.</p>
          
          <div class="warning">
            <strong>⚠️ IMPORTANTE:</strong> Guarde este token em local seguro. Ele permite acesso total ao sistema de blog.
          </div>
          
          <h3>Seu Token de Acesso:</h3>
          <div class="token-box">
            <code>${token}</code>
          </div>
          
          <h3>Como usar:</h3>
          <ol>
            <li>Acesse: <a href="http://localhost:3000/admin">http://localhost:3000/admin</a></li>
            <li>Cole o token no campo indicado</li>
            <li>Clique em "Entrar com Token"</li>
          </ol>
          
          <p><strong>Validade:</strong> Este token é válido por 7 dias. Após esse período, você precisará fazer login novamente.</p>
          
          <div class="warning">
            <strong>🔒 Segurança:</strong> Nunca compartilhe este token com outras pessoas.
          </div>
        </div>
        <div class="footer">
          <p>© 2025 HPC Atlanta - House of Prayer for all Nations</p>
          <p>Este é um email automático. Não responda.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Function to send email (mock - will be implemented with email service)
export async function sendTokenEmail(email: string, token: string): Promise<boolean> {
  try {
    console.log('='.repeat(80))
    console.log('📧 EMAIL DE TOKEN GERADO')
    console.log('='.repeat(80))
    console.log(`Para: ${email}`)
    console.log(`Token: ${token}`)
    console.log('='.repeat(80))
    console.log('⚠️  NOTA: Em produção, este email seria enviado via serviço de email.')
    console.log('⚠️  Por enquanto, copie o token acima para fazer login.')
    console.log('='.repeat(80))
    
    // In production, integrate with email service like:
    // - Resend (resend.com)
    // - SendGrid
    // - Mailgun
    // - AWS SES
    
    return true
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return false
  }
}
