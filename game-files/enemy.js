let enemyId = 0;

class Enemy extends GameObject {
    constructor(x, y, width, height, speed, hp, hpIncrease) {
        super(x, y, width, height);

        this.id = enemyId++;
        this.baseSpeed = speed;
        this.speedMultiplier = 1;
        this.hp = hp;
        this.hpIncrease = hpIncrease;

        this.inRange = false;

        this.alive = true;

        this.innerHitbox = this.outerHitbox.createInnerHitbox(0.5);

        this.movement = {up: false, down: false, left: false, right: false};
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
    
        const newInnerHitboxX = new Hitbox(this.innerHitbox.x, this.innerHitbox.y, this.innerHitbox.width, this.innerHitbox.height);
        newInnerHitboxX.setCenter(newCenterX, currentCenter.centerY);
        
        if (!this.checkInnerCollision(newInnerHitboxX, enemies)) {
            this.innerHitbox.setCenter(newCenterX, currentCenter.centerY);
            this.outerHitbox.setCenter(newCenterX, currentCenter.centerY);
        }
    
        if (currentCenter.centerY < playerParams.playerCenterY)
            newCenterY += this.baseSpeed * this.speedMultiplier * scalingY;
        if (currentCenter.centerY > playerParams.playerCenterY)
            newCenterY -= this.baseSpeed * this.speedMultiplier * scalingY;
    
        const newInnerHitboxY = new Hitbox(this.innerHitbox.x, this.innerHitbox.y, this.innerHitbox.width, this.innerHitbox.height);
        newInnerHitboxY.setCenter(this.innerHitbox.getCenter().centerX, newCenterY);
        
        if (!this.checkInnerCollision(newInnerHitboxY, enemies)) {
            this.innerHitbox.setCenter(this.innerHitbox.getCenter().centerX, newCenterY);
            this.outerHitbox.setCenter(this.innerHitbox.getCenter().centerX, newCenterY);
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

    killThisEnemy() {
        this.alive = false
    }
    
    setInRange(inRange) {
        this.inRange = inRange;
    }

    getInRange() {
        return this.inRange;
    }

    drawColor(ctx, color) { 
        if (this.inRange) {
            //super.drawColor(ctx, 'white');
        } else {
            //super.drawColor(ctx, color);
        }

        ctx.beginPath();
        ctx.lineWidth = "6";
        ctx.strokeStyle = "green";
        ctx.rect(this.innerHitbox.x, this.innerHitbox.y, this.innerHitbox.width, this.innerHitbox.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = "6";
        ctx.strokeStyle = "blue";
        ctx.rect(this.outerHitbox.x, this.outerHitbox.y, this.outerHitbox.width, this.outerHitbox.height);
        ctx.stroke();
        
    }
}