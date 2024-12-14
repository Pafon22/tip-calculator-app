const getElements = () => ({
  fees: document.querySelectorAll('.fee'),
  inputBill: document.querySelector('#input-bill'),
  inputPeople: document.querySelector('#input-people-number'),
  labelTipAmountByPerson: document.querySelector('#label-tip-by-person'),
  labelTotalByPerson: document.querySelector('#label-total-by-person'),
  btnReset: document.querySelector('#button-reset'),
  inputCustom: document.querySelector('#input-tip-fee'),
  feeGroup: document.querySelector('#button-group'),
});

const removeSelectedClass = (fees) => {
  fees.forEach(fee => fee.classList.remove('selected'));
};

const getSelectedFee = (fees) => {
  const selected = document.querySelector('.fee.selected') || document.querySelector('#input-tip-fee');
  return selected.id === 'input-tip-fee' 
    ? Number(selected.value) / 100 
    : Number(selected.innerText.replace('%', '')) / 100;
};

const calculateAmounts = () => {
  const { inputBill, inputPeople, labelTipAmountByPerson, labelTotalByPerson, fees } = getElements();
  const bill = parseFloat(inputBill.value) || 0;
  const people = parseFloat(inputPeople.value) || 1;
  const tipPercentage = getSelectedFee(fees);
  
  const tipAmount = bill * tipPercentage;
  const totalAmount = bill + tipAmount;
  
  labelTipAmountByPerson.innerText = `$${(tipAmount / people).toFixed(2)}`;
  labelTotalByPerson.innerText = `$${(totalAmount / people).toFixed(2)}`;
};

const resetCalculator = () => {
  const { inputBill, fees } = getElements();
  inputBill.value = '0';
  removeSelectedClass(fees);
  calculateAmounts();
};

const handleFeeSelection = (event) => {
  const { fees } = getElements();
  const target = event.target;
  
  if (!target.classList.contains('fee')) return;
  
  removeSelectedClass(fees);
  target.classList.add('selected');
  calculateAmounts();
};

const handleInputChange = (event) => {
  const target = event.target;
  if (parseFloat(target.value) < parseFloat(target.min)) {
    target.value = target.min;
  }
  calculateAmounts();
};

const addEventListeners = () => {
  const { feeGroup, btnReset, inputBill, inputPeople, inputCustom } = getElements();
  
  feeGroup.addEventListener('click', handleFeeSelection);
  btnReset.addEventListener('click', resetCalculator);
  [inputBill, inputPeople, inputCustom].forEach(input => 
    input.addEventListener('input', handleInputChange)
  );
};

window.addEventListener('load', () => addEventListeners());
