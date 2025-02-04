/**
 * Luminar.js
 * 
 * Author: Muhammad Raj
 * Github: https://github.com/iamajraj/Luminar
 * Version: v1.0
 * Description: A lightweight JavaScript class for adding a magnifying lens effect to images.
 * Features:
 * - Adjustable zoom level and lens size
 * - Circular or square lens shape
 * - Supports both mouse and touch interactions
 * - Customizable lens border visibility
 * 
 * Usage:
 * new Luminar(imageElement, { zoomLevel: 3, lensSize: 150 });
 */
class Luminar{
    constructor(imgElement, options = {}) {
        this.img = imgElement;
        this.options = {
            zoomLevel: 3,
            lensSize: 150,
            lensShape: 'circle',
            showLensBorder: false,
            ...options
        };

        this.init();
    }

    init() {
        this.createLens();
        this.setupEvents();
    }

    createLens() {
        this.lens = document.createElement('div');
        this.lens.style.cssText = `
            position: absolute;
            width: ${this.options.lensSize}px;
            height: ${this.options.lensSize}px;
            border: ${this.options.showLensBorder ? '2px solid #fff' : 'none'};
            border-radius: ${this.options.lensShape === 'circle' ? '50%' : '0'};
            cursor: none;
            pointer-events: none;
            background-repeat: no-repeat;
            overflow: hidden;
            display: none;
            box-shadow: none;
        `;
        
        // Create magnified view container
        this.magnifier = document.createElement('div');
        this.magnifier.style.cssText = `
            width: ${this.options.lensSize}px;
            height: ${this.options.lensSize}px;
            background-image: url("${this.img.src}");
            background-repeat: no-repeat;
        `;
        
        this.lens.appendChild(this.magnifier);
        
        this.container = document.createElement('div');
        this.container.style.position = 'relative';
        this.container.style.display = 'inline-block';
        this.img.parentNode.insertBefore(this.container, this.img);
        this.container.appendChild(this.img);
        this.container.appendChild(this.lens);
    }

    setupEvents() {
        // Mouse events
        this.container.addEventListener('mousemove', this.handleMove.bind(this));
        this.container.addEventListener('mouseenter', this.handleEnter.bind(this));
        this.container.addEventListener('mouseleave', this.handleLeave.bind(this));

        // Touch events
        let touchActive = false;
        this.container.addEventListener('touchstart', (e) => {
            e.preventDefault();
            touchActive = true;
            this.handleEnter();
            this.handleTouchMove(e);
        });

        this.container.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (touchActive) this.handleTouchMove(e);
        });

        this.container.addEventListener('touchend', () => {
            touchActive = false;
            this.handleLeave();
        });
    }

    handleEnter() {
        this.lens.style.display = 'block';
        // Set background size once on enter
        this.magnifier.style.backgroundSize = 
            `${this.img.width * this.options.zoomLevel}px 
             ${this.img.height * this.options.zoomLevel}px`;
    }

    handleLeave() {
        this.lens.style.display = 'none';
    }

    handleMove(e) {
        this.updatePosition(e.clientX, e.clientY);
    }

    handleTouchMove(e) {
        const touch = e.touches[0];
        this.updatePosition(touch.clientX, touch.clientY);
    }

    updatePosition(clientX, clientY) {
        const rect = this.img.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Lens positioning
        const lensX = x - (this.options.lensSize / 2);
        const lensY = y - (this.options.lensSize / 2);
        const maxX = rect.width - this.options.lensSize;
        const maxY = rect.height - this.options.lensSize;

        this.lens.style.left = `${Math.min(Math.max(lensX, 0), maxX)}px`;
        this.lens.style.top = `${Math.min(Math.max(lensY, 0), maxY)}px`;

        // Calculate background position
        const bgX = (x * this.options.zoomLevel) - (this.options.lensSize / 2);
        const bgY = (y * this.options.zoomLevel) - (this.options.lensSize / 2);
        
        this.magnifier.style.backgroundPosition = `-${bgX}px -${bgY}px`;
    }

    destroy(){
        const parent = this.container.parentElement;
        const img = this.img;
        if(parent){
            parent.append(img);
        }
        this.container.remove();
    }
}