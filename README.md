### [click here for tagless-backend](https://github.com/dylankershaw/tagless-backend)

# Tagless
An auto-indexing photo site that assign relevant labels to images on upload. User-submitted images are automatically tagged and indexed by Google Cloud's [Vision API](https://cloud.google.com/vision/).

## Key Technologies, Packages, and Gems
* Front End
	* React
	* Redux
	* react-router
	* semantic-ui-react
	* redux-thunk
	* redux-form
	* Chart.js
* Back End
	* Rails
	* Google Cloud Storage
	* Google Cloud Vision
	* Mini Magick
	* JWT


## Core Features
* Base64 image encoding (front-end) and decoding (back-end)
* Automatic AI-based label assignment of images
* User authentication and cookie storage through JSON Web Tokens (JWT)
	* Logs users in on page load if their localStorage has a valid token
* Automatic backup of every image via Google Cloud Storage
* Users can upload images from their computer or by entering a third-party URL
* Dynamic handling of image downloads allows for multiple file types

## Demo
