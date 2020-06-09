/*

            !!!!!!!!!!!!!!!!!
            !               !
            !   VARIABLES   !
            !               !
            !!!!!!!!!!!!!!!!!

*/
// stock toutes les "<td></td>" créées en rapport avec var map_x
var td = "";

// stock toutes les "<tr>"+td+"</tr>" créées en rapport avec var map_y
var tr = [];

// modifie la taille de la map
var map_x = 80; // horizontal

var map_y = 24; // vertical

var fruit = [];

// stock les coordonnées [<tr></tr>, <td></td>] de tete_snake=[] dans 1 seule cellule
var tete_snake = [ 0,2 ];

// stock les coordonnées [<tr></tr>, <td></td>] de corps_snake=[] dans 5 cellules
var corps_snake = [
    [ 0,2 ],
    [ 0,1 ]
];

var snakeTail = [ 0,1 ];

// modifie la direction du snake
var direction = "droite";

// modifie la vitesse du snake
var speed = 150;

// modifie la div #score
var score = 0;
/**


            !!!!!!!!!!!!!!!!!
            !               !
            !   FUNCTIONS   !
            !               !
            !!!!!!!!!!!!!!!!!


/*********************
    1) Create Map    |
~~~~~~~~~~~~~~~~~~~~*/

function createMap ()
{
    // boucle qui va créer toutes les "<td></td>" en rapport avec var map_x
    for ( var i = 0; i <= map_x; i++ )
    {
        td += "<td></td>";
    }

    // boucle qui va créer toutes les "<tr>"+td+"</tr>" en rapport avec var map_y
    for ( var i = 0; i <= map_y; i++ )
    {
        tr.push( "<tr>" + td + "</tr>" );
    }

    // sélectionne <main> puis .append() insère "<table>"+tr.join("\n")+"</table>"
    $( "main" ).append( "<table>" + tr.join( "\n" ) + "</table>" );
    // dans </main > en tant que dernier enfant
}


/******************************
    2) Snake Sex Selection    |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

$( ".buttons" ).on( "click",function ( e )
{
    if ( e.target.id === "girl" )
    {
        $( "main" ).css( "background-image","none" );
        $( "td" ).addClass( "grille1" );
    }

    else if ( e.target.id === "boy" )
    {
        $( "main" ).css( "background-image","none" );
        $( "td" ).addClass( "grille2" );

        speed = 150;
    }


    // exécute la fonction startGame()
    startGame();

    // exécute la fonction direction()
    snakeDirection();

    // exécute la fonction createFruit()
    createFruit();
} );


/********************
    3) Start Game   |
~~~~~~~~~~~~~~~~~~~*/

function startGame ()
{
    // setInterval() exécute en boucle snakeMove() avec un interval en millisecondes entre chaque exécution
    go = setInterval( snakeMove,speed );
}


/*********************
    4) Snake Move    |
~~~~~~~~~~~~~~~~~~~~*/

function snakeMove ()
{
    // stock la direction de [tete_snake[0], tete_snake[1]]
    var nouvelle_tete = [];

    // stock la longueur de [corps_snake[],[],[],[],[]]
    var taille_snake = corps_snake.length;


    snakeTail = corps_snake[ corps_snake.length - 2 ];

    if ( JSON.stringify( snakeTail ) === JSON.stringify( fruit[ 0 ] ) )
    {
        oldFruit = $( "tr" ).eq( fruit[ 0 ][ 0 ] ).find( "td" ).eq( fruit[ 0 ][ 1 ] );

        oldFruit.toggleClass( "createFruit" );

        fruit.splice( 0,1 );
    }


    // sélectionne la span de la div #score puis .affiche ("espace" + variable score)
    $( "#score" ).html( score );


    if ( direction === "droite" ) // intéragi avec direction()
    {
        // stock la position x [tete_snake] et y + 1
        nouvelle_tete = [ tete_snake[ 0 ],tete_snake[ 1 ] + 1 ];
    }

    else if ( direction === "gauche" )
    {
        // stock la position x [tete_snake] et y - 1
        nouvelle_tete = [ tete_snake[ 0 ],tete_snake[ 1 ] - 1 ];
    }

    else if ( direction === "haut" )
    {
        // stock la position x - 1 [tete_snake] et y
        nouvelle_tete = [ tete_snake[ 0 ] - 1,tete_snake[ 1 ] ];
    }

    else if ( direction === "bas" )
    {
        // stock la position x + 1 [tete_snake] et y
        nouvelle_tete = [ tete_snake[ 0 ] + 1,tete_snake[ 1 ] ];
    }


    // cell = stock toutes <tr></tr> qui correspond à l'index .eq(nouvelle_tete[0])
    cell = $( "tr" ).eq( nouvelle_tete[ 0 ] ).find( "td" ).eq( nouvelle_tete[ 1 ] ); // puis
    // trouve toutes <tr></tr> qui correspond à l'index .eq(nouvelle_tete[1])

    // si variable (cell .est Class ("fruit"))
    if ( cell.hasClass( "createFruit" ) )
    {
        // ajoute une nouvelle cellule dans array [corps_snake]
        corps_snake.push( [] );

        // creé un nouveau fruit avec une nouvelle position
        createFruit();

        // agrémente de +1 la variable score
        score++;
    }

    // sinon si (variable cell .est Class("corps_snake"))
    else if ( cell.hasClass( "femaleBody" ) )// collision avec lui-même
    {
        gameOver(); // exécute la fonction gameOver()
    }

    else if ( cell.hasClass( "maleBody" ) )// collision avec lui-même
    {
        gameOver(); // exécute la fonction gameOver()
    }

    // sinon si variable nouvelle_tete avec l'index [0] est < que 0
    else if ( nouvelle_tete[ 0 ] < 0 || nouvelle_tete[ 1 ] < 0 ) // collision avec la bordure haute et gauche
    { // de la map nouvelle_tete avec l'index [1] est < que 0

        gameOver(); // exécute la fonction gameOver()
    }

    // sinon si variable nouvelle_tete avec l'index [0] est > que map
    else if ( nouvelle_tete[ 0 ] > map_y || nouvelle_tete[ 1 ] > map_x )// collision avec la bordure basse et droite
    { // de la map nouvelle_tete avec l'index [1] est > que map

        gameOver(); // exécute la fonction gameOver()
    }


    // boucle qui prend la taille du snake - 1 (ex:5-1); tant que (ex:=4) > 0; on décrémente d'une itération
    for ( var i = taille_snake - 1; i > 0; i-- )
    {
        // donc corps_snake=[(ex:5-1=4)] = corps_snake[(4-1=3)]
        corps_snake[ i ] = corps_snake[ i - 1 ];
    }


    // la 1er cellule de corps_snake[0(=xy)] = (tete_snake et nouvelle_tete)
    corps_snake[ 0 ] = tete_snake = nouvelle_tete;


    // exécute la fonction createSnake()
    createSnake();
}


/**********************
    5) Create Fruit   |
~~~~~~~~~~~~~~~~~~~~~*/

function createFruit ()
{
    // fruit = stock [converti string en numberInter (nombre aléatoire() multiplié par map)]
    apple = [ parseInt( Math.random() * map_y ),parseInt( Math.random() * map_x ) ];

    // sélectionne toutes <tr></tr> qui correspond à l'index .eq(fruit[0])
    $( "tr" ).eq( apple[ 0 ] ).find( "td" ).eq( apple[ 1 ] ).toggleClass( "createFruit" ); // puis
    // sélectionne la <td></td> qui correspond à l'index .eq(fruit[1])

    fruit.push( apple );
}


/**********************
    6) Create Snake   |
~~~~~~~~~~~~~~~~~~~~~*/

function createSnake ()
{
    if ( $( "td" ).hasClass( "grille1" ) )
    {
        // sélectionne toutes les <td></td> puis retire les Class de ("femaleHead femaleBody")
        $( "td" ).removeClass( "femaleHead femaleBody femaleTail" );

        // pour chaque cellule de l'objet corps_snake, javaScript exécutera l'instruction indiquée
        for ( const cell in corps_snake )
        {
            // sélectionne la <tr></tr> qui correspond à l'index .eq(corps_snake[cell][0])
            $( "tr" ).eq( corps_snake[ cell ][ 0 ] ).find( "td" ).eq( corps_snake[ cell ][ 1 ] ).toggleClass( "femaleBody" );
            // sélectionne la <td></td> qui correspond à l'index .eq(corps_snake[cell][1])
        }

        // sélectionne la <tr></tr> qui correspond à l'index .eq(tete_snake[0])
        $( "tr" ).eq( tete_snake[ 0 ] ).find( "td" ).eq( tete_snake[ 1 ] ).toggleClass( "femaleHead" ); // puis
        // sélectionne la <td></td> qui correspond à l'index .eq(tete_snake[1])

        $( "tr" ).eq( snakeTail[ 0 ] ).find( "td" ).eq( snakeTail[ 1 ] ).toggleClass( "femaleTail" );
    }

    else if ( $( "td" ).hasClass( "grille2" ) )
    {
        // sélectionne toutes les <td></td> puis retire les Class de ("femaleHead femaleBody")
        $( "td" ).removeClass( "maleHead maleBody maleTail" );

        // pour chaque cellule de l'objet corps_snake, javaScript exécutera l'instruction indiquée
        for ( const cell in corps_snake )
        {
            // sélectionne la <tr></tr> qui correspond à l'index .eq(corps_snake[cell][0])
            $( "tr" ).eq( corps_snake[ cell ][ 0 ] ).find( "td" ).eq( corps_snake[ cell ][ 1 ] ).toggleClass( "maleBody" );
            // sélectionne la <td></td> qui correspond à l'index .eq(corps_snake[cell][1])
        }

        // sélectionne la <tr></tr> qui correspond à l'index .eq(tete_snake[0])
        $( "tr" ).eq( tete_snake[ 0 ] ).find( "td" ).eq( tete_snake[ 1 ] ).toggleClass( "maleHead" ); // puis
        // sélectionne la <td></td> qui correspond à l'index .eq(tete_snake[1])

        $( "tr" ).eq( snakeTail[ 0 ] ).find( "td" ).eq( snakeTail[ 1 ] ).toggleClass( "maleTail" );
    }
}


/*******************
    7) Direction   |
~~~~~~~~~~~~~~~~~~*/

function snakeDirection ()
{
    // sélectionne <body></body> puis événement .keydown se produit lorsqu'une touche du clavier est enfoncée puis lance la function (e) = paramètre de la touche enfoncée (37 || 38 || 39 || 40)
    $( "body" ).keydown( function ( e )
    {
        // si e.(=37)keyCode
        if ( e.keyCode === 37 ) // 37 = flèche gauche du clavier
        {
            direction = "gauche"; // intéragi avec snakeMove()
        }

        else if ( e.keyCode === 38 ) // 38 = flèche haut du clavier
        {
            direction = "haut";
        }

        else if ( e.keyCode === 39 ) // 39 = flèche droite du clavier
        {
            direction = "droite";
        }

        else if ( e.keyCode === 40 ) // 40 = flèche bas du clavier
        {
            direction = "bas";
        }
    } );
}


/*******************
    8) Game Over   |
~~~~~~~~~~~~~~~~~~*/

function gameOver ()
{
    // stop la variable go (snakeMove,speed)
    clearInterval( go );

    $( "td" ).removeClass( "grille1 grille2" );

    // sélectionne table puis change la couleur du background
    $( "table" ).addClass( "image" ).animate( { opacity: 1 },3000 );

    // sélectionne .tete_snake,.corps_snake,.fruit puis l'efface (vite)
    $( ".femaleBody,.maleBody,.femaleHead,.maleHead,.femaleTail,.femaleTail,.createFruit" ).fadeOut( "fast" );


    $( "#replay" ).click( function ()
    {
        location.reload();
    } );
}
