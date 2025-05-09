class CircleHitbox {
    constructor(centerX, centerY, radius) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
    }

    collidesWith(other) {
        if (other instanceof CircleHitbox) {
            const dx = this.centerX - other.centerX;
            const dy = this.centerY - other.centerY;
            const distance = Math.hypot(dx, dy);
            return distance < this.radius + other.radius;
        } else if (other instanceof Hitbox) {
            return this.collidesWithRect(other);
        }
        return false;
    }

    collidesWithRect(rect) {
        const closestX = Math.max(rect.x, Math.min(this.centerX, rect.x + rect.width));
        const closestY = Math.max(rect.y, Math.min(this.centerY, rect.y + rect.height));
        const dx = this.centerX - closestX;
        const dy = this.centerY - closestY;
        return (dx * dx + dy * dy) < (this.radius * this.radius);
    }
}
