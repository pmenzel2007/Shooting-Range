class Player extends GameObject {
    constructor(hp, speedMultiplier, range) {
        super(PLAYER_SPAWN_X, PLAYER_SPAWN_Y, PLAYER_WIDTH, PLAYER_HEIGHT);

        this.speedMultiplier = speedMultiplier;
        this.hp = hp;
        this.range = range;

        this.movement = {up: false, down: false, left: false, right: false};

        this.enemiesInRange = [];
        this.nearestEnemy = null;

        this.invlunerableTime = 0;
        this.invulnerable = false;

        this.alive = true;

        document.addEventListener("keydown", (event) => this.handleInput(event, true));
        document.addEventListener("keyup", (event) => this.handleInput(event, false));
    }

    handleInput(event, down) {
        switch (event.code) {
            case "KeyW":
                this.movement.up = down;
                break;
            case "KeyS":
                this.movement.down = down;
                break;
            case "KeyD":
                this.movement.right = down;
                break;
            case "KeyA":
                this.movement.left = down;
                break;
        }
    }

    updatePlayer(enemies) {
        let dx = 0, dy = 0;

        if (this.movement.up) dy -= 1;
        if (this.movement.down) dy += 1;
        if (this.movement.left) {
            dx -= 1;
            //this.activeSprite = playerSpriteLeft;
        }
        if (this.movement.right) {
            dx += 1;
            //this.activeSprite = playerSpriteRight;
        }

        if (dx !== 0 || dy !== 0) {
            let distance = Math.sqrt(dx * dx + dy * dy);
            dx /= distance;
            dy /= distance;
        }

        this.outerHitbox.x += dx * PLAYER_BASE_SPEED * this.speedMultiplier;
        this.outerHitbox.y += dy * PLAYER_BASE_SPEED * this.speedMultiplier;

        this.outerHitbox.x = Math.max(0, Math.min(this.outerHitbox.x, ARENA_WIDTH - this.outerHitbox.width));
        this.outerHitbox.y = Math.max(0, Math.min(this.outerHitbox.y, ARENA_HEIGHT - this.outerHitbox.height));
    
        if (this.invlunerableTime > 0) 
            this.invlunerableTime--;
        else 
            this.invulnerable = false;
        this.getEnemiesInRange(enemies);
        console.log(this.invlunerableTime);
    }

    getEnemiesInRange(enemies) {
        this.enemiesInRange = [];
    
        for (const enemy of enemies) {
            const dx = this.outerHitbox.center.centerX - enemy.outerHitbox.center.centerX;
            const dy = this.outerHitbox.center.centerY - enemy.outerHitbox.center.centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
    
            if (distance <= this.range) {
                enemy.setInRange(true);
                this.enemiesInRange.push({ enemy, distance });
            } else {
                enemy.setInRange(false);
            }
        }
    
        this.enemiesInRange.sort((a, b) => a.distance - b.distance);
        this.nearestEnemy = this.enemiesInRange.length > 0 ? this.enemiesInRange[0].enemy : null;
        this.enemiesInRange = this.enemiesInRange.map(entry => entry.enemy);

    }

    afflictDamage() {
        if (!this.invulnerable) {
            this.hp--;
            this.invulnerable = true;
            this.invlunerableTime = PLAYER_INVUL_TIME;
        }

        if (this.hp <= 0) {
            this.alive = false;
        }
    }
    
    getParams() {
        return {playerX: this.outerHitbox.x, playerY: this.outerHitbox.y, playerCenterX: this.outerHitbox.center.centerX, playerCenterY: this.outerHitbox.center.centerY, playerHp: this.hp, playerOuterHitbox: this.outerHitbox};
    }

    drawColor(ctx, color) {
        super.drawColor(ctx, color);
        ctx.beginPath();
        ctx.arc(this.outerHitbox.center.centerX, this.outerHitbox.center.centerY, this.range, 0, 2 * Math.PI, false);
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#00FF00';
        ctx.stroke();
    }

}