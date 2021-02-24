import { trimLines } from "./helpers/string.ts";

export type Dataset = {
  name: string;
  teams: Team[];
  pizzas: Pizza[];
};

export type Team = {
  personCount: number;
  teamCount: number;
};

export type Pizza = {
  id: number;
  ingredients: number[];
};

let ingredientMap = new Map<string, number>();

export async function readDataset(inputFilePath: string): Promise<Dataset> {
  const fileContent = await Deno.readTextFile(inputFilePath);
  const name = inputFilePath.split("/").pop()!;
  return parseDataset(name, fileContent);
}

export function getDatasetInfo(dataset: Dataset) {
  return {
    "Dataset": dataset.name,
    "Teams": countTotalTeams(dataset),
    "People": countTotalPeople(dataset),
    "Pizzas": countTotalPizzas(dataset),
    "Ingredients": countTotalIngredients(dataset),
  };
}

export function countTotalTeams({ teams }: Dataset) {
  return teams.reduce(
    (count, { teamCount }) => count + teamCount,
    0,
  );
}

export function countTotalPeople({ teams }: Dataset) {
  return teams.reduce(
    (count, { personCount, teamCount }) => count + personCount * teamCount,
    0,
  );
}

export function countTotalPizzas({ pizzas }: Dataset) {
  return pizzas.length;
}

export function countTotalIngredients({ pizzas }: Dataset) {
  return pizzas.reduce((ingredients, pizza) => {
    pizza.ingredients.forEach((ingredient) => ingredients.add(ingredient));
    return ingredients;
  }, new Set<number>()).size;
}

export function parseDataset(name: string, fileContent: string): Dataset {
  const [teamsLine, ...pizzaLines] = trimLines(fileContent.split("\n"));
  ingredientMap.clear();
  return {
    name,
    teams: parseTeams(teamsLine),
    pizzas: pizzaLines.map(parsePizza),
  };
}

export function parseTeams(line: string): Team[] {
  return line.split(" ")
    .slice(1)
    .map(Number)
    .map((teamCount, i) => ({
      personCount: i + 2,
      teamCount,
    }));
}

export function parsePizza(line: string, pizzaId: number): Pizza {
  return {
    id: pizzaId,
    ingredients: line.split(" ").slice(1).map((ingredientString) => {
      let ingredient = ingredientMap.get(ingredientString);
      if (ingredient === undefined) {
        ingredient = ingredientMap.size;
        ingredientMap.set(ingredientString, ingredient);
      }
      return ingredient;
    }),
  };
}
