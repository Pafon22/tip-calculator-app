const removerSelected = (fees) => {
  for (const fee of fees) {
    if (fee.classList.contains('selected')) fee.classList.remove('selected');
  }
};

const calcular = () => {
  const inputBill = document.getElementById('input-bill');
  const inputPeople = document.getElementById('input-people-number');
  const labelTipAmountByPerson = document.getElementById('label-tip-by-person');
  const labelTotalByPerson = document.getElementById('label-total-by-person');
  let selecionado = document.getElementsByClassName('selected');
  if (selecionado.length === 0) {
    labelTipAmountByPerson.innerText = '$0.00';
    labelTotalByPerson.innerText = '$0.00';
    selecionado = [document.getElementById('input-tip-fee')];
  }
  let tipAmount;
  if (selecionado[0].id === 'input-tip-fee') {
    tipAmount = Number(inputBill.value) * Number(selecionado[0].value) / 100;
  } else {
    tipAmount = Number(inputBill.value) * Number(selecionado[0].innerText.replace('%', '')) / 100;
  }
  const total = Number(inputBill.value) + Number(tipAmount);
  const tipAmountByPerson = Number(tipAmount) / Number(inputPeople.value);
  const totalByPerson = Number(total) / Number(inputPeople.value);
  labelTipAmountByPerson.innerText = '$' + tipAmountByPerson.toFixed(2);
  labelTotalByPerson.innerText = '$' + totalByPerson.toFixed(2);
};

const resetar = (event) => {
  const fees = document.getElementsByClassName('fee');
  removerSelected(fees);
  calcular();
};

const selecionar = (event) => {
  const target = event.target;
  if (!target.classList.contains('fee')) { return; }
  const fees = document.getElementsByClassName('fee');
  removerSelected(fees);
  target.classList.add('selected');
  calcular();
};

const verificarInput = (event) => {
  const target = event.target;
  if (target.value < target.min) {
    target.value = target.min;
  }
  calcular();
};

const paginaCarregada = () => {
  const feeGroup = document.getElementById('button-group');
  const btnReset = document.getElementById('button-reset');
  const inputBill = document.getElementById('input-bill');
  const inputPeople = document.getElementById('input-people-number');
  const inputCustom = document.getElementById('input-tip-fee');
  feeGroup.addEventListener('click', selecionar);
  btnReset.addEventListener('click', resetar);
  inputBill.addEventListener('input', verificarInput);
  inputPeople.addEventListener('input', verificarInput);
  inputCustom.addEventListener('input', verificarInput);
};

window.addEventListener('load', paginaCarregada);