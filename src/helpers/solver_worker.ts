import { Dataset } from "../dataset.ts";
import { WorkerBase } from "./worker.ts";

export class SolverWorker extends WorkerBase {
  constructor(
    dataset: Dataset,
    solverName: string,
    extension: "ts" | "js" = "ts",
  ) {
    super(`../solvers/${solverName}.${extension}`, dataset.name);
    this.worker.postMessage(dataset);
  }
}
