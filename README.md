# Recipe Finder

Ever stared into your fridge, clueless about what to cook? This simple app has your back. Built with **React** and powered by the **Spoonacular API**, it lets you search for recipes based on ingredients or dietary preferences. Or, if you’re feeling adventurous, click the **Random Recipe** button and let fate decide what’s for dinner.

## Features
- **Search for Recipes** – Type in ingredients, and the app finds matching recipes. No more "I only have eggs and hot sauce" moments.
- **Random Recipe Generator** – A random recipe is **preloaded** when you open the app, so when you click the button, it’s ready to go.
- **Instant Navigation** – Click on any recipe, and it opens a detailed page with ingredients, instructions, and more.
- **Fast & Smooth UI** – No unnecessary page reloads, just **React doing its thing**.

## Tech Stack
- **React (Hooks, Router)** – The backbone of the app, making everything feel snappy.
- **Spoonacular API** – Fetches real-time recipes so you’re always working with fresh data.
- **CSS** – Because ugly UIs are illegal.

## Why This is Cool
- **Instant Loading** – Prefetching means the random recipe is **already loaded** when you click the button. No waiting, just instant results.
- **API-Driven** – Recipes update in real-time, so you’re never stuck with the same old results.
- **Expandable** – Want to add meal planning? User accounts? Grocery list integration? The structure makes it easy.

## How to Run
1. **Clone the repo**
   ```sh
   git clone https://github.com/yourusername/recipe-app.git
   cd recipe-app
2. **Install Dependencies**
    ```sh
    npm install
3. **Set up your API Key**
- Create a .env file in the root folder
- Add this line:
    ```sh
    REACT_APP_API_KEY=<your_api_key>
4. **Run the app**
    ```sh
    npm start

5. **Open http://localhost:3000 and start exploring recipes.**

## Why This Matters

This project shows my ability to:
- **Work with external APIs** and handle async data like a pro.
- **Use React Router & hooks** to create a seamless experience.
- **Optimize performance** by preloading data so users aren’t waiting around.