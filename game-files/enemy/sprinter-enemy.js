class Sprinter extends Enemy {
    constructor(x, y) {
        super(x, y, 
            SPRINTER_WIDTH, SPRINTER_HEIGHT, 
            SPRINTER_BASE_SPEED, 
            SPRINTER_BASE_HP,
            SPRINTER_BASE_HP_INCREASE);
    }

    updateEnemy(playerParams, enemies) {
        super.updateEnemy(playerParams, enemies);
    }

    drawColor(ctx, color) {
        super.drawColor(ctx, 'red');
    }
}