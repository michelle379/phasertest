class Menu extends Phaser.Scene{
    constructor(){
        super({ key: "Menu" });
        this.button=null;
        this.particles=null;
        this.emitter=null;
    }
    
    preload(){
        this.load.image("button","PNG/simple/24.png");
        this.load.image("heart",'assets/heart.png');
    }
    create(){
        this.button=this.add.image(450,250,"button").setInteractive({ useHandCursor: true }).on("pointerup", () => {this.startgame();});
        this.gamestart = this.add.text(400, 235, "start", {
            fontSize: "32px",
            color: "#ffffff"
        });
    
        this.particles=this.add.particles('heart');
        this.emitter=this.particles.createEmitter();
        this.emitter.setPosition(300,150);
        this.emitter.setSpeed(300);
        this.emitter.setBlendMode(Phaser.BlendModes.ADD);
    }

    startgame(){
        this.scene.start("Scene");
    }

    update(){

    }
}

