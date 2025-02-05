# Luminar.js

**Luminar.js** is a simple, easy-to-use JavaScript library for adding smooth and precise image magnification to your project. With just a few lines of code. **Luminar.js** also supports mobile touch, allowing users to zoom easily on mobile devices.

## Features

- **Easy to Use:** Integrate with minimal setup and configuration.
- **Fluid Interactions:** Smooth zoom experience for users.
- **Lightweight:** Small file size and efficient performance.
- **Customizable:** Tailor the zoom settings to fit your project's needs.
- **Mobile Touch Support:** Smooth zooming on mobile devices with touch support.

## Installation

To get the **Luminar.js** library, download the `luminar.min.js` file from the **lib** folder in the [GitHub repository](https://github.com/iamajraj/Luminar).

### Manual Download:

1. Go to the [GitHub repository](https://github.com/iamajraj/Luminar).
2. Navigate to the **lib** folder.
3. Download the `luminar.min.js` file.

Once downloaded, link the `luminar.min.js` script to your HTML.

## Basic Usage

1. Download the `luminar.min.js` file from the **lib** folder in the GitHub repository.
2. Apply the `Luminar` class to any image you want to be magnified.

### HTML Example:

```html
<img class="luminar" src="your-image.jpg" alt="Magnified Image" />
```

3. Initialize **Luminar.js**:

```html
<script>
  document.addEventListener('DOMContentLoaded', function() {
    new Luminar(imgElement);
  });
</script>
```

Now, your images will have a smooth and precise zoom effect, with full mobile touch support!

## Options

You can configure **Luminar.js** with several options for finer control over the zoom effect.

### Example:

```html
<script>
  document.addEventListener('DOMContentLoaded', function() {
    new Luminar(imageElement, {
      zoomLevel: 3,        // Zoom level (default is 3)
      lensSize: 150,       // Lens size in pixels (default is 150)
      lensShape: 'circle', // Shape of the lens: 'circle' or 'square' (default is circle)
      showLensBorder: false, // Set to true to show lens border (default is false)
    });
  });
</script>
```

## Customization

**Luminar.js** is fully customizable to suit your needs. You can change the zoom level, lens size, lens shape and lens border.

## Contributing

Contributions are always welcome! Feel free to fork the repository and submit pull requests. For any major changes, please open an issue first to discuss what you would like to change.

## Author

**Luminar.js** is maintained and developed by [Muhammad Raj](https://github.com/iamajraj).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
 
