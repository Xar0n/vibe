'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/database.types'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
      setIsLoading(false)
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <header className="bg-white shadow">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-orange-500">
              RecipeVerse
            </Link>
            <div className="ml-10 hidden space-x-8 lg:block">
              <Link href="/" className="text-base font-medium text-gray-700 hover:text-orange-500">
                Главная
              </Link>
              <Link href="/recipes" className="text-base font-medium text-gray-700 hover:text-orange-500">
                Рецепты
              </Link>
              <Link href="/about" className="text-base font-medium text-gray-700 hover:text-orange-500">
                О нас
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center rounded-md bg-orange-500 px-3.5 py-2 text-sm font-medium text-white hover:bg-orange-600"
                    >
                      Личный кабинет
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Выйти
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/auth/login"
                      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Войти
                    </Link>
                    <Link
                      href="/auth/register"
                      className="inline-flex items-center rounded-md bg-orange-500 px-3.5 py-2 text-sm font-medium text-white hover:bg-orange-600"
                    >
                      Регистрация
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Открыть меню</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-500"
              >
                Главная
              </Link>
              <Link
                href="/recipes"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-500"
              >
                Рецепты
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-500"
              >
                О нас
              </Link>
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              {!isLoading && (
                <>
                  {isAuthenticated ? (
                    <div className="space-y-1">
                      <Link
                        href="/dashboard"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                      >
                        Личный кабинет
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                      >
                        Выйти
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Link
                        href="/auth/login"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                      >
                        Войти
                      </Link>
                      <Link
                        href="/auth/register"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                      >
                        Регистрация
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
} 