import type { DashOptionSelect } from '@/types'

const URL = 'https://pokeapi.co/api/v2/pokedex/'

export const formatPokemones = (data: Entries[]): DashOptionSelect[] => {
  return data.map((entry) => ({
    label: entry.pokemon_species.name,
    value: entry.pokemon_species.url,
  }))
}

export const fetchApi = async ({ name }: { name: string }) => {
  const response = await fetch(`${URL}${name}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  const entries = data.pokemon_entries as Entries[]
  return formatPokemones(entries)
}

interface Pokemon {
  name: string
  url: string
}

interface Entries {
  entry_number: number
  pokemon_species: Pokemon
}
