# Pystyvä koti 360° Learning Simulation

## Purpose

This is a local browser-based 360° learning simulation for exploring wellbeing technology in HAMK’s Pystyvä koti environment.

The simulation is designed as an active professional judgement exercise, not only a passive virtual tour. Learners explore two 360° views, open visible learning hotspots, find hidden observation tasks and reflect on independence, dignity, safety, rehabilitation, communication and care work.

## Files

```text
pystyva-koti-360/
├── index.html
├── style.css
├── app.js
├── README.md
├── vendor/
│   └── three.module.min.js
└── assets/
    ├── pystyva-koti-entrance.jpg
    └── pystyva-koti-centre.jpg
```

The current project already copies the source images into the required asset names:

- `assets/pystyva-koti-entrance.jpg`
- `assets/pystyva-koti-centre.jpg`

## How to run

Start a local HTTP server from this folder:

```bash
python -m http.server 8000
```

Open the app in the browser:

```text
http://localhost:8000
```

Opening `index.html` directly from the file system may cause image or JavaScript module loading problems because of browser security restrictions. A local HTTP server is recommended.

## Controls

- Drag to look around.
- Use mouse wheel to zoom.
- Use arrow keys for small view adjustments.
- Click visible blue hotspots to learn.
- Search for hidden observation tasks in the task list.
- Use **Reveal remaining** if stuck.
- Use **Reset scene** to restart the current scene.
- Press **Escape** to close a popup.

## Hidden tasks

Hidden hotspots are initially almost invisible but have generous clickable areas. When **Reveal remaining** is clicked, unfinished hidden hotspots are shown with an amber outline. Learners still need to click them to complete the tasks and read the feedback.

## Editing hotspots

Hotspots are defined in the `scenes` array in `app.js`. Adjust these fields after testing with the real 360 images:

```js
yaw
pitch
hitWidth
hitHeight
```

### Debug mode for hotspot placement

Press **D** in the browser to toggle debug mode. In debug mode, clicking the panorama logs an approximate `yaw` and `pitch` value to the browser console. Use these values as a starting point for hotspot placement.

Recommended workflow:

1. Run the local server.
2. Open DevTools console.
3. Press **D** to enable debug mode.
4. Click the object or area where a hotspot should be placed.
5. Copy the logged yaw/pitch into `app.js`.
6. Adjust `hitWidth` and `hitHeight` so the clickable area feels natural.
7. Refresh and test again.

## Design principle

Do not build a passive virtual tour. Build an active professional judgement exercise.

Every hotspot should help the learner answer at least one of these questions:

- What need does this technology address?
- For whom is it appropriate?
- What risks or limitations does it have?
- What training or support is needed?
- How does it affect independence, dignity, safety, rehabilitation or care work?
- How would its usefulness be evaluated in real life?
