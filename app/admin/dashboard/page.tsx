import { Metadata } from 'next'
import ProtectedAdminDashboard from '@/components/ProtectedAdminDashboard'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Daily Dose of Warhammer',
  description: 'Admin dashboard for moderating fan submissions and managing featured content.',
}

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-warhammer-dark via-warhammer-gray to-dark-byzantium">
      <div className="pt-20 pb-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-anton text-5xl lg:text-7xl text-white mb-6 warhammer-text-shadow">
              ADMIN DASHBOARD
            </h1>
            <p className="font-bitter text-xl lg:text-2xl text-lavender-gray max-w-4xl mx-auto">
              Moderate fan submissions, select featured content, and manage the Daily Dose of Warhammer community.
            </p>
          </div>

          {/* Protected Admin Dashboard Component */}
          <ProtectedAdminDashboard />
        </div>
      </div>
    </main>
  )
}
