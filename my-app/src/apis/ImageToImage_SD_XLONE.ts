export interface ImageToImageRequestBody {
  steps: number;
  width: number;
  height: number;
  seed: number;
  cfg_scale: number;
  samples: number;
  init_image: Blob;
  init_image_mode: string;
  image_strength: number;
  text_prompts: Array<{ text: string; weight: number }>;
}

export async function callStabilityAIImageToImage(
  formData: FormData
): Promise<any> {
  const API_URL =
    "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image";

  const API_KEY = "sk-kYtpEWDlKdq4JHi9om8vrCeJYKue2PsUM5AcBruciILfPo1w";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`, // Make sure to replace YOUR_API_KEY with your actual API key
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error making API call:", error);
    throw error;
  }
}