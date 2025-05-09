class Hunter extends Player {
    constructor() {
        super(HUNTER_HP, HUNTER_SPEED_MODIFIER, HUNTER_RANGE);
        this.projectiles = [];
        this.firingRate = 100;
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
    
        const projectile = new Projectile(
            startX - ARROW_WIDTH / 2,
            startY - ARROW_HEIGHT / 2,
            ARROW_WIDTH,
            ARROW_HEIGHT, 
            HUNTER_RANGE,
            { dx: directionX, dy: directionY },
            ARROW_SPEED,
            ARROW_PIERCE,
            ARROW_DAMAGE
        );
    
        this.projectiles.push(projectile);
    }

    updateProjectiles(enemies) {
        for (const projectile of this.projectiles) {
            projectile.updateBullet(enemies);
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