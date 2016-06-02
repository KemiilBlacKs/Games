var snake;
var apple;
var snakeGame;


window.onload = function()
{
    snakeGame = new SnakeGame(900, 600, 20, 100);
    snake = new Snake([[6,4], [5,4], [4,4], [3, 4], [2, 4]], "right");
    apple = new Apple([10, 10]);
    //snakeGame.init(snake, apple);
}


//Direction avec le clavier
document.onkeydown = function handleKeyDown(e)
{
    var key = e.keyCode;
    var newDirection;
    switch(key) //Attribution des entrées clavier pour la direction et restart
    {
        case 13:
            snake = new Snake([[6,4], [5,4], [4,4], [3, 4], [2, 4]], "right");
            apple = new Apple([10, 10]);
            snakeGame.init(snake, apple);
            return;
        case 37:
            newDirection = "left";
            break;
        case 38:
            newDirection = "up";
            break;
        case 39:
            newDirection = "right";
            break;
        case 40:
            newDirection = "down";
            break;
        case 32:
            snake = new Snake([[6,4], [5,4], [4,4], [3, 4], [2, 4]], "right");
            apple = new Apple([10, 10]);
            snakeGame.init(snake, apple);
            return;
        default:
            return;
    }
    snakeGame.snake.setDirection(newDirection);
}


//--------------------------------------------------------- Constructeur du jeu ---------------------------------------------------------
function SnakeGame(canvasWidth, canvasHeight, blockSize, delay)
{
    this.canvas = document.createElement('canvas');
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.canvas.style.border = "30px solid #BE133E";
    this.canvas.style.margin = "50px auto 0px";
    this.canvas.style.display = "block";
    this.canvas.style.backgroundImage = 'url("wall-canvas.jpg")';
    this.canvas.style.backgroundPosition = "center";
    this.canvas.style.backgroundRepeat = "no-repeat";
    this.canvas.style.backgroundSize = "cover";
    this.canvas.style.backgroundAttachment = "fixed";
    this.canvas.style.backgroundColor = "#3E2723";
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.blockSize = blockSize;
    this.delay = delay;
    this.snake;
    this.apple;
    this.widthInBlocks = canvasWidth/blockSize;
    this.heightInBlocks = canvasHeight/blockSize;
    this.score;
    
    this.ctx.save();
    this.ctx.font = "bold 30px Helvetica";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#0097A7";
    this.ctx.lineWidth = 5;
    var centreX = this.canvas.width / 2;
    var centreY = this.canvas.height / 2;
    this.ctx.fillText("Appuyer sur la touche 'ENTRER' ou 'ESPACE' pour JOUER.", centreX, centreY);
    
    this.ctx.font = "bold 20px Helvetica";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#0097A7";
    this.ctx.lineWidth = 5;
    var centreX = this.canvas.width / 2;
    var centreY = this.canvas.height / 2;
    this.ctx.fillText("Dans le jeu, appuyer sur les mêmes touches pour réinitialisé le jeu.", centreX, centreY + 50);
    this.ctx.restore();
    
    var instance = this;
    var timeout;
    
    //Création du canvas
    this.init = function(snake, apple)
    {
        this.snake = snake;
        this.apple = apple;
        this.score = 0;
        clearTimeout(timeout);
        refreshCanvas();
    };
    
    //Raffraichissement du canvas pour faire avancé le serpent
    var refreshCanvas = function()
    {
        instance.snake.advance();
        if(instance.checkCollision())
        {
            instance.gameOver();
        }
        else
        {
            if (instance.snake.isEatingApple(instance.apple))
            {
                instance.score++;
                instance.snake.ateApple = true;
                do
                {
                    instance.apple.setNewPosition(instance.widthInBlocks, instance.heightInBlocks);
                }
                while(instance.apple.isOnSnake(instance.snake))
            }
            instance.ctx.clearRect(0, 0, instance.canvas.width, instance.canvas.height);
            instance.drawScore();
            instance.snake.draw(instance.ctx, instance.blockSize);
            instance.apple.draw(instance.ctx, instance.blockSize);
            timeout = setTimeout(refreshCanvas, delay);
        }
    }
        
    //Check les collisions   
    this.checkCollision = function() 
    {
        var wallCollision = false;
        var snakeCollision = false;
        var head = this.snake.body[0];
        var rest = this.snake.body.slice(1);
        var snakeX = head[0];
        var snakeY = head[1];
        var minX = 0;
        var minY = 0;
        var maxX = this.widthInBlocks - 1;
        var maxY = this.heightInBlocks - 1;
        var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
        var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

        if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)
        {
            wallCollision = true;
        }

        for (var i = 0; i < rest.length; i++)
        {
            if (snakeX === rest[i][0] && snakeY === rest[i][1])
            {
                snakeCollision = true;
            }
        }
        return wallCollision || snakeCollision;
    }; //Fin de la méthode pour checker les collisions
        
    //Fonction fin de jeu
    this.gameOver = function() 
    {
        this.ctx.save();
        this.ctx.font = "bold 90px 'Press Start 2P', Helvetica";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#0097A7";
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 5;
        var centreX = this.canvas.width / 2;
        var centreY = this.canvas.height / 2;
        this.ctx.strokeText("Game Over", centreX, centreY - 180);
        this.ctx.fillText("Game Over", centreX, centreY - 180);
        
        this.ctx.font = "bold 20px Helvetica";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#0097A7";
        this.ctx.lineWidth = 5;
        var centreX = this.canvas.width / 2;
        var centreY = this.canvas.height / 2;
        this.ctx.fillText("Appuyer sur la touche 'ENTRER' ou 'ESPACE' pour REJOUER.", centreX, centreY + 280);
        this.ctx.restore();
    }; //Fin de la fonction fin de jeu
    
    //Ecrire le score
    this.drawScore = function()
    {
        this.ctx.save();
        this.ctx.font = "bold 50px 'Press Start 2P', Helvetica";
        this.ctx.fillStyle = "#0097A7";
        this.ctx.fillText(this.score.toString(), 5, this.canvas.height - 5);
        this.ctx.restore();
    };
} //--------------------------------------------------------- Fin du c=Constructeur du jeu ---------------------------------------------------------
    

    
//--------------------------------------------------------- Constructeur du serpent ---------------------------------------------------------
function Snake(body, direction)
{
    this.body = body;
    this.direction = direction;
    this.ateApple = false;
    this.draw = function(ctx, blockSize)
    {
        ctx.save();
        ctx.fillStyle = "#558B2F";
        for(var i = 0; i < this.body.length; i++)
        {
            var x = this.body[i][0] * blockSize;
            var y = this.body[i][1] * blockSize;
            ctx.fillRect(x, y, blockSize, blockSize);
        }
        ctx.restore();
    };

    this.advance = function() //Création d'une fonction pour faire avancer le serpent et le diriger
    {
        var nextPosition = this.body[0].slice();
        switch(this.direction)
            {
                case "left":
                    nextPosition[0]--;
                    break;
                case "right":
                    nextPosition[0]++;
                    break;
                case "down":
                    nextPosition[1]++;
                    break;
                case "up":
                    nextPosition[1]--;
                    break;
                default:
                    throw("Direction non autorisée !");
            }
        this.body.unshift(nextPosition);
        if (!this.ateApple)
            this.body.pop();
        else
            this.ateApple = false;
    }; //Fin de la fonction avancée et direction

    //Directions autorisés en fonction du sens du serpent
    this.setDirection = function(newDirection)
    {
        var allowDirections;
        switch(this.direction)
        {
            case "left":
            case "right":
                allowDirections = ["up", "down"];
                break;
            case "down":
            case "up":
                allowDirections = ["left", "right"];
                break;
            default:
                throw("Direction non autorisée !");
        }
        if (allowDirections.indexOf(newDirection) > -1)
        {
            this.direction = newDirection;
        }
    }; //Fin de la méthode direction autorisées

    this.isEatingApple = function(appleToEat) //Méthode pour checker si le serpent a mangé la pomme
    {
        var head = this.body[0];

        if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
            return true;
        else
            return false;
    }; //Fin de la méthode isEatingApple
} //--------------------------------------------------------- Fin du constructeur du serpent ---------------------------------------------------------


//--------------------------------------------------------- Constructeur de la pomme ---------------------------------------------------------
function Apple(position)
{
    this.position = position;
    this.draw = function(ctx, blockSize) //Méthode pour dessiner la pomme
    {
        ctx.save();
        ctx.fillStyle = "#B71C1C";
        ctx.beginPath();
        var radius = blockSize/2;
        var x = this.position[0]*blockSize + radius;
        var y = this.position[1]*blockSize + radius;
        ctx.arc(x, y, radius, 0, Math.PI*2, true);
        ctx.fill();
        ctx.restore();
    }; //Fin de la méthode pour dessiner la pomme
    this.setNewPosition = function(widthInBlocks, heightInBlocks) //Méthode pour définir la position de la pomme
    {
        var newX = Math.round(Math.random() * (widthInBlocks - 1));
        var newY = Math.round(Math.random() * (heightInBlocks - 1));
        this.position = [newX, newY];
    }; //Fin de la méthode pour définir la position de la pomme

    this.isOnSnake = function(snakeToCheck) //Méthode pour checker si la pomme est sur le serpent
    {
        var isOnSnake = false;

        for (var i = 0; i < snakeToCheck.body.length; i++)
        {
            if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1])
                isOnSnake = true;
        }
        return isOnSnake;
    };
} //--------------------------------------------------------- Fin du constructeur de la pomme ---------------------------------------------------------

