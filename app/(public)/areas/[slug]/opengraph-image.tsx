import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = await prisma.area.findUnique({
    where: { slug },
    select: { name: true, seoDescription: true },
  });

  const areaName = area?.name ?? "Peterborough Area";
  const description = area?.seoDescription ?? "Local plumbing and heating services";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#242424",
          padding: "60px 80px",
        }}
      >
        {/* Tag */}
        <div
          style={{
            display: "flex",
            backgroundColor: "#C8102E",
            color: "white",
            padding: "8px 20px",
            borderRadius: "20px",
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "32px",
            width: "fit-content",
          }}
        >
          Area We Cover
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: "56px",
            fontWeight: 700,
            lineHeight: 1.2,
            flex: 1,
          }}
        >
          Plumber in {areaName}
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.6)",
            fontSize: "24px",
            lineHeight: 1.4,
            marginBottom: "32px",
          }}
        >
          {description}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            borderTop: "3px solid #C8102E",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", color: "#C8102E", fontSize: "22px", fontWeight: 700 }}>
            Peterborough Plumbers
          </div>
          <div style={{ display: "flex", color: "rgba(255,255,255,0.4)", fontSize: "18px" }}>
            Gas Safe · Fully Insured · Local Engineers
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
