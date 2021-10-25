"use strict";

class Monatslistensammlung {

    constructor() {
        this._monatslisten = [];
        this._html = this._html_generieren();
    }

    _eintrag_hinzufuegen(eintrag) {

        // Werte für Monat und Jahr holen
        let eintragsmonat = eintrag.datum().toLocaleString("de-DE", {month: "numeric"}); // Monat von Eintrag.js holen
        let eintragsjahr = eintrag.datum().toLocaleString("de-DE", {year: "numeric"});   // Jahr  von Eintrag.js holen

        // prüfen, ob Monatsliste bereits vorhanden ist 
        let monatsliste_vorhanden = false;
            this._monatslisten.forEach(monatsliste => {

                // wenn ja, den Eintrag zur Monatsliste hinzufügen
                if(eintragsmonat === monatsliste.monat() && eintragsjahr === monatsliste.jahr()) {
                    monatsliste.eintrag_hinzufuegen(eintrag);
                    monatsliste_vorhanden = true;
                }
            });
            // wenn nein, eine neue Monatsliste instanziieren
            if(!monatsliste_vorhanden) {    // wenn "monatsliste_vorhanden" false ist 
                                            // (also keine Monatsliste vorhanden ist),
                                            // wird der Ausdruck zu true negiert 
                this._monatsliste_hinzufuegen(eintragsjahr, eintragsmonat, eintrag);
            }
    }

    _monatsliste_hinzufuegen(jahr, monat, eintrag) {

        // neue Monatsliste instanziieren
        let neue_monatsliste = new Monatsliste(jahr, monat);

        // Eintrag zu neuer Monatsliste hinzufügen
        neue_monatsliste.eintrag_hinzufuegen(eintrag);

        // neue Monatsliste zu Monatlistensammlung hinzufügen
        this._monatslisten.push(neue_monatsliste);
    }

    _monatslisten_sortieren() {

        this._monatslisten.sort((monatsliste_a, monatsliste_b) => {

            // Jahressortierung
            if(monatsliste_a.jahr() < monatsliste_b.jahr()) {
                return 1;   // weil return > 0,
                            // wird b auf einen kleineren Index gesetzt
                            // also wir b weiter nach oben gesetzt (d.h. dass 2020 über 2019)
            } else if (monatsliste_a.jahr() > monatsliste_b.jahr()) {
                return -1;  // weil return < 0,
                            // wird a auf einen kleineren Index gesetzt
                            // also wir a weiter nach oben gesetzt
            } else {        // wenn a = b ist (also wenn beide Einträge im gleichen Jahr sind)

                // Monatssortierung
                if (monatsliste_a.monat() < monatsliste_b.monat()) {
                    return 1;
                } else {
                    return -1;
                }
            }
        });
    }
    
    _html_generieren() {

        let monatslisten = document.createElement("section");
        monatslisten.setAttribute("id", "monatslisten");

        // Monatslistensammlung mit einzelnen Monatslisten füllen 
        this._monatslisten.forEach(monatsliste => {
            monatslisten.insertAdjacentElement("beforeend", monatsliste.html());
        });

        return monatslisten;
    }

    aktualisieren(eintraege) {
        this._monatslisten = [];
        eintraege.forEach(eintrag => this._eintrag_hinzufuegen(eintrag));
        this._monatslisten_sortieren();
        this._html = this._html_generieren();
        this.anzeigen();
    }

    anzeigen () {

        let eingabeformular_container = document.querySelector("#eingabeformular-container");
        let monatslistensammlung = document.querySelector("#monatslisten");

        if (eingabeformular_container !== null) {
            if (monatslistensammlung !== null) {
                monatslistensammlung.remove();
            }
            eingabeformular_container.insertAdjacentElement("afterend", this._html);
        }
    }
}


























