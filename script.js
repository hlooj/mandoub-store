Const ADMIN_PASS = "777728020h";
let products = JSON.parse(localStorage.getItem('m_store')) || [];

document.getElementById('adminBtn').addEventListener('click', () => {
    if (prompt("الرجاء ادخال كلمه المرور:") === ADMIN_PASS) {
        document.getElementById('adminPanel').classList.remove('hidden');
    }
});

document.getElementById('saveBtn').addEventListener('click', () => {
    const img = document.getElementById('pImg').value;
    const name = document.getElementById('pName').value;
    const yer = document.getElementById('pYer').value;
    if(img && name && yer) {
        products.unshift({img, name, yer});
        localStorage.setItem('m_store', JSON.stringify(products));
        location.reload(); 
    }
});
