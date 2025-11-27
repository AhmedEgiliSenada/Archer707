// مصفوفة لتخزين محتويات سلة التسوق
let cart = JSON.parse(localStorage.getItem('ecommerce_cart')) || [];

const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');
const cartItemsContainer = document.getElementById('cart-items');
const checkoutButton = document.getElementById('checkout-button');

document.addEventListener('DOMContentLoaded', () => {
    // 1. تفعيل وظيفة الإضافة عند تحميل الصفحة
    setupAddToCartButtons();
    // 2. عرض محتويات السلة المحفوظة عند تحميل الصفحة
    renderCart();

    // 3. ربط زر إتمام الطلب بوظيفة التنقل
    checkoutButton.addEventListener('click', () => {
        // رسالة تنبيه أو توجيه المستخدم لصفحة الدفع
        if (cart.length > 0) {
            alert('شكراً لطلبك! سيتم توجيهك إلى تفاصيل الدفع.');
            window.location.href = 'account_details.html'; 
        } else {
            alert('سلة التسوق فارغة، يرجى إضافة منتجات أولاً.');
        }
    });
});

// وظيفة ربط أزرار الإضافة
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            const product = {
                id: productCard.dataset.id,
                name: productCard.dataset.name,
                price: parseFloat(productCard.dataset.price),
                quantity: 1
            };
            addToCart(product);
        });
    });
}

// وظيفة إضافة منتج إلى سلة التسوق
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }
    
    // حفظ السلة في الذاكرة المحلية
    localStorage.setItem('ecommerce_cart', JSON.stringify(cart));
    
    alert(`تمت إضافة ${product.name} إلى السلة!`);
    renderCart(); // تحديث الواجهة
}

// وظيفة عرض محتويات السلة وتحديث الإجمالي
function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>سلة التسوق فارغة حالياً.</p>';
        cartCountElement.textContent = '0';
        cartTotalElement.textContent = '$0';
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name} (${item.quantity}x) - $${item.price} = <strong>$${itemTotal.toFixed(2)}</strong></p>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

