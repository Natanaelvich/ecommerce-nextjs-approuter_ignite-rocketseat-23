'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

export function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState<string>(searchParams.get('q') ?? '')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!query) {
        return null
      }

      router.push(`/search?q=${query}`)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [query, router])

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.q

    setQuery(query as string)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-500"
    >
      <Search className="w-5 h-5 text-zinc-500" />

      <label htmlFor="search-input" className="sr-only">
        Buscar produtos
      </label>
      <input
        id="search-input"
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar produtos..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
        required
      />
    </form>
  )
}
