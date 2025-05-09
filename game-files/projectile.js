class Projectile extends GameObject {
    constructor(x, y, width, height, range, direction, speed, pierce) {
        super(x, y, width, height);
        this.startX = x;
        this.startY = y;
        this.range = range;
        this.direction = direction;
        this.speed = speed;
        this.pierce = pierce;
        this.alive = true;

        this.hitEnemies = new Set();
    }

    updateBullet(enemies) {
        this.outerHitbox.x += this.direction.dx * this.speed;
        this.outerHitbox.y += this.direction.dy * this.speed;

        for (const enemy of enemies) {
            if (this.outerHitbox.collidesWith(enemy.outerHitbox)) {
                if (!this.hitEnemies.has(enemy.id)) {
                    this.hitEnemies.add(enemy.id);

                    if (this.pierce === 0)
                        this.alive = false;
                    else
                        this.pierce--;
                }

            }
        }

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