import { SEP } from "https://deno.land/std@0.87.0/path/separator.ts";
import { trimLines } from "./helpers/string.ts";

export type Dataset = {
  name: string;
  teams: Team[];
  pizzas: Pizza[];
};

export type Team = {
  peopleCount: number;
  teamCount: number;
};

export type Pizza = {
  id: number;
  ingredients: string[];
};

export async function readDataset(inputFilePath: string): Promise<Dataset> {
  const input = await Deno.readTextFile(inputFilePath);
  const [teamsLine, ...pizzasLines] = trimLines(input.split("\n"));
  return {
    name: inputFilePath.split(SEP).pop()!,
    teams: parseTeams(teamsLine),
    pizzas: pizzasLines.map(parsePizza),
  };
}

export function getInfo(dataset: Dataset) {
  return {
    "Dataset": dataset.name,
    "Teams": countTotalTeams(dataset),
    "Pizzas": countTotalPizzas(dataset),
    "Ingredients": countTotalIngredients(dataset),
  };
}

function parseTeams(line: string): Team[] {
  return line.split(" ")
    .slice(1)
    .map(Number)
    .map((teamCount, i) => ({
      peopleCount: i + 2,
      teamCount,
    }));
}

function parsePizza(line: string, pizzaId: number): Pizza {
  return {
    id: pizzaId,
    ingredients: line.split(" ").slice(1),
  };
}

function countTotalTeams(dataset: Dataset) {
  return dataset.teams.reduce(
    (count, team) => count + team.peopleCount * team.teamCount,
    0,
  );
}

function countTotalPizzas(dataset: Dataset) {
  return dataset.pizzas.length;
}

function countTotalIngredients(dataset: Dataset) {
  return dataset.pizzas.reduce((ingredients, pizza) => {
    pizza.ingredients.forEach((ingredient) => ingredients.add(ingredient));
    return ingredients;
  }, new Set<string>()).size;
}
