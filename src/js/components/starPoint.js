const starImageSourceMap = {
    empty: './src/images/icon_empty_star.png',
    harf: './src/images/icon_half_star.png',
    full: './src/images/icon_star.png'
};

class StarPoint {

    constructor() {
        this.starContentElement = document.querySelector('.content-star');
        this.starBackgroundElement = this.starContentElement.querySelector('.star-background');
        this.starImages = this.starBackgroundElement.querySelectorAll('img');
        this.starPointResetButton = this.starContentElement.querySelector('.icon-remove-star');
        this.lockedStarPoint = false;
    }

    setup() {
        this.bindEvents();
    }

    lockStarPoint() {
        this.lockedStarPoint = true;
    }

    unlockStarPoint() {
        this.lockedStarPoint = false;
    }

    isLockedStarPoint() {
        return this.lockedStarPoint;
    }

    bindEvents() { 
        this.starBackgroundElement.addEventListener('mousemove', (event) => {

            const { target, offsetX: currentUserPoint } = event;

            if (this.isLockedStarPoint()) {
                return;
            }

            const { point } = target.dataset;
            const starPointIndex = parseInt(point, 10) - 1;
            const [starImageClientRect] = target.getClientRects();
            const starImageWidth = starImageClientRect.width;
            const isOverHarf = starImageWidth / 2 < currentUserPoint;

            this.renderStarPointImages({ drawableLimitIndex: starPointIndex, isOverHarf });
        });

        this.starBackgroundElement.addEventListener('click', () => this.lockStarPoint());

        this.starPointResetButton.addEventListener('click', () => {
            this.unlockStarPoint();
            this.resetStarPointImages();
        });

        this.starBackgroundElement.addEventListener('mouseout', () => !this.isLockedStarPoint() && this.resetStarPointImages());
    }
 
    renderStarPointImages(payload = {}) {
        const { drawableLimitIndex = -1, isOverHarf = false } = payload;

        Array.prototype.forEach.call(this.starImages, (starImage, index) => {
            let imageSource = index < drawableLimitIndex ? starImageSourceMap.full : starImageSourceMap.empty;

            if (drawableLimitIndex === index) {
                imageSource = isOverHarf ? starImageSourceMap.full : starImageSourceMap.harf;
            }
            starImage.src = imageSource;
        });
    }

    resetStarPointImages() {
        this.renderStarPointImages();
    }
}
export default StarPoint;