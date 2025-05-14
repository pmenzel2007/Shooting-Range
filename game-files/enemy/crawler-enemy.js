class Crawler extends Enemy {
    constructor(x, y, hpIncreaseAmount) {
        super(x, y, 
            CRAWLER_WIDTH, CRAWLER_HEIGHT, 
            CRAWLER_BASE_SPEED, 
            CRAWLER_BASE_HP,
            CRAWLER_BASE_HP_INCREASE,
            hpIncreaseAmount);
    }

    updateEnemy(playerParams, enemies) {
        super.updateEnemy(playerParams, enemies);
    }

        afflictDamage(damage) {
        super.afflictDamage(damage, CRAWLER_SCORE);
    }

    drawColor(ctx, color) {
        super.drawColor(ctx, 'brown');
    }
}