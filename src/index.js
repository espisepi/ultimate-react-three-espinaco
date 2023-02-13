import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';

// Microfrontend hecho a partir del tutorial:
// https://tekinico.medium.com/build-a-react-embeddable-widget-c46b7f7999d8
// https://github.com/nicoraynaud/react-widget

// WEB RTC: https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture#examples

// Find all widget divs
const widgetDivs = document.querySelectorAll('.ultimate-react-three-espinaco, #ultimate-react-three-espinaco');

// Inject our React App into each class
widgetDivs.forEach(div => {
  const root = ReactDOM.createRoot(div);
  console.log(div.dataset.symbol);
  root.render(
    <React.StrictMode>
      <App url={div.dataset.symbol}/>
    </React.StrictMode>
  );
});

// Original tutorial microfronted
// Inject our React App into each class
// widgetDivs.forEach(div => {
//   ReactDOM.render(
//     <React.StrictMode>
//       <App symbol={div.dataset.symbol}/>
//     </React.StrictMode>,
//       div
//   );
// });

// Original react starter
// const root = ReactDOM.createRoot(document.getElementById("ultimate-react-three-espinaco"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

reportWebVitals(sendToVercelAnalytics);
