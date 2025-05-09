class Projectile extends GameObject {
    constructor(x, y, width, height, range, direction, speed, pierce, damage) {
        super(x, y, width, height);
        this.startX = x;
        this.startY = y;
        this.range = range;
        this.direction = direction;
        this.speed = speed;
        this.pierce = pierce;
        this.enemiesPierced = 0;
        this.damage = damage;

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
                    
                    if  (this.enemiesPierced === 0)
                        enemy.afflictDamage(this.damage);
                    else
                        enemy.afflictDamage(this.damage / 2);

                    if (this.enemiesPierced === this.pierce)
                        this.alive = false;
                    else
                        this.enemiesPierced++;
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