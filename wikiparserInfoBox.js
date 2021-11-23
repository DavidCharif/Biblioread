
function extractInfobox(mainElement)
{
    var infoboxes = mainElement.getElementsByClassName("infobox biography vcard");
    infoboxes = infoboxes[0];
    console.log(`infobos es ${infoboxes}`);
    var infobosHtml = infoboxes.rows;
    console.log(infobosHtml);
    console.log(infobosHtml[0]);
    var lastRow = infoboxes.rows;
    for(let i=0;i<infoboxes.rows.length;i++){
        let rowInfo = infoboxes.rows[i];
        console.log(rowInfo.textContent);
        }
    return infobosHtml;
}
// Retornamos el valor de la bio en un HTML COLECCTION
var infoBioBox = extractInfobox(mainElement);
// Para acceder dentro del html collection y pasar a la table collection
var infoBioBoxChilds = infoBioBox[0];
// Hasta aqui esta convertido en html table row element
    console.log(`infoBioBox es ${infoBioBoxChilds}`)
// luego se convierte en una node list
var infoBioBoxChildsNow = infoBioBoxChilds.childNodes;
console.log(`infoBioBox after index [0] es ${infoBioBoxChildsNow}`)
// ahora repetir el proceso
var InfoBioElements = infoBioBoxChildsNow;
for (var i = 0;i < InfoBioElements.length; i++){
    var currentElement = InfoBioElements[i];
    var elementText = currentElement.textContent.trim();
    switch(currentElement.tagName){
        case "th":
            elementsInfoBioBox.push(createTextElement("MAIN_TITLE_INFO"),elementText)
            break;
        case "th":
            elementsInfoBioBox.push(createTextElement("TYPE_TITLE_INFO"),elementText)
            break;
        case "td":
            elementsInfoBioBox.push(createTextElement("TYPE_PARAGRAPH_INFO"),elementText)
            break;
    }
}


