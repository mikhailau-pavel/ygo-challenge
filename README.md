# Weather Dashboard

A modern, responsive weather dashboard built with SvelteKit and TailwindCSS.

## Features

- 🌤️ Real-time weather data from OpenWeatherMap API
- 🔍 City search with debounced input
- ⚡ Loading states with smooth animations
- ❌ User-friendly error handling
- 🌓 Dark mode support
- 📱 Fully responsive design
- ✨ Smooth transitions and animations
- 🎨 Pixel-perfect TailwindCSS styling

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
```
API_KEY=your_openweathermap_api_key_here
```

You can get a free API key from [OpenWeatherMap](https://openweathermap.org/api).

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## Technologies Used

- SvelteKit 2
- Svelte 5 (with runes)
- TailwindCSS 4
- TypeScript
- OpenWeatherMap API

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── WeatherCard.svelte
│   │   ├── LoadingSpinner.svelte
│   │   ├── ErrorMessage.svelte
│   │   └── ThemeToggle.svelte
│   ├── stores/
│   │   └── theme.svelte.ts
│   └── utils/
│       └── debounce.ts
└── routes/
    ├── api/
    │   └── weather/
    │       └── +server.ts
    ├── +layout.svelte
    └── +page.svelte
```

## Features Implementation

### API Route
- Server-side API route at `/api/weather?city=Berlin`
- Fetches data from OpenWeatherMap API
- Returns JSON with city name, temperature, and condition
- Proper error handling with appropriate HTTP status codes

### Weather Search
- Debounced search input (500ms delay)
- Real-time search as you type (after initial search)
- Keyboard support (Enter key to search)

### UI/UX
- Loading spinner during API calls
- Error messages for failed requests or invalid cities
- Smooth slide and fade transitions
- Dark mode toggle with localStorage persistence
- Responsive design that works on all screen sizes

## License

MIT
