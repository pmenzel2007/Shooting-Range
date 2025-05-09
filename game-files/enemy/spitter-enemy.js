class Spitter extends Enemy {
    constructor(x, y) {
        super(x, y, 
            SPITTER_WIDTH, SPITTER_HEIGHT, 
            SPITTER_BASE_SPEED, 
            SPITTER_BASE_HP,
            SPITTER_BASE_HP_INCREASE);

        this.range = SPITTER_RANGE;
    }

    updateEnemy(playerParams, enemies) {
        const dx = this.outerHitbox.getCenter().centerX - playerParams.playerCenterX;
        const dy = this.outerHitbox.getCenter().centerY - playerParams.playerCenterY;
        const distanceToPlayer = Math.sqrt(dx * dx + dy * dy);

        if (distanceToPlayer > 500) {
            super.updateEnemy(playerParams, enemies);
        } else {
            
        }
        
    }

    drawColor(ctx, color) {
        super.drawColor(ctx, 'purple');
    }
}