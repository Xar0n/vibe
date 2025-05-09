'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const isAuthenticated = false // This will be replaced with actual auth state

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-orange-500">РецептоМир</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/recipes"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Рецепты
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Категории
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                О нас
              </Link>
            </div>
          </div>

          {/* User menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <>
                <Link
                  href="/recipes/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600"
                >
                  Поделиться рецептом
                </Link>
                <div className="ml-3 relative">
                  <div>
                    <button
                      type="button"
                      className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    >
                      <Image
                        className="h-8 w-8 rounded-full"
                        src="https://placehold.co/100x100/orange/white?text=П"
                        alt="Меню пользователя"
                        width={32}
                        height={32}
                      />
                    </button>
                  </div>
                  {isUserMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Мой профиль
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Настройки
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {/* Handle sign out */}}
                      >
                        Выйти
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-500 bg-white hover:bg-orange-50"
                >
                  Войти
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600"
                >
                  Регистрация
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Открыть меню</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/recipes"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Рецепты
            </Link>
            <Link
              href="/categories"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Категории
            </Link>
            <Link
              href="/about"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              О нас
            </Link>
          </div>
          {isAuthenticated ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Image
                    className="h-10 w-10 rounded-full"
                    src="https://placehold.co/100x100/orange/white?text=П"
                    alt="Аватар пользователя"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Имя пользователя</div>
                  <div className="text-sm font-medium text-gray-500">user@example.com</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Мой профиль
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Настройки
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => {/* Handle sign out */}}
                >
                  Выйти
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="space-y-1">
                <Link
                  href="/auth/signin"
                  className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Войти
                </Link>
                <Link
                  href="/auth/signup"
                  className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Регистрация
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  )
} 