# A Stable Diffusion API based Image generation web

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm install`

Runs to install necessuary Node modules.

## Functionality
### Text To Image
Based on Stable Diffusion API, realize the generation of images according to the text prompts
Integrated Stable Diffusion Model:
-  Stable Diffusion XL1.0
-  Stable Diffusion 1.6

### GET YOUR PERSONAL API KEY

Follow stability.ai website,log in to get your personal API Key : https://platform.stability.ai/account/keys  
Replace the API Key with your owns

### Example
<img src="https://i.imgur.com/XX6gaT7.jpg" width="500">

### Key Parameter For Stable Diffusion
<table>
  <tr>
    <td>Steps</td>
    <td>
      1. integer (Steps) [ 10 .. 50 ]<br>
      2. Default: 30<br>
      3. Number of diffusion steps to run.
    </td>
  </tr>
   <tr>
    <td>Width</td>
    <td>
      integer (DiffuseImageWidth) multiple of 64 >= 128<br>
      Default: 512<br>
      Width of the image to generate, in pixels, in an increment divible by 64.<br>

      
      Engine-specific dimension validation:
      SDXL Beta: must be between 128x128 and 512x896 (or 896x512); only one dimension can be greater than 512.
      SDXL v0.9: must be one of 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640, 640x1536, 768x1344, 832x1216, or 896x1152
      SDXL v1.0: same as SDXL v0.9
      SD v1.6: must be between 320x320 and 1536x1536
  </tr>
  <tr>
    <td>Height</td>
    <td>
      integer (DiffuseImageHeight) multiple of 64 >= 128<br>
      Default: 512<br>
      Height of the image to generate, in pixels, in an increment divible by 64.<br>

      Engine-specific dimension validation:
      SDXL Beta: must be between 128x128 and 512x896 (or 896x512); only one dimension can be greater than 512.
      SDXL v0.9: must be one of 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640, 640x1536, 768x1344, 832x1216, or 896x1152
      SDXL v1.0: same as SDXL v0.9
      SD v1.6: must be between 320x320 and 1536x1536
  </tr>
  <tr>
    <td>Seed</td>
    <td>
      integer (Seed) [ 0 .. 4294967295 ]<br>
      Default: 0<br>
      Random noise seed (omit this option or use 0 for a random seed)<br>
    </td>
  </tr>
   <tr>
    <td>Cfg_Scale</td>
    <td>
     number (CfgScale) [ 0 .. 35 ]<br>
     Default: 7<br>
     How strictly the diffusion process adheres to the prompt text (higher values keep your image closer to your prompt)<br>
    </td>
  </tr>
  <tr>
    <td>Samples</td>
    <td>
     integer (Samples) [ 1 .. 10 ]<br>
     Default: 1<br>
     Number of images to generate<br>
    </td>
  </tr>
  <tr>
    <td>Text_prompts</td>
    <td>
     Array of objects (TextPrompts) non-empty<br>
     An array of text prompts to use for generation.<br>
     1.Positive Prompt:Text prompt with description of the things you want in the image to be generated<br>
     2.Negative Prompt:Items you don't want in the image
  </tr>
</table>



