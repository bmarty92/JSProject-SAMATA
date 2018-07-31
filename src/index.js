const mainInfoArray = [];
const itemInfoArray = [];
const createMainInfo = () => {
  const objName = document.getElementById('objName').value;
  const objAddress = document.getElementById('objAddress').value;
  const companyName = document.getElementById('companyName').value;
  const resPerson = document.getElementById('resPerson').value;
  mainInfoArray.push({
    objectName: objName,
    objectAddress: objAddress,
    nameOfCompany: companyName,
    responsiblePerson: resPerson,
  });
  mainInfoArray.forEach((element, index) => {
    const tableBody = document.createElement('tbody');
    const tableRow = document.createElement('tr');
    const objNameTd = document.createElement('td');
    const objAddressTd = document.createElement('td');
    const companyNameTd = document.createElement('td');
    const resPersonTd = document.createElement('td');
    objNameTd.innerHTML = element.objectName;
    objAddressTd.innerHTML = element.objectAddress;
    companyNameTd.innerHTML = element.nameOfCompany;
    resPersonTd.innerHTML = element.responsiblePerson;
    tableRow.appendChild(objNameTd);
    tableRow.appendChild(objAddressTd);
    tableRow.appendChild(companyNameTd);
    tableRow.appendChild(resPersonTd);
    document.querySelector('#objInfoTable').appendChild(tableBody).appendChild(tableRow);
  });
};
const createItemInfo = () => {
  const itemName = document.getElementById('itemName').value;
  const itemCode = document.getElementById('itemCode').value;
  const itemDimension = document.getElementById('itemDimension').value;
  const itemQuantity = document.getElementById('itemQuantity').value;
  const itemPrice = document.getElementById('itemPrice').value;
  const existingItem = itemInfoArray.some(item => item.nameOfItem === itemName && item.codeOfItem === itemCode);
  const selectedTbody = document.querySelector('#itemTable tbody');
  const selectedTfoot = document.querySelector('#itemTable tfoot');

  if (selectedTbody) {
    console.log('in if');
    selectedTbody.innerHTML = '';
  } else {
    const tableBody = document.createElement('tbody');
    document.querySelector('#itemTable').appendChild(tableBody);
  }
  if (!existingItem) {
    itemInfoArray.push({
      nameOfItem: itemName,
      codeOfItem: itemCode,
      dimensionOfItem: itemDimension,
      quantityOfItem: itemQuantity,
      priceOfItem: itemPrice,
      totalPrice: itemQuantity * itemPrice,
    });
  }
  if (selectedTfoot) {
    selectedTfoot.innerHTML = '';
  }
  const tableFooter = document.createElement('tfoot');
  const tableFooterRow = document.createElement('tr');
  const wholePriceTextTd = document.createElement('td');
  const wholePriceNumberTd = document.createElement('td');
  wholePriceTextTd.innerHTML = 'All price';
  wholePriceNumberTd.innerHTML = itemInfoArray.reduce((result, value) => result + value.totalPrice , 0);
  tableFooterRow.appendChild(wholePriceTextTd);
  tableFooterRow.appendChild(wholePriceNumberTd);
  document.querySelector('#itemTable').appendChild(tableFooter);
  document.querySelector('#itemTable tfoot').appendChild(tableFooterRow);

  console.log(itemInfoArray.length);

  itemInfoArray.forEach((element, index) => {
    const tableRow = document.createElement('tr');
    const itemNameTd = document.createElement('td');
    const itemCodeTd = document.createElement('td');
    const itemDimensionTd = document.createElement('td');
    const itemQuantityTd = document.createElement('td');
    const itemPriceTd = document.createElement('td');
    const totalPriceTd = document.createElement('td');

    itemNameTd.innerHTML = element.nameOfItem;
    itemCodeTd.innerHTML = element.codeOfItem;
    itemDimensionTd.innerHTML = element.dimensionOfItem;
    itemQuantityTd.innerHTML = element.quantityOfItem;
    itemPriceTd.innerHTML = element.priceOfItem;
    totalPriceTd.innerHTML = element.totalPrice;
    tableRow.appendChild(itemNameTd);
    tableRow.appendChild(itemCodeTd);
    tableRow.appendChild(itemDimensionTd);
    tableRow.appendChild(itemQuantityTd);
    tableRow.appendChild(itemPriceTd);
    tableRow.appendChild(totalPriceTd);

    document.querySelector('#itemTable tbody').appendChild(tableRow);

  });
  console.log(itemInfoArray);
};


function starterFunction(action) {
  switch (action) {
    case 'submitObjData':
      if (mainInfoArray.length === 0) {
        createMainInfo();
      }
      break;
    case 'submitItemData':
      createItemInfo();
      break;

    default:
      break;
  }
}





document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', (e) => {
    starterFunction(e.target.id);
  });
});
