import fs from 'fs'
import path from 'path'

export interface FanSubmission {
  artist: string
  title: string
  description: string
  category: string
  images: string[]
  date: string
  tags: string[]
}

export function getLatestFanSubmission(): FanSubmission | null {
  try {
    const submissionsDir = path.join(process.cwd(), 'public', 'images', 'Fan-Submissions')
    
    if (!fs.existsSync(submissionsDir)) {
      return null
    }

    // Get all submission folders
    const submissionFolders = fs.readdirSync(submissionsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .sort()
      .reverse() // Most recent first

    if (submissionFolders.length === 0) {
      return null
    }

    // Get the latest submission folder
    const latestFolder = submissionFolders[0]
    const latestFolderPath = path.join(submissionsDir, latestFolder)
    
    // Get all images in the folder
    const imageFiles = fs.readdirSync(latestFolderPath)
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .sort()

    if (imageFiles.length === 0) {
      return null
    }

    // Extract artist name and date from folder name (format: Artist-DD.MM.YY)
    const folderParts = latestFolder.split('-')
    const artist = folderParts[0]
    const dateStr = folderParts.slice(1).join('-') // Handle dates with dots
    
    // Convert date format from DD.MM.YY to YYYY-MM-DD for proper display
    let formattedDate = new Date().toISOString().split('T')[0] // Default to today
    if (dateStr && dateStr.includes('.')) {
      const dateParts = dateStr.split('.')
      if (dateParts.length === 3) {
        const [day, month, year] = dateParts
        // Convert YY to YYYY (assuming 20XX)
        const fullYear = year.length === 2 ? `20${year}` : year
        formattedDate = `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    }

    // Create the featured post data
    const featuredPost: FanSubmission = {
      artist,
      title: `${artist}'s Latest Miniature Painting`,
      description: `A showcase of ${artist}'s exceptional miniature painting work. This piece demonstrates advanced techniques and incredible attention to detail.`,
      category: 'Miniature Painting',
      images: imageFiles.map(file => `/images/Fan-Submissions/${latestFolder}/${file}`),
      date: formattedDate,
      tags: ['Miniature Painting', 'Warhammer 40k', 'Community Work', 'Featured Artist']
    }

    return featuredPost
  } catch (error) {
    console.error('Error loading latest fan submission:', error)
    return null
  }
}

export function getAllFanSubmissions(): FanSubmission[] {
  try {
    const submissionsDir = path.join(process.cwd(), 'public', 'images', 'Fan-Submissions')
    
    if (!fs.existsSync(submissionsDir)) {
      return []
    }

    const submissionFolders = fs.readdirSync(submissionsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .sort()
      .reverse()

    return submissionFolders.map(folder => {
      const folderPath = path.join(submissionsDir, folder)
      const imageFiles = fs.readdirSync(folderPath)
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .sort()

      const folderParts = folder.split('-')
      const artist = folderParts[0]
      const dateStr = folderParts.slice(1).join('-')
      
      // Convert date format from DD.MM.YY to YYYY-MM-DD for proper display
      let formattedDate = new Date().toISOString().split('T')[0] // Default to today
      if (dateStr && dateStr.includes('.')) {
        const dateParts = dateStr.split('.')
        if (dateParts.length === 3) {
          const [day, month, year] = dateParts
          // Convert YY to YYYY (assuming 20XX)
          const fullYear = year.length === 2 ? `20${year}` : year
          formattedDate = `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        }
      }

      return {
        artist,
        title: `${artist}'s Miniature Painting`,
        description: `A showcase of ${artist}'s miniature painting work.`,
        category: 'Miniature Painting',
        images: imageFiles.map(file => `/images/Fan-Submissions/${folder}/${file}`),
        date: formattedDate,
        tags: ['Miniature Painting', 'Warhammer 40k', 'Community Work']
      }
    })
  } catch (error) {
    console.error('Error loading fan submissions:', error)
    return []
  }
}
