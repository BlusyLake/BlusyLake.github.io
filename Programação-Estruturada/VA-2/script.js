
const getPCs = () => JSON.parse(localStorage.getItem('pcs')) || [];
const savePCs = (pcs) => localStorage.setItem('pcs', JSON.stringify(pcs));


document.getElementById('pc-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const pcName = document.getElementById('pc-name').value;
    const cabinet = document.getElementById('cabinet').selectedOptions[0];
    const processor = document.getElementById('processor').selectedOptions[0];
    const gpu = document.getElementById('gpu').selectedOptions[0];

    const totalPrice =
        parseFloat(cabinet.dataset.price) +
        parseFloat(processor.dataset.price) +
        parseFloat(gpu.dataset.price);

    const pc = {
        name: pcName,
        cabinet: cabinet.value,
        processor: processor.value,
        gpu: gpu.value,
        totalPrice: totalPrice.toFixed(2),
        discountedPrice: (totalPrice * 0.85).toFixed(2),
        date: new Date().toLocaleDateString(),
    };

    const pcs = getPCs();
    pcs.push(pc);
    savePCs(pcs);

    e.target.reset();
    renderPCs(); 
});


const renderPCs = (filteredPCs = null) => {
    const pcList = document.getElementById('pc-list');
    if (!pcList) return;

    const pcs = filteredPCs || getPCs();
    pcList.innerHTML = pcs.length
        ? pcs
              .map(
                  (pc, index) => `
        <div class="pc-item">
            <span>${pc.name} - ${pc.date} - Total: R$${pc.totalPrice} (À Vista: R$${pc.discountedPrice})</span>
            <button onclick="deletePC(${index}, ${filteredPCs ? true : false})">Excluir</button>
        </div>`
              )
              .join('')
        : '<p>Nenhum PC encontrado.</p>';
};


const deletePC = (index, isFiltered = false) => {
    const pcs = getPCs();

    if (isFiltered) {
        const filteredPCs = pcs.filter((_, i) => i !== index); // Remove pelo índice correspondente
        savePCs(filteredPCs);
    } else {
        pcs.splice(index, 1);
        savePCs(pcs);
    }

    renderPCs(); 
};


const filterPCs = () => {
    const maxPrice = parseFloat(document.getElementById('filter-price').value);
    if (isNaN(maxPrice)) {
        alert("Por favor, insira um valor numérico válido.");
        return;
    }

    const pcs = getPCs();
    const filteredPCs = pcs.filter((pc) => parseFloat(pc.discountedPrice) <= maxPrice);

    renderPCs(filteredPCs);
};


renderPCs();
