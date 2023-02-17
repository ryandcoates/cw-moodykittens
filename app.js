let foundKitten
let kittens = []

loadKittens();

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault();
  let form = event.target;
  let kittenName = form.name.value;
  currentKitten = kittens.find(kitten => kitten.name == kittenName)

  if (!currentKitten){
    currentKitten = { name: kittenName, mood: 'Happy', affection: 1 }
    kittens.push(currentKitten);
    saveKittens();
  }
  form.reset();
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem('kittens', JSON.stringify(kittens));
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittenData = JSON.parse(window.localStorage.getItem('kittens'));
  if(kittenData){
    kittens = kittenData
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenNameElement = document.getElementById('kitten-name');
  let kittenAffectionElement = document.getElementById('kitten-affection');
  let kittenMoodElement = document.getElementById('kitten-mood');

  let template = "";
  kittens.forEach(kitten => {
    template += `
        <div id="kitten" class="d-flex space-between card p-2 text-center w-50">
            <div class="mt-2">
                <b id="kitten-name" class="text-center">${kitten.name}</b>
                <div>
                    <span id="kitten-mood">${kitten.mood}</span>
                    <span id="kitten-affection">${kitten.affection}</span>
                </div>
            <br>
                <button onclick="pet('${kitten.name}')">Pet Kitten</button>
                <button onclick="catnip('${kitten.name}')">Give Catnip</button>
            </div>
      </div>
    `

    document.getElementById('kittens').innerHTML = template;
  })
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  foundKitten = kittens.find(kitten => id == kitten.name)
  return foundKitten;
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  console.log(id)
  let kitten = findKittenById(id);
  console.log(kitten.affection)
  let x = Math.random();
  if (x > 0.5){
    kitten.affection++
  } else {
    kitten.affection--
  }
  saveKittens();
  drawKittens();
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id);
  kitten.mood = 'tolerant';
  kitten.affection = 5
  saveKittens();
  drawKittens();
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens.clear();
  saveKittens();
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away')
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
drawKittens();
