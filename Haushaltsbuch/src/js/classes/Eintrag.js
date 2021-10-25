"use strict";

class Eintrag {

    constructor (titel, betrag, typ, datum) {
        this._titel = titel;
        this._betrag = betrag;
        this._typ = typ;
        this._datum = datum;
        this._timestamp = Date.now();   // akt. UnixZeit
        this._html = this._html_generieren();
    }

    // Getter für sämtliche Eigenschaften

        titel() {
            return this._titel;
        }

        betrag() {
            return this._betrag;
        }

        typ() {
            return this._typ;
        }

        datum() {
            return this._datum;
        }

        timestamp () {
            return this._timestamp;
        }
        html() {
            return this._html;
        }

    _html_generieren() {
        // einen Listenpunkt erzeugen
                //     <li class="einnahme" data-timestamp="7123812739971">
                //         <span class="datum">01.02.2020</span>
                //         <span class="titel">Gehalt</span>
                //         <span class="betrag">2064,37 €</span>
                //         <button class="entfernen-button"><i class="fas fa-trash"></i></button>
                //     </li>
    
    
            // listenpunkt Einnahme/Ausgabe (e/a) inkl Klasse und timestamp zuweisen
    
                // <li> generieren
                    let listenpunkt = document.createElement("li");
        
                // listenpunkt von eintraege.typ Klasse "e" bzw. "a" zuweisen
                    this._typ === "e" ? listenpunkt.setAttribute("class", "einnahme") : listenpunkt.setAttribute("class", "ausgabe");  // bedingter ternärer Operator
    
                // timestamp von eintraege.timestamp in listenpunkt einfügen
                    listenpunkt.setAttribute("data-timestamp", this._timestamp);
    
    
            // listenpunkt Datum inkl Klasse zuweisen
    
                // <span> generieren
                    let datum = document.createElement("span");
                // <span> Klasse "datum" zuweisen
                    datum.setAttribute("class", "datum");
    
                // datum holen und formatierten
                    datum.textContent = this._datum.toLocaleDateString("de-DE", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit"
                    });
                // formatiertes datum vom eintraege.datum in listenpunkt einfügen
                    listenpunkt.insertAdjacentElement("afterbegin", datum);
        
    
            // listenpunkt Titel inkl. Klasse zuweisen
    
                // <span> generieren
                    let titel = document.createElement("span");
                // <span> Klasse "titel" zuweisen
                    titel.setAttribute("class", "titel");
                // titel holen
                    titel.textContent = this._titel;
                // titel vom eintrage.titel nach datum in listenpunkt einfügen
                    datum.insertAdjacentElement("afterend", titel)
    
    
            // listenpunkt (EUR-)Betrag inkl. Klasse hinzufügen
    
                // <span> generieren
                    let betrag = document.createElement("span");
                // <span> Klasse "betrag" zuweisen
                    betrag.setAttribute("class", "betrag");
                // betrag holen und formatieren (es wird der Centbetrag geholt)
                    // .toFixed(2) bewirkt, dass 2 Nachkommastellen erstellt werden.  .replace tauscht "." gegen "," aus
                    betrag.textContent = `${(this._betrag / 100 ).toFixed(2).replace(/\./, ",")}  €`;
                // betrag von eintraege.betrag nach titel in listenpunkt einfügen
                    titel.insertAdjacentElement("afterend", betrag);
            
            
            // listenpunkt Button hinzufügen
    
                // <button> + <i> generieren
                    let button = document.createElement("button");
                // <button> Klasse "entfernen-button" hinzufügen
                    button.setAttribute("class", "entfernen-button");
                // button in listenpunkt einfügen
                    betrag.insertAdjacentElement("afterend", button);
    
            // Button <i> hinzufügen
                // <i> generieren
                    let i = document.createElement("i");
                // <i> Klasse "fas fa-trash" hinzufügen
                    i.setAttribute("class", "fas fa-trash");
                // <i> in Button einfügen
                    button.insertAdjacentElement("afterbegin", i);
    
            this._eintrag_entfernen_event_hinzufuegen(listenpunkt);
    
            return listenpunkt;         
        }
    
        _eintrag_entfernen_event_hinzufuegen (listenpunkt) {
    
            // EventListener für den Löschen-Button installieren
            listenpunkt.querySelector(".entfernen-button").addEventListener("click", e => {
    
                // den entsprechenden timestamp von ausgewählten Eintrag abrufen
                let timestamp = e.target.parentElement.getAttribute("data-timestamp");
                haushaltsbuch.eintrag_entfernen(timestamp); // timestamp ist hier ein String
            });
        }
}



















