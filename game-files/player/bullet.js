class Bullet extends Projectile {
    constructor(x, y, direction) {
        super(
            x - BULLET_WIDTH / 2,
            y - BULLET_HEIGHT / 2,
            BULLET_WIDTH,
            BULLET_HEIGHT,
            GUNNER_RANGE,
            direction,
            BULLET_SPEED
        );

        this.pierce = BULLET_PIERCE;
        this.damage = BULLET_DAMAGE;
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
