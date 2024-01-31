import React, { useState } from "react";
import { StabilityAIBody } from "../apis/StableDiffusionModalXL_Version1";
import { callStabilityAIAPI_StableDiffusioXL_Version_1 } from "../apis/StableDiffusionModalXL_Version1";
import { callStabilityAIAPI_StableDiffusin_Version_1_6 } from "../apis/StableDiffusionModalVersionOnePointSix";

export const TextToImageForm: React.FC = () => {
  const initialFormData: StabilityAIBody = {
    steps: 40,
    width: 1024,
    height: 1024,
    seed: 0,
    cfg_scale: 5,
    samples: 1,
    text_prompts: [
      { text: "", weight: 1 },
      { text: "", weight: -1 },
    ],
  };

  const [formData, setFormData] = useState<StabilityAIBody>(initialFormData);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [modelSelect, setModelSelect] = useState<String | null>(null);

  const updateField = <T extends keyof StabilityAIBody>(
    field: T,
    value: StabilityAIBody[T]
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleTextPromptChange = (index: number, text: string) => {
    const newTextPrompts = formData.text_prompts.map((prompt, i) =>
      i === index ? { ...prompt, text } : prompt
    );
    setFormData({ ...formData, text_prompts: newTextPrompts });
  };

  const handleTextPromptWeightChange = (index: number, weight: number) => {
    const newTextPrompts = formData.text_prompts.map((prompt, i) =>
      i === index ? { ...prompt, weight } : prompt
    );
    setFormData({ ...formData, text_prompts: newTextPrompts });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let response;
      if (modelSelect === "StableDiffusionXL1.0") {
        response = await callStabilityAIAPI_StableDiffusioXL_Version_1(
          formData
        );
      } else {
        response = await callStabilityAIAPI_StableDiffusin_Version_1_6(
          formData
        );
      }
      if (response && response.artifacts && response.artifacts.length > 0) {
        // Assuming the image data is returned as a Base64 encoded string
        const imageBase64 = response.artifacts[0].base64;
        // Convert Base64-encoded images to data URLs
        const imageUrl = `data:image/png;base64,${imageBase64}`;
        setImageUrl(imageUrl);
      } else {
        // If there is no image data in the response, set imageUrl to null
        setImageUrl(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setImageUrl(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Steps:
          <input
            type="number"
            value={formData.steps}
            onChange={(e) => updateField("steps", parseInt(e.target.value))}
          />
        </label>
        <label>
          Width:
          <input
            type="number"
            value={formData.width}
            onChange={(e) => updateField("width", parseInt(e.target.value))}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={formData.height}
            onChange={(e) => updateField("height", parseInt(e.target.value))}
          />
        </label>
        <label>
          Seed:
          <input
            type="number"
            value={formData.seed}
            onChange={(e) => updateField("seed", parseInt(e.target.value))}
          />
        </label>
        <label>
          CFG Scale:
          <input
            type="number"
            value={formData.cfg_scale}
            onChange={(e) =>
              updateField("cfg_scale", parseFloat(e.target.value))
            }
          />
        </label>
        <label>
          Samples:
          <input
            type="number"
            value={formData.samples}
            onChange={(e) => updateField("samples", parseInt(e.target.value))}
          />
        </label>
        <div>
          <label>
            Positive Text Prompt:
            <input
              type="text"
              value={formData.text_prompts[0].text}
              onChange={(e) => handleTextPromptChange(0, e.target.value)}
            />
          </label>
          <label>
            Weight:
            <input
              type="number"
              value={formData.text_prompts[0].weight}
              onChange={(e) =>
                handleTextPromptWeightChange(0, parseFloat(e.target.value))
              }
            />
          </label>
        </div>

        {/* （Negative Prompt） */}
        <div>
          <label>
            Negative Text Prompt:
            <input
              type="text"
              value={formData.text_prompts[1].text}
              onChange={(e) => handleTextPromptChange(1, e.target.value)}
            />
          </label>
          <label>
            Weight:
            <input
              type="number"
              value={formData.text_prompts[1].weight}
              onChange={(e) =>
                handleTextPromptWeightChange(1, parseFloat(e.target.value))
              }
            />
          </label>
          <label>
            Model Selection:
            <select
              value={modelSelect as string}
              onChange={(e) => setModelSelect(e.target.value)}
            >
              <option value="StableDiffusionXL1.0">
                Stable Diffusion XL 1.0
              </option>
              <option value="StableDiffusion1.6">Stable Diffusion 1.6</option>
            </select>
          </label>
        </div>
        <button type="submit">Generate Image</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
};
