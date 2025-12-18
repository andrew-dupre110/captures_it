import { ExampleMessageResponse } from "@/types/example/type";

export async function fetchExampleMessage(): Promise<ExampleMessageResponse> {
  const response = await fetch("/api/example");
  if (!response.ok) {
    throw new Error("Failed to fetch example message");
  }
  return response.json();
}
