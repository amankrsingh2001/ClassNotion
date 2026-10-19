# ClassNotion workspace design

Reference: [AI Assistant Dashboard Design by Nixtio](https://dribbble.com/shots/26496959-AI-Assistant-Dashboard-Design).

The implementation adopts a pale lavender outer canvas, an inset paper surface,
small circular icon navigation, a quiet utility sidebar, and dark pill buttons.
It retains course discovery, educator profiles, student/instructor signup, the
India phone-code default, and persistent light/dark mode. There are no simulated
AI controls or fabricated learning statistics.

On smaller screens, the icon navigation becomes a horizontal row. Signup hides
its illustrative side panel so the complete form takes priority. Short screens
can still scroll rather than hiding required fields. The layouts have no fixed
content clipping or CSS scaling of forms.

## Current decorative UI

Auth and the discovery sidebar now use an image-free CSS sculpture: interlocking
sage and lilac rings, a frosted central tile, a fine grid, and typographic labels.
The auth panel has separate light/dark palettes. Motion respects reduced-motion
preferences. Decorative elements are hidden from assistive technology; course
and educator links remain functional. Mobile prioritizes the form and uses a
small CSS accent.

## Archived original illustration (no longer displayed)

Built-in imagegen tool; project asset:
`public/assets/illustrations/learning-companion.png` (RGBA PNG, transparent).
The generation is an original companion, not a copy of the reference character.

Final prompt:

> Use case: stylized-concept. Asset: an original friendly 3D learning companion for an elegant online course website, isolated on a genuinely transparent background. Single small premium white ceramic floating robot, rounded compact head and pear-shaped body, sophisticated polished midnight-blue glass face visor with two expressive soft cyan eyes, tiny lavender side accents, small rounded hands holding an open cream-colored book, subtle happy curious expression. Three-quarter view, full body centered, large enough to read at 220px. Soft natural studio lighting, beautifully rendered porcelain and brushed metal, tasteful cute but professional SaaS illustration. Robot has no wheels, no feet, hovering quietly. Include a little natural soft contact shadow only. Original design, do not imitate an existing character. No text, letters, logos, UI, scenery, colored backdrop, frame, or watermark. Generous transparent padding around the character. Color palette white ceramic, very pale lavender, deep charcoal navy, cyan eyes.
