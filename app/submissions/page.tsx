import { Metadata } from 'next'
import SubmissionForm from '@/components/SubmissionForm'
import SubmissionsGallery from '@/components/SubmissionsGallery'

export const metadata: Metadata = {
  title: 'Fan Submissions - Daily Dose of Warhammer',
  description: 'Submit your Warhammer 40k work and view amazing community submissions. Share your passion with fellow hobbyists.',
}

export default function SubmissionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-warhammer-dark via-warhammer-gray to-dark-byzantium">
      <div className="pt-20 pb-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-anton text-5xl lg:text-7xl text-white mb-6 warhammer-text-shadow">
              FAN SUBMISSIONS
            </h1>
            <p className="font-bitter text-xl lg:text-2xl text-lavender-gray max-w-4xl mx-auto">
              Share your Warhammer 40k creations with the community. From painted miniatures to custom terrain, 
              showcase your hobby skills and inspire others.
            </p>
          </div>

          {/* Submission Form */}
          <SubmissionForm />

          {/* Submissions Gallery */}
          <SubmissionsGallery />
        </div>
      </div>
    </main>
  )
}
