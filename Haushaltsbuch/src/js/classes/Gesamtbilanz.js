"use strict";

class Gesamtbilanz {

    constructor () {
        this._einnahmen = 0;
        this._ausgaben = 0,
        this._bilanz = 0;
        this._html = this._html_generieren();
    }

    aktualisieren (eintraege) {

        // Eigenschaften vor Aktualisierung Nullen,
        // weil die Beträge sonst aufaddiert weiterverarbeitete werden
        this._einnahmen = 0;
        this._ausgaben = 0; 
        this._bilanz = 0;

        eintraege.forEach(e => {
            switch (e.typ()) {
                case "e":       // case "einnahme":
                    this._einnahmen = this._einnahmen + e.betrag();
                    this._bilanz = this._bilanz + e.betrag();
                    break;
                case "a":       // case "ausgabe":
                    this._ausgaben = this._ausgaben + e.betrag();
                    this._bilanz = this._bilanz - e.betrag();
                    break;
                default:
                    console.log(`Dieser Typ ${e.typ()} ist nicht bekannt.`);
                    break;
            }
        });
        this._html = this._html_generieren();
        this.anzeigen();
    }

    _html_generieren() {
    // neue gesamtbilanz erzeugen
            // <aside id="gesamtbilanz">
            //     <h1>Gesamtbilanz</h1>
            //     <div class="gesamtbilanz-zeile einnahmen"><span>Einnahmen:</span><span>0,00 €</span></div>
            //     <div class="gesamtbilanz-zeile ausgaben"><span>Ausgaben:</span><span>0,00 €</span></div>
            //     <div class="gesamtbilanz-zeile bilanz"><span>Bilanz:</span><span class="positiv">0,00 €</span></div>
            // </aside>

        // ############################
        // <aside> mit Klasse erstellen
        // ############################
        let gesamtbilanz = document.createElement("aside");
        gesamtbilanz.setAttribute("id", "gesamtbilanz");



                // ##########################################
                // Überschirft im <aside>-Container erstellen
                // ##########################################
                let h1_gesamtbilanz = document.createElement("h1");
                h1_gesamtbilanz.textContent = "Gesamtbilanz";
                gesamtbilanz.insertAdjacentElement("afterbegin", h1_gesamtbilanz);


                
                // ###############################################################
                // Einnahmen_zeile <div> mit Klasse im <aside>-Container erstellen
                // ###############################################################
                let einnahmen_zeile = document.createElement("div");
                einnahmen_zeile.setAttribute("class", "gesamtbilanz-zeile einnahmen");

                        // #########################################################
                        // Einnahmen_Titel <span> in Einnahmen_zeile <div> erstellen
                        // #########################################################
                        let einnahmen_titel = document.createElement("span");
                        einnahmen_titel.textContent = "Einnahmen:";

                        // #########################################################
                        // Einnahmen_Titel in Einnahmen_zeile einfügen
                        // #########################################################
                        einnahmen_zeile.insertAdjacentElement("afterbegin", einnahmen_titel);
                        
                        // #########################################################
                        // Einnahmen_Betrag <span> in Einnahmen_zeile <div> erstellen
                        // #########################################################
                        let einnahmen_betrag = document.createElement("span");
                       einnahmen_betrag.textContent = `${(this._einnahmen / 100).toFixed(2).replace(/\./, ",")} €`;

                        // #########################################################
                        // Einnahmen_Betrag in Einnahmen_zeile einfügen
                        // #########################################################
                        einnahmen_zeile.insertAdjacentElement("beforeend", einnahmen_betrag);

                        // ####################################################################################
                        // Einnahmen_zeile (Einnahmen_Titel und Einnahmen_Betrag) im <aside>-Container einfügen
                        // ####################################################################################
                        gesamtbilanz.insertAdjacentElement("beforeend", einnahmen_zeile);



                // ##############################################################
                // Ausgaben_zeile <div> mit Klasse im <aside>-Container erstellen
                // ##############################################################
                let ausgaben_zeile = document.createElement("div");
                ausgaben_zeile.setAttribute("class", "gesamtbilanz-zeile ausgaben");

                        // ########################################################
                        // Ausgaben_Titel <span> in Ausgaben_zeile <div> erstellen
                        // ########################################################
                        let ausgaben_titel = document.createElement("span");
                        ausgaben_titel.textContent = "Ausgaben:";

                        // ########################################################
                        // Ausgaben_Titel in Ausgaben_zeile einfügen
                        // ########################################################
                        ausgaben_zeile.insertAdjacentElement("afterbegin", ausgaben_titel);

                        // ########################################################
                        // Ausgaben_Betrag <span> in Ausgaben_zeile <div> erstellen
                        // ########################################################
                        let ausgaben_betrag = document.createElement("span");
                        ausgaben_betrag.textContent = `${(this._ausgaben / 100).toFixed(2).replace(/\./, ",")} €`;

                        // ########################################################
                        // Ausgaben in Ausgaben_zeile einfügen
                        // ########################################################
                        ausgaben_zeile.insertAdjacentElement("beforeend", ausgaben_betrag);

                        // #################################################################################
                        // Ausgaben_zeile (Ausgaben_Titel und Ausgaben_Betrag) im <aside>-Container einfügen
                        // #################################################################################
                        gesamtbilanz.insertAdjacentElement("beforeend", ausgaben_zeile);



                // ##################################################################
                // Gesamtbilanz_zeile <div> mit Klasse im <aside>-Container erstellen
                // ##################################################################
                let gesamtbilanz_zeile = document.createElement("div");
                gesamtbilanz_zeile.setAttribute("class", "gesamtbilanz-zeile bilanz");

                        // ###############################################################
                        // Gesamtbilanz_Titel <span> in Gesamtbilanz_zeile <div> erstellen
                        // ###############################################################
                        let gesamtbilanz_titel = document.createElement("span");
                        gesamtbilanz_titel.textContent = "Bilanz:";

                        // ###############################################################
                        // Gesamtbilanz_Titel in Gesamtbilanz_zeile einfügen
                        // ###############################################################
                        gesamtbilanz_zeile.insertAdjacentElement("afterbegin", gesamtbilanz_titel);

                        // ###############################################################
                        // Gesamtbilanz_Betrag <span> in Gesamtbilanz_zeile <div> erstellen
                        // ###############################################################
                        let gesamtbilanz_betrag = document.createElement("span");

                        this._bilanz >= 0 ? gesamtbilanz_betrag.setAttribute("class", "positiv") : gesamtbilanz_betrag.setAttribute("class", "negativ");
                        gesamtbilanz_betrag.textContent = `${(this._bilanz / 100).toFixed(2).replace(/\./, ",")} €`;

                        // ###############################################################
                        // Gesamtbilanz in Gesamtbilanz_zeile einfügen
                        // ###############################################################
                        gesamtbilanz_zeile.insertAdjacentElement("beforeend", gesamtbilanz_betrag);

                        // #################################################################################
                        // Gesamtbilanz_zeile (Gesamtbilanz_Titel und Gesamtbilanz_Betrag) im <aside>-Container einfügen
                        // #################################################################################
                        gesamtbilanz.insertAdjacentElement("beforeend", gesamtbilanz_zeile);

                return gesamtbilanz;
    }

    anzeigen() {

        // prüfen ob bereits eine gesamtbilanz angezeigt wird
        // wenn ja, gesamzbilanz entfernen
        let gesamtbilanz = document.querySelector("#gesamtbilanz");
        if(gesamtbilanz !== null) {
            gesamtbilanz.remove();
        }

        // neue gesamtbilanz an ende vom body einfügen 
        // Der Content kommt über die Methode html_gesamtbilanz_generieren()
        document.querySelector("body").insertAdjacentElement("beforeend", this._html);
    }
}























