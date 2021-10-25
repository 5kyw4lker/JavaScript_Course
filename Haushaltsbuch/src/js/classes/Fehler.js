"use strict";

class Fehler {

    constructor(fehlertext, formular_fehler) {

        this._fehlertext = fehlertext;
        this._formular_fehler = formular_fehler;
        this._html = this._html_generieren();
    }

    _html_generieren() {

        let fehlerbox = document.createElement("div");
        fehlerbox.setAttribute("class", "fehlerbox");

        let fehlertext = document.createElement("span");
        fehlertext.textContent = this._fehlertext;
        fehlerbox.insertAdjacentElement("afterbegin", fehlertext);

        let fehlerliste = document.createElement("ul");
        this._formular_fehler.forEach(Element_vom_array_formular_fehler => {

            let fehlerlistenpunkt = document.createElement("li");
            fehlerlistenpunkt.textContent = Element_vom_array_formular_fehler;
            fehlerliste.insertAdjacentElement("beforeend", fehlerlistenpunkt);
        });

        fehlerbox.insertAdjacentElement("beforeend", fehlerliste);

        return fehlerbox;
    }

    _entfernen(){

        let bestehende_fehlerbox = document.querySelector(".fehlerbox");

        // Sicherheitsabfrage
        if (bestehende_fehlerbox !== null) {     // Wenn eine Fehlerbox gefunden wurde
            bestehende_fehlerbox.remove();
        }
    }

    anzeigen() {

        this._entfernen();
        let eingabeformular_container = document.querySelector("#eingabeformular-container");
        if (eingabeformular_container !== null) {
            eingabeformular_container.insertAdjacentElement("afterbegin", this._html);
        }
    }
}




























