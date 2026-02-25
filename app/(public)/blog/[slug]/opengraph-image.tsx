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
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: { title: true, category: true },
  });

  const title = post?.title ?? "Peterborough Plumbers Blog";
  const category = post?.category ?? "Plumbing Advice";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#1A2744",
          padding: "60px 80px",
        }}
      >
        {/* Category tag */}
        <div
          style={{
            display: "flex",
            backgroundColor: "#00A89C",
            color: "white",
            padding: "8px 20px",
            borderRadius: "20px",
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "32px",
            width: "fit-content",
          }}
        >
          {category}
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: "52px",
            fontWeight: 700,
            lineHeight: 1.25,
            flex: 1,
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            borderTop: "3px solid #00A89C",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", color: "#00A89C", fontSize: "22px", fontWeight: 700 }}>
            Peterborough Plumbers
          </div>
          <div style={{ display: "flex", color: "rgba(255,255,255,0.45)", fontSize: "18px" }}>
            Gas Safe Registered · Est. 30+ Years
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
