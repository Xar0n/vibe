import Link from 'next/link'
import Image from 'next/image'

interface RecipeCardProps {
  id: string
  title: string
  description: string
  image_url: string | null
  author_email: string
  created_at: string
}

export default function RecipeCard({ id, title, description, image_url, author_email, created_at }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="relative h-48 w-full">
        {image_url ? (
          <Image
            src={image_url}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <Link href={`/recipes/${id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-orange-500 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="ml-2 text-sm text-gray-500">
              {author_email}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            {new Date(created_at).toLocaleDateString('ru-RU')}
          </p>
        </div>
      </div>
    </div>
  )
} 