
// Klasse Anwendung zur Verfügung stellen
export default class Navigationsleiste {

    constructor() {
        this._html = this._html_generieren();        
    }
    
    _html_generieren() {

        let navigationsleiste = document.createElement("nav");
        navigationsleiste.setAttribute("id", "navigationsleiste");

        let link = document.createElement("a");
        link.setAttribute("href", "#");     // One-Page-Application, darum muss die Seite nicht neu geladen werden. Darum #

        let text = document.createElement("span");
        text.setAttribute("id", "markenname");
        text.textContent = "Navigationsleiste.js Zeile 21";

        link.insertAdjacentElement("afterbegin", text);        
        navigationsleiste.insertAdjacentElement("afterbegin", link);

        return navigationsleiste;
    }

    anzeigen() {

        let body = document.querySelector("body"); 
        if (body !== null) {     // wenn ein body gefunden wurde
            body.insertAdjacentElement("afterbegin", this._html);
        }
    }
}







