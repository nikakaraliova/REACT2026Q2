export type Pokemon = {
  id: string;
  name: string;
  url: string;
};

export type AppState = {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
};

export type SearchProps = {
  onSearch: (textInput: string) => void;
};

export type SearchState = {
  searchInputValue: string;
};

export type CardListProps = {
  pokemons: Pokemon[];
};

export type CardProps = {
  pokemon: Pokemon;
};

export type ErrorButtonPropsState = {
  shouldThrow: boolean;
};
