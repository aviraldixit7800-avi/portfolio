# Aviral Dixit — Portfolio

A recruiter-first portfolio with a cinematic, colorful visual system and an optional Three.js exploration world. The accessible portfolio is the default; the Three.js module is downloaded and initialized only when a visitor chooses **Explore 3D**.

## Run locally

This project uses browser JavaScript modules, so serve it over HTTP instead of opening `index.html` directly.

1. Install Python 3 if it is not already installed.
2. Open a terminal in the project directory: `cd C:\portfolio2`
3. Start the local server: `py -m http.server 8000`
4. Visit `http://localhost:8000` in a modern browser.

The page uses a Google Fonts stylesheet and loads Three.js from jsDelivr on demand. Internet access is required for those remote resources. The HTML, CSS, and normal portfolio experience are local.

## Use the portfolio

- Browse the regular sections using the persistent desktop navigation (or the mobile menu).
- **Enter portfolio** takes you to the projects; the About, Skills, Education, Achievements, and Contact sections are also directly reachable.
- **Explore 3D world** opens the optional third-person world. Use **WASD / arrow keys** to move, **mouse** to look, **Shift** to sprint, **Space** to jump, and **E** to interact. Press **Escape** to close a panel or release mouse capture. Use the destination menu for direct travel.
- **Experience settings** supports reduced motion, disabling 3D, and a performance mode. Devices with fewer resources or touch input start in performance mode.
- The contact form validates its fields. Without a configured email it does not claim to send anything; it explains the missing setup.

## Add real personal links and project details

Edit `profileLinks` in `js/portfolio.js` to add an email, verified GitHub and LinkedIn URLs, and a resume file path. Put a resume PDF under `assets/` and set `resume` to its relative URL (for example, `./assets/aviral-dixit-resume.pdf`). The contact form will then open the visitor's email application with a prefilled message; it does not transmit or store form data.

Add only real project repositories and live demos to `projectLinks`, keyed by their displayed project names:

```js
export const projectLinks = {
  Placify: {
    github: "https://github.com/your-name/placify",
    demo: "https://your-real-demo.example"
  }
};
```

Project descriptions, focus areas, and stack labels are in `portfolio.projects.projects`. The project artwork is explicitly identified as illustration, not product screenshots. Update the project data with verified details when available. Achievements are data-driven in `portfolio.achievements.achievements`, so additional confirmed milestones can be added there.

No email address, social profile, repository, live demo, resume, project implementation detail, or achievement has been fabricated.

## Structure

```text
index.html
README.md
css/
  style.css          Shared visual tokens, header and cinematic landing section
  portfolio.css      Portfolio sections, project art and footer
  responsive.css     Tablet and mobile layouts
  game-ui.css        HUD, exploration menu and interactive-world panels
js/
  main.js            Portfolio navigation, settings, contact form, lazy 3D entry
  portfolio.js       Editable profile, project, achievement and link data
  ui.js              Accessible world navigation and information panels
  explore.js         Optional 3D experience and animation loop
  world.js           Procedural environment, buildings, lights and beacons
  player.js          Avatar, movement and jump
  camera.js          Third-person camera and mouse look
  interactions.js    Proximity detection and interaction handling
assets/
  (Add verified resume, images, models or other media here)
```

The world is procedural and currently uses simple generated geometry, canvas signs, and a low particle count; there are no external model or texture files to replace.
