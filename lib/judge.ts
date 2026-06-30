import { execFile } from "child_process";
import { mkdtemp, writeFile, rm } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

const GCC_IMAGE = process.env.GCC_IMAGE ?? "gcc:14";
const COMPILE_TIMEOUT_MS = 10_000;
const RUN_TIMEOUT_MS = 5_000;

export interface RunResult {
  passed: boolean;
  output: string;
  error: string | null;
  time: number;
}

export async function runCode(
  sourceCode: string,
  input: string,
  expectedOutput: string
): Promise<RunResult> {
  const dir = await mkdtemp(join(tmpdir(), "4bac-"));

  try {
    await writeFile(join(dir, "main.cpp"), sourceCode, "utf8");

    const startCompile = Date.now();

    // Compile inside Docker container
    const { stderr: compileErr } = await execFileAsync(
      "docker",
      [
        "run", "--rm",
        "--platform", "linux/arm64",
        "--network", "none",
        "--memory", "256m",
        "--cpus", "1",
        "-v", `${dir}:/code`,
        GCC_IMAGE,
        "sh", "-c",
        "g++ -O2 -std=c++17 -o /code/a.out /code/main.cpp 2>&1",
      ],
      { timeout: COMPILE_TIMEOUT_MS }
    ).catch((err) => ({ stderr: err.stderr ?? err.stdout ?? String(err) }));

    if (compileErr && compileErr.trim()) {
      return { passed: false, output: "", error: compileErr.trim(), time: 0 };
    }

    const startRun = Date.now();

    // Run with stdin piped
    const { stdout, stderr: runErr } = await execFileAsync(
      "docker",
      [
        "run", "--rm",
        "--platform", "linux/arm64",
        "--network", "none",
        "--memory", "256m",
        "--cpus", "1",
        "-v", `${dir}:/code`,
        "-i",
        GCC_IMAGE,
        "sh", "-c",
        `echo ${JSON.stringify(input)} | timeout 2 /code/a.out`,
      ],
      { timeout: RUN_TIMEOUT_MS }
    ).catch((err) => ({
      stdout: err.stdout ?? "",
      stderr: err.stderr ?? String(err),
    }));

    const elapsed = Date.now() - startRun;
    const output = stdout.trim();
    const passed = expectedOutput === "" ? true : output === expectedOutput.trim();

    return {
      passed,
      output,
      error: runErr?.trim() || null,
      time: elapsed,
    };
  } finally {
    rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}
