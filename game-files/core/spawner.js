class Spawner {
    constructor(player, enemies, parameters) {
        this.player = player;
        this.enemies = enemies;

        this.spawnInterval = parameters.startingInterval;
        this.minInterval = parameters.minInterval;
        this.decreaseRate = parameters.decreaseRate;

        this.lastSpawnTime = performance.now();
        this.lastSpawns = [];

        this.spawnTypes = parameters.spawnTypes;
        this.packSizes = parameters.packSizes;
        this.minSpawnDistance = parameters.minDistance;
    }

    update() {
        const currentTime = performance.now();
        const spawned = [];

        if (currentTime - this.lastSpawnTime >= this.spawnInterval) {
            const type = this.chooseSpawnType();
            const newEnemies = this.spawnEnemies(type);
            spawned.push(...newEnemies);

            this.lastSpawnTime = currentTime;
            this.spawnInterval = Math.max(this.minInterval, this.spawnInterval * this.decreaseRate);
        }

        return spawned;
    }


    chooseSpawnType() {
        const choices = this.spawnTypes.filter(type =>
            !(this.lastSpawns[0] === type && this.lastSpawns[1] === type)
        );

        const choice = choices[Math.floor(Math.random() * choices.length)];
        this.lastSpawns.push(choice);
        if (this.lastSpawns.length > 2) this.lastSpawns.shift();
        return choice;
    }

    isFarFromPlayer(x, y) {
        const playerParams = this.player.getParams();
        const dx = x - playerParams.playerCenterX;
        const dy = y - playerParams.playerCenterY;
        return Math.sqrt(dx * dx + dy * dy) > this.minSpawnDistance;
    }

    spawnEnemies(type) {
    const groupSize = this.packSizes[type];
    const playerParams = this.player.getParams();
    const result = [];

    let spawnX, spawnY;
        do {
            spawnX = Math.random() * ARENA_WIDTH;
            spawnY = Math.random() * ARENA_HEIGHT;
        } while (!this.isFarFromPlayer(spawnX, spawnY));

        for (let i = 0; i < groupSize; i++) {
            const offsetX = (Math.random() - 0.5) * 100;
            const offsetY = (Math.random() - 0.5) * 100;
            const x = Math.max(0, Math.min(ARENA_WIDTH, spawnX + offsetX));
            const y = Math.max(0, Math.min(ARENA_HEIGHT, spawnY + offsetY));

            let enemy;
            if (type === 'crawler') enemy = new Crawler(x, y);
            else if (type === 'sprinter') enemy = new Sprinter(x, y);
            else if (type === 'spitter') enemy = new Spitter(x, y);

            result.push(enemy);
            this.enemies.push(enemy);
        }

        for (const enemy of result) {
            enemy.resolveSpawnOverlap(this.enemies);
        }

        return result;
    }

}
