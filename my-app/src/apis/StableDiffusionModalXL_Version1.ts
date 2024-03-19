// StabilityAIBody.ts
export interface StabilityAIBody {
  steps: number;
  width: number;
  height: number;
  seed: number;
  cfg_scale: number;
  samples: number;
  // style_preset: string;
  text_prompts: Array<{ text: string; weight: number }>;
}

// callStabilityAIAPI.ts
export async function callStabilityAIAPI_StableDiffusioXL_Version_1(
  formData: StabilityAIBody
): Promise<any> {
  const API_URL =
    "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

  // API Key
  // const API_KEY = "sk-2NuVK95ywoB3HJR5AJwtmZfZLIqj46wChnp1BdQI3zd42VWY";
  const API_KEY = "sk-Y80OpEySFPgMnpV6y1mJnBVu69Q397NkrpycdeFByHRBp1JL";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status},${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error making API call:", error);
    throw error;
  }
}
