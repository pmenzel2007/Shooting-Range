class Sprinter extends Enemy {
    constructor(x, y, hpIncreaseAmount) {
        super(x, y, 
            SPRINTER_WIDTH, SPRINTER_HEIGHT, 
            SPRINTER_BASE_SPEED, 
            SPRINTER_BASE_HP,
            SPRINTER_BASE_HP_INCREASE,
            hpIncreaseAmount);
    }

    updateEnemy(playerParams, enemies) {
        super.updateEnemy(playerParams, enemies);
    }

        afflictDamage(damage) {
        super.afflictDamage(damage, SPRINTER_SCORE);
    }

    drawColor(ctx, color) {
        super.drawColor(ctx, 'red');
    }
}