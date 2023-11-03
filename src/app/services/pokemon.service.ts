import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];

  constructor(private httpClient: HttpClient) {
    this.carregarPokemons();
  }
  async carregarPokemons() {
    const request = await this.httpClient
      .get<any>(' https://pokeapi.co/api/v2/pokemon?limit=1000')
      .toPromise();

    this.pokemons = request.results;
    this.filteredPokemons = request.results;
  }

  async getPokemonById(id: number): Promise<Pokemon | undefined> {
    try {
      const response = await this.httpClient
        .get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .toPromise();

      return this.mapPokemonDetails(response);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
      return undefined;
    }
  }

  filterPokemon(searchTerm: string): void {
    if (searchTerm) {
      this.filteredPokemons = this.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredPokemons = this.pokemons;
    }
  }

  private mapPokemonDetails(data: any): Pokemon {
    const pokemon: Pokemon = {
      name: data.name,
      number: data.id,
      types: data.types.map((type: any) => type.type.name as Type),
      abilities: data.abilities,
      stats: data.stats,
    };
    return pokemon;
  }
}

export interface Pokemon {
  name: string;
  types: Type[];
  number: number;
  abilities: { ability: AbilityInfo }[];
  stats: { base_stat: number; stat: Stats }[];
}

enum Type {
  Grass = 'Grass',
  Poison = 'Poison',
  Fire = 'Fire',
}

export interface AbilityInfo {
  name: string;
}

export interface Stats {
  name: string;
}
