import React, { useState } from "react";
// Adjust the import paths according to your project structure
import { callStabilityAIImageToImage } from "../apis/ImageToImage_SD_XLONE";

export const ImageToImageForm: React.FC = () => {
  const initialFormData = {
    steps: 40,
    width: 1024,
    height: 1024,
    seed: 0,
    cfg_scale: 5,
    samples: 1,
    init_image_mode: "IMAGE_STRENGTH",
    image_strength: 0.35,
    text_prompts: [{ text: "", weight: 1 }],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [initImage, setInitImage] = useState<File | null>(null);
  const [imageUrlList, setImageUrlList] = useState<string[]>([]);

  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleTextPromptChange = (index: number, text: string) => {
    const newTextPrompts = formData.text_prompts.map((prompt, i) =>
      i === index ? { ...prompt, text: text } : prompt
    );
    setFormData({ ...formData, text_prompts: newTextPrompts });
  };

  const handleTextPromptWeightChange = (index: number, weight: number) => {
    const newTextPrompts = formData.text_prompts.map((prompt, i) =>
      i === index ? { ...prompt, weight: weight } : prompt
    );
    setFormData({ ...formData, text_prompts: newTextPrompts });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setInitImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!initImage) {
      alert("Please upload an initial image.");
      return;
    }

    const submitFormData = new FormData();
    submitFormData.append("init_image", initImage);
    submitFormData.append("steps", formData.steps.toString());
    //allowed dimensions are 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640, 640x1536, 768x1344, 832x1216, 896x1152
    // cannot set weight and height for V1 model, the dimension would be the same as intial image dimension
    // submitFormData.append("width", formData.width.toString());
    // submitFormData.append("height", formData.height.toString());
    submitFormData.append("seed", formData.seed.toString());
    submitFormData.append("cfg_scale", formData.cfg_scale.toString());
    submitFormData.append("image_strength", formData.image_strength.toString());
    submitFormData.append("samples", formData.samples.toString());
    // submitFormData.append("init_image_mode", formData.init_image_mode);

    formData.text_prompts.forEach((prompt, index) => {
      submitFormData.append(`text_prompts[${index}][text]`, prompt.text);
      submitFormData.append(
        `text_prompts[${index}][weight]`,
        prompt.weight.toString()
      );
    });

    console.log(submitFormData.get("init_image"));
    console.log(formData);

    // API invoke and response
    try {
      const response = await callStabilityAIImageToImage(submitFormData);
      if (response && response.artifacts) {
        const imageUrls = response.artifacts.map(
          (artifact: { base64: string }) =>
            `data:image/png;base64,${artifact.base64}`
        );
        setImageUrlList(imageUrls);
      } else {
        setImageUrlList([]);
        alert("No images were generated.");
      }
    } catch (error) {
      console.error("Error:", error);
      setImageUrlList([]);
      alert("An error occurred while generating images.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Initial Image:
          <input type="file" onChange={handleFileChange} />
        </label>
        <br />
        <label>
          Steps:
          <input
            type="number"
            value={formData.steps}
            onChange={(e) => updateField("steps", parseInt(e.target.value))}
          />
        </label>
        <br />
        <label>
          Width:
          <input
            type="number"
            value={formData.width}
            onChange={(e) => updateField("width", parseInt(e.target.value))}
          />
        </label>
        <br />
        <label>
          Height:
          <input
            type="number"
            value={formData.height}
            onChange={(e) => updateField("height", parseInt(e.target.value))}
          />
        </label>
        <br />
        <label>
          Seed:
          <input
            type="number"
            value={formData.seed}
            onChange={(e) => updateField("seed", parseInt(e.target.value))}
          />
        </label>
        <br />
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
        <br />
        <label>
          Image Strength:
          <input
            type="number"
            value={formData.image_strength}
            step="0.01"
            onChange={(e) =>
              updateField("image_strength", parseFloat(e.target.value))
            }
          />
        </label>
        <br />
        <label>
          Samples:
          <input
            type="number"
            value={formData.samples}
            onChange={(e) => updateField("samples", parseInt(e.target.value))}
          />
        </label>
        <br />
        {formData.text_prompts.map((prompt, index) => (
          <div key={index}>
            <label>
              Text Prompt {index + 1}:
              <input
                type="text"
                value={prompt.text}
                onChange={(e) => handleTextPromptChange(index, e.target.value)}
              />
            </label>
            <label>
              Weight:
              <input
                type="number"
                value={prompt.weight}
                onChange={(e) =>
                  handleTextPromptWeightChange(
                    index,
                    parseFloat(e.target.value)
                  )
                }
              />
            </label>
            <br />
          </div>
        ))}
        <button type="submit">Generate Image</button>
      </form>
      {imageUrlList.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Generated output ${index + 1}`}
          style={{ maxWidth: "100%", marginTop: "10px" }}
        />
      ))}
    </div>
  );
};
