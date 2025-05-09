class Hitbox {
    constructor(x, y, width, height) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._updateCenter();
    }

    _updateCenter() {
        this._center = {
            centerX: this._x + this._width / 2,
            centerY: this._y + this._height / 2
        };
    }

    _updatePositionFromCenter() {
        this._x = this._center.centerX - this._width / 2;
        this._y = this._center.centerY - this._height / 2;
    }

    // X
    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
        this._updateCenter();
    }

    // Y
    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
        this._updateCenter();
    }

    // Width
    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
        this._updateCenter();
    }

    // Height
    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
        this._updateCenter();
    }

    // Center (read-only getter)
    get center() {
        return this._center;
    }

    getCenter() {
        return this._center;
    }

    // Center (setter)
    setCenter(centerX, centerY) {
        this._center.centerX = centerX;
        this._center.centerY = centerY;
        this._updatePositionFromCenter();
    }

    collidesWith(other) {
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y;
    }

    createInnerHitbox(scale) {
        const center = this.getCenter();
        const newWidth = this.width * scale;
        const newHeight = this.height * scale;
    
        const newX = center.centerX - newWidth / 2;
        const newY = center.centerY - newHeight / 2;
    
        return new Hitbox(newX, newY, newWidth, newHeight);
    }
    
}
