let enemyId = 0;

class Enemy extends GameObject {
    constructor(x, y, width, height, speed, hp, hpIncrease, hpIncreaseAmount) {
        super(x, y, width, height);

        this.id = enemyId++;
        this.baseSpeed = speed;
        this.speedMultiplier = 1;
        this.hpIncrease = hpIncrease;
        this.hp = hp + hpIncreaseAmount * this.hpIncrease;

        this.inRange = false;
        this.alive = true;

        const center = this.outerHitbox.getCenter();
        const radius = Math.min(this.outerHitbox.width, this.outerHitbox.height) * 0.25;
        this.innerHitbox = new CircleHitbox(center.centerX, center.centerY, radius);

        this.movement = { up: false, down: false, left: false, right: false };
    }

    updateEnemy(playerParams, enemies) {
        const currentCenter = this.outerHitbox.getCenter();

        let distanceX = Math.abs(playerParams.playerCenterX - currentCenter.centerX);
        let distanceY = Math.abs(playerParams.playerCenterY - currentCenter.centerY);

        let scalingX = 1;
        let scalingY = 1;

        if (distanceX > distanceY) scalingY = distanceY / distanceX;
        if (distanceX < distanceY) scalingX = distanceX / distanceY;

        let newCenterX = currentCenter.centerX;
        let newCenterY = currentCenter.centerY;

        if (currentCenter.centerX < playerParams.playerCenterX)
            newCenterX += this.baseSpeed * this.speedMultiplier * scalingX;
        if (currentCenter.centerX > playerParams.playerCenterX)
            newCenterX -= this.baseSpeed * this.speedMultiplier * scalingX;

        const newOuterHitboxX = new Hitbox(this.outerHitbox.x, this.outerHitbox.y, this.outerHitbox.width, this.outerHitbox.height);
        newOuterHitboxX.setCenter(newCenterX, this.outerHitbox.getCenter().centerY);
        const newInnerHitboxX = new CircleHitbox(newOuterHitboxX.getCenter().centerX, newOuterHitboxX.getCenter().centerY, this.innerHitbox.radius);

        if (!this.checkInnerCollision(newInnerHitboxX, enemies)) {
            const newOuterHitboxCenterX = newOuterHitboxX.getCenter().centerX;
            this.outerHitbox.setCenter(newOuterHitboxCenterX, this.outerHitbox.getCenter().centerY);
            this.innerHitbox.centerX = newOuterHitboxX.getCenter().centerX;
            this.innerHitbox.centerY = newOuterHitboxX.getCenter().centerY;
        }

        if (currentCenter.centerY < playerParams.playerCenterY)
            newCenterY += this.baseSpeed * this.speedMultiplier * scalingY;
        if (currentCenter.centerY > playerParams.playerCenterY)
            newCenterY -= this.baseSpeed * this.speedMultiplier * scalingY;

        const newOuterHitboxY = new Hitbox(this.outerHitbox.x, this.outerHitbox.y, this.outerHitbox.width, this.outerHitbox.height);
        newOuterHitboxY.setCenter(this.outerHitbox.getCenter().centerX, newCenterY);
        const newInnerHitboxY = new CircleHitbox(newOuterHitboxY.getCenter().centerX, newOuterHitboxY.getCenter().centerY, this.innerHitbox.radius);

        if (!this.checkInnerCollision(newInnerHitboxY, enemies)) {
            const newOuterHitboxCenterY = newOuterHitboxY.getCenter().centerY;
            this.outerHitbox.setCenter(this.outerHitbox.getCenter().centerX, newOuterHitboxCenterY);
            this.innerHitbox.centerX = newOuterHitboxY.getCenter().centerX;
            this.innerHitbox.centerY = newOuterHitboxY.getCenter().centerY;
        }

        if (this.outerHitbox.collidesWith(playerParams.playerOuterHitbox)) {
            player.afflictDamage();
        }
    }

    resolveSpawnOverlap(enemies) {
    const maxAttempts = 10;
    const pushAmount = 5;
    let attempt = 0;

        while (attempt < maxAttempts) {
            let collided = false;

            for (const other of enemies) {
                if (other === this || !other.alive) continue;

                if (this.innerHitbox.collidesWith(other.innerHitbox)) {
                    collided = true;

                    const dx = this.innerHitbox.centerX - other.innerHitbox.centerX;
                    const dy = this.innerHitbox.centerY - other.innerHitbox.centerY;
                    const dist = Math.max(1, Math.hypot(dx, dy)); // prevent divide by 0

                    const offsetX = (dx / dist) * pushAmount;
                    const offsetY = (dy / dist) * pushAmount;

                    const currentCenter = this.outerHitbox.getCenter();
                    this.outerHitbox.setCenter(currentCenter.centerX + offsetX, currentCenter.centerY + offsetY);
                    this.innerHitbox.centerX += offsetX;
                    this.innerHitbox.centerY += offsetY;
                }
            }

            if (!collided) break;
            attempt++;
        }
    }


    checkInnerCollision(newInnerHitbox, enemies) {
        for (const other of enemies) {
            if (other === this || !other.alive) continue;
            if (newInnerHitbox.collidesWith(other.innerHitbox)) {
                return true;
            }
        }
        return false;
    }

    afflictDamage(damage, scorePoints) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.alive = false;
            player.giveScorePoints(scorePoints);
        }
    }

    getAlive() {
        return this.alive;
    }

    setInRange(inRange) {
        this.inRange = inRange;
    }

    getInRange() {
        return this.inRange;
    }

    getHp() {
        return this.hp;
    }

    drawColor(ctx, color) {
        super.drawColor(ctx, color);
        

        /*
        // Draw the inner circular hitbox
        ctx.beginPath();
        ctx.lineWidth = 6;
        ctx.strokeStyle = "green";
        ctx.arc(this.innerHitbox.centerX, this.innerHitbox.centerY, this.innerHitbox.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Draw the outer rectangular hitbox
        ctx.beginPath();
        ctx.lineWidth = 6;
        ctx.strokeStyle = "blue";
        ctx.rect(this.outerHitbox.x, this.outerHitbox.y, this.outerHitbox.width, this.outerHitbox.height);
        ctx.stroke();
        */
    }
}
