import React, { useState } from "react";
import { StabilityAIBody } from "../apis/StableDiffusionModalXL_Version1";
import { callStabilityAIAPI_StableDiffusioXL_Version_1 } from "../apis/StableDiffusionModalXL_Version1";
import { callStabilityAIAPI_StableDiffusin_Version_1_6 } from "../apis/StableDiffusionModalVersionOnePointSix";

interface Artifact {
  base64: string;
}

export const TextToImageForm: React.FC = () => {
  const initialFormData: StabilityAIBody = {
    steps: 40,
    width: 1024,
    height: 1024,
    seed: 0,
    cfg_scale: 5,
    samples: 1,
    style_preset: "enhance",
    text_prompts: [
      { text: "", weight: 1 },
      { text: "", weight: -1 },
    ],
  };

  const [formData, setFormData] = useState<StabilityAIBody>(initialFormData);
  const [imageUrlList, setImageUrlList] = useState<string[]>([]);
  const [modelSelect, setModelSelect] = useState<String | null>(null);
  const [styleSelect, setStyleSelect] = useState<String | null>(null);

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
    const orderedFormData: StabilityAIBody = {
      steps: formData.steps,
      width: formData.width,
      height: formData.height,
      seed: formData.seed,
      cfg_scale: formData.cfg_scale,
      samples: formData.samples,
      style_preset: formData.style_preset,
      text_prompts: formData.text_prompts.sort((a, b) => b.weight - a.weight),
    };

    try {
      let response;
      console.log(orderedFormData);
      if (modelSelect === "StableDiffusionXL1.0") {
        response = await callStabilityAIAPI_StableDiffusioXL_Version_1(
          orderedFormData
        );
      } else {
        response = await callStabilityAIAPI_StableDiffusin_Version_1_6(
          orderedFormData
        );
      }
      if (response && response.artifacts && response.artifacts.length > 0) {
        const imageUrls = response.artifacts.map((artifact: Artifact) => {
          const imageBase64 = artifact.base64;
          return `data:image/png;base64,${imageBase64}`;
        });
        setImageUrlList(imageUrls);
      } else {
        setImageUrlList([]);
      }
    } catch (error) {
      console.error("Error:", error);
      setImageUrlList([]);
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
            style_preset:
            <select
              value={styleSelect as string}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const newStyle = e.target.value;
                setStyleSelect(newStyle);
                console.log(newStyle);
                setFormData({ ...formData, style_preset: newStyle });
              }}
            >
              <option value="enhance">Enhance</option>
              <option value="anime">Anime</option>
              <option value="photographic">Photographic</option>
              <option value="digital-art">Digital Art</option>
              <option value="comic-book">Comic Book</option>
              <option value="fantasy-art">Fantasy Art</option>
              <option value="line-art">Line Art</option>
              <option value="analog-film">Analog Film</option>
              <option value="neon-punk">Neon Punk</option>
              <option value="isometric">Isometric</option>
              <option value="low-poly">Low Poly</option>
              <option value="origami">Origami</option>
              <option value="modeling-compound">Modeling Compound</option>
              <option value="cinematic">Cinematic</option>
              <option value="3d-model">3D Model</option>
              <option value="pixel-art">Pixel Art</option>
              <option value="tile-texture">Tile Texture</option>
            </select>
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
      {imageUrlList.map((url, index) => (
        <img key={index} src={url} alt={`Generated ${index + 1}`} />
      ))}
    </div>
  );
};
