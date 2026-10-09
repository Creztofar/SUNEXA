# SUNEXA — Ideas to Impact

## Scope
Maintain the supplied `SUNEXA.html` as the faithful, static, responsive homepage while extending the same project with dedicated service, contact, and enquiry routes. Preserve the existing content, visual treatment, portfolio behavior, and client-side interaction behavior.

## Implementation
- `index.html` contains the supplied homepage, embeds the route mount and loads the dedicated-page assets without replacing the original experience.
- `routes.js` provides route-aware rendering for `/start-project`, `/contact`, and the six service pages, with direct-refresh support through the existing static fallback server.
- `routes.css` extends the existing SUNEXA visual system with mobile-first route shells, service content layouts, and the multi-step enquiry form.
- `server.js` serves the static assets and falls back to `index.html` for extensionless nested routes.
- `manus-routes.json` declares `/`, `/start-project`, `/contact`, and all six service routes.
- The new enquiry flow reuses the existing configured Web3Forms endpoint and only reports success after the API returns a successful response; no new private credentials are introduced.

## Design direction
- **Design movement:** premium editorial digital-studio / neo-brutalist restraint.
- **Core principles:** confident typography, deliberate negative space, tactile grain and brass details, and interactions that feel precise rather than ornamental.
- **Color philosophy:** deep charcoal creates authority; warm bone keeps the experience human and legible; brass acts as the owned signal for craft and momentum.
- **Layout paradigm:** long-form narrative scrolling with asymmetric editorial grids, full-bleed dark chapters, anchored section transitions, and a strong vertical rhythm.
- **Signature elements:** brass progress lines, perspective hero grid/prism treatments, and ambient grain/dust atmosphere.
- **Interaction philosophy:** reveal information progressively through scroll, hover, accordions, and deliberate micro-motion without compromising access to content.
- **Animation:** loader curtain and wordmark entrance, scroll reveals, hero spotlight/perspective response, service auto-advance until interaction, progress-linked process steps, tilt frames, and magnetic controls; reduced-motion preferences are respected.
- **Typography:** Fraunces for expressive display headlines and wordmark, Archivo for body/UI text, and JetBrains Mono for labels, metadata, and uppercase microcopy.
- **Brand essence:** a digital studio turning ambitious business ideas into dependable digital experiences; precise, warm, and quietly bold.
- **Brand voice:** direct, assured, and human. Example lines: “Ideas to impact.” and “Build something that earns its place.”
- **Wordmark & logo:** the SUNEXA wordmark is paired with a refined serif S monogram inside a fine square frame.
- **Signature brand color:** brass `#C58A4A`.

## Responsive implementation
The single responsive codebase uses mobile-first hardening rules for 320px, 360px, 375px, 390px, 414px, 430px, 768px, 1024px, and 1280px+ viewports. Navigation collapses to the existing animated hamburger menu; its links close the menu after navigation, the closed panel is pointer- and keyboard-inert, and touch targets remain comfortable. Hero typography, calls to action, stage visuals, portfolio layouts, pricing cards, forms, accordions, footer content, and live-preview modal controls scale without horizontal overflow. Decorative motion is reduced or removed on small screens, images stay contained, and the existing `prefers-reduced-motion` behavior is preserved.

## Project structure
- `/index.html` — complete homepage plus route integration points.
- `/routes.js` — dedicated page renderer and multi-step enquiry workflow.
- `/routes.css` — dedicated route and form styling.
- `/server.js` — minimal preview/static server.
- `/manus-routes.json` — route manifest.
- `/plan.md` — implementation and design record.
- `/TODO.md` — outcome criteria and delivery status.
