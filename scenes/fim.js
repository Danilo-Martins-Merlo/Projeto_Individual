class fim extends Phaser.Scene {
    constructor() {
        super({ key: 'fim' });
    }

    // Carregar recursos
    preload() {
        this.load.image('joia', './assets/joia.png');
    }

    // Configuração inicial da cena
    create() {
        this.add.text(125, 200, 'Parabéns, você ganhou!!!', {fontSize:'25px', fill:'#000000'});
        this.add.text(70, 300, 'Graças a você, Jorginho coletou', {fontSize:'25px', fill:'#000000'});
        this.add.text(175, 325, 'todas as 10 maçãs', {fontSize:'25px', fill:'#000000'});
        
        this.add.image(300, 450, 'joia').setScale(0.2);
    }

    // Lógica de atualização da cena
    update() {
        
    }
}