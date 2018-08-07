const mainInfoArray = [];
const itemInfoArray = [];
const weekDateArray = [];


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
const clearItemFooter = () => {
  const selectedTfoot = select('#itemTable tfoot');
  if (selectedTfoot) {
    selectedTfoot.innerHTML = '';
  }
};
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
  }
};
const drawItemInfo = () => {

  createItemTable();
  clearItemFooter();

  const tableFooter = createElement({
    tag: 'tfoot',
  });
  const tableFooterRow = createElement({
    tag: 'tr',
  });
  const wholePriceTextTd = createElement({
    tag: 'td',
  });
  const wholePriceNumberTd = createElement({
    tag: 'td',
  });
  wholePriceTextTd.innerHTML = 'All price';
  wholePriceNumberTd.innerHTML = itemInfoArray.reduce((result, value) => result + value.totalPrice, 0);
  tableFooterRow.appendChild(wholePriceTextTd);
  tableFooterRow.appendChild(wholePriceNumberTd);
  select('#itemTable').appendChild(tableFooter);
  select('#itemTable tfoot').appendChild(tableFooterRow);

  itemInfoArray.forEach((element, index) => {
    const tableRow = createElement({
      tag: 'tr',
    });
    const itemNameTd = createElement({
      tag: 'td',
    });
    const itemCodeTd = createElement({
      tag: 'td',
    });
    const itemDimensionTd = createElement({
      tag: 'td',
    });
    const itemQuantityTd = createElement({
      tag: 'td',
    });
    const itemPriceTd = createElement({
      tag: 'td',
    });
    const totalPriceTd = createElement({
      tag: 'td',
    });

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

const removeDropDown = () => {

  const dropDown = select('#dropDownHere select');
  if (dropDown) {
    select('#dropDownHere').removeChild(dropDown);
  }
};

select('#dayInput').addEventListener('change', () => {
  removeDropDown();
  const dropDown = createElement({
    tag: 'select',
  });

  const selectedDropdownQuantityField = select('#dropDownQuantity');
  select('#dropDownHere').appendChild(dropDown);
  itemInfoArray.forEach((element, index) => {
    const dropDownItem = createElement({
      tag: 'option',
    });
    dropDownItem.innerHTML = element.nameOfItem;
    dropDown.appendChild(dropDownItem);
  });

  dropDown.addEventListener('change', (e) => {
    const foundValue = itemInfoArray.find(element => e.target.value === element.nameOfItem);
    const dropDownDimension = select('#dropDownDimension');
    const dropDownCode = select('#dropDownCode');
    dropDownDimension.innerHTML = foundValue.dimensionOfItem;
    dropDownCode.innerHTML = foundValue.codeOfItem;
    select('#dropDownPrice').innerHTML = '';
    select('#dropDownQuantity').value = '';
  });

  selectedDropdownQuantityField.addEventListener('change', (e) => {
    console.log(e);
    const dropDownQuantity = select('#dropDownQuantity').value;
    const currentItemName = dropDown.value;
    const foundValue = itemInfoArray.find(element => currentItemName === element.nameOfItem);
    const price = dropDownQuantity * foundValue.priceOfItem;
    const totalPrice = select('#dropDownPrice');
    totalPrice.innerHTML = price;
  });
  dropDown.selectedIndex = -1;
});

const createWeekTable = () => {
  select('#tableContainer').innerHTML = '';
  const weekTableId = select('#dayInput').value;
  const infoRowId = select('#dayInput').value + 'a';
  const tableHeadElements = ['Item Name', 'Item Code', 'Item Dimension', 'Item Quantity', 'Item Price'];
  
  weekDateArray.forEach((element, index)=> {
    
         const weekTable = createElement({
          tag: 'table',
         });
        weekTable.id = weekTableId;
        const tableHeader = createElement({
          tag: 'thead',
        });
        const dateRow = createElement({
          tag: 'tr',
        });
        const infoRow = createElement({
          tag: 'tr',
        });
        const dateTd = createElement({
          tag: 'th',
        });
        dateTd.textContent = element.date;
        tableHeader.appendChild(dateRow.appendChild(dateTd));
        tableHeader.appendChild(infoRow);
        weekTable.appendChild(tableHeader);
        tableHeadElements.forEach(label => {
          const th = createElement({tag: 'th', innerHTML: label});
          infoRow.appendChild(th);
        });
        element.data.forEach(data => {
          const tableBody = createElement({
            tag: 'tbody',
          });
          const itemDataRow = createElement({
            tag: 'tr',
          });
          const itemNameTd = createElement({
            tag: 'td',
          });
          const itemCodeTd = createElement({
            tag: 'td',
          });
          const itemDimensionTd = createElement({
            tag: 'td',
          });
          const itemQuantityTd = createElement({
            tag: 'td',
          });
          const itemTotalPriceTd = createElement({
            tag: 'td',
          });
          itemNameTd.textContent = data.itemName;
          itemCodeTd.textContent = data.itemCode;
          itemDimensionTd.textContent = data.itemDimension;
          itemQuantityTd.textContent = data.itemQuantity;
          itemTotalPriceTd.textContent = data.totalPrice;
          tableBody.appendChild(itemDataRow);
          itemDataRow.appendChild(itemNameTd);
          itemDataRow.appendChild(itemCodeTd);
          itemDataRow.appendChild(itemDimensionTd);
          itemDataRow.appendChild(itemQuantityTd);
          itemDataRow.appendChild(itemTotalPriceTd);
          weekTable.appendChild(tableBody);
        });
          const itemTableFooter = createElement({
            tag: 'tfoot',
          });
          const tableFooterRow = createElement({
            tag: 'tr',
          });
          const wholePriceTextTd = createElement({
            tag: 'td',
          });
          const wholePriceNumberTd = createElement({
            tag: 'td',
          });
          itemTableFooter.appendChild(tableFooterRow);
          tableFooterRow.appendChild(wholePriceTextTd);
          tableFooterRow.appendChild(wholePriceNumberTd);
          weekTable.appendChild(itemTableFooter);
          wholePriceTextTd.textContent = 'Total';
          wholePriceNumberTd.textContent  = element.data.reduce((result, value)=>
          result + Number(value.totalPrice), 0);
          select('#tableContainer').appendChild(weekTable);
      });
    }
    
  
const createWeekEntry = () => {
  const dayDate = select('#dayInput').value;
  const dayItemName = select('select').value;
  const dayItemCode = select('#dropDownCode').innerHTML;
  const dayItemDimension = select('#dropDownDimension').innerHTML;
  const dayItemQuantity = select('#dropDownQuantity').value;
  const dayItemTotalPrice = select('#dropDownPrice').innerHTML;
  const weekData = [];
  const checkIndex = weekDateArray.findIndex(element => element.date === dayDate);
  console.log(checkIndex);
  weekData.push({
    itemName: dayItemName,
    itemCode: dayItemCode,
    itemDimension: dayItemDimension,
    itemQuantity: dayItemQuantity,
    totalPrice: dayItemTotalPrice,
  });
  if (checkIndex === -1) {
    weekDateArray.push({
      date: dayDate,
      data: weekData,
    });
    console.log(weekDateArray);
  } else {
    weekDateArray[checkIndex].data = [...weekDateArray[checkIndex].data, ...weekData];
  }
createWeekTable();
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
    case 'addWeekEntry':
      const selectedOption = select('select').options.selectedIndex;
      const option = select('select').options[selectedOption];
      if (select('#dropDownQuantity').value > 0 && !option.disabled) {
        option.disabled = true;
        createWeekEntry();
      }

    default:
      break;
  }
}

document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', (e) => {
    starterFunction(e.target.id);
  });
});