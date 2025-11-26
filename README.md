# Young at Heart

**Young at Heart** is an AI-powered web application that lets you see into the future. Upload a photo of yourself, choose how you want to age, and let our time machine (powered by Replicate and Google's Nano Banana Pro model) do the rest.

## Features

-   **Photo Upload**: Easily upload your current selfie.
-   **Customizable Aging**:
    -   **Age**: Choose from "Just a wee bit older" to "Ancient".
    -   **Quality**: Decide if you've aged like fine wine or... milk.
    -   **Life Events**: Add backstory elements like a "Rebellion stage" or a "Hard life" to influence the generation.
-   **AI Generation**: Uses the `google/nano-banana-pro` model on Replicate for high-quality, photorealistic aging effects.

## Tech Stack

-   [Next.js](https://nextjs.org/) (App Router)
-   [Replicate API](https://replicate.com/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   TypeScript

## Getting Started

### Prerequisites

1.  **Replicate API Token**: You need an API token from [Replicate](https://replicate.com/).
2.  **Node.js**: Ensure you have Node.js installed.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/young-at-heart.git
    cd young-at-heart
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env.local` file in the root directory and add your Replicate API token:
    ```bash
    REPLICATE_API_TOKEN=r8_...
    ```

### Running the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:4001](http://localhost:4001) with your browser to see the result.

> **Note**: This project is configured to run on port **4001** by default.

## License

This project is open source and available under the [MIT License](LICENSE).
