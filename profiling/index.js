import { solve } from "./solver.ts";

const input = document.querySelector("input");
input.addEventListener("change", () => solve(input.files[0]));
