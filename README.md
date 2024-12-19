# Vest Fullstack Take Home Assignment

Vest Labs is a quantitative crypto research firm building a Vest Exchange - a highly capital efficient perpetual futures exchange that uses zero-knowledge proofs to ensure the fairest pricing for traders and liquidity providers.

As part of our team, you will be at the forefront of innovation, developing and testing groundbreaking ideas with real users. In this takehome assignment, you will be tasked with creating a frontend application that displays a live TradingView chart.

### Objective

1.  Recreate the following [Figma design](https://www.figma.com/design/Y0xGAiudDKFthVWTLnyWCT/Frontend-Takehome-Assignment?node-id=0-1&t=hmfOm6qYW2aRQwdN-1).

2.  Display the candlestick chart for ETH-PERP that fetches (REST) and streams (WS) 1 minute candlestick data in real time by referring to the [API docs](https://docs.vest.exchange/getting-started/vest-api#get-klines).

3.  **Bonus Points:**

    a. Enable users to add their live reactions to the candlestick chart. The user should be able to add emoji reactions by dragging and dropping emojis from a sidebar onto the chart. You can use the mock Node.JS / Express backend server to retrieve / add emojis.

    b. Animate successful trading when clicking “Buy” to include confetti and sound. [See example](https://drive.google.com/file/d/1BFJUZw83shYzdXBv9I1maoCMkaPRmkxW/view?usp=sharing)

        - [Sound File](https://drive.google.com/file/d/1N6gz4R2qZHrGnOzu49QUP95oQokKw6ID/view?usp=sharing)

    c. Include a dropdown to select for different markets

    d. Handle switching of time intervals

### Technical Specifications

- Use React and Typescript
- Use TradingView's [`lightweight-charts`](https://github.com/tradingview/lightweight-charts) library for the candlestick chart (already included in `package.json`). Don't worry about matching the exact Figma design for the chart component since this library is a reduced version of what we use in production.

### Tips

- TradingView already has client-side caching so you don't need to implement caching
- Ensure that WS messages are decoded correctly (they are Brotli compressed)

### Evaluation Criteria:

- **Functionality**: Does the application meet the requirements?
- **Style / Design:** Does the application look similar to the presented Figma file?
- **Code Quality**: Is the code well-organized, readable, and maintainable?
- **Bonus Features**: Are any of the bonus features implemented?

### Deliverables

- A zip file or a link to a Git repository containing:
  - The complete source code of the frontend application.
  - Instructions on how to set up and run the application locally.

### Submission:

Please submit your assignment to [max@vest.xyz](mailto:max@vest.xyz). If you have any questions or need clarifications, feel free to reach out.

### Setup and Run the Project Locally

The project has two parts: the frontend (FE) and the backend (BE). Follow these steps to run the project locally:

#### **Backend Setup**

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

#### **Frontend Setup**

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

Once both the frontend and backend servers are running, you can access the application in your browser. By default, the frontend server runs on http://localhost:3000. Ensure the backend server is also running to handle API requests (http://localhost:3001).
