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

  // const API_KEY = "sk-2NuVK95ywoB3HJR5AJwtmZfZLIqj46wChnp1BdQI3zd42VWY";
  const API_KEY = "sk-Y80OpEySFPgMnpV6y1mJnBVu69Q397NkrpycdeFByHRBp1JL";

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
      const errorText = await response.text(); // 或者 response.json() 如果API返回JSON格式的错误信息
      console.error(`HTTP error! status: ${response.status}`, errorText);
      throw new Error(errorText);
    }

    return await response.json();
  } catch (error) {
    console.error("Error making API call:", error);
    throw error;
  }
}
