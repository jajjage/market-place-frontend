"use client";

import { useState } from "react";

type DebugResult = {
  id: number;
  test: string;
  status: "success" | "error" | "warning" | "info";
  message: string;
  data?: any;
  timestamp: string;
};

export default function APIDebugTool() {
  const [debugResults, setDebugResults] = useState<DebugResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [manualUrl, setManualUrl] = useState("http://localhost:8000/api/products/");
  const [testFilters, setTestFilters] = useState("{}");

  interface AddResultData {
    [key: string]: any;
  }

  type AddResultStatus = "success" | "error" | "warning" | "info";

  interface AddResultFn {
    (test: string, status: AddResultStatus, message: string, data?: AddResultData | null): void;
  }

  const addResult: AddResultFn = (test, status, message, data = null) => {
    setDebugResults((prev: DebugResult[]) => [
      ...prev,
      {
        id: Date.now(),
        test,
        status,
        message,
        data,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const clearResults = () => {
    setDebugResults([]);
  };

  const runDiagnostics = async () => {
    setIsRunning(true);
    clearResults();

    // Test 1: Basic fetch to localhost:8000
    try {
      addResult("Basic Connection", "info", "Testing basic connection to localhost:8000...");
      const response = await fetch("http://localhost:8000", { method: "GET" });
      addResult("Basic Connection", "success", `Server is running! Status: ${response.status}`, {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });
    } catch (error) {
      addResult(
        "Basic Connection",
        "error",
        `Cannot connect to localhost:8000: ${error instanceof Error ? error.message : String(error)}`,
        { error: error instanceof Error ? error.message : String(error) }
      );
    }

    // Test 2: Check specific API endpoint
    try {
      addResult("API Endpoint", "info", "Testing API endpoint...");
      const response = await fetch(manualUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        addResult("API Endpoint", "success", `API endpoint working! Status: ${response.status}`, {
          status: response.status,
          headers: Object.fromEntries(response.headers.entries()),
          data: data,
        });
      } else {
        addResult("API Endpoint", "warning", `API returned status: ${response.status}`, {
          status: response.status,
          statusText: response.statusText,
        });
      }
    } catch (error) {
      addResult(
        "API Endpoint",
        "error",
        `API endpoint failed: ${error instanceof Error ? error.message : String(error)}`,
        { error: error instanceof Error ? error.message : String(error) }
      );
    }

    // Test 3: Network request with axios-like config
    try {
      addResult("Axios-style Request", "info", "Testing with axios-like configuration...");

      // Simulate your axios config
      const requestConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Add any auth headers you might have
        },
        timeout: 10000,
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), requestConfig.timeout);

      const response = await fetch(manualUrl, {
        ...requestConfig,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        addResult("Axios-style Request", "success", "Request successful with axios config", {
          data,
          responseHeaders: Object.fromEntries(response.headers.entries()),
        });
      } else {
        addResult("Axios-style Request", "warning", `Status: ${response.status}`, {
          status: response.status,
          statusText: response.statusText,
        });
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        addResult("Axios-style Request", "error", "Request timed out after 10 seconds");
      } else {
        addResult(
          "Axios-style Request",
          "error",
          `Request failed: ${error instanceof Error ? error.message : String(error)}`,
          { error: error instanceof Error ? error.message : String(error) }
        );
      }
    }

    // Test 4: Check CORS headers
    try {
      addResult("CORS Check", "info", "Checking CORS headers...");
      const response = await fetch(manualUrl, {
        method: "OPTIONS",
        headers: {
          Origin: window.location.origin,
          "Access-Control-Request-Method": "GET",
          "Access-Control-Request-Headers": "Content-Type",
        },
      });

      const corsHeaders = {
        "Access-Control-Allow-Origin": response.headers.get("Access-Control-Allow-Origin"),
        "Access-Control-Allow-Methods": response.headers.get("Access-Control-Allow-Methods"),
        "Access-Control-Allow-Headers": response.headers.get("Access-Control-Allow-Headers"),
      };

      addResult("CORS Check", "info", "CORS preflight response received", {
        status: response.status,
        corsHeaders,
      });
    } catch (error) {
      addResult(
        "CORS Check",
        "warning",
        `CORS preflight failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    // Test 5: Test with filters
    try {
      if (testFilters && testFilters !== "{}") {
        addResult("Filtered Request", "info", "Testing with filters...");
        const filters = JSON.parse(testFilters);
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            params.append(key, String(value));
          }
        });

        const urlWithParams = `${manualUrl}${params.toString() ? "?" + params.toString() : ""}`;
        const response = await fetch(urlWithParams);

        if (response.ok) {
          const data = await response.json();
          addResult(
            "Filtered Request",
            "success",
            `Filtered request successful. Results: ${data.results?.length || 0}`,
            {
              url: urlWithParams,
              params: Object.fromEntries(params),
              data,
            }
          );
        } else {
          addResult("Filtered Request", "warning", `Filtered request returned ${response.status}`);
        }
      }
    } catch (error) {
      addResult(
        "Filtered Request",
        "error",
        `Filtered request failed: ${error instanceof Error ? error.message : String(error)}`,
        { error: error instanceof Error ? error.message : String(error) }
      );
    }

    // Test 6: Environment check
    addResult("Environment", "info", "Environment information", {
      userAgent: navigator.userAgent,
      location: window.location.href,
      protocol: window.location.protocol,
      hostname: window.location.hostname,
      port: window.location.port,
      origin: window.location.origin,
    });

    setIsRunning(false);
  };

  const testManualUrl = async () => {
    try {
      addResult("Manual Test", "info", `Testing manual URL: ${manualUrl}`);
      const response = await fetch(manualUrl);
      const data = await response.json();
      addResult(
        "Manual Test",
        response.ok ? "success" : "warning",
        `Manual test result: ${response.status}`,
        { data, status: response.status }
      );
    } catch (error) {
      addResult(
        "Manual Test",
        "error",
        `Manual test failed: ${error instanceof Error ? error.message : String(error)}`,
        { error: error instanceof Error ? error.message : String(error) }
      );
    }
  };

  interface StatusColorMap {
    [key: string]: string;
  }

  type StatusType = "success" | "error" | "warning" | "info";

  const getStatusColor = (status: StatusType): string => {
    const colorMap: StatusColorMap = {
      success: "text-green-400 border-green-400",
      error: "text-red-400 border-red-400",
      warning: "text-yellow-400 border-yellow-400",
      info: "text-blue-400 border-blue-400",
    };
    return colorMap[status] || colorMap.info;
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-white">API Debug Tool</h1>

        {/* Controls */}
        <div className="mb-6 space-y-4 rounded-lg bg-gray-800 p-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">API URL to test:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualUrl}
                onChange={(e) => setManualUrl(e.target.value)}
                className="flex-1 rounded bg-gray-700 px-3 py-2 text-white"
                placeholder="http://localhost:8000/api/products/"
              />
              <button
                onClick={testManualUrl}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Test URL
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Test Filters (JSON):
            </label>
            <input
              type="text"
              value={testFilters}
              onChange={(e) => setTestFilters(e.target.value)}
              className="w-full rounded bg-gray-700 px-3 py-2 text-white"
              placeholder='{"search": "test", "category": "electronics"}'
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={runDiagnostics}
              disabled={isRunning}
              className="rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700 disabled:opacity-50"
            >
              {isRunning ? "Running Diagnostics..." : "Run Full Diagnostics"}
            </button>
            <button
              onClick={clearResults}
              className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
            >
              Clear Results
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {debugResults.map((result) => (
            <div
              key={result.id}
              className={`rounded-lg border-l-4 bg-gray-800 p-4 ${getStatusColor(result.status)}`}
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-white">{result.test}</h3>
                <span className="text-xs text-gray-400">{result.timestamp}</span>
              </div>
              <p className="mb-2 text-gray-300">{result.message}</p>
              {result.data && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300">
                    View Details
                  </summary>
                  <pre className="mt-2 overflow-x-auto rounded bg-gray-900 p-2 text-xs text-gray-300">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>

        {debugResults.length === 0 && (
          <div className="rounded-lg bg-gray-800 p-8 text-center">
            <p className="text-gray-400">
              Click "Run Full Diagnostics" to start testing your API connection
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
