# Weather Dashboard Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- OpenWeatherMap API key (free tier available)

## Getting Your API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. After signing in, go to "API keys" in your account menu
4. Copy your default API key or generate a new one
5. The free tier allows 60 calls/minute, which is sufficient for development

## Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   
   Open the `.env` file in the root directory and replace the empty string with your API key:
   ```
   API_KEY=your_actual_api_key_here
   ```

   Example:
   ```
   API_KEY=abcd1234efgh5678ijkl9012mnop3456
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   
   Navigate to `http://localhost:5173`

## Testing the Application

### Basic Functionality

1. **Search for a city:**
   - Type a city name in the search box (e.g., "London", "Paris", "Tokyo")
   - Click the "Search" button or press Enter
   - Watch the loading spinner appear
   - See the weather data displayed with temperature and condition

2. **Debounced search:**
   - After your first search, start typing a new city name
   - Notice that the search happens automatically after you stop typing for 500ms
   - This prevents excessive API calls while typing

3. **Dark mode:**
   - Click the sun/moon icon in the top-right corner
   - Watch the smooth transition between light and dark themes
   - Refresh the page - your preference is saved!

4. **Error handling:**
   - Try searching for a non-existent city (e.g., "asdfghjkl")
   - See a user-friendly error message
   - Try searching with an empty input
   - Notice the helpful validation message

### Features Checklist

- ✅ Real-time weather data fetching
- ✅ City search with Enter key support
- ✅ Debounced input (500ms delay)
- ✅ Loading spinner during API calls
- ✅ Error messages for invalid cities
- ✅ Dark mode toggle with persistence
- ✅ Smooth animations and transitions
- ✅ Responsive design (works on mobile, tablet, desktop)
- ✅ Pixel-perfect TailwindCSS styling

## API Endpoint

The application creates a server-side API endpoint:

```
GET /api/weather?city={cityName}
```

**Response format:**
```json
{
  "city": "Berlin",
  "temperature": 15,
  "condition": "Cloudy",
  "description": "broken clouds"
}
```

**Error responses:**
- `400` - Missing city parameter or invalid input
- `404` - City not found
- `500` - Server error or API key not configured

## Troubleshooting

### "API key not configured" error

- Make sure you've created the `.env` file in the root directory
- Verify the API key is set correctly: `API_KEY=your_key_here`
- Restart the development server after changing the `.env` file

### "City not found" error

- Check the spelling of the city name
- Try using the English name of the city
- Some small cities might not be in the OpenWeatherMap database

### Build errors

- Run `npm install` to ensure all dependencies are installed
- Check that you're using Node.js 18 or higher
- Clear the `.svelte-kit` folder and rebuild:
  ```bash
  rm -rf .svelte-kit
  npm run dev
  ```

## Production Build

To build for production:

```bash
npm run build
npm run preview
```

The application uses `@sveltejs/adapter-vercel` by default, making it ready for deployment to Vercel.

## Technology Stack

- **SvelteKit 2** - Full-stack framework
- **Svelte 5** - Component framework with runes
- **TailwindCSS 4** - Utility-first CSS framework
- **TypeScript** - Type safety
- **OpenWeatherMap API** - Weather data provider

## Project Architecture

### Component Structure

```
WeatherCard - Displays weather information with animations
LoadingSpinner - Shows during API calls
ErrorMessage - User-friendly error display
ThemeToggle - Dark mode toggle button
```

### State Management

- `theme.svelte.ts` - Dark mode state with localStorage persistence
- Component-level state using Svelte 5 runes ($state, $effect)

### API Layer

- Server-side route at `/api/weather`
- Handles API key securely on the server
- Proper error handling and status codes

## Next Steps

Consider adding these enhancements:

- 5-day forecast
- Weather icons from OpenWeatherMap
- Geolocation support
- Recent searches history
- Multiple cities comparison
- Temperature unit toggle (Celsius/Fahrenheit)
- Wind speed and humidity display

