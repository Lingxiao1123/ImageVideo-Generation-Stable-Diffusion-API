// 假设这是响应数据的结构，根据实际API响应调整
export interface ImageToVideoResultResponse {
  status: "running" | "completed";
  videoUrl?: string; // 假设当生成完成时，响应包含视频的URL
}

export async function callStabilityAIImageToVideoGetAPI(
  id: string
): Promise<any> {
  const API_URL = `https://api.stability.ai/v2alpha/generation/image-to-video/result/${id}`;
  const API_KEY = "sk-2NuVK95ywoB3HJR5AJwtmZfZLIqj46wChnp1BdQI3zd42VWY";

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`, // 使用实际的API密钥
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! status: ${response.status}`, errorText);
      throw new Error(errorText);
    }

    const result: ImageToVideoResultResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error making API call:", error);
    throw error;
  }
}
