/**
 *  Création de la map
 */
function creer_map ()
{

    // stock toutes les "<td></td>" créées en rapport avec var map=(index.html)
    var td = "";

    // stock toutes les "<tr>"+td+"</tr>" créées en rapport avec var map=(index.html)
    var tr = [];

    // boucle qui va créer toutes les "<td></td>" en rapport avec var map=(index.html)
    for ( var i = 0; i <= map; i++ )
    {
        td += "<td></td>";
    }
    // boucle qui va créer toutes les "<tr>"+td+"</tr>" en rapport avec var map=(index.html)
    for ( var i = 0; i <= map; i++ )
    {
        tr.push( "<tr>" + td + "</tr>" );
    }
    // sélectionne <body></body> puis .html() affiche "<table>"+tr.join("\n")+"</table>" dans <body></body>
    $( document.body ).html( "<table>" + tr.join( "\n" ) + "</table>" );
}
/**
 *  Création du snake
 */
function creer_snake ()
{

    // sélectionne toutes les <td></td> puis retire les Class de ("tete_snake corps_snake")
    $( "td" ).removeClass( "tete_snake corps_snake" );

    // pour chaque cellule de l'objet corps_snake, javaScript exécutera l'instruction indiquée
    for ( const cell in corps_snake )
    {

        // sélectionne la <tr></tr> qui correspond à l'index .eq(corps_snake[cell][0])
        $( "tr" ).eq( corps_snake[ cell ][ 0 ] ).find( "td" ).eq( corps_snake[ cell ][ 1 ] ).addClass( "corps_snake" ); // puis
        // sélectionne la <td></td> qui correspond à l'index .eq(corps_snake[cell][1])
    }
    // sélectionne la <tr></tr> qui correspond à l'index .eq(tete_snake[0])
    $( "tr" ).eq( tete_snake[ 0 ] ).find( "td" ).eq( tete_snake[ 1 ] ).addClass( "tete_snake" ); // puis
    // sélectionne la <td></td> qui correspond à l'index .eq(tete_snake[1])
}
/**
 *  Actualisation de la position du snake
 */
function actualiser_snake ()
{

    // stock la direction de [tete_snake[0], tete_snake[1]]
    var nouvelle_tete = [];

    // stock la longueur de [corps_snake[],[],[],[],[]]
    var taille_snake = corps_snake.length;

    if ( direction == "droite" ) // intéragi avec changer_direction()
    {

        // stock la position x [tete_snake] et y + 1
        nouvelle_tete = [ tete_snake[ 0 ],tete_snake[ 1 ] + 1 ];
    }
    else if ( direction == "gauche" )
    {

        // stock la position x [tete_snake] et y - 1
        nouvelle_tete = [ tete_snake[ 0 ],tete_snake[ 1 ] - 1 ];
    }
    else if ( direction == "haut" )
    {

        // stock la position x - 1 [tete_snake] et y
        nouvelle_tete = [ tete_snake[ 0 ] - 1,tete_snake[ 1 ] ];
    }
    else if ( direction == "bas" )
    {

        // stock la position x + 1 [tete_snake] et y
        nouvelle_tete = [ tete_snake[ 0 ] + 1,tete_snake[ 1 ] ];
    }

    // boucle qui prend la taille du snake - 1 (ex:5-1); tant que (ex:=4) > 0; on décrémente d'une itération
    for ( var i = taille_snake - 1; i > 0; i-- )
    {

        // donc corps_snake=[(ex:5-1=4)] = corps_snake[(4-1=3)]
        corps_snake[ i ] = corps_snake[ i - 1 ];
    }

    // la 1er cellule de corps_snake[0(=xy)] = (tete_snake et nouvelle_tete)
    corps_snake[ 0 ] = tete_snake = nouvelle_tete;

    // exécute la fonction creer_snake()
    creer_snake();
}
/**
 *  Lancement du jeu
 */
function demarrer_jeu ()
{

    // setInterval() exécute en boucle actualiser_snake() avec un interval en millisecondes entre chaque exécution
    go = setInterval( actualiser_snake,speed );
}
/**
 *  Changement de direction
 */
function changer_direction ()
{
    // sélectionne <body></body> puis événement .keydown se produit lorsqu'une touche du clavier est enfoncée puis lance la function (e) = paramètre de la touche enfoncée (37 || 38 || 39 || 40)
    $( "body" ).keydown( function ( e )
    {
        // si e.(=37)keyCode
        if ( e.keyCode == 37 ) // 37 = flèche gauche du clavier
        {
            direction = "gauche"; // intéragi avec actualiser_snake()
        }
        else if ( e.keyCode == 38 ) // 38 = flèche haut du clavier
        {
            direction = "haut";
        }
        else if ( e.keyCode == 39 ) // 39 = flèche droite du clavier
        {
            direction = "droite";
        }
        else if ( e.keyCode == 40 ) // 40 = flèche bas du clavier
        {
            direction = "bas";
        }
    } );
}
/**
 *  Création du fruit
 */
function creer_fruit ()
{
    // sélectionne toutes <td></td> puis retire la Class("fruit")
    $( "td" ).removeClass( "fruit" );

    // fruit = stock [converti string en numberInter (nombre aléatoire() multiplié par map)]
    fruit = [ parseInt( Math.random() * map ),parseInt( Math.random() * map ) ];

    // sélectionne toutes <tr></tr> qui correspond à l'index .eq(fruit[0])
    $( "tr" ).eq( fruit[ 0 ] ).find( "td" ).eq( fruit[ 1 ] ).addClass( "fruit" ); // puis
    // sélectionne la <td></td> qui correspond à l'index .eq(fruit[1])
}
