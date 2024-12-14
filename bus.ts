interface Bus {
  busNumber: string;
  driver: string;
  capacity: number;
  status: string;
}

const buses: Bus[] = [];

const busForm = document.getElementById('busForm') as HTMLFormElement;
const busTableBody = document.getElementById('busTableBody') as HTMLTableElement;
const saveBtn = document.getElementById('saveBtn') as HTMLButtonElement;

// Function to render the bus table
function renderBusTable() {
  busTableBody.innerHTML = '';
  buses.forEach((bus, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${bus.busNumber}</td>
      <td>${bus.driver}</td>
      <td>${bus.capacity}</td>
      <td>${bus.status}</td>
      <td>
        <button class="btn btn-info btn-sm" onclick="editBus(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteBus(${index})">Delete</button>
      </td>
    `;
    busTableBody.appendChild(row);
  });
}

// Add Bus or Edit Bus
busForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const busNumber = (document.getElementById('busNumber') as HTMLInputElement).value;
  const driver = (document.getElementById('driver') as HTMLInputElement).value;
  const capacity = parseInt((document.getElementById('capacity') as HTMLInputElement).value);
  const status = (document.getElementById('status') as HTMLSelectElement).value;

  const existingIndex = buses.findIndex(bus => bus.busNumber === busNumber);

  if (existingIndex !== -1) {
    // Edit existing bus
    buses[existingIndex] = { busNumber, driver, capacity, status };
  } else {
    // Add new bus
    buses.push({ busNumber, driver, capacity, status });
  }

  busForm.reset();
  renderBusTable();
});

// Edit Bus
function editBus(index: number) {
  const bus = buses[index];
  (document.getElementById('busNumber') as HTMLInputElement).value = bus.busNumber;
  (document.getElementById('driver') as HTMLInputElement).value = bus.driver;
  (document.getElementById('capacity') as HTMLInputElement).value = bus.capacity.toString();
  (document.getElementById('status') as HTMLSelectElement).value = bus.status;
}

// Delete Bus
function deleteBus(index: number) {
  buses.splice(index, 1);
  renderBusTable();
}

// Initial Render
renderBusTable();
