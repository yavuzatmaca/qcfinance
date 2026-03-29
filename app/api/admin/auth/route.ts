import { NextResponse } from 'next/server'
import { ADMIN_PASSWORD, generateToken, verifyToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (password === ADMIN_PASSWORD) {
      const token = generateToken(password)
      
      return NextResponse.json({ 
        success: true, 
        token,
        message: 'Connexion réussie' 
      })
    }

    return NextResponse.json(
      { success: false, message: 'Mot de passe incorrect' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
