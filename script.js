// 1. الإعدادات
const ADMIN_PASS = "777728020h";
const MY_PHONE = "967779714388";
let isAdminMode = false;

// 2. مخزن البيانات
let products = JSON.parse(localStorage.getItem('Mandoub_Store_V7')) || [];

// 3. العناصر
const adminBtn = document.getElementById('adminBtn');
const adminPanel = document.getElementById('adminPanel');
const saveBtn = document.getElementById('saveBtn');
const grid = document.getElementById('productGrid');
const logoutBtn = document.getElementById('logoutBtn');

// 4. تسجيل دخول الرئيس
adminBtn.addEventListener('click', function() {
    const pass = prompt("الرجاء ادخال كلمه المرور:");
    if (pass === ADMIN_PASS) {
        isAdminMode = true;
        adminPanel.classList.remove('hidden');
        alert("أهلاً بك يا رئيس.. يمكنك الآن إضافة المنتجات.");
        render(); 
    } else if (pass !== null) {
        alert("كلمة المرور غير صحيحة!");
    }
});

// 5. تسجيل الخروج
logoutBtn.addEventListener('click', function() {
    isAdminMode = false;
    adminPanel.classList.add('hidden');
    render();
});

// 6. حفظ المنتج
saveBtn.addEventListener('click', function() {
    const img = document.getElementById('pImg').value;
    const name = document.getElementById('pName').value;
    const yer = document.getElementById('pYer').value;
    const sar = document.getElementById('pSar').value;

    if (img && name && yer) {
        const newP = { id: Date.now(), img, name, yer, sar: sar || "0" };
        products.unshift(newP);
        localStorage.setItem('Mandoub_Store_V7', JSON.stringify(products));
        
        // تفريغ الحقول
        document.getElementById('pImg').value = "";
        document.getElementById('pName').value = "";
        document.getElementById('pYer').value = "";
        document.getElementById('pSar').value = "";
        
        render();
    } else {
        alert("يرجى تعبئة البيانات الأساسية!");
    }
});

// 7. عرض المنتجات
function render() {
    grid.innerHTML = "";
    products.forEach(function(p) {
        const card = document.createElement('div');
        card.className = 'card';
        
        let html = "";
        if (isAdminMode) {
            html += "<button class='del-btn' onclick='deleteProduct(" + p.id + ")'>✕</button>";
        }
        
        html += "<img src='" + p.img + "'>";
        html += "<div class='card-content'>";
        html += "<h4>" + p.name + "</h4>";
        html += "<p class='price-yer'>" + p.yer + " YER</p>";
        html += "<p class='price-sar'>" + p.sar + " SAR</p>";
        html += "<button class='order-btn' onclick='sendOrder(\"" + p.name + "\")'>طلب عبر واتساب</button>";
        html += "</div>";
        
        card.innerHTML = html;
        grid.appendChild(card);
    });
}

// 8. الحذف والطلب
window.deleteProduct = function(id) {
    if (confirm("هل تريد الحذف؟")) {
        products = products.filter(item => item.id !== id);
        localStorage.setItem('Mandoub_Store_V7', JSON.stringify(products));
        render();
    }
};

window.sendOrder = function(name) {
    const msg = encodeURIComponent("مرحباً مندوب، أريد طلب: " + name);
    window.open("https://wa.me/" + MY_PHONE + "?text=" + msg, '_blank');
};

// البدء
render();