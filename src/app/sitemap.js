export default function sitemap() {
    return [
        {
            url: 'https://workoutgeneratorai.com',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://workoutgeneratorai.com/onboarding',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        // Add other important routes
    ]
} 