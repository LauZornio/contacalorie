// Seleziona gli elementi del DOM necessari per il calcolo delle calorie
const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;

// Funzione per pulire una stringa dagli spazi, dai segni più e meno
//Questa espressione regolare (Regex) cerca tre tipi di caratteri:
// + (segno più)
// - (segno meno)
// \s (qualsiasi tipo di spazio bianco, inclusi spazi, tabulazioni, ecc.)
function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

// Funzione per controllare se l'input è valido
// input permette di scrivere solo numeri, ad eccezione della e (esponenziale) 
// Quindi la funzione verifica se la stringa di input contiene una notazione esponenziale
// \d+ indica uno o più numeri compresi da 0 a 9
// e la lettera e
// i è il flag per indicare che può essere maiuscola o minuscola
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}
// il metodo .match è usato con le espressioni regolari per trovare le corrispondenze
// il metodo restituisce null se non trova corrispondenza, oppure restituisce l'input invalid


// Funzione per aggiungere una nuova voce di input per pasti o esercizio
function addEntry() {
  // Seleziona il container corretto in base alla scelta del dropdown
  // template literals (letterali template),stringhe delimitate da backticks (`), tra cui l'interpolazione delle espressioni e il supporto multi-linea.
  //L'interpolazione delle espressioni consente di incorporare variabili ed espressioni all'interno di una stringa. Le espressioni da interpolare sono racchiuse tra ${}.
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`); 
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  // template literals per creare una nuova sezione dove inseriri le calorie
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`;
  // Inserisce il nuovo HTML nel container target
  //lo inserisce alla fine dell'elemento
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

// Funzione per calcolare le calorie totali e rimanenti
function calculateCalories(e) {

  //Questa chiamata impedisce l'azione predefinita associata all'evento. Nel contesto di un modulo, l'azione predefinita è quella di inviare i dati e ricaricare la pagina. Utilizzando e.preventDefault(), il codice previene questo comportamento, consentendo di gestire l'invio del modulo tramite JavaScript senza ricaricare la pagina.
  e.preventDefault();
  isError = false;

  // Seleziona tutti gli input di calorie per ogni pasto e per l'esercizio
  const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
  const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
  const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
  const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
  const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');

  // Calcola le calorie totali per ogni pasto e per l'esercizio
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  // Se c'è un errore di input, esci dalla funzione
  //isError viene modificato all'interno della funzione getCaloriesFromInputs
  if (isError) {
    return;
  }

  // Calcola le calorie consumate e rimanenti
  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit'; //operatore ternario

  // Aggiorna il contenuto dell'output per mostrare i risultati
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;

  // Rimuove la classe 'hide' dall'output per renderlo visibile
  output.classList.remove('hide');
}

// Funzione per ottenere le calorie dagli input e verificare se sono validi
function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {
    //controlli su validità dei dati
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    // Se l'input è invalido, mostra un messaggio di errore e imposta isError a true
    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal); //conversione in numero
  }
  return calories;
}

// Funzione per resettare il modulo e pulire tutti i campi di input
//document.querySelectorAll('.input-container'):
//Questo metodo viene utilizzato per selezionare tutti gli elementi nel DOM che hanno la classe input-container.
//Restituisce un NodeList, che è una collezione simile a un array di elementi trovati nel documento.Array.from():
//Array.from() è un metodo che crea una nuova istanza di Array da un oggetto simile a un array o iterabile.
//Converte il NodeList ritornato da querySelectorAll in un vero array.

function clearForm() {
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));

  for (const container of inputContainers) {
    container.innerHTML = '';
  }

  budgetNumberInput.value = '';
  output.innerText = '';
  output.classList.add('hide');
}

// Aggiunge gli event listener ai pulsanti e al modulo
addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);
