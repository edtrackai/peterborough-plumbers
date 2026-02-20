# MASTER MULTI-AGENT RUNNER

Load CLAUDE.md and ALL files in .claude/skills/.

Run agents in order:
1) SEO + Content (seo.md, content.md)
2) Schema + Internal Linking (schema.md, internal-linking.md)
3) Images + Performance (images.md, performance.md)
4) Frontend + Backend (frontend.md, backend.md)
5) Analytics + Security (analytics.md, security.md)
6) QA Gate (qa.md)

Rules:
- No redesign (colors/spacing/animations unchanged)
- Minimal diffs
- No fake info in schema
- Performance must not degrade
- Provide plan first, then implement

Output:
- Files touched
- What each agent changed
- QA checklist
- Next steps
