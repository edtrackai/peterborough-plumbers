"use client";

import { useSearchParams } from "next/navigation";
import BookingForm from "@/components/forms/BookingForm";
import { services } from "@/content/services";

export default function BookingFormWrapper() {
  const searchParams = useSearchParams();
  const serviceSlug = searchParams.get("service");
  const preselected = serviceSlug
    ? services.find((s) => s.slug === serviceSlug)?.name
    : undefined;

  return <BookingForm preselectedService={preselected} />;
}
