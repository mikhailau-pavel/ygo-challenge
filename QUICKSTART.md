# 🚀 Quick Start Guide

Get your Weather Dashboard running in 3 simple steps!

## Step 1: Get Your API Key (2 minutes)

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Click **"Sign Up"** (it's free!)
3. After login, go to **"API keys"** tab
4. Copy your API key

## Step 2: Configure Your Project (30 seconds)

Open the `.env` file in the root folder and paste your API key:

```bash
API_KEY=paste_your_key_here
```

**Example:**
```bash
API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

## Step 3: Run the App (1 minute)

```bash
npm install
npm run dev
```

That's it! 🎉

Open your browser to `http://localhost:5173`

---

## What You'll See

### Light Mode
```
┌─────────────────────────────────┐
│     Weather Dashboard     [🌙]  │
│                                 │
│  ┌──────────────────┬────────┐ │
│  │ Enter city...    │ Search │ │
│  └──────────────────┴────────┘ │
│                                 │
│  ┌──────────────────────────┐  │
│  │ 🌍 City: Berlin          │  │
│  │     15°C                 │  │
│  │     Cloudy               │  │
│  └──────────────────────────┘  │
└─────────────────────────────────┘
```

### Dark Mode (click the moon icon)
```
┌─────────────────────────────────┐
│     Weather Dashboard     [☀️]  │
│  (Dark background)              │
│  All text in light colors       │
│  Smooth transition animation    │
└─────────────────────────────────┘
```

## Try These Actions

1. **Search for cities:**
   - Type "London" and press Enter
   - Type "Tokyo" and watch the debounced search
   - Type "Paris" to see the loading spinner

2. **Toggle dark mode:**
   - Click the sun/moon icon
   - Refresh the page - your choice is saved!

3. **See error handling:**
   - Search for "qwertyuiop" (invalid city)
   - Leave the input empty and search

## Features at a Glance

| Feature | Status |
|---------|--------|
| Real-time weather data | ✅ |
| City search | ✅ |
| Debounced input (500ms) | ✅ |
| Loading spinner | ✅ |
| Error messages | ✅ |
| Dark mode | ✅ |
| Smooth animations | ✅ |
| Responsive design | ✅ |
| Keyboard support (Enter) | ✅ |

## Troubleshooting

### Problem: "API key not configured"
**Solution:** Make sure you added your API key to the `.env` file and restarted the dev server.

### Problem: "City not found"
**Solution:** Check the spelling or try a major city like "London" or "New York".

### Problem: Page won't load
**Solution:** 
```bash
# Stop the server (Ctrl+C)
# Remove cache
rm -rf .svelte-kit
# Restart
npm run dev
```

## Need Help?

1. Check `SETUP.md` for detailed instructions
2. Read `PROJECT_SUMMARY.md` for technical details
3. Review `README.md` for project overview

## Production Build

Ready to deploy?

```bash
npm run build
npm run preview
```

The app is configured for Vercel deployment out of the box!

---

**Enjoy your Weather Dashboard! 🌤️**

