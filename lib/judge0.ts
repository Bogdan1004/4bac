const JUDGE0_URL = process.env.JUDGE0_URL || "https://judge0-ce.p.rapidapi.com";
const JUDGE0_KEY = process.env.JUDGE0_API_KEY;

const CPP17_LANGUAGE_ID = 54;

interface SubmissionResult {
  status: { id: number; description: string };
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  time: string | null;
  memory: number | null;
}

export async function runCode(
  sourceCode: string,
  input: string,
  expectedOutput: string
): Promise<{ passed: boolean; output: string; error: string | null; time: number }> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (JUDGE0_KEY) {
    headers["X-RapidAPI-Key"] = JUDGE0_KEY;
    headers["X-RapidAPI-Host"] = "judge0-ce.p.rapidapi.com";
  }

  // Submit
  const submitRes = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=true&wait=false`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      language_id: CPP17_LANGUAGE_ID,
      source_code: Buffer.from(sourceCode).toString("base64"),
      stdin: Buffer.from(input).toString("base64"),
      expected_output: Buffer.from(expectedOutput).toString("base64"),
      cpu_time_limit: 2,
      memory_limit: 262144,
    }),
  });

  if (!submitRes.ok) {
    throw new Error(`Judge0 submit failed: ${submitRes.status}`);
  }

  const { token } = await submitRes.json();

  // Poll for result
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 500));

    const resultRes = await fetch(
      `${JUDGE0_URL}/submissions/${token}?base64_encoded=true`,
      { headers }
    );
    const result: SubmissionResult = await resultRes.json();

    // status 1 = In Queue, 2 = Processing
    if (result.status.id <= 2) continue;

    const output = result.stdout
      ? Buffer.from(result.stdout, "base64").toString().trim()
      : "";
    const error = result.stderr
      ? Buffer.from(result.stderr, "base64").toString()
      : result.compile_output
      ? Buffer.from(result.compile_output, "base64").toString()
      : null;

    const passed =
      result.status.id === 3 &&
      output === expectedOutput.trim();

    return {
      passed,
      output,
      error,
      time: result.time ? Math.round(parseFloat(result.time) * 1000) : 0,
    };
  }

  throw new Error("Judge0 timeout");
}
