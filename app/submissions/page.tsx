import { Metadata } from 'next'
import SubmissionForm from '@/components/SubmissionForm'
import SubmissionsGallery from '@/components/SubmissionsGallery'

export const metadata: Metadata = {
  title: 'Fan Submissions - Daily Dose of Warhammer',
  description: 'Submit your Warhammer 40k miniatures, paintings, and creations to the Daily Dose of Warhammer community. Share your work with fellow hobbyists.',
  keywords: [
    'Warhammer fan submissions',
    'Warhammer 40k submissions',
    'Warhammer miniatures',
    'Warhammer painting',
    'Warhammer community',
    'submit Warhammer art',
    'Warhammer hobby submissions',
    'Warhammer fan art'
  ],
  openGraph: {
    title: 'Fan Submissions - Daily Dose of Warhammer',
    description: 'Submit your Warhammer 40k miniatures, paintings, and creations to the Daily Dose of Warhammer community.',
    url: 'https://dailydoseofwarhammer.com/submissions',
    images: [
      {
        url: 'https://dailydoseofwarhammer.com/images/ddow logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Warhammer 40k Fan Submissions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fan Submissions - Daily Dose of Warhammer',
    description: 'Submit your Warhammer 40k miniatures, paintings, and creations to the Daily Dose of Warhammer community.',
  },
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
            <p className="font-bitter text-xl lg:text-2xl text-text-light max-w-4xl mx-auto">
              Share your Warhammer 40k creations with the community. Submit your miniatures, paintings, and hobby projects.
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
