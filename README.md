# Getting Started with Create React App

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

### Example
<img src="https://i.imgur.com/XX6gaT7.jpg" width="500">

### Key Parameter
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
</table>



