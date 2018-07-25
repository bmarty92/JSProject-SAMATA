const mainInfoArray = [];
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


function starterFunction(action) {
  switch (action) {
    case 'submitObjData':
      if (mainInfoArray.length === 0) {
        createMainInfo();
      }
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
