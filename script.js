const copyCodeTextEl = document.getElementById('copyCodeText');
const urlInput = document.getElementById('imageUrl');
const errorElement = document.getElementById('urlError');
const container = document.getElementById('customImageContainer');

let customMagnifier = null;

// Initialize default image
window.addEventListener('DOMContentLoaded', () => {
    const defaultImg = document.getElementById('demoImg');
    customMagnifier = new Luminar(defaultImg, {
        zoomLevel: 3,
        lensSize: 200,
    });
});

function loadExample() {
    const exampleUrl = 'https://plus.unsplash.com/premium_photo-1667939472139-05020af051b5?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    urlInput.value = exampleUrl;
    loadCustomImage();
}

function randomImage() {
    loadCustomImage(`https://picsum.photos/2048/1080?random=${Date.now()}`);
}

function copyCode() {
    const code = document.querySelector('pre code').innerText;
    navigator.clipboard.writeText(code);
    copyCodeTextEl.textContent = 'Copied!'
    setTimeout(() => {
        copyCodeTextEl.textContent = 'Copy code'
    }, 2000)
}

function loadCustomImage(url) {
    let newImageUrl = url;
    if (!newImageUrl) {
        if (!urlInput.checkValidity()) {
            errorElement.textContent = 'Invalid URL';
            errorElement.classList.remove('hidden');
            return;
        }
        newImageUrl = urlInput.value;
    }

    errorElement.classList.add('hidden');

    const img = new Image();
    img.className = 'w-full h-auto rounded-lg';
    img.alt = 'Custom Image';

    img.onload = () => {
        if (customMagnifier) {
            customMagnifier.destroy()
            customMagnifier = null;
        };
        container.querySelector('img').remove() // remove previous img

        container.appendChild(img);
        customMagnifier = new Luminar(img, {
            zoomLevel: 3,
            lensSize: 150,
        });
    };

    img.onerror = () => {
        errorElement.textContent = 'Failed to load the image'
        errorElement.classList.remove('hidden');
    };

    img.src = newImageUrl;
}