# Codepati Arena Design System

This guide documents the visual and interaction language used by the KBC event page at `app/(main)/event-kbc/page.tsx`. Use it when adding a section, extending an existing component, or creating a new page in the Codepati Arena experience.

## Product Feel

Codepati Arena should feel like a premium technical competition: focused, energetic, cinematic, and precise. The visual language combines a dark arena backdrop, bright yellow competition accents, restrained violet atmosphere, glass surfaces, strong typography, and deliberate motion.

The page should feel:

- Competitive, but not aggressive
- Technical, but still approachable
- Premium, but not ornamental
- Dynamic, but never distracting
- Structured for fast scanning on mobile and desktop

Do not introduce a separate visual direction inside the KBC experience. New sections should look like they belong to the same event page at first glance.

## Page Composition

The current event page is assembled in this order:

```tsx
<KbcHeader />
<KbcHero />
<EventIntroduction />
<KbcJourney />
<EventFaq />
<KbcFooter />
```

The component files live in `components/event-kbc/`:

| Component | Responsibility | Anchor |
| --- | --- | --- |
| `kbc-header.tsx` | Fixed navigation, brand, desktop links, mobile menu, registration CTA | `#home` |
| `kbc-hero.tsx` | First-viewport event statement, metadata, primary CTA, arena visual | `#home` |
| `kbc-intro.tsx` | Event explanation, stats, highlights, secondary CTA | `#about` |
| `kbc-journey.tsx` | Four competition stages and progression CTA | `#rounds` |
| `kbc-faq.tsx` | Filterable, expandable event questions | `#faqs` |
| `kbc-footer.tsx` | Final CTA, navigation, contact information, social links | footer |

`EventCTA` and `KbcAbout` are currently imported in the route file but are not mounted. Do not assume an imported component is part of the visible page until it is included in the JSX composition.

## Tokens

Prefer these existing values before creating new ones.

### Color

| Token | Value | Use |
| --- | --- | --- |
| Arena background | `#100B25` | Main section background |
| Footer background | `#0B081A` | Footer and deepest contrast |
| Deep surface | `#17102F` | Cards, menus, secondary panels |
| Violet surface | `#26154F` | CTA banners and featured panels |
| Yellow accent | `#FACC15` / Tailwind `yellow-300` | CTAs, icons, active states, key words |
| Yellow hover | `#FEF08A` / Tailwind `yellow-200` | CTA hover state |
| Primary text | `text-white` | Headings and important values |
| Secondary text | `text-white/55` to `text-white/65` | Body copy |
| Quiet text | `text-white/30` to `text-white/45` | Metadata, labels, supporting copy |
| Subtle border | `border-white/10` | Default card and navigation border |
| Accent border | `border-yellow-300/15` to `/30` | Featured cards and active emphasis |

Avoid introducing a new accent color unless the content requires it. Violet may be used for ambient glows and surfaces; yellow remains the only primary action color.

### Typography

The main layout loads Montserrat through `next/font/google` and exposes `font-montserrat`. Use the existing font rather than adding another font per component.

- Display headings: `font-black`, tight leading, `tracking-tight` or a deliberate negative tracking value.
- Section eyebrow: `text-xs font-bold uppercase tracking-[0.18em]` to `tracking-[0.22em] text-yellow-300`.
- Body copy: `text-sm leading-7 text-white/50` or `text-base leading-8 text-white/60`.
- Card titles: `font-bold` or `font-black`, usually `text-base` to `text-2xl`.
- Metadata: `text-[10px]` or `text-xs`, uppercase, semibold, wide tracking.
- Large numbers: `font-black tabular-nums text-yellow-300`.

Use line breaks intentionally in large headings. A highlighted phrase should usually be a `<span className="text-yellow-300">...</span>` rather than a new color treatment.

### Shape and Surface

- Main content width: `max-w-7xl mx-auto`.
- Narrow reading width: `max-w-xl` to `max-w-3xl`.
- Section spacing: `px-5 py-24 sm:px-8 lg:px-12 lg:py-32`.
- Primary panels: `rounded-3xl` or `rounded-[2rem]`.
- Small controls: `rounded-xl` or `rounded-2xl`.
- Pills and CTAs: `rounded-full`.
- Glass surface: `border border-white/10 bg-white/[0.03]` or `bg-white/[0.04]` with `backdrop-blur` where appropriate.
- Featured surface: `bg-gradient-to-br from-[#26154F] to-[#17102F]`.
- Shadows should be soft and dark. Yellow glow is reserved for active or featured elements.

Do not stack cards inside cards without a clear information hierarchy. Use an unframed section wrapper and reserve cards for repeated items, interactive groups, or a genuinely framed feature.

## Layout Rules

1. Every section should have a semantic `<section>` with a stable `id` when it is navigable.
2. Add `aria-labelledby` and connect it to the section heading where practical.
3. Use a centered `max-w-7xl` content wrapper.
4. Use mobile-first grids: one column by default, `sm` or `md` for intermediate layouts, `lg` for four-column or split layouts.
5. Keep touch targets at least approximately 40px high. Existing controls use `py-3` to `py-4` and icon buttons use `h-10 w-10` or larger.
6. Keep text inside cards readable. Let long labels wrap instead of allowing them to overflow.
7. Use `gap-*` for rhythm instead of manually positioned offsets except for decorative elements.
8. Use `min-h` only when equal-height cards improve scanning, as in the journey cards.
9. Keep the first viewport focused: one primary heading, one primary CTA, and one dominant visual idea.

## Component Patterns

### Section Header

Use a short yellow eyebrow, a bold heading, and a muted supporting paragraph.

```tsx
<div className="mx-auto max-w-3xl text-center">
  <p className="text-xs font-bold uppercase tracking-[0.22em] text-yellow-300">
    Section Eyebrow
  </p>
  <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
    Clear section title.
    <br />
    <span className="text-yellow-300">Highlighted outcome.</span>
  </h2>
  <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
    One concise explanation of why this section matters.
  </p>
</div>
```

### Primary CTA

Use a yellow filled pill with dark text and a Lucide directional icon.

```tsx
<Link
  href="/event-kbc/registration"
  className="group inline-flex items-center gap-3 rounded-full bg-yellow-300 px-6 py-3.5 text-sm font-bold text-[#17102F] transition-all duration-300 hover:bg-yellow-200 hover:shadow-[0_0_30px_rgba(250,204,21,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
>
  Register Now
  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
</Link>
```

Use one primary CTA per decision area. Secondary actions should use a transparent border or an unframed text link.

### Repeated Cards

Use data arrays and `.map()` rather than duplicating markup. A repeated card should have:

- A stable key from content data
- An icon or number marker
- A short title
- A bounded description
- One active or hover accent
- Consistent height or content rhythm across siblings

The journey cards are the reference pattern for four-stage content. The intro highlight cards are the reference pattern for compact feature content.

### Interactive Groups

For filters, accordions, menus, and toggles:

- Use a real `<button>` for state changes.
- Expose state with `aria-pressed` or `aria-expanded`.
- Keep keyboard focus visible with a yellow focus ring.
- Do not rely on hover to reveal essential information.
- Animate height or opacity without removing content from the accessibility tree unexpectedly.

The FAQ component is the reference for category filters and expandable answers.

### Icons

Use `lucide-react` icons already used by the page. Icons should support meaning, not replace necessary labels. Decorative icons should include `aria-hidden="true"`; icon-only buttons require an accessible `aria-label`.

Common semantic choices:

- `Trophy`: competition, winner, crown, brand mark
- `Sparkles`: eyebrow, featured moment, event energy
- `ArrowUpRight`: navigation and CTA intent
- `CalendarDays`: event dates
- `MapPin`: location
- `BrainCircuit`: quiz or knowledge
- `Code2`: development or hack stage
- `Lightbulb`: ideas or pitching
- `CircleHelp` / `ChevronDown`: FAQ

## Motion

Motion is part of the Codepati identity, but it must support hierarchy.

### GSAP Sections

Existing client components use this pattern:

1. Mark the component with `"use client"`.
2. Store the section in a `useRef<HTMLElement>(null)`.
3. Use `useLayoutEffect` for GSAP setup.
4. Scope animations with `gsap.context(() => ..., section)`.
5. Return `context.revert()` during cleanup.
6. Check `prefers-reduced-motion` before animating.
7. Use `ScrollTrigger` with `once: true` for reveal animations.

Recommended motion vocabulary:

- Reveal: opacity `0` to `1`, y `20` to `0`
- Stagger: `0.08` to `0.13` seconds
- Reveal duration: `0.6` to `0.85` seconds
- Hover lift: `hover:-translate-y-1` or `hover:-translate-y-2`
- Ambient glow: slow `4` to `5` second sine easing, repeated and yoyoed
- Decorative orbit: slow linear rotation, never required for comprehension

Avoid animating every element independently. Animate groups with shared class names such as `section-animate`, `section-card`, or `section-heading`.

### CSS Motion

The registration countdown uses CSS keyframes in `app/globals.css` for staggered card entrance and a restrained seconds-card pulse. New global keyframes should be named with a clear feature prefix and include a reduced-motion override.

Never make motion the only way a user can discover content. The static state must remain complete and legible.

## Background Treatment

Sections may use:

- A solid `#100B25` or `#0B081A` base
- A low-opacity yellow grid
- One or two large blurred yellow/violet ambient glows
- Thin yellow orbit lines or divider lines
- Gradient feature panels

Decorative layers should be `pointer-events-none`, `aria-hidden="true"`, and placed behind content. Keep opacity low enough that text contrast remains strong. Avoid adding multiple unrelated decorative shapes to a small section.

## Accessibility Checklist

Before considering a new component complete:

- Use semantic headings in order.
- Give every section a meaningful heading.
- Add `aria-label` to icon-only controls.
- Add `aria-expanded` to accordions and menus.
- Add `aria-pressed` to filter buttons.
- Keep `focus-visible` styling visible against the dark background.
- Mark decorative icons and glows as hidden from assistive technology.
- Ensure links have meaningful text.
- Respect `prefers-reduced-motion`.
- Check yellow text and muted text against the dark background.
- Test the layout at a narrow mobile width and a wide desktop width.

## New Component Recipe

When adding a new KBC section:

1. Create `components/event-kbc/kbc-[section].tsx`.
2. Start with a semantic `<section>` and a stable `id`.
3. Add `"use client"` only if the component needs state, GSAP, browser APIs, or event handlers.
4. Reuse the section header, container, surface, CTA, icon, and motion patterns above.
5. Keep content in typed arrays when rendering repeated items.
6. Add reduced-motion behavior for every custom animation.
7. Mount the component in `app/(main)/event-kbc/page.tsx` in the page's narrative order.
8. Add or update a header/footer anchor if users need to navigate to it.
9. Run `npm run build` after the change.
10. Check mobile wrapping, keyboard focus, and the reduced-motion state.

A minimal section shell:

```tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles } from "lucide-react";

export default function KbcNewSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".new-section-animate", { clearProps: "all" });
        return;
      }

      gsap.from(".new-section-animate", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="new-section"
      aria-labelledby="new-section-heading"
      className="relative overflow-hidden bg-[#100B25] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="new-section-animate mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-yellow-300">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            New Section
          </p>
          <h2
            id="new-section-heading"
            className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Section title.
          </h2>
        </div>
      </div>
    </section>
  );
}
```

If the section only displays static content, omit `"use client"` and GSAP entirely.

## Validation

Use the project scripts:

```powershell
npm run build
```

For a focused component check:

```powershell
npx eslint "components/event-kbc/kbc-[section].tsx"
```

The stylesheet uses Tailwind v4 directives, so editor CSS diagnostics for `@theme`, `@apply`, and `@custom-variant` may appear even though the Next production build handles them correctly. Treat the production build as the authoritative stylesheet validation.

## Content Rules

- Use event language consistently: `Codepati`, `Codepati Crown`, `Tech Quiz`, `Hack It`, `Pitch It`.
- Prefer short, confident copy over marketing filler.
- Keep labels in sentence case unless they are metadata or an eyebrow.
- Use periods in short campaign phrases where the design treats them as statements: `Think. Build. Pitch.`
- Do not invent dates, eligibility details, prizes, or registration rules without a confirmed source.
- Keep contact links and event anchors synchronized with the footer and header.

## Definition of Done

A new KBC component is ready when it:

- Looks native to the dark arena theme.
- Uses the established type scale, spacing, surfaces, and yellow accent.
- Works on mobile and desktop without overflow.
- Has semantic structure and keyboard-accessible controls.
- Handles reduced motion.
- Fits the event page narrative and navigation.
- Passes `npm run build`.
