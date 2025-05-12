class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.zoom = 0.3;
        this.zoomKey = {ZoomIn: false, ZoomOut: false};

        document.addEventListener("keydown", (event) => this.handleInput(event, true));
        document.addEventListener("keyup", (event) => this.handleInput(event, false));        
    }

    handleInput(event, down) {
        switch(event.code) {
            case "ArrowUp":
                this.zoomKey.ZoomIn = down;
                break;
            case "ArrowDown":
                this.zoomKey.ZoomOut = down;
                break;
        }
    }

    updateCamera(playerParams) {
        if (this.zoomKey.ZoomIn)
            camera.zoom = Math.min(camera.zoom + 0.025, 0.7);
        if (this.zoomKey.ZoomOut)
            camera.zoom = Math.max(camera.zoom - 0.025, 0.2);

        this.x = playerParams.playerX + PLAYER_WIDTH / 2 - VIEWPORT_WIDTH / 2 / this.zoom;
        this.y = playerParams.playerY + PLAYER_HEIGHT / 2 - VIEWPORT_HEIGHT / 2 / this.zoom;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getZoom() {
        return this.zoom;
    }
}