class jogo extends Phaser.Scene {
    constructor() {
        super({ key: 'jogo',
        backgroundColor: '#000',
    });
    }
    
    preload() {
        // Carregar recursos
        this.load.image(arquivos[0], './assets/cesta.png');
        this.load.image(arquivos[1], './assets/cozinha.png');
        this.load.image(arquivos[2], './assets/maca.png');
        this.load.image(arquivos[3], './assets/banco.png');
        this.load.image(arquivos[4], './assets/banco.png');
        this.load.image(arquivos[5], './assets/pulo.png');
    }

    create() {
        pontos = 0
        // Define a imagem de fundo
        this.add.image(300, 290, arquivos[1]).setScale(1.8);

        // Adiciona e desaparece com o sprite de pulo
        jump = this.add.sprite(0, 0, arquivos[5]);
            jump.setVisible(false);
            jump.setScale(0.2);
        
        // adiciona o 1º banco ao jogo
        banco1 = this.physics.add.staticImage(100, 500, arquivos[3]);
            banco1.body.setSize(110, 200, true);
            banco1.setScale(0.6);
        
        // adiciona o 2º banco ao jogo
        banco2 = this.physics.add.staticImage(500, 500, arquivos[4]);
            banco2.body.setSize(110, 200, true);
            banco2.setScale(0.6);

        // adiciona o menino com a cesta ao jogo e aplica física a ele
        cesta = this.physics.add.sprite(300, 440, arquivos[0]);
            cesta.body.setSize(200, 400, true);
            cesta.setScale(0.5);
            cesta.setCollideWorldBounds(true);
            this.physics.add.collider(cesta, banco1);
            this.physics.add.collider(cesta, banco2);

        //adiciona a maçã ao jogo e aplica física a ela
        maca = this.physics.add.sprite(0, 0, arquivos[2]);
            maca.setScale(0.1);
            maca.setCollideWorldBounds(true);
            this.physics.add.collider(maca, banco1);
            this.physics.add.collider(maca, banco2);

        // Define as teclas que serão utilizadas
        teclado = this.input.keyboard.createCursorKeys();

        // Adiciona o placar
        placar = this.add.text(20, 50, 'Pontuação:' + pontos, {fontSize:'25px', fill:'#ffffff'});

        // Adiciona o sistema de coleta e contabilização dos pontos dados pelas maçãs
        this.physics.add.overlap(cesta, maca, function(){
            maca.setVisible(false);
            maca.setVelocityY(0);
            let posiçãoFruta = Phaser.Math.RND.between(10, 590);
            maca.setPosition(posiçãoFruta, 20);
            pontos += 1;
            placar.setText('Pontuação:' + pontos);
            maca.setVisible(true);
        });
    }

    update() {
        // Move o menino para a esquerda se a tecla esqueda for precionada
        if (teclado.left.isDown) {
            cesta.setVelocityX(-200);
        }
        // Move o menino para a direita se a seta direita for precionada.
        else if (teclado.right.isDown) {
            cesta.setVelocityX(200);
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
        else{
            parado();
        }

        // Define onde o sprite de pulo aparecerá 
        jump.setPosition(cesta.x + 5, cesta.y + 120);

        // reposiciona a maçã e remove 1 ponto caso ela toque o chão
        while (maca.y >= 550) {
            let newPositionX = Phaser.Math.RND.between(10, 630);
            maca.setPosition(newPositionX, 20); 
            pontos -= 1;
            placar.setText('Pontuação:' + pontos);
            break
        }
        
        // se a maçã encostar no banco o jogador perde 1 ponto
        while (maca.y >= 365 && maca.x < 170) {
            let newPositionX = Phaser.Math.RND.between(10, 630);
            maca.setPosition(newPositionX, 20); 
            pontos -= 1;
            placar.setText('Pontuação:' + pontos);
            break
        }

        // se a maçã encostar no banco o jogador perde 1 ponto
        while (maca.y >= 365 && maca.x > 400) {
            let newPositionX = Phaser.Math.RND.between(10, 630);
            maca.setPosition(newPositionX, 20); 
            pontos -= 1;
            placar.setText('Pontuação:' + pontos);
            break
        }

        // Função que faz aparecer o sprite de pulo
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

        // Condição de vitória
        if (pontos === 10){
            this.scene.start('fim');
        }
    }
}