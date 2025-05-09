class Arrow extends Projectile {
    constructor(x, y, direction) {
        super(
            x - ARROW_WIDTH / 2,
            y - ARROW_HEIGHT / 2,
            ARROW_WIDTH,
            ARROW_HEIGHT,
            HUNTER_RANGE,
            direction,
            ARROW_SPEED
        );

        this.pierce = ARROW_PIERCE;
        this.damage = ARROW_DAMAGE;
        this.enemiesPierced = 0;
        this.hitEnemies = new Set();
    }

    updateProjectile(enemies) {
        super.updateProjectile();

        if (!this.alive) return;

        for (const enemy of enemies) {
            if (this.outerHitbox.collidesWith(enemy.outerHitbox)) {
                if (!this.hitEnemies.has(enemy.id)) {
                    this.hitEnemies.add(enemy.id);

                    if (this.enemiesPierced === 0)
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
    }
}
