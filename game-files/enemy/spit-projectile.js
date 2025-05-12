class Spit extends Projectile {
    constructor(x, y, direction) {
        super(
            x - SPIT_WIDTH / 2,
            y - SPIT_HEIGHT / 2,
            SPIT_WIDTH,
            SPIT_HEIGHT,
            SPITTER_RANGE,
            direction,
            SPIT_SPEED
        )
    }

    updateProjectile(playerOuterHitbox) {
        super.updateProjectile();
        if (!this.alive) return;

        if (this.outerHitbox.collidesWith(playerOuterHitbox)) {
            player.afflictDamage();
        }

    }
}