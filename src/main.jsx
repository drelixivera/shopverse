import { StrictMode } from 'react' // checks code for mistakes and warn you about them in the console, catching mistakes befor they beecome bugs.
import { createRoot } from 'react-dom/client' // the function that starts the react app.
import './index.css' // this imports the global styles (Tailwind CSS) and apply the styling rules to every page in the app.
import App from './App.jsx' // imports the main componets, contains the main structure of the site

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// document.getElementById('root') - this finds the element that the id matches, the targeted element serve as a container where React will put everything through the help of the render method.

// createRoot(...) - Create a react root inside the targeted container.

// .render(...) - Tells react, draw the app inside this root

// <StrictMode> - Wraps the app in development checks

//<App /> - Renders the app component