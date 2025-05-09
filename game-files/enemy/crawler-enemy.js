class Crawler extends Enemy {
    constructor(x, y) {
        super(x, y, 
            CRAWLER_WIDTH, CRAWLER_HEIGHT, 
            CRAWLER_BASE_SPEED, 
            CRAWLER_BASE_HP,
            CRAWLER_BASE_HP_INCREASE);
    }

    updateEnemy(playerParams, enemies) {
        super.updateEnemy(playerParams, enemies);
    }

    drawColor(ctx, color) {
        super.drawColor(ctx, 'brown');
    }
}