class GameObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.outerHitbox = new Hitbox(x, y, width, height);
    }

    drawColor(ctx, color) {
        ctx.fillStyle = color;
        ctx.fillRect(this.outerHitbox.x, this.outerHitbox.y, this.outerHitbox.width, this.outerHitbox.height);
    }
}