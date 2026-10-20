# Hero "Living Circuit" — plan

## What visitors will see
- Headline, copy and buttons appear instantly (no fade-in, no loader).
- Beside the headline (desktop) or below it (mobile), your original Circuit K (uploaded SVG, unchanged shapes and colors) draws itself line by line, then the lime IQ node pulses with rings.
- Four signal lines shoot from the IQ node to product nodes: Seenzo, KlivIQ Connect, KlivIQ TryOn, ClinicPing. Whole intro ends within 2.5s.
- Hover (desktop) or tap (mobile) a node to open a small live demo card:
  - Seenzo: score dial counting 34 to 82
  - Connect: WhatsApp bubble typing a Tamil reply
  - TryOn: stylised model silhouette with a saree pattern swapping on (drawn shapes, no people photos)
  - ClinicPing: appointment row with a no-show risk flag sliding in
- A faint pulse keeps travelling the circuit; nodes drift slightly toward the cursor (desktop only).
- Scrolling down, the circuit unfolds into the Products section, tied to scroll position.
- Phones: simpler draw and pulse, no cursor drift, tap to open demos.
- Reduced-motion setting: static finished logo and lines; demos open without animation.
- Old animated particle background removed from the hero.

## No flash, no jump (chosen approach)
The line-by-line draw of the K starts from the page's own built-in styling the moment the page appears, so it does not wait for any script to load. It always ends on the finished logo, so even if scripts fail the logo is complete. The animation script then picks up from that finished state (ring pulse, signal lines, demos, scroll unfold) — nothing is hidden, reset or redrawn, so there is no "static, disappear, redraw" moment. The logo box has a fixed size, so nothing shifts.

## Demo text for your review (please confirm or correct)

Connect — customer message and the typed reply:
- Customer (Tamil): "இன்னைக்கு கடை எத்தனை மணி வரை திறந்திருக்கும்?"
- Reply (Tamil): "வணக்கம்! இன்று இரவு 9 மணி வரை திறந்திருக்கோம். உங்களுக்காக ஏதாவது எடுத்து வைக்கட்டுமா?"
- (Shown in Tamil in all three languages, since the demo itself is about Tamil replies.)

Card labels:

| English | Tamil | Hindi |
|---|---|---|
| AI visibility score | AI தெரிவுநிலை மதிப்பெண் | AI विज़िबिलिटी स्कोर |
| Before / After | முன் / பின் | पहले / बाद में |
| Replying on WhatsApp… | WhatsApp-ல் பதில் தருகிறது… | WhatsApp पर जवाब दे रहा है… |
| Try the saree on | சேலையை அணிந்து பாருங்கள் | साड़ी पहनकर देखें |
| Next appointment, 4:30 PM | அடுத்த சந்திப்பு, மாலை 4:30 | अगला अपॉइंटमेंट, शाम 4:30 |
| High no-show risk — reminder sent | வராமல் போகும் வாய்ப்பு அதிகம் — நினைவூட்டல் அனுப்பப்பட்டது | न आने का जोखिम ज़्यादा — रिमाइंडर भेजा गया |
| Tap a node to see it work | செயல்பாட்டைப் பார்க்க ஒரு புள்ளியைத் தொடுங்கள் | काम करते देखने के लिए किसी नोड पर टैप करें |
| See product | தயாரிப்பைப் பார்க்க | प्रोडक्ट देखें |

Product names stay in English.

## Technical details
- Add `animejs` v4. Inline the uploaded SVG geometry (viewBox 0 0 100 100, existing colors) in `src/components/hero/LivingCircuit.tsx`; product nodes and signal lines extend from the IQ node (76,82) in an enlarged viewBox around the mark.
- Initial draw is CSS `stroke-dashoffset` keyframes in the prerendered SVG (pathLength="1"), disabled under `prefers-reduced-motion`. Anime.js (lazy-loaded on idle, outside the critical path) starts only after the CSS draw ends, using `svg.createDrawable` for signal lines, `createTimeline` for rings, `createTimer`/loop for ambient pulse, `onScroll` synced to scroll progress for the unfold.
- `CircuitDemoCard.tsx` holds the four demos; strings added to `ta.json`/`hi.json` after your confirmation.
- `src/pages/Index.tsx` hero: remove `CanvasBackground` and the framer-motion entrance animations that start the headline hidden; delete `CanvasBackground.tsx` (only used here).
- Verify: build, Playwright 390px and 1280px (draw, tap demo, reduced motion, no console errors), Lighthouse mobile 90+.
- Update memory: anime.js hero circuit replaces canvas particles.
