class Spitter extends Enemy {
    constructor(x, y) {
        super(x, y, 
            SPITTER_WIDTH, SPITTER_HEIGHT, 
            SPITTER_BASE_SPEED, 
            SPITTER_BASE_HP,
            SPITTER_BASE_HP_INCREASE);

        this.range = SPITTER_RANGE;
        this.projectiles = [];
        this.firingRate = 80;
        this.cooldown = 0;
    }

    updateEnemy(playerParams, enemies) {
        const dx = this.outerHitbox.getCenter().centerX - playerParams.playerCenterX;
        const dy = this.outerHitbox.getCenter().centerY - playerParams.playerCenterY;
        const distanceToPlayer = Math.sqrt(dx * dx + dy * dy);

        if (distanceToPlayer > this.range) {
            super.updateEnemy(playerParams, enemies);  // move toward player
        } else {
            // In range: stop and fire
            if (this.cooldown === 0) {
                this.shootAtPlayer(playerParams);
                this.cooldown = this.firingRate;
            } else {
                this.cooldown--;
            }
        }

        this.updateProjectiles(playerParams);
    }

    shootAtPlayer(playerParams) {
        const startX = this.outerHitbox.center.centerX;
        const startY = this.outerHitbox.center.centerY;

        const dx = playerParams.playerCenterX - startX;
        const dy = playerParams.playerCenterY - startY;
        const magnitude = Math.sqrt(dx * dx + dy * dy);
        if (magnitude === 0) return;

        const direction = { dx: dx / magnitude, dy: dy / magnitude };

        const spit = new Spit(startX, startY, direction);
        this.projectiles.push(spit);
    }

    updateProjectiles(playerParams) {
        for (const spit of this.projectiles) {
            // Treat the player as the only target
            spit.updateProjectile(playerParams.playerOuterHitbox);
        }

        this.projectiles = this.projectiles.filter(spit => spit.alive);
    }

    getProjectiles() {
        return this.projectiles;
    }

    drawColor(ctx, color) {
        super.drawColor(ctx, 'purple');

        for (const spit of this.projectiles) {
            spit.drawColor(ctx, 'green');
        }
    }
}
