let selectedCharacter = 'kraken'; // Default character

// Game Configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('kraken', 'assets/images/kraken.png');
    this.load.image('godzilla', 'assets/images/godzilla.png');
    this.load.image('bloop', 'assets/images/bloop.png');
    this.load.image('background', 'assets/images/fight_background.png');
}

function create() {
    this.add.image(400, 300, 'background');
    
    let player = this.add.sprite(100, 500, selectedCharacter);
    let enemy = this.add.sprite(700, 500, 'bloop');

    this.cursors = this.input.keyboard.createCursorKeys();

    this.healthPlayer = 100;
    this.healthBloop = 100;

    this.healthText = this.add.text(10, 10, `Player Health: ${this.healthPlayer}`, {
        font: '18px Arial', fill: '#fff'
    });
    this.healthBloopText = this.add.text(600, 10, `Bloop Health: ${this.healthBloop}`, {
        font: '18px Arial', fill: '#fff'
    });
}

function update() {
    if (this.cursors.left.isDown) {
        player.x -= 5;
    } else if (this.cursors.right.isDown) {
        player.x += 5;
    }

    if (this.cursors.up.isDown) {
        player.y -= 5;
    }

    if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), enemy.getBounds())) {
        this.healthBloop -= 0.1;
        this.healthBloopText.setText(`Bloop Health: ${Math.floor(this.healthBloop)}`);
    }

    if (this.healthBloop <= 0) {
        this.add.text(300, 250, 'You Win!', { font: '48px Arial', fill: '#ff0000' });
    }

    if (this.healthPlayer <= 0) {
        this.add.text(300, 250, 'Game Over', { font: '48px Arial', fill: '#ff0000' });
    }
}

function selectCharacter(character) {
    selectedCharacter = character;
    game.scene.restart();
}
