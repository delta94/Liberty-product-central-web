/* tslint:disable no-unused-expression */

// Global styles

/*
  By default, this file does two things:

  1. Importing `styles.global.scss` will tell Webpack to generate a `main.css`
   which is automatically included along with our SSR / initial HTML. This
   is for processing CSS through the SASS/LESS -> PostCSS pipeline.

  2. It exports a <GlobalStyles /> component which is used by @components/root.tsx
   to add global styles to the React render.
/*

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */

/* Local */

// Import global SASS styles that you want to be rendered into the
// resulting `main.css` file included with the initial render. If you don't
// want a CSS file to be generated, you can comment out this line
// import './normalize.css';
// import './bootstrap.min.css';
// import './fontawesome-all.min.css';
// import './responsive.scss';

// import './styles.global.scss';
// import './normalize.scss';
import './responsive.scss';

// ----------------------------------------------------------------------------

// Inject Styled-Components output onto the page. You can add global styles to
// the template tags below, and will be picked up in @components/root.tsx
// export const GlobalStyles = createGlobalStyle`

//   /* Set a default style for all <h1> tags
//   */
//   h1 {
//     background-color: ${props => props.theme.colors.orange};
//   }
// `;
