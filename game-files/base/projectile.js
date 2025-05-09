class Projectile extends GameObject {
    constructor(x, y, width, height, range, direction, speed) {
        super(x, y, width, height);
        this.startX = x;
        this.startY = y;
        this.range = range;
        this.direction = direction;
        this.speed = speed;

        this.alive = true;
    }

    updateProjectile() {
        this.outerHitbox.x += this.direction.dx * this.speed;
        this.outerHitbox.y += this.direction.dy * this.speed;

        const dx = this.outerHitbox.x - this.startX;
        const dy = this.outerHitbox.y - this.startY;
        const distanceTraveled = Math.sqrt(dx * dx + dy * dy);

        if (distanceTraveled > this.range) {
            this.alive = false;
        }
    }

    drawColor(ctx, color) {
        super.drawColor(ctx, color);
    }
}
