import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        /* Blue */
        --blue-50: #eff6ff;
        --blue-400: #60A5FA;
        --blue-500: #3B82F6;
        --blue-600: #2563EB;

        /* Gray */
        --gray-50: #f9fafb;
        --gray-100: #f3f4f6;
        --gray-200: #e5e7eb;
        --gray-300: #D1D5DB;

        /* Neutral */
        --neutral-500: #737373;
        --neutral-600: #525252;
        --neutral-700: #404040;

        /* Red */
        --red-600: #E11D48;

        /* Lime */
        --lime-600: #65A30D;

        /* Slate */
        --slate-600: #475569;
        --slate-700: #334155;
        --slate-800: #1E293B;
        --slate-900: #0F172A;

        --backdrop-color: rgba(0, 0, 0, 0.08);
        --bg-gradient-blue: linear-gradient(90deg, rgba(30,58,138,1) 19%, rgba(37,99,235,1) 88%);
    }

    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
        font-size: 14px;
    }

    @media only screen and (min-width: 1064px) {
        body {
            font-size: 16px;
        }
    }
`;

export default GlobalStyles;
