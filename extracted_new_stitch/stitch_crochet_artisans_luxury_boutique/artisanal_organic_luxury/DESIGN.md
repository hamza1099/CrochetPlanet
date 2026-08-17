---
name: Artisanal Organic Luxury
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#464840'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#76786f'
  outline-variant: '#c7c7bd'
  surface-tint: '#5b614e'
  primary: '#585e4c'
  on-primary: '#ffffff'
  primary-container: '#717763'
  on-primary-container: '#faffe8'
  inverse-primary: '#c3c9b2'
  secondary: '#8e4d31'
  on-secondary: '#ffffff'
  secondary-container: '#feaa88'
  on-secondary-container: '#783c22'
  tertiary: '#6d593c'
  on-tertiary: '#ffffff'
  tertiary-container: '#877152'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dfe5cd'
  primary-fixed-dim: '#c3c9b2'
  on-primary-fixed: '#181d0f'
  on-primary-fixed-variant: '#434937'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb598'
  on-secondary-fixed: '#370e00'
  on-secondary-fixed-variant: '#71361d'
  tertiary-fixed: '#fbdeb9'
  tertiary-fixed-dim: '#dec29f'
  on-tertiary-fixed: '#271903'
  on-tertiary-fixed-variant: '#564428'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style

The design system is anchored in a "Luxury Cozy" aesthetic, blending high-end editorial sophistication with the tactile, organic warmth of handmade textiles. The brand personality is serene, intentional, and premium, targeting a discerning audience that values slow fashion and craftsmanship.

The visual style is **Minimalist** with **Tactile** influences. It prioritizes heavy whitespace to allow product photography—the intricate textures of crochet—to breathe. The interface should feel like a physical gallery: quiet, spacious, and grounded in natural materials.

## Colors

The palette is derived from natural fibers and botanical dyes. 

- **Background (#FDFBF7):** A soft off-white/cream that acts as the primary canvas, warmer and more inviting than pure white.
- **Primary (#8C927D):** A Muted Sage Green used for primary actions and steady brand presence.
- **Secondary (#C67B5C):** A Soft Terracotta used for highlights, seasonal accents, or meaningful call-to-outs.
- **Tertiary (#D4B996):** A Warm Beige for structural elements like dividers, secondary backgrounds, and subtle borders.
- **Typography (#2D2926):** A deep charcoal-brown rather than pure black to maintain the organic softness.

## Typography

This design system utilizes a high-contrast typographic pairing to signal luxury. 

**Playfair Display** provides an authoritative, elegant serif presence for headlines, echoing the refined nature of the brand. **DM Sans** provides a low-contrast, geometric sans-serif counterpoint for body text, ensuring legibility and a modern, clean feel.

Maintain generous line heights (1.6x) for body text to reinforce the sense of "space" and "calm." Use the `label-caps` style sparingly for product categories or price labels to add an editorial touch.

## Layout & Spacing

The layout philosophy is a **Fixed Grid** with exaggerated margins. 

- **Desktop:** Use a 12-column grid with a maximum width of 1280px. Section vertical spacing should be aggressive (120px+) to force focus on one piece of content at a time.
- **Mobile:** Use a 4-column grid with 20px margins. 
- **Rhythm:** All spacing (padding, margins) must be multiples of the 8px base unit. 

Avoid cluttered "grids of items." Prefer staggered layouts or asymmetric placements that mimic a curated boutique floor.

## Elevation & Depth

Depth is conveyed through **Ambient Shadows** and **Tonal Layers**. Shadows should be barely perceptible, using the primary/secondary colors in the shadow tint to maintain warmth.

- **Low Elevation:** Use 1px borders in Warm Beige (#D4B996) with no shadow for secondary containers.
- **High Elevation (Cards/Modals):** Use a soft, ultra-diffused shadow: `0px 12px 32px rgba(140, 146, 125, 0.08)`. This "Sage-tinted" shadow creates a more organic lift than neutral gray.
- **Backgrounds:** Use subtle shifts between the main Off-White and Warm Beige to define hierarchy without adding visual weight.

## Shapes

The shape language is rounded and soft, echoing the loops and curves of crochet stitches.

- **Standard Elements:** Use `rounded-lg` (1rem) for standard UI components.
- **Product Containers:** Use `rounded-2xl` (1.5rem) for product cards and primary image containers to emphasize the "soft" brand promise.
- **Iconography:** Use soft-ended, medium-stroke icons. Avoid sharp angles or harsh geometric corners.

## Components

### Buttons
- **Primary:** Solid Muted Sage (#8C927D) with white text. Rounded-lg (0.5rem). No heavy gradients; use a subtle darken on hover.
- **Secondary:** Outlined in Warm Beige (#D4B996) with the label in Dark Charcoal.
- **Text Buttons:** Used for "View Details," utilizing the `label-caps` typography with a thin 1px underline.

### Cards
- Product cards should have a subtle Warm Beige background or a soft-tinted shadow. Images must have `rounded-2xl` corners. Keep text metadata (Title, Price) centered or left-aligned with ample padding (min 24px).

### Input Fields & Selects
- Inputs should use a "Warm Beige" border that thickens on focus to "Muted Sage." 
- Currency switchers (PKR/USD) should be minimalist dropdowns or segmented chips with soft rounded corners.

### Lists & Accordions
- Use thin Warm Beige dividers. Ensure interactive areas are large and comfortable. Accordions for "Care Instructions" or "Shipping" should expand with a smooth, eased transition to maintain the serene experience.

### Chips/Tags
- Use for "Handmade," "Organic Cotton," or "New In." These should be small, Pill-shaped (rounded-xl), with a very light tint of the Primary color and Sage text.