# Google Hash Code Parctice 2021

TypeScript solution for Google Hash Code 2021 practice round.

## Set up your environment

- Install Deno by following [these instructions](https://deno.land/manual/getting_started/installation).
- Install the official [Deno VSCode extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno).

## Usage

In the project directory, you can run:

### `deno run --unstable --allow-read=input,src/solvers --allow-write=submission src/solver.ts input/*`

Runs the solver program with all the input files.

If you want to run only specific files, you can specify them as last arguments of the command:

```bash
deno run --unstable --allow-read=input --allow-write=submission src/solver.ts input/a_example input/b_little_bit_of_everything.in
```

**Note:** You can also allow all permissions with `deno run --unstable -A src/solver.ts input/*`

### `deno run --unstable --allow-read=input,submission,src/optimizers --allow-write=submission src/optimizer.ts input/*`

Runs the optimizer program with all the input files to optimize the submission file with the highest score for each input dataset.

If you want to run only specific files, you can specify them as last arguments of the command:

```bash
deno run --unstable --allow-read=input,submission,src/optimizers --allow-write=submission src/optimizer.ts input/a_example input/b_little_bit_of_everything.in
```

**Note:** You can also allow all permissions with `deno run --unstable -A src/optimizer.ts input/*`

### `deno test --allow-read=input`

Runs all tests in the current directory and all sub-directories.

**Note:** You can also allow all permissions with `deno test -A`

### `deno fmt`

Formats all TypeScript files in the current directory and all sub-directories.

## Profiling your code

1. Go in the `profiling` directory which contains a web application capable of running the solver web worker.
2. Run `yarn start` in this directory which will open the web application in a new tab of you default web browser.
3. You can then pick an input dataset file to start running a solver worker with this file.
4. Display the browser console to see the console output (info and progress).
5. Use the browser profiling development tools to analyse your code performance.
