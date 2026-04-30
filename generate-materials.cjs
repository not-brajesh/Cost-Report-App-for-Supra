const fs = require('fs');

// Read CSV file
const csvPath = '/Users/brajeshkumar/Library/Caches/com.apple.SwiftUI.Drag-5BB98AC9-54DF-41CD-AFC3-48F5B48D95B5/CostTable_Materials_2025_converted.csv';
const data = fs.readFileSync(csvPath, 'utf8');
const lines = data.split('\n');

const materials = {};
let count = 0;

// Parse CSV lines (skip first 2 header rows)
for(let i = 2; i < lines.length; i++) {
  const line = lines[i].trim();
  if(!line) continue;
  
  // Parse CSV with quotes handling
  const cols = [];
  let col = '';
  let inQuotes = false;
  
  for(let j = 0; j < line.length; j++) {
    const char = line[j];
    if(char === '"') {
      inQuotes = !inQuotes;
    } else if(char === ',' && !inQuotes) {
      cols.push(col.trim());
      col = '';
    } else {
      col += char;
    }
  }
  cols.push(col.trim());
  
  // Extract data
  const materialName = cols[1] ? cols[1].replace(/^"|"$/g, '').trim() : '';
  const category = cols[3] ? cols[3].replace(/^"|"$/g, '').trim() : '';
  const tablePrice = cols[4] ? cols[4].replace(/^"|"$/g, '').trim() : '';
  const unit = cols[5] ? cols[5].replace(/^"|"$/g, '').trim() : '';
  const c1 = cols[7] ? cols[7].replace(/^"|"$/g, '').trim() : '';
  const c2 = cols[8] ? cols[8].replace(/^"|"$/g, '').trim() : '';
  const size1 = cols[9] ? cols[9].replace(/^"|"$/g, '').trim() : '';
  const size2 = cols[10] ? cols[10].replace(/^"|"$/g, '').trim() : '';
  
  if(!materialName || materialName === 'Material') continue;
  
  // Create material entry
  const entry = {
    unit: unit || 'unit',
    category: category || 'Misc'
  };
  
  // Check if it's a formula or fixed price
  const isFormula = tablePrice && (tablePrice.includes('[') || tablePrice.includes('C1') || tablePrice.includes('C2'));
  
  if(isFormula && c1 && c2) {
    // Formula-based
    entry.formula = tablePrice;
    entry.c1 = parseFloat(c1) || 0;
    entry.c2 = parseFloat(c2) || 0;
    
    // Determine inputs needed
    const inputs = [];
    if(size1 && size1 !== '0' && size1 !== '') inputs.push('size1');
    if(size2 && size2 !== '0' && size2 !== '') inputs.push('size2');
    if(inputs.length > 0) entry.inputs = inputs;
  } else if(tablePrice && !isNaN(parseFloat(tablePrice))) {
    // Fixed price
    entry.price = parseFloat(tablePrice);
  } else if(tablePrice === 'AIR' || tablePrice === 'air') {
    entry.price = 'AIR';
  } else {
    entry.price = 0;
  }
  
  // Escape quotes in material name for JS key
  const safeName = materialName.replace(/"/g, '\\"');
  materials[safeName] = entry;
  count++;
}

// Generate JavaScript output
let output = '// Complete Material Database from CostTable_Materials_2025.csv\n';
output += '// Generated on: ' + new Date().toISOString() + '\n';
output += '// Total materials: ' + count + '\n\n';
output += 'window.completeMaterialDatabase = {\n';

const entries = Object.entries(materials);
entries.forEach(([name, data], index) => {
  const isLast = index === entries.length - 1;
  const comma = isLast ? '' : ',';
  
  // Build the entry string
  let entryStr = `  "${name}": { `;
  const props = [];
  
  if(data.price !== undefined) {
    props.push(`price: ${typeof data.price === 'number' ? data.price : '"' + data.price + '"'}`);
  }
  if(data.formula) {
    props.push(`formula: "${data.formula}"`);
    props.push(`c1: ${data.c1}`);
    props.push(`c2: ${data.c2}`);
  }
  if(data.inputs) {
    props.push(`inputs: [${data.inputs.map(i => '"' + i + '"').join(', ')}]`);
  }
  props.push(`unit: "${data.unit}"`);
  props.push(`category: "${data.category}"`);
  
  entryStr += props.join(', ') + ' }' + comma;
  output += entryStr + '\n';
});

output += '};\n';

// Write to file
fs.writeFileSync('materials-database.js', output);
console.log('Generated materials-database.js with', count, 'materials');
