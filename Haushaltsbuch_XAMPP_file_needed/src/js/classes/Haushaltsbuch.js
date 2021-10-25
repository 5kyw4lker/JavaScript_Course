
import Navigationsleiste from "./Navigationsleiste.js";
import Eingabeformular from "./Eingabeformular.js";
import Monatslistensammlung from "./Monatslistensammlung.js";
import Gesamtbilanz from "./Gesamtbilanz.js";
import Eintrag from "./Eintrag.js";

export default class Haushaltsbuch {

    constructor() {

        this._eintraege = [];
        this._navigationsleiste = new Navigationsleiste();
        this._eingabeformular = new Eingabeformular();
        this._monatslistensammlung = new Monatslistensammlung();        
        this._gesamtbilanz = new Gesamtbilanz();
        this._wiederherstellen();
    }

    eintrag_hinzufuegen(eintragsdaten) { // ohne _ weil auf diese Methode von außen zugegriffen wird (siehe Eingabeformular.js + Eintrag.js)

        let neuer_eintrag = new Eintrag(
            eintragsdaten.titel,
            eintragsdaten.betrag,
            eintragsdaten.typ,
            eintragsdaten.datum
        );

        this._eintraege.push(neuer_eintrag); // Userdateneingaben in Einträge-Array pushen
        this._monatslistensammlung.aktualisieren(this._eintraege);
        this._gesamtbilanz.aktualisieren(this._eintraege);
        this._speichern();
    }

    eintrag_entfernen (timestamp) { // wird aus der class Eintrag.js angestoßen, darum ohne _

        let start_index;

        for (let i = 0; i < this._eintraege.length; i++) {
            
            if (this._eintraege[i].timestamp() === parseInt(timestamp)) { // timsstamp muss in Int umgewandelt werden, weil er hier "this.eintrag_entfernen(timestamp);" als String abgefragt wird
                start_index = i;
                break;
            }
        }

        this._eintraege.splice(start_index, 1);
        this._monatslistensammlung.aktualisieren(this._eintraege);
        this._gesamtbilanz.aktualisieren(this._eintraege);
        this._speichern();
    }

    // Einträge im LocalStorage speichern
    _speichern() {

        localStorage.setItem("eintraege", JSON.stringify(this._eintraege));   
    }

    _wiederherstellen () {

        let gespeicherte_eintraege = localStorage.getItem("eintraege");

        // CHECK: Wenn item NIHCT im LocaleStorage gesetzt ist
        if(gespeicherte_eintraege !== null) {
            
            // Srting im item in ein Objekt umwandeln (JSON.parse)
            // und das Objekt durchlaufen
            JSON.parse(gespeicherte_eintraege).forEach(eintrag => {

                // Eintrag zur Verarbeitung für das Haushaltsbuch erstellen
                // Objekt wird übergeben
                this.eintrag_hinzufuegen({
                    titel: eintrag._titel,
                    betrag: eintrag._betrag,
                    typ: eintrag._typ,
                    datum: new Date (eintrag._datum) // DatumsString als "richtiges" Datum übergeben
                });
            });
        }
    }

    start() {
        this._navigationsleiste.anzeigen();
        this._eingabeformular.anzeigen();
        this._monatslistensammlung.anzeigen();
        this._gesamtbilanz.anzeigen();
    }
}












