# Forvo Audio Pronunciation App

A web application for accessing word pronunciations from the Forvo API. This application allows users to search for word pronunciations in multiple languages, listen to them, and download the audio files.

## Features

- **Multiple Language Support**: Search for pronunciations in English, Spanish, French, German, Italian, Russian, Ukrainian, and Latvian.
- **Audio Playback**: Listen to native speaker pronunciations directly in the browser.
- **Download Option**: Download audio files for offline use.
- **Dark Mode**: Switch between light and dark themes for comfortable viewing in any environment.
- **Localization**: Interface available in English and Ukrainian.

## Technologies Used

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Forvo API](https://api.forvo.com/)

## Prerequisites

Before you begin, ensure you have:

- Node.js 18.x or later
- npm or yarn or pnpm or bun
- A Forvo API key (obtain from [Forvo API](https://api.forvo.com/))

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/forvo-audio-app.git
   cd forvo-audio-app
   ```

2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Create a `.env.local` file in the project root and add your Forvo API key:
   ```
   NEXT_PUBLIC_FORVO_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Select your interface language from the dropdown in the top left.
2. Toggle between light and dark themes using the theme toggle in the top right.
3. Enter a word you want to hear pronounced in the input field.
4. Select the language of the pronunciation from the dropdown menu.
5. Click the "Get Audio" button to fetch pronunciations.
6. Listen to the pronunciations using the audio player.
7. Download any pronunciation by clicking the "Download" button.

## Project Structure

- `app/` - Next.js app router files
- `components/` - React components
- `context/` - React context providers for theme and localization
- `locales/` - Translation files for different languages
- `public/` - Static assets
- `app/api/forvo/` - API route that communicates with the Forvo API

## Customization

### Adding More Languages

To add more interface languages:

1. Create a new translation file in the `locales/` directory following the pattern of existing files.
2. Update the `LanguageSelector.tsx` component to include the new language option.

To add more pronunciation languages:

1. Update the `languages` object in `ForvoAudioApp.tsx` to include additional language codes and names.

### Styling

The application uses Tailwind CSS for styling. You can modify the appearance by:

1. Updating the `tailwind.config.mjs` file for theme changes.
2. Editing the `app/globals.css` file for global styles.
3. Modifying component styles in their respective files.

## Deployment

This application can be easily deployed to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fforvo-audio-app)

Alternatively, you can build the application for production:

```bash
npm run build
npm run start
# or
yarn build
yarn start
# or
pnpm build
pnpm start
# or
bun build
bun start
```

## License

[MIT](LICENSE)

## Acknowledgements

- [Forvo](https://forvo.com/) for providing the pronunciation API
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
