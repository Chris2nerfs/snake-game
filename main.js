// fonction qui va créer la map
function creer_map() {
    
    // var td="string" stock toutes les "<td></td>" créées en rapport avec var map=(index.html)
    var td=""; 
    
    // var tr=[array] stock toutes les "<tr>"+td+"</tr>" créées en rapport avec var map=(index.html)
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
