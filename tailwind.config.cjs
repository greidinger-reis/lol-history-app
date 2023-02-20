/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    //@ts-expect-error "Wtf"
    plugins: [require("daisyui")],

    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#6585E7",
                    "secondary": "#f9575c",
                    "accent": "#28ba52",
                    "neutral": "#2A323C",
                    "base-100": "#f1f5f9",
                    "info": "#6585E7",
                    "success": "#28ba52",
                    "warning": "#ECCA22",
                    "error": "#F2413A",
                    "--rounded-box": "0.25rem", // border radius rounded-box utility class, used in card and other large boxes
                    "--rounded-btn": "0.25rem", // border radius rounded-btn utility class, used in buttons and similar element
                    "--rounded-badge": "0.25rem", // border radius rounded-badge utility class, used in badges and similar
                    "--animation-btn": "0.3s", // duration of animation when you click on button
                    "--animation-input": "0.3s", // duration of animation for inputs like checkbox, toggle, radio, etc
                    "--btn-text-case": "capitalize", // set default text transform for buttons
                    "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
                    "--border-btn": "1px", // border width of buttons
                    "--tab-border": "1px", // border width of tabs
                    "--tab-radius": "0.25rem", // border radius of tabs
                },
            },
        ],
    },
};
