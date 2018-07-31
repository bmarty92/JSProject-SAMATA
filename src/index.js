const mainInfoArray = [];
const itemInfoArray = [];

const select = selector => document.querySelector(selector);

const createElement = ({
  tag,
  innerHTML = '',
}) => {
  const element = document.createElement(tag);
  element.innerHTML = innerHTML;
  return element;
};

const drawMainInfo = () => {
  mainInfoArray.forEach((element, index) => {
    const tableBody = createElement({
      tag: 'tbody',
    });
    const tableRow = createElement({
      tag: 'tr',
    });
    const values = Object.values(element);
    values.forEach((value) => {
      tableRow.appendChild(createElement({
        tag: 'td',
        innerHTML: value,
      }));
    });

    select('#objInfoTable').appendChild(tableBody).appendChild(tableRow);
  });
};

const createMainInfo = () => {
  const objName = select('#objName').value;
  const objAddress = select('#objAddress').value;
  const companyName = select('#companyName').value;
  const resPerson = select('#resPerson').value;
  mainInfoArray.push({
    objectName: objName,
    objectAddress: objAddress,
    nameOfCompany: companyName,
    responsiblePerson: resPerson,
  });
  drawMainInfo();
};

const createItemTable = () => {
  const selectedTbody = select('#itemTable tbody');
  if (selectedTbody) {
    selectedTbody.innerHTML = '';
  } else {
    const tableBody = document.createElement('tbody');
    select('#itemTable').appendChild(tableBody);
  }
};
const clearItemFooter =() => {
  const selectedTfoot = select('#itemTable tfoot');
  if (selectedTfoot) {
    selectedTfoot.innerHTML = '';
  } 
}
const createItemInfo = () => {
  const itemName = select('#itemName').value;
  const itemCode = select('#itemCode').value;
  const itemDimension = select('#itemDimension').value;
  const itemQuantity = select('#itemQuantity').value;
  const itemPrice = select('#itemPrice').value;
  const existingItem = itemInfoArray.some(item => item.nameOfItem === itemName && item.codeOfItem === itemCode);
  if (!existingItem) {
    itemInfoArray.push({
      nameOfItem: itemName,
      codeOfItem: itemCode,
      dimensionOfItem: itemDimension,
      quantityOfItem: itemQuantity,
      priceOfItem: itemPrice,
      totalPrice: itemQuantity * itemPrice,
    });
    drawItemInfo();
  };
}
const drawItemInfo = () => {

  createItemTable();
  clearItemFooter();

  const tableFooter = createElement({tag:'tfoot'});
  const tableFooterRow = createElement({tag:'tr'});  
  const wholePriceTextTd = createElement({tag:'td'});  
  const wholePriceNumberTd = createElement({tag:'td'});  
  wholePriceTextTd.innerHTML = 'All price';
  wholePriceNumberTd.innerHTML = itemInfoArray.reduce((result, value) => result + value.totalPrice, 0);
  tableFooterRow.appendChild(wholePriceTextTd);
  tableFooterRow.appendChild(wholePriceNumberTd);
  select('#itemTable').appendChild(tableFooter);
  select('#itemTable tfoot').appendChild(tableFooterRow);

  itemInfoArray.forEach((element, index) => {
    const tableRow = createElement({tag:'tr'});
    const itemNameTd = createElement({tag:'td'});
    const itemCodeTd = createElement({tag:'td'});
    const itemDimensionTd = createElement({tag:'td'});
    const itemQuantityTd = createElement({tag:'td'});
    const itemPriceTd = createElement({tag:'td'});
    const totalPriceTd = createElement({tag:'td'});

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
    select('#itemTable tbody').appendChild(tableRow);
  });
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
    case 'submitMonday':
      createMondayTable();
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
