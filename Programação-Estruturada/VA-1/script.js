document.getElementById('populationForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const initialYear = parseInt(document.getElementById('initialYear').value);
    const population = parseFloat(document.getElementById('population').value);
    const growthRate = parseFloat(document.getElementById('growthRate').value);
    const finalYear = parseInt(document.getElementById('finalYear').value);
    
    const resultsTable = document.getElementById('resultsTable').querySelector('tbody');
    resultsTable.innerHTML = '';
  
    let currentYear = initialYear;
    let currentPopulation = population;
  
    while (currentYear <= finalYear) {
      const row = document.createElement('tr');
      const yearCell = document.createElement('td');
      const populationCell = document.createElement('td');
  
      yearCell.textContent = currentYear;
      populationCell.textContent = currentPopulation.toFixed(0);
  
      row.appendChild(yearCell);
      row.appendChild(populationCell);
      resultsTable.appendChild(row);
  
      currentPopulation += currentPopulation * (growthRate / 100);
      currentYear++;
    }
  });
  