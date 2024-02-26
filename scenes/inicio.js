class inicio extends Phaser.Scene {
    constructor() {
        super({ key: 'inicio',
        backgroundColor: '#000',
    });
    }

    // Carregar recursos
    preload() {
        this.load.image('cesta', './assets/cesta.png');
        this.load.image('maca', './assets/maca.png');
        this.load.image('banco', './assets/banco.png');
        this.load.image('pulo', './assets/pulo.png');
    }

    // Configuração inicial da cena
    create() {

        // Adiciona os textos presentes na tela inicial
        this.add.text(40, 25, 'Seja bem vindo ao jogo "CataFruta"', {fontSize:'25px', fill:'#000000'});
        this.add.text(100, 75, 'Para se mover use as setas'+ '\n' + '    direita e esquerda', {fontSize:'25px', fill:'#000000'});
        this.add.text(45, 150, 'Para pular aperte a seta para cima', {fontSize:'25px', fill:'#000000'});
        this.add.text(140, 200, 'Quando estiver pronto' + '\n' + '    Pegue a maçã', {fontSize:'25px', fill:'#000000'});
        
        // Define quais teclas serão utilizadas no jogo
        teclado = this.input.keyboard.createCursorKeys();

        //Adiciona um banco ao final na tela
        banco1 = this.physics.add.staticImage(540, 500, 'banco');
            banco1.body.setSize(110, 175, true);
            banco1.setScale(0.6);

        // Adiciona o player
        cesta = this.physics.add.sprite(150, 480, 'cesta');
            cesta.body.setSize(200, 400, true);
            cesta.setScale(0.5);
            cesta.setCollideWorldBounds(true);
            this.physics.add.collider(cesta, banco1);
        
        // Adiciona o sprite de pulo
        jump = this.add.sprite(0, 0, 'pulo');
            jump.setVisible(false);
            jump.setScale(0.2);

        // Adiciona o sprite da maçã e atribiu física e contato a ela
        maca = this.physics.add.sprite(540, 365, 'maca');
            maca.setScale(0.1);
            maca.setCollideWorldBounds(true);
            this.physics.add.collider(maca, banco1);
        
        this.physics.add.overlap(cesta, maca, function(){
            pontos += 1;
        });
    }

    // Lógica de atualização da cena
    update() {
        // Move o menino para a esquerda se a tecla esqueda for precionada
        if (teclado.left.isDown) {
            cesta.setVelocityX(-100);
        }
        // Move o menino para a direita se a seta direita for precionada.
        else if (teclado.right.isDown) {
            cesta.setVelocityX(100);
        }
        // Faz o menino permanecer parado.
        else {
            cesta.setVelocityX(0);
        }

        // Verifica se a o menino está tocando o chão antes de permitir um novo pulo
        const noChao = cesta.body.blocked.down || cesta.body.touching.down;
        if (noChao && teclado.up.isDown) {
            cesta.setVelocityY(-200); // Define a velocidade vertical para o pulo
            pulando();
        }
        //
        else{
            parado();
        }

        // Define onde o sprite de pulo aparecerá 
        jump.setPosition(cesta.x + 5, cesta.y + 120);
    
        // Função que faz surgir o sprite de pulo
        function pulando(){
            jump.setVisible(true);
            controleTempo = 60;
        }

        // Função que desaparece com o sprite de pulo
        function parado(){
            if (controleTempo > 0){
                controleTempo --;
            }
            else{
                jump.setVisible(false);
            }
        }

        // Condição para iniciar o jogo
        if (pontos === 1){
            this.scene.start('jogo');
        }
    }
}