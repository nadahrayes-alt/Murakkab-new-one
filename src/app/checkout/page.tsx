import { Suspense } from "react";
import CheckoutView from "@/components/CheckoutView";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <CheckoutView />
    </Suspense>
  );
}
