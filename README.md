# 🥗 Conta Calorie Giornaliere

Quinto Esercizio Javascript dal corso di freecodecamp.org (https://www.freecodecamp.org/), nello specifico https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/

Lezione: Learn Form Validation by Building a Calorie Counter

Questo progetto è un esercizio per imparare JavaScript: si tratta di un contacalorie che consente di inserire il consumo giornaliero di calorie attraverso varie attività quotidiane e alimenti, e di calcolare se si è raggiunto o superato il fabbisogno calorico giornaliero.

## 📜 Descrizione

Il contacalorie permette di:
- Inserire un budget giornaliero di calorie.
- Aggiungere voci per pasti (colazione, pranzo, cena, snack) e attività fisica.
- Calcolare il totale delle calorie consumate e delle calorie rimanenti o in surplus.

## 🚀 Funzionalità

- **📊 Inserimento del budget calorico**: Consente di specificare il numero di calorie giornaliere desiderate.
- **➕ Aggiunta di voci**: Permette di aggiungere dettagli su ciò che si è mangiato o sull'attività fisica svolta.
- **🧮 Calcolo delle calorie rimanenti**: Calcola se si è in surplus o in deficit calorico rispetto al budget giornaliero.

## 📚 Nozioni Imparate

In questa lezione ho potuto approfondire:
- **Espressioni Regolari (regex)**: strumento per la ricerca e manipolazione di stringhe.
  
- **Template Literals**: sono stringhe dinamiche delimitate da backticks (``). Da tastiera, premere Alt+96. I vantaggi sono l'interpolazione delle espressioni e il supporto multi-linea. Le espressioni da interpolare sono racchiuse tra ${}.
  
- **Metodo insertAdjacentHTML()** è un metodo molto utile del DOM che permette di inserire markup HTML nel documento in una posizione specificata rispetto a un elemento di riferimento. element.insertAdjacentHTML(position, text);
  - **element**: L'elemento di riferimento in cui verrà inserito il nuovo contenuto HTML.
  - **position**: Una stringa che specifica la posizione relativa a element dove il text verrà inserito. Può essere uno dei seguenti valori:
    'beforebegin': Prima di element stesso.
    'afterbegin': All'inizio di element (prima del primo figlio).
    'beforeend': Alla fine di element (dopo l'ultimo figlio).
    'afterend': Dopo element stesso.
  - **text**: Una stringa di markup HTML da inserire nel documento.
    
- **NodeList** è una collezione di nodi (elementi) che vengono ritornati come risultato di metodi DOM come document.querySelectorAll(). Un NodeList assomiglia a un array in quanto è indicizzabile e ha una proprietà .length che restituisce il numero di nodi nella lista. Puoi accedere ai singoli elementi di un NodeList utilizzando la notazione dell'indice, ad esempio nodeList[0].
  - const inputContainers = Array.from(document.querySelectorAll('.input-container')); ritorna un NodeList che viene trasformata in Array 

## 📄 Licenza

Questo progetto è rilasciato sotto la licenza MIT. Vedi il file LICENSE per maggiori dettagli.

