import { getDatasetInfo, parseDataset } from "../src/dataset.ts";
import { SolverWorker } from "../src/helpers/solver_worker.ts";
import { getSubmissionInfo } from "../src/submission.ts";

export async function solve(inputFile: File) {
  const fileContent = await inputFile.text();
  const dataset = parseDataset(inputFile.name, fileContent);
  const datasetInfo = [getDatasetInfo(dataset)];

  console.table(datasetInfo);

  const solverWorker = new SolverWorker(dataset, "greedy", "js");
  const intervalId = setInterval(printProgress, 1000);
  await solverWorker.promise;
  clearInterval(intervalId);
  printProgress();
  if (solverWorker.submission) {
    console.table(
      [getSubmissionInfo(solverWorker.name, solverWorker.submission)],
    );
  } else {
    console.error("Failed to generate submission");
  }

  function printProgress() {
    console.clear();
    console.table(datasetInfo);
    solverWorker.printProgress();
  }
}
