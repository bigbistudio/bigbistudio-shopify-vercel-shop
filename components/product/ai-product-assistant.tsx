"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AiProductAssistantProps {
  product: {
    availableForSale: boolean;
    description: string;
    options: Array<{ name: string; values: string[] }>;
    price: { currencyCode: string; max: string; min: string };
    title: string;
    vendor?: string;
  };
}

export function AiProductAssistant({ product }: AiProductAssistantProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
      setError("Enter a question about this product.");
      return;
    }
    if (trimmedQuestion.length > 500) {
      setError("Keep your question under 500 characters.");
      return;
    }

    setAnswer("");
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/ai/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, question: trimmedQuestion }),
      });
      const result: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        const message =
          result &&
          typeof result === "object" &&
          "error" in result &&
          typeof result.error === "string"
            ? result.error
            : "We couldn't answer that just now. Please try again.";
        setError(message);
        return;
      }
      if (
        !result ||
        typeof result !== "object" ||
        !("answer" in result) ||
        typeof result.answer !== "string"
      ) {
        setError("We couldn't answer that just now. Please try again.");
        return;
      }
      setAnswer(result.answer);
    } catch {
      setError("We couldn't connect. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="grid gap-4 border-t pt-6" aria-labelledby="ai-product-assistant-heading">
      <h2 id="ai-product-assistant-heading" className="text-base font-medium">
        Ask AI about this product
      </h2>
      <form className="grid gap-2.5 sm:grid-cols-[1fr_auto]" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="ai-product-question">
          Your question about this product
        </label>
        <Input
          id="ai-product-question"
          maxLength={500}
          onChange={(event) => {
            setQuestion(event.target.value);
            setError("");
          }}
          placeholder="e.g. Is this suitable for a summer trip?"
          value={question}
          aria-invalid={Boolean(error)}
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !question.trim()}>
          {isLoading ? "Thinking..." : "Ask AI"}
        </Button>
      </form>
      <div aria-live="polite" aria-busy={isLoading}>
        {isLoading ? <p className="text-sm text-muted-foreground">Finding an answer...</p> : null}
        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        {answer ? (
          <div className="grid gap-2">
            <h3 className="text-sm font-medium">AI response</h3>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{answer}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
