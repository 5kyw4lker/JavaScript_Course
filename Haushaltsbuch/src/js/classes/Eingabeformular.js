"use strict";

class Eingabeformular {

    constructor () {

        this._html = this._html_generieren();

    }

    // Usereingabedaten über das submit_Objekt holen
    _formulardaten_holen(submit_Objekt) {

        return {
            // Usereingabe "titel" über das submit-Objekt holen
            titel: submit_Objekt.target.elements.titel.value,
            betrag: submit_Objekt.target.elements.betrag.value,
            einnahme: submit_Objekt.target.elements.einnahme.checked,
            datum: submit_Objekt.target.elements.datum.valueAsDate
        }
    }

    // Usereingaben verarbeiten / formatieren und als Objekt (mit Titel, Typ, Betrag, Datum) wiedergeben 
    _formulardaten_verarbeiten(formulardaten) {

        return {
            titel: formulardaten.titel.trim(),
            typ: formulardaten.einnahme === false ? "a" : "e" ,       // bedingter ternärer Operator
            // String "betrag" in eine Gleitkommazahl umwandeln und per "* 100" in Ganzzahl umwandeln
            betrag: parseFloat(formulardaten.betrag) * 100, // Wurde im Betrag nichts eingegeben worden sein, würde versucht aus einem leeren String ein parseFloat zu machen. Das funktioniert nicht. Es würde NaN zurückgegeben. Die wird hier abgefangen "if(formulardaten.typ === undefined"
            datum: formulardaten.datum
        }
    }

    // Fehler in ein Fehler-Array packen
    _formulardaten_validieren (formulardaten) {

        let fehler = [];

        if (formulardaten.titel === "") {
            fehler.push("Titel");
        }

        // if (formulardaten.betrag === NaN) {      // NaN kann nicht mit dem „===“ abgefragt werden
        if (isNaN(formulardaten.betrag)) {
            fehler.push("Betrag");
        }

        if (formulardaten.datum === null) {
            fehler.push("Datum");
        }

        return fehler;
    }

    _datum_aktualisieren () {

        let datums_input = document.querySelector("#datum");

        if (datums_input !== null) {

            // Datums-Usereingabe auf aktuelle Datum setzten
            document.querySelector("#datum").valueAsDate = new Date(); 

        } // "else" bzw. ansonsten führe diese Methode nicht aus
    }

    _absenden_Event_hinzufuegen(eingabeformular) {       // "eingabeformular" ist hier die gesamte <section>

        // in dem <form>-Element die in der <section> ist, auf den submit lauschen und das submit-Objekt abgreifen 
        eingabeformular.querySelector("#eingabeformular").addEventListener("submit", submit_Objekt => {
        // eingabeformular.querySelector("#eingabeformular") --> gibt die komplette <form> zurück
        // "submit_Objekt" ist das submit_Objekt

            submit_Objekt.preventDefault();

            // über Methode formulardaten_holen() aus dem submit-Objekt die Usereingaben ermitteln (Titel, Typ, Betrag, Datum)
            let formulardaten = this._formulardaten_verarbeiten(this._formulardaten_holen(submit_Objekt)); // Array, das die Usereingaben beinhaltet

            // Formulardaten validieren
            let formular_fehler = this._formulardaten_validieren(formulardaten);

            // Wenn Validität der Formulardaten i.O.
            if (formular_fehler.length === 0) {
    
                // Usereinträge zum Haushaltsbuch hinzufügen
                haushaltsbuch.eintrag_hinzufuegen(formulardaten);

                // prüfen, ob Fehlermeldung vorhanden ist, wenn ja Fehlermeldung entfernen
                let bestehende_fehlerbox = document.querySelector(".fehlerbox");
                if (bestehende_fehlerbox !== null) {     // Wenn eine Fehlerbox gefunden wurde
                    bestehende_fehlerbox.remove();
                }

                // Formulardaten für Usereingaben zurückersetzen
                submit_Objekt.target.reset();

                // Formulardatenwert.datum für Usereingaben auf akt. Datum setzen 
                this._datum_aktualisieren ();

            // Wenn Validität der Formulardaten n.i.O.
            } else {

                let fehler = new Fehler("Folgende Felder nicht korret:", formular_fehler);
                fehler.anzeigen();
            }
        });  
    }

    _html_generieren() {

        let eingabeformular = document.createElement("section");

        eingabeformular.setAttribute("id", "eingabeformular-container");

        eingabeformular.innerHTML = `<form id="eingabeformular" action="#" method="get"></form>
        <!-- Titel -->
        <div class="eingabeformular-zeile">
            <h1>Neue Einnahme / Ausgabe hinzufügen</h1>
        </div>
        <div class="eingabeformular-zeile">
            <div class="titel-typ-eingabe-gruppe">
                <label for="titel">Titel</label>
                <input type="text" id="titel" form="eingabeformular" name="titel" placeholder="z.B. Einkaufen" size="10" title="Titel des Eintrags">
                <input type="radio" id="einnahme" name="typ" value="einnahme" form="eingabeformular" title="Typ des Eintrags">
                <label for="einnahme" title="Typ des Eintrags">Einnahme</label>
                <input type="radio" id="ausgabe" name="typ" value="ausgabe" form="eingabeformular" title="Typ des Eintrags" checked>
                <label for="ausgabe" title="Typ des Eintrags">Ausgabe</label>
            </div>
        </div>
        <div class="eingabeformular-zeile">
            <div class="betrag-datum-eingabe-gruppe">
                <label for="betrag">Betrag</label>
                <input type="number" id="betrag" name="betrag" form="eingabeformular" placeholder="z.B. 10,42" size="10" step="0.01" title="Betrag des Eintrags (max. zwei Nachkommastellen, kein €-Zeichen)">
                <label for="datum">Datum</label>
                <input type="date" id="datum" name="datum" form="eingabeformular" placeholder="jjjj-mm-tt" size="10" title="Datum des Eintrags (Format: jjjj-mm-tt)">
            </div>
        </div>
        <!-- Absenden-Button -->
        <div class="eingabeformular-zeile">
            <button class="standard" type="submit" form="eingabeformular">Hinzufügen</button>
        </div>`;

        this._absenden_Event_hinzufuegen(eingabeformular);

        return eingabeformular;
    }

    anzeigen() {

        // let nav = document.querySelector("#navigationsleiste");
        let nav = document.querySelector("body");

        // Sicherheitsabfrage
        if (nav !== null) {             // wenn eine "nav" gefunden wurde, dann

            // nav.insertAdjacentElement("afterend", this.html_generieren());
            nav.insertAdjacentElement("afterbegin", this._html);

            // Datum für Usereingabe auf akt. Datum setzten 
            this._datum_aktualisieren ();
        }
    }
    
}












