import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
  try {
    const { prompt, image } = await request.json();

    if (!prompt || !image) {
      return NextResponse.json(
        { error: "Prompt and image are required" },
        { status: 400 }
      );
    }

    const model = await replicate.models.get("google", "nano-banana-pro");
    const latestVersion = model.latest_version;

    if (!latestVersion) {
      return NextResponse.json(
        { error: "Model version not found" },
        { status: 500 }
      );
    }

    const prediction = await replicate.predictions.create({
      version: latestVersion.id,
      input: {
        image_input: [image],
        prompt,
        aspect_ratio: "4:3",
        output_format: "png",
      },
    });

    // Wait for the prediction to finish
    const predictionResult = await replicate.wait(prediction);

    return NextResponse.json({ output: predictionResult.output });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
