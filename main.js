/**
 *  Création de la map
 */ 
function creer_map() {
    
    // stock toutes les "<td></td>" créées en rapport avec var map=(index.html)
    var td=""; 
    
    // stock toutes les "<tr>"+td+"</tr>" créées en rapport avec var map=(index.html)
    var tr=[];
    
    // boucle qui va créer dans var td="string" toutes les "<td></td>" en rapport avec var map=(index.html)
    for (var i=0; i<=map; i++) {
        td +="<td></td>";        
    }
    // boucle qui va créer dans var tr=[array] toutes les "<tr>"+td+"</tr>" en rapport avec var map=(index.html)
    for (var i=0; i<=map; i++) {
        tr.push("<tr>"+td+"</tr>");
    }
    // $() sélectionne <body></body> puis .html() affiche "<table>"+tr.join("\n")+"</table>" dans <body></body>
    $(document.body).html("<table>"+tr.join("\n")+"</table>");
}
/**
 *  Création du snake
 */
function creer_snake() {
    
    // pour chaque cellule de l'objet corps_snake, javaScript exécutera l'instruction indiquée
    for (const cell in corps_snake) {
        
        // $("tr") sélectionne la <tr></tr> qui correspond à l'index .eq(corps_snake[cell][0])
        $("tr").eq(corps_snake[cell][0]).find("td").eq(corps_snake[cell][1]).addClass("corps_snake"); // et
        // $("td") sélectionne la <td></td> qui correspond à l'index .eq(corps_snake[cell][1])
    }    
    // $("tr") sélectionne la <tr></tr> qui correspond à l'index .eq(tete_snake[0])
    $("tr").eq(tete_snake[0]).find("td").eq(tete_snake[1]).addClass("tete_snake"); // et 
    // $("td") sélectionne la <td></td> qui correspond à l'index .eq(tete_snake[1])
}
