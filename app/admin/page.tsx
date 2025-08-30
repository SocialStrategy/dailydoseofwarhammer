'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login page
    router.push('/admin/login')
  }, [router])

  return (
    <main className="min-h-screen bg-gradient-to-b from-warhammer-dark via-warhammer-gray to-dark-byzantium flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-warhammer-gold border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-text-light">Redirecting to admin login...</p>
      </div>
    </main>
  )
}
