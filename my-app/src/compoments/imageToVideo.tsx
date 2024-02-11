import React, { useState, useEffect } from "react";
// Adjust the import paths according to your project structure
import { callStabilityAIImageToVideoPostAPI } from "../apis/ImageToVideoPostAPI";
import { callStabilityAIImageToVideoGetAPI } from "../apis/ImageToVideoGetAPI";

export const ImageToVideoForm: React.FC = () => {
  const initialFormData = {
    seed: 0,
    cfg_scale: 1.8,
    motion_bucket_id: 127,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [initImage, setInitImage] = useState<File | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files &&
      event.target.files[0] &&
      event.target.files[0].type === "image/png"
    ) {
      setInitImage(event.target.files[0]);
    } else {
      alert("Only PNG images are supported");
      return;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!initImage) {
      alert("Please upload an initial image.");
      return;
    }

    const submitFormData = new FormData();
    submitFormData.append("image", initImage);

    submitFormData.append("seed", formData.seed.toString());
    submitFormData.append("cfg_scale", formData.cfg_scale.toString());

    console.log(submitFormData.get("init_image"));
    console.log(formData);

    // API invoke and response
    try {
      const response = await callStabilityAIImageToVideoPostAPI(submitFormData);
      //response body :{"id": "eeaf194a01324b4c56cc040f17ff0af0205035484246651a500b8abe8a2f0322"}
      console.log(response);
      if (response && response.id) {
        setVideoId(response.id);
      } else {
        alert("No Video id were generated.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while generating vide id.");
    }
  };

  //Add time polling until video is generated
  useEffect(() => {
    const fetchVideoData = async () => {
      if (!videoId) return; // If there is no videoId, return it directly.

      const intervalId = setInterval(async () => {
        try {
          const response = await callStabilityAIImageToVideoGetAPI(videoId);
          if (response.finishReason === "SUCCESS" && response.video) {
            clearInterval(intervalId); // Stop polling

            // Process the video data, as shown in the previous example
            const videoBase64 = response.video;
            const videoBlob = new Blob(
              [Uint8Array.from(atob(videoBase64), (c) => c.charCodeAt(0))],
              { type: "video/mp4" }
            );
            const videoUrl = URL.createObjectURL(videoBlob);
            setVideoUrl(videoUrl);
          } else {
            console.log("Video is being generated, please try again later.");
          }
        } catch (error) {
          console.error("Error getting video data.", error);
          clearInterval(intervalId); // If an error occurs, also stop polling
        }
      }, 5000); // Polling every 5 seconds, adjusting the time interval according to the actual situation

      return () => clearInterval(intervalId); // Cleanup function to stop polling when the component is uninstalled
    };

    fetchVideoData();
  }, [videoId]); // Cleanup function to stop polling when the component is uninstalled

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* must be 1024x576 or 576x1024 or 768x768, received 1024x1024"]} */}
        <label>
          Initial Image:
          <input type="file" accept="image/png" onChange={handleFileChange} />
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
          motion_bucket_id:
          <input
            type="number"
            value={formData.motion_bucket_id}
            onChange={(e) =>
              updateField("motion_bucket_id", parseInt(e.target.value))
            }
          />
        </label>
        <br />
        <button type="submit">Generate Video</button>
      </form>
      {videoUrl && (
        <video
          controls
          src={videoUrl}
          style={{ maxWidth: "100%", marginTop: "10px" }}
        />
      )}
    </div>
  );
};
