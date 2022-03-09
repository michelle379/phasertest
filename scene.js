class Scene extends Phaser.Scene{
    constructor(){
        super({ key: "Scene" });
        this.player=null;
        this.platforms=null;
        this.heart=null;
        this.lose=null;
        this.enemy=null;
        this.coins=null;
    }
    
    preload(){
        this.load.audio('lose', 'music/lose.mp3');
        this.load.audio('pick', 'music/pick.mp3');

        this.load.image("platform",'assets/platform.png');
        this.load.image("heart",'assets/heart.png');
        this.load.image("lose",'assets/lose.png');
        this.load.image("enemy","assets/c.png");
        this.load.image("coin","assets/coin.png");

        this.load.spritesheet('player','assets/rabbit3 - doux.png',{frameWidth:72 ,frameHeight:72 });
    }
    create(){
        this.player=new Player(this,400,165).setInteractive();
        this.lose=this.add.image(450,170,'lose').setInteractive();

        this.input.setDraggable([this.lose,this.player]);

        this.input.on('drag',function(pointer,gameObj,dragX,dragY){
            gameObj.x=dragX;
            gameObj.y=dragY;
        })
        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff69b4);
            gameObject.setScale(2);
            gameObject.setDepth(1);
        })
        this.input.on('dragend', function (pointer, gameObject) {
            gameObject.setTint();
            gameObject.setScale();
            gameObject.setDepth();
        })

        this.score = 0;
        this.scoreText = this.add.text(10, 10, "Score:", {
            fontSize: 50,
            fill: "white"
        });

        this.platforms=this.physics.add.staticGroup();
        this.platforms.create(300,214,'platform');
        this.platforms.create(500,214,'platform');
       
        this.heart=this.physics.add.staticGroup();
        this.heart.create(  270,170  , 'heart');
        this.heart.create(  320,170  , 'heart');
        this.heart.create(  220,170  , 'heart');

        this.enemy=new Enemy(this,100,570);
        this.enemys = [this.enemy];

        this.coins=this.physics.add.staticGroup();
        this.coins.create(50,400,'coin');
        this.coins.create(500,400,'coin');

        this.physics.add.collider(this.player, this.platforms);

        this.anims.create({
            key:'left',
            frames:this.anims.generateFrameNumbers('player',{start:14,end:16}),
            frameRate:10,
            repeat:1,
            flipX:true,
        });

        this.anims.create({
            key:'right',
            frames:this.anims.generateFrameNumbers('player',{start:5,end: 7}),
            frameRate: 10 ,
            repeat:1
        });

        this.physics.add.overlap(
         this.heart, 
         this.player, 
         this.player_touch_heart,
         null,
         this
       );

       this.physics.add.overlap(
        this.coins, 
        this.enemy, 
        this.enemy_touch_coin,
        null,
        this
      );

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    player_touch_heart(player,heart){
        heart.disableBody(true, true);
        this.sound.play('pick');
        this.score++;
       }

    enemy_touch_coin(enemy,coins) {
    let random = Math.floor(Math.random() * 1000) % 2;
    switch (random) {
        case 0:
        enemy.setDirection("right");
        break;
        case 1:
        enemy.setDirection("left");
        break;
        default:
        break;
    }
    }

    update(){
        this.scoreText.setText("Score:" + this.score);

        if(this.cursors.left.isDown){
            this.player.setVelocityX(-200);
            this.player.anims.play("left",true);
        }else if(this.cursors.right.isDown){
            this.player.setVelocityX(200);
            this.player.anims.play("right",true);
        }
        else{
            this.player.setVelocityX(0);
        }

        for (let enemy of this.enemys) {
            if (enemy.getDirection() === "left") {
              enemy.setVelocity(-50, 0);
            } else if(enemy.getDirection() === "right"){
              enemy.setVelocity(50, 0);
            } 
            }


    }
}

