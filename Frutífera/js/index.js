import frutiferas from './frutifera.js';

let frutsDiv = document.getElementById('fruts');

/**
 * Criar card de food.
 *
 * @param {*} frutifera
 * @returns String
 */

function getMonthDifference(startDate, endDate) {
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear())
  );
}

const createFruitCard = (frutifera) => {
  const currentdate = new Date(Date.now());

  return `<div class="card" style="width: 18rem;">
  <ul class="list-group list-group-flush">

    <li class="list-group-item">
    <b>Nome Popular:</b>
    ${frutifera.nomeEspeciePopular}
    </li>

    <li class="list-group-item">
    <b>Nome Científico:</b>
    ${frutifera.nomeEspecieCientifico}
    </li>

    <li class="list-group-item">
    <b>Produção Média</b>
    ${frutifera.producaoMediaSafra} <i>Kgs</i>
    </li>

    <li class="list-group-item">
    <b>Data do Plantio:</b>
    ${frutifera.dataPlantio}
    </li>

    <li class="list-group-item">
    <b>Idade</b>:
    ${getMonthDifference(
      new Date(frutifera.dataPlantio),
      currentdate,
    )} <i>meses</i>
    </li>

  </ul>
  <div class="card-footer">
  <i>ID:</i>
    ${frutifera.identificador}
  </div>
</div>`;
};

/**
 * Carregar os itens da lista de Foods.
 */
const loadFruts = () => {
  for (let fruts of frutiferas) {
    let card = createFruitCard(fruts);
    frutsDiv.insertAdjacentHTML('beforeend', card);
  }
};

/**
 * Define os valores dos campos de cadastro do Food no formulário.
 *
 * @param {*} identificador
 * @param {*} nomeEspeciePopular
 * @param {*} nomeEspecieCientifico
 * @param {*} producaoMediaSafra
 * @param {*} dataPlantio
 */
function setFormValues(
  identificador = '',
  nomeEspeciePopular = '',
  nomeEspecieCientifico = '',
  producaoMediaSafra = '',
  dataPlantio = '',
) {
  const idInput = document.querySelector('#identificador');
  const nomePopularInput = document.querySelector('#nomeEspeciePopular');
  const nomeCientInput = document.querySelector('#nomeEspecieCientifico');
  const producaoSafraInput = document.querySelector('#producaoMediaSafra');
  const dataPlantioInput = document.querySelector('#dataPlantio');

  idInput.value = identificador;
  nomePopularInput.value = nomeEspeciePopular;
  nomeCientInput.value = nomeEspecieCientifico;
  producaoSafraInput.value = producaoMediaSafra;
  dataPlantioInput.value = dataPlantio;
}

const loadFormCreateFrut = () => {
  let formFrut = document.getElementById('frutForm');

  formFrut.onsubmit = (event) => {
    event.preventDefault();
    console.log('Enviou o formulário');

    let frut = Object.fromEntries(new FormData(frutForm));

    frut.identificador = Date.now();

    // const identificador = Date.now();
    // frut.identificador = identificador;
    // console.log(identificador);

    // Adicionar o item no card.
    let card = createFruitCard(frut);
    frutsDiv.insertAdjacentHTML('beforeend', card);

    // Adicionar o item na lista.
    frutiferas.push(frut);

    // Reiniciar valores dos campos dos formulários.
    formFrut.reset();

    localStorage.setItem('frutiferas', JSON.stringify(frutiferas));

    $('#formFrutModal').modal('toggle');
  };
};

// Adicionar a função no escopo da janela em execução.
window.createFrutForm = loadFormCreateFrut;

loadFruts();
