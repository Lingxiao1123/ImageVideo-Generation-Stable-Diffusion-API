export interface ImageToVideoRequestBody {
  seed: number;
  cfg_scale: number;
  motion_bucket_id: number;
  image: Blob;
}

export async function callStabilityAIImageToVideoPostAPI(
  formData: FormData
): Promise<any> {
  const API_URL = "https://api.stability.ai/v2alpha/generation/image-to-video";

  const API_KEY = "sk-2NuVK95ywoB3HJR5AJwtmZfZLIqj46wChnp1BdQI3zd42VWY";

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
