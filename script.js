const estilizarSelecionado = (fees) => {
  const custom = document.getElementById('input-tip-fee');
  for (const fee of fees) {
    if (fee.classList.contains('selected')) {
      fee.style.backgroundColor = 'cyan';
      fee.style.color = 'black';
    }
    else {
      fee.style.backgroundColor = 'rgb(0, 73, 77)';
      fee.style.color = 'rgb(244, 250, 250)';
    }
  }
  if (!custom.classList.contains('selected')) {
    custom.style.backgroundColor = 'white';
    custom.style.color= 'black';
  }
}

const selecionar = (event) => {
  const target = event.target;
  if (!target.classList.contains('fee')) { return; }
  const fees = document.getElementsByClassName('fee');
  for (const fee of fees) {
    if (fee.classList.contains('selected')) fee.classList.remove('selected');
  }
  target.classList.add('selected');

  estilizarSelecionado(fees);
}

const paginaCarregada = () => {
  const feeGroup = document.getElementById('button-group');
  feeGroup.addEventListener('click', selecionar);
}

window.addEventListener('load', paginaCarregada);