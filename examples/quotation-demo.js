const costCategories = [
  "Materials",
  "Fabrication",
  "Installation / Assembly",
  "Civil Works",
  "Electrical Work",
  "Logistics",
  "Equipment / Tools",
];

const catalogItems = [
  {
    id: "steel-beam",
    category: "Materials",
    type: "material",
    name: "Steel beam",
    unit: "linear meter",
    unitCost: 82.5,
  },
  {
    id: "roof-sheet",
    category: "Materials",
    type: "material",
    name: "Roof sheet",
    unit: "square meter",
    unitCost: 18.4,
  },
  {
    id: "anchor-plate",
    category: "Materials",
    type: "material",
    name: "Anchor plate",
    unit: "unit",
    unitCost: 12.75,
  },
  {
    id: "concrete-block",
    category: "Materials",
    type: "material",
    name: "Concrete block",
    unit: "unit",
    unitCost: 2.8,
  },
  {
    id: "concrete-mesh",
    category: "Materials",
    type: "material",
    name: "Concrete mesh",
    unit: "square meter",
    unitCost: 7.9,
  },
  {
    id: "steel-structure-fabrication",
    category: "Fabrication",
    type: "service",
    name: "Steel structure fabrication",
    unit: "package",
    unitCost: 1450,
  },
  {
    id: "welding-work",
    category: "Fabrication",
    type: "labor",
    name: "Welding work",
    unit: "hour",
    unitCost: 58,
  },
  {
    id: "cutting-preparation",
    category: "Fabrication",
    type: "labor",
    name: "Cutting and preparation",
    unit: "hour",
    unitCost: 46,
  },
  {
    id: "installation-crew",
    category: "Installation / Assembly",
    type: "labor",
    name: "Installation crew",
    unit: "day",
    unitCost: 420,
  },
  {
    id: "steel-structure-assembly",
    category: "Installation / Assembly",
    type: "labor",
    name: "Steel structure assembly",
    unit: "day",
    unitCost: 510,
  },
  {
    id: "roof-panel-installation",
    category: "Installation / Assembly",
    type: "labor",
    name: "Roof panel installation",
    unit: "day",
    unitCost: 390,
  },
  {
    id: "site-preparation",
    category: "Civil Works",
    type: "labor",
    name: "Site preparation",
    unit: "day",
    unitCost: 310,
  },
  {
    id: "concrete-floor-labor",
    category: "Civil Works",
    type: "labor",
    name: "Concrete floor labor",
    unit: "day",
    unitCost: 360,
  },
  {
    id: "foundation-support-labor",
    category: "Civil Works",
    type: "labor",
    name: "Foundation support labor",
    unit: "day",
    unitCost: 430,
  },
  {
    id: "basic-electrical-installation",
    category: "Electrical Work",
    type: "labor",
    name: "Basic electrical installation",
    unit: "day",
    unitCost: 340,
  },
  {
    id: "lighting-installation",
    category: "Electrical Work",
    type: "labor",
    name: "Lighting installation",
    unit: "day",
    unitCost: 280,
  },
  {
    id: "freight",
    category: "Logistics",
    type: "service",
    name: "Freight",
    unit: "trip",
    unitCost: 520,
  },
  {
    id: "material-handling",
    category: "Logistics",
    type: "service",
    name: "Material handling",
    unit: "day",
    unitCost: 210,
  },
  {
    id: "crane-rental",
    category: "Equipment / Tools",
    type: "service",
    name: "Crane rental",
    unit: "day",
    unitCost: 780,
  },
  {
    id: "welding-equipment",
    category: "Equipment / Tools",
    type: "service",
    name: "Welding equipment",
    unit: "day",
    unitCost: 120,
  },
  {
    id: "lifting-tools",
    category: "Equipment / Tools",
    type: "service",
    name: "Lifting tools",
    unit: "day",
    unitCost: 95,
  },
];

const quoteItems = [];
const laborServiceCategories = ["Fabrication", "Installation / Assembly", "Civil Works", "Electrical Work"];
const logisticsEquipmentCategories = ["Logistics", "Equipment / Tools"];

const categorySelect = document.querySelector("#category-select");
const itemSelect = document.querySelector("#item-select");
const quantityInput = document.querySelector("#quantity-input");
const quoteForm = document.querySelector("#quote-form");
const quoteItemsTable = document.querySelector("#quote-items");
const overheadInput = document.querySelector("#overhead-input");
const contingencyInput = document.querySelector("#contingency-input");
const marginInput = document.querySelector("#margin-input");
const materialsSubtotalOutput = document.querySelector("#materials-subtotal-output");
const laborServicesSubtotalOutput = document.querySelector("#labor-services-subtotal-output");
const logisticsEquipmentSubtotalOutput = document.querySelector("#logistics-equipment-subtotal-output");
const overheadOutput = document.querySelector("#overhead-output");
const contingencyOutput = document.querySelector("#contingency-output");
const marginOutput = document.querySelector("#margin-output");
const totalOutput = document.querySelector("#total-output");
const summaryButton = document.querySelector("#summary-button");
const summaryOutput = document.querySelector("#summary-output");

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function formatCurrency(value) {
  return currencyFormatter.format(value);
}

function populateCategoryOptions() {
  costCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

function populateItemOptions() {
  const selectedCategory = categorySelect.value;
  const availableItems = catalogItems.filter((item) => item.category === selectedCategory);

  itemSelect.innerHTML = "";

  availableItems.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = `${item.name} - ${formatCurrency(item.unitCost)} / ${item.unit}`;
    itemSelect.appendChild(option);
  });
}

function getCategorySubtotal(categoryName) {
  return quoteItems
    .filter((item) => item.category === categoryName)
    .reduce((total, item) => total + item.quantity * item.unitCost, 0);
}

function getGroupedSubtotal(categories) {
  return categories.reduce((total, category) => total + getCategorySubtotal(category), 0);
}

function calculateTotals() {
  const materialsSubtotal = getCategorySubtotal("Materials");
  const laborServicesSubtotal = getGroupedSubtotal(laborServiceCategories);
  const logisticsEquipmentSubtotal = getGroupedSubtotal(logisticsEquipmentCategories);
  const directSubtotal = materialsSubtotal + laborServicesSubtotal + logisticsEquipmentSubtotal;

  const overheadPercentage = Number(overheadInput.value) || 0;
  const contingencyPercentage = Number(contingencyInput.value) || 0;
  const marginPercentage = Number(marginInput.value) || 0;

  // Keep the demo math easy to explain: overhead and contingency are applied to direct costs.
  const overheadValue = directSubtotal * (overheadPercentage / 100);
  const contingencyValue = directSubtotal * (contingencyPercentage / 100);
  const marginBase = directSubtotal + overheadValue + contingencyValue;
  const marginValue = marginBase * (marginPercentage / 100);
  const total = marginBase + marginValue;

  return {
    materialsSubtotal,
    laborServicesSubtotal,
    logisticsEquipmentSubtotal,
    directSubtotal,
    overheadPercentage,
    overheadValue,
    contingencyPercentage,
    contingencyValue,
    marginPercentage,
    marginValue,
    total,
  };
}

function renderQuoteTable() {
  quoteItemsTable.innerHTML = "";

  if (quoteItems.length === 0) {
    quoteItemsTable.innerHTML = '<tr class="empty-row"><td colspan="7">No items added yet.</td></tr>';
    return;
  }

  quoteItems.forEach((item, index) => {
    const row = document.createElement("tr");
    const subtotal = item.quantity * item.unitCost;

    row.innerHTML = `
      <td>${item.category}</td>
      <td>${item.name}</td>
      <td>${item.unit}</td>
      <td>${item.quantity}</td>
      <td>${formatCurrency(item.unitCost)}</td>
      <td>${formatCurrency(subtotal)}</td>
      <td><button class="remove-button" type="button" data-index="${index}">Remove</button></td>
    `;

    quoteItemsTable.appendChild(row);
  });
}

function updateTotals() {
  const totals = calculateTotals();

  materialsSubtotalOutput.textContent = formatCurrency(totals.materialsSubtotal);
  laborServicesSubtotalOutput.textContent = formatCurrency(totals.laborServicesSubtotal);
  logisticsEquipmentSubtotalOutput.textContent = formatCurrency(totals.logisticsEquipmentSubtotal);
  overheadOutput.textContent = formatCurrency(totals.overheadValue);
  contingencyOutput.textContent = formatCurrency(totals.contingencyValue);
  marginOutput.textContent = formatCurrency(totals.marginValue);
  totalOutput.textContent = formatCurrency(totals.total);
}

// Adds a catalog snapshot to the quote so future catalog edits would not change this draft line.
function addQuoteItem(event) {
  event.preventDefault();

  const selectedItem = catalogItems.find((item) => item.id === itemSelect.value);
  const quantity = Number(quantityInput.value);

  if (!selectedItem || quantity <= 0) {
    return;
  }

  quoteItems.push({
    category: selectedItem.category,
    type: selectedItem.type,
    name: selectedItem.name,
    unit: selectedItem.unit,
    unitCost: selectedItem.unitCost,
    quantity,
  });

  quantityInput.value = "1";
  renderQuoteTable();
  updateTotals();
}

function removeQuoteItem(index) {
  quoteItems.splice(index, 1);
  renderQuoteTable();
  updateTotals();
}

function generateSummary() {
  const totals = calculateTotals();
  const itemCount = quoteItems.length;

  if (itemCount === 0) {
    summaryOutput.textContent = "Add at least one item before generating a quotation summary.";
    return;
  }

  summaryOutput.textContent =
    `Draft quotation contains ${itemCount} item${itemCount === 1 ? "" : "s"} across ` +
    `${new Set(quoteItems.map((item) => item.category)).size} cost categories. ` +
    `Direct costs are ${formatCurrency(totals.directSubtotal)}, with ` +
    `${totals.overheadPercentage}% overhead, ${totals.contingencyPercentage}% contingency, ` +
    `and ${totals.marginPercentage}% margin applied. Final estimated total is ` +
    `${formatCurrency(totals.total)}. Manual review is recommended before sharing with a client.`;
}

quoteForm.addEventListener("submit", addQuoteItem);

categorySelect.addEventListener("change", populateItemOptions);

quoteItemsTable.addEventListener("click", (event) => {
  if (event.target.matches(".remove-button")) {
    removeQuoteItem(Number(event.target.dataset.index));
  }
});

[overheadInput, contingencyInput, marginInput].forEach((input) => {
  input.addEventListener("input", updateTotals);
});

summaryButton.addEventListener("click", generateSummary);

populateCategoryOptions();
populateItemOptions();
updateTotals();
