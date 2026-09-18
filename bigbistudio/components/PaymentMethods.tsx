type PaymentMethod = "amex" | "apple-pay" | "mastercard" | "paypal" | "visa";

const PAYMENT_METHODS: PaymentMethod[] = ["visa", "mastercard", "amex", "paypal", "apple-pay"];

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  amex: "American Express",
  "apple-pay": "Apple Pay",
  mastercard: "Mastercard",
  paypal: "PayPal",
  visa: "Visa",
};

export function PaymentMethods() {
  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">Accepted payments</p>
      <div className="flex flex-wrap gap-2">
        {PAYMENT_METHODS.map((method) => (
          <span
            key={method}
            className="inline-flex h-9 min-w-16 items-center justify-center rounded-xs border border-border bg-background px-2 text-[0.65rem] font-semibold tracking-wide"
          >
            <PaymentIcon method={method} />
            <span className="sr-only">{PAYMENT_LABELS[method]}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function PaymentIcon({ method }: { method: PaymentMethod }) {
  const className = "h-5 w-12";

  switch (method) {
    case "visa":
      return (
        <svg className={className} viewBox="0 0 48 20" aria-hidden="true">
          <text x="2" y="15" fill="currentColor" fontFamily="Arial, sans-serif" fontSize="14" fontStyle="italic" fontWeight="700">
            VISA
          </text>
        </svg>
      );
    case "mastercard":
      return (
        <svg className={className} viewBox="0 0 48 20" aria-hidden="true">
          <circle cx="19" cy="10" r="7" fill="#eb001b" />
          <circle cx="29" cy="10" r="7" fill="#f79e1b" />
          <path d="M24 4.5a7 7 0 0 1 0 11 7 7 0 0 1 0-11Z" fill="#ff5f00" />
        </svg>
      );
    case "amex":
      return (
        <svg className={className} viewBox="0 0 48 20" aria-hidden="true">
          <rect x="1" y="2" width="46" height="16" rx="2" fill="#147bd1" />
          <text x="5" y="13" fill="white" fontFamily="Arial, sans-serif" fontSize="7" fontWeight="700">
            AMEX
          </text>
        </svg>
      );
    case "paypal":
      return (
        <svg className={className} viewBox="0 0 48 20" aria-hidden="true">
          <text x="3" y="14" fill="#003087" fontFamily="Arial, sans-serif" fontSize="10" fontStyle="italic" fontWeight="700">
            PayPal
          </text>
        </svg>
      );
    case "apple-pay":
      return (
        <svg className={className} viewBox="0 0 48 20" aria-hidden="true">
          <path
            d="M16.2 7.2c.7-.8 1.2-1.9 1.1-3.1-1 .1-2.1.7-2.8 1.5-.6.7-1.2 1.8-1.1 2.9 1.1.1 2.1-.5 2.8-1.3Zm1.7 1.7c-1.5-.1-2.8.9-3.5.9-.7 0-1.8-.9-3-.9-1.5 0-2.9.9-3.6 2.3-1.6 2.8-.4 6.9 1.1 9.2.8 1.1 1.7 2.4 2.9 2.3 1.2-.1 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.1-1.1 2.9-2.2.9-1.3 1.3-2.5 1.3-2.6-.1 0-2.4-.9-2.4-3.5 0-2.2 1.8-3.2 1.9-3.3-1-.9-2.2-1.2-2.7-1.2Z"
          />
          <text x="22" y="14" fill="currentColor" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="600">
            Pay
          </text>
        </svg>
      );
  }
}