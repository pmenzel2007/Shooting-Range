class Gunner extends Player {
    constructor() {
        super(GUNNER_HP, GUNNER_SPEED_MODIFIER, GUNNER_RANGE);
        this.projectiles = [];
        this.firingRate = GUNNER_FIRING_RATE;
        this.cooldown = 0;
    }

    updatePlayer(enemies) {
        super.updatePlayer(enemies);

        if (this.cooldown == 0 && this.nearestEnemy) {
            this.shootNearestEnemy();
            this.cooldown = this.firingRate;
        } 
        else if (this.cooldown > 0)
            this.cooldown--;

        this.updateProjectiles(enemies);
    }

    shootNearestEnemy() {
        if (!this.nearestEnemy) return;
    
        const startX = this.outerHitbox.center.centerX;
        const startY = this.outerHitbox.center.centerY;
    
        const targetX = this.nearestEnemy.outerHitbox.center.centerX;
        const targetY = this.nearestEnemy.outerHitbox.center.centerY;
    
        const dx = targetX - startX;
        const dy = targetY - startY;
        const magnitude = Math.sqrt(dx * dx + dy * dy);
    
        if (magnitude === 0) return;
    
        const directionX = dx / magnitude;
        const directionY = dy / magnitude;
    
        const projectile = new Bullet(startX, startY, { dx: directionX, dy: directionY });
    
        this.projectiles.push(projectile);
    }

    updateProjectiles(enemies) {
        for (const projectile of this.projectiles) {
            projectile.updateProjectile(enemies);
        }

        this.projectiles = this.projectiles.filter(projectile => projectile.alive);
    }

    getParams() {
        return {
            ...super.getParams(),
            projectiles: this.projectiles
        }
    }
    
    drawColor(ctx, color) {
        super.drawColor(ctx, color);
    }

}