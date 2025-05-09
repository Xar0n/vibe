import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Откройте и делитесь удивительными рецептами
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к нашему сообществу любителей кулинарии и делитесь своими кулинарными творениями
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/recipes/new" 
              className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition"
            >
              Поделиться рецептом
            </Link>
            <Link 
              href="/recipes" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition"
            >
              Смотреть рецепты
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Популярные категории</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/recipes?category=${category.slug}`}
              className="group relative h-48 rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <p className="text-sm opacity-90">{category.count} recipes</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Популярные рецепты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <div className="relative h-48">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">{recipe.title}</h3>
                  <p className="text-gray-600 mb-4">{recipe.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={recipe.author.avatar}
                        alt={recipe.author.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-sm text-gray-600">{recipe.author.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        {recipe.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                        {recipe.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// Mock data - will be replaced with real data from Supabase
const categories = [
  {
    name: 'Быстрые рецепты',
    slug: 'quick-easy',
    image: 'https://placehold.co/600x400/orange/white?text=Быстрые',
    count: 156
  },
  {
    name: 'Вегетарианские',
    slug: 'vegetarian',
    image: 'https://placehold.co/600x400/green/white?text=Вегетарианские',
    count: 89
  },
  {
    name: 'Десерты',
    slug: 'desserts',
    image: 'https://placehold.co/600x400/pink/white?text=Десерты',
    count: 234
  },
  {
    name: 'Здоровое питание',
    slug: 'healthy',
    image: 'https://placehold.co/600x400/blue/white?text=Здоровое',
    count: 167
  }
]

const featuredRecipes = [
  {
    id: 1,
    title: 'Паста с чесночным соусом и пармезаном',
    description: 'Вкусное и простое блюдо из пасты, которое готовится всего за 20 минут.',
    image: 'https://placehold.co/600x400/orange/white?text=Паста',
    author: {
      name: 'Сара Джонсон',
      avatar: 'https://placehold.co/100x100/orange/white?text=СД'
    },
    likes: 234,
    comments: 45
  },
  {
    id: 2,
    title: 'Шоколадное печенье',
    description: 'Классическое домашнее печенье, мягкое внутри и хрустящее снаружи.',
    image: 'https://placehold.co/600x400/brown/white?text=Печенье',
    author: {
      name: 'Михаил Браун',
      avatar: 'https://placehold.co/100x100/brown/white?text=МБ'
    },
    likes: 189,
    comments: 32
  },
  {
    id: 3,
    title: 'Лосось на гриле с лимоном',
    description: 'Полезный и ароматный рецепт лосося, идеально подходящий для любого случая.',
    image: 'https://placehold.co/600x400/red/white?text=Лосось',
    author: {
      name: 'Елена Вильсон',
      avatar: 'https://placehold.co/100x100/red/white?text=ЕВ'
    },
    likes: 156,
    comments: 28
  }
]
