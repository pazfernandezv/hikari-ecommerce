'use strict';
document.querySelector('h1').addEventListener('click', () => location.reload());

// Product class
class Product {
    constructor(id, category, name, description, detail, features, price, image) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.description = description;
        this.detail = detail;
        this.features = features;
        this.price = price;
        this.image = image;
    }
}

// Cart item class
class CartItem {
    constructor(product) {
        this.product = product;
        this.quantity = 1;
    }

    getSubtotal() {
        return this.product.price * this.quantity;
    }
}

// Products array
const products = [
    new Product(
        1,
        "Table Lamps",
        "Round Table Lamp",
        "Table lamp with turned wooden base and glass shade.",
        "The Round Table Lamp offers soft, enveloping light that turns any corner into a cozy spot. Ideal for bedside tables, desks, or that special corner that needs a touch of warmth. Its G9 bulb illuminates gently, creating a unique atmosphere in your home.",
        [
            "Lighting: replaceable G9 bulb.",
            "Voltage: 220V.",
            "Estimated lifespan: 23,000 hours (approx. 8 years with 8 hours of daily use).",
            "Glass shade.",
            "Turned wooden base.",
            "1.50 m cord."
        ],
        42000,
        "img/velador_bola.webp"
    ),

    new Product(
        2,
        "Table Lamps",
        "LED Table Lamp",
        "Decorative lamp with indirect warm light and modern design.",
        "The LED Table Lamp combines elegance and style in its minimalist design. With its indirect and symmetrical light, it creates a warm and relaxing atmosphere ideal for any space. Perfect for adding a cozy touch to bedrooms or living rooms.",
        [
            "Lighting: LED SMD2835 warm white (3,000°K) connected to 220V.",
            "Lifespan: over 23,000 hours (approx. 8 years with 8 hours of daily use).",
            "Laser-engraved acrylic front.",
            "Micro-textured black painted sheet metal.",
            "Black lacquered wooden base.",
            "1.80 m textile cord."
        ],
        82000,
        "img/velador_led.webp"
    ),

    new Product(
        3,
        "Ceiling Lamps",
        "Wood LED Ceiling Light",
        "Circular ceiling lamp with natural wood border.",
        "The Wood LED Ceiling Light combines the warmth of wood with the purity of LED light, achieving both functional and decorative illumination. Its round, minimalist design adds a natural and modern touch, easily fitting into different decoration styles.",
        [
            "32W LED light source, dimmable (DIM).",
            "Light color: warm white 3000K.",
            "Voltage: 220V.",
            "Diameter: 50 cm.",
            "Mounting: ceiling.",
            "Aluminum structure with wood border."
        ],
        160200,
        "img/plafon_led_madera.jpg"
    ),

    new Product(
        4,
        "Ceiling Lamps",
        "White LED Ceiling Light",
        "Round and minimalist ceiling lamp with warm light.",
        "The White LED Ceiling Light has a modern and understated design. Its 40 cm circular shape combines a clean aesthetic with warm, uniform lighting.",
        [
            "40W LED light source, warm white 3000K.",
            "Voltage: 220V.",
            "Diameter: 40 cm.",
            "Mounting: ceiling.",
            "Materials: aluminum and acrylic."
        ],
        190400,
        "img/plafon_led_blanco.jpg"
    ),

    new Product(
        5,
        "LED Light Bars",
        "Classic LED Bar Light",
        "Minimalist vertical wall lamp.",
        "The Classic LED Bar Light is ideal for highlighting special corners. Its vertical, slim design adapts perfectly to any environment.",
        [
            "Lighting: LED SMD2835 warm white (3,000°K) connected to 220V.",
            "Lifespan: over 23,000 hours (approx. 8 years with 8 hours of daily use).",
            "Wall mounting.",
            "Painted sheet metal front.",
            "1.50 m cord with switch and power plug."
        ],
        175000,
        "img/barral_led_clasico.webp"
    ),

    new Product(
        6,
        "LED Light Bars",
        "Slim LED Bar Light",
        "Extra thin minimalist vertical wall lamp.",
        "The Slim LED Bar Light is the extra thin version of the classic model, with dual use. It can be hung on the wall or stood on the floor.",
        [
            "Lighting: LED SMD2835 warm white (3,000°K) connected to 220V.",
            "Lifespan: over 23,000 hours (approx. 8 years with 8 hours of daily use).",
            "Dual use: wall or floor.",
            "Painted sheet metal front.",
            "1.50 m cord with switch and power plug."
        ],
        120000,
        "img/barral_led_slim.webp"
    )
];

const cart = [];

function saveCartToStorage() {
    localStorage.setItem('cartHikari', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cartHikari');
    if (savedCart) {
        const recoveredItems = JSON.parse(savedCart);
        cart.length = 0;

        recoveredItems.forEach(item => {
            const newItem = new CartItem(item.product);
            newItem.quantity = item.quantity;
            cart.push(newItem);
        });
        updateMiniCart();
    }
}

// DOM selectors
const productList = document.querySelector('#productos');
const productsSection = document.querySelector('#seccion_productos');
const sectionTitle = productsSection.querySelector('h2');
const btnViewCart = document.querySelector('#mini_carrito button');


// FUNCTIONS:
// 1) Add to cart
function addToCart(product) {
    const existingProduct = cart.find(item => item.product.id === product.id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(new CartItem(product));
    }
    updateMiniCart();
    saveCartToStorage();
}

// 2) Update mini cart
function updateMiniCart() {
    const itemCounter = document.querySelector('#mini_carrito p:nth-child(1) span');
    const totalPrice = document.querySelector('#mini_carrito p:nth-child(2) span');
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.getSubtotal(), 0);

    itemCounter.textContent = totalQuantity;
    totalPrice.textContent = total.toLocaleString('es-AR');
}

// 3) Floating banner
function floatingBanner(category) {
    const existingBanner = document.querySelector('.bannerFlotante');
    // If already dismissed, don't show anything
    if (localStorage.getItem('newsletterDismissed')) return;

    const banner = document.createElement('div');
    banner.classList.add('bannerFlotante');

const btnCloseBanner = document.createElement('button');
btnCloseBanner.textContent = 'X';
btnCloseBanner.classList.add('btn-cerrar-banner');

    btnCloseBanner.addEventListener('click', () => {
        localStorage.setItem('newsletterDismissed', 'true');
        banner.remove();
    });


    // Otherwise show newsletter form
    banner.classList.add('newsletter_banner');

    const title = document.createElement('p');
    title.classList.add('newsletter_titulo');
    title.textContent = 'Join Hikari Club and get 10% off your first purchase!';

    const newsletterForm = document.createElement('form');
    newsletterForm.classList.add('formulario_newsletter');

    const input = document.createElement('input');
    input.classList.add('newsletter_input');
    input.type = 'email';
    input.placeholder = 'hikari@gmail.com';
    input.name = 'email';
    input.required = true;

    const btnSubscribe = document.createElement('button');
    btnSubscribe.classList.add('newsletter_btn');
    btnSubscribe.textContent = 'Get my discount';
    btnSubscribe.type = 'submit';

    const confirmation = document.createElement('p');
    confirmation.classList.add('newsletter_confirmacion');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const mail = input.value.trim();
        if (!mail || !mail.includes('@')) {
            input.setCustomValidity('Please enter a valid email.');
            input.reportValidity();
            return;
        }
        localStorage.setItem('newsletterHikari', mail);
        confirmation.textContent = 'Thank you! Your code is HIKARI10.';
        banner.replaceChildren(confirmation, btnCloseBanner);
        setTimeout(() => { banner.remove(); }, 12000);
    });

    newsletterForm.append(input, btnSubscribe, confirmation);
    banner.append(title, newsletterForm, btnCloseBanner);
    setTimeout(() => {
        localStorage.setItem('newsletterDismissed', 'true');
        banner.remove();
    }, 10000);
    document.body.append(banner);
}

// 4) Remove product from cart
function removeProduct(productId) {
    const item = cart.find(item => item.product.id === productId);
    if (!item) return;
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        const index = cart.findIndex(item => item.product.id === productId);
        cart.splice(index, 1);
    }
    updateMiniCart();
    saveCartToStorage();
}

btnViewCart.addEventListener('click', viewCart);

// 5) Display products
function displayProducts(selectedCategory = null) {
    productList.innerHTML = '';

    const filteredProducts = selectedCategory
        ? products.filter(p => p.category === selectedCategory)
        : products;

    filteredProducts.forEach(product => {
        const item = document.createElement('li');
        const img = document.createElement('img');
        const name = document.createElement('h3');
        const category = document.createElement('p');
        const description = document.createElement('p');
        const price = document.createElement('p');
        const btnDetail = document.createElement('button');
        const btnAdd = document.createElement('button');

        item.classList.add('producto_item');
        img.src = product.image;
        img.alt = product.name;
        category.classList.add('categoria');
        price.classList.add('precio');
        btnDetail.classList.add('btn_detalle');
        btnAdd.classList.add('btn_agregar');

        name.textContent = product.name;
        category.textContent = `Category: ${product.category}`;
        description.textContent = product.description;
        price.textContent = `$${product.price.toLocaleString('es-AR')}`;
        btnDetail.textContent = 'View details';
        btnAdd.textContent = 'Add';

        item.append(img, name, category, description, price, btnDetail, btnAdd);
        productList.append(item);

        btnAdd.addEventListener('click', () => {
            addToCart(product);
        });

        // View detail modal
        btnDetail.addEventListener('click', () => {
            const modal = document.createElement('dialog');
            const detail = document.createElement('div');
            const title = document.createElement('h1');
            const categoryModal = document.createElement('p');
            const imageModal = document.createElement('img');
            const detailText = document.createElement('p');
            const features = document.createElement('ul');
            const priceModal = document.createElement('p');
            const footer = document.createElement('footer');
            const btnAddInModal = document.createElement('button');
            const btnClose = document.createElement('button');

            modal.classList.add('modal');
            detail.classList.add('detalle');
            features.classList.add('caracteristicas');
            priceModal.classList.add('precio_modal_detalle');
            footer.classList.add('footer_modal_detalle');
            btnAddInModal.classList.add('btn_agregar');
            btnClose.classList.add('btn_cerrar');

            title.textContent = product.name;
            categoryModal.textContent = `Category: ${product.category}`;
            imageModal.src = product.image;
            imageModal.alt = product.name;
            detailText.textContent = product.detail;
            priceModal.textContent = `$${product.price.toLocaleString('es-AR')}`;
            btnAddInModal.textContent = 'Add to cart';
            btnClose.textContent = 'Close';

            product.features.forEach(feat => {
                const li = document.createElement('li');
                li.textContent = feat;
                features.append(li);
            });

            footer.append(btnAddInModal, btnClose);
            detail.append(title, imageModal, categoryModal, detailText, features, priceModal, footer);
            modal.append(detail);
            document.body.append(modal);
            modal.showModal();

            btnAddInModal.addEventListener('click', () => {
                addToCart(product);
                modal.close();
            });

            btnClose.addEventListener('click', () => modal.close());
            modal.addEventListener('close', () => modal.remove());
        });
    });
}


// 6) View cart
function viewCart() {
    const modalContent = document.createElement('div');
    const modal = document.createElement('dialog');
    const btnCloseModal = document.createElement('button');
    const imgClose = document.createElement('img');

    modal.classList.add('modal_carrito');
    btnCloseModal.classList.add('btn_cerrar_modal');

    imgClose.src = 'img/cerrar.png';
    imgClose.alt = 'Close';

    btnCloseModal.addEventListener('click', () => modal.close());

    modal.append(modalContent);
    btnCloseModal.append(imgClose);
    modal.append(btnCloseModal);

    const title = document.createElement('h2');
    title.textContent = 'Your cart';

    const list = document.createElement('ul');

    if (cart.length === 0) {
        const empty = document.createElement('p');
        empty.textContent = 'Your cart is empty.';
        modal.append(title, empty);
    } else {

        cart.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('item-carrito');

            const img = document.createElement('img');
            img.src = item.product.image;
            img.alt = item.product.name;
            img.classList.add('img-carrito');

            const text = document.createElement('span');
            text.textContent = `${item.product.name} x ${item.quantity} - $${item.getSubtotal().toLocaleString('es-AR')}`;

            const btnRemove = document.createElement('button');
            btnRemove.textContent = 'Remove';
            btnRemove.classList.add('btn-eliminar');
            btnRemove.addEventListener('click', () => {
                removeProduct(item.product.id);
                modal.close();
                modal.remove();
                viewCart();
            });

            li.append(img, text, btnRemove);
            list.append(li);
        });

        const total = document.createElement('p');
        const grandTotal = cart.reduce((sum, item) => sum + item.getSubtotal(), 0);
        total.textContent = `Total: $${grandTotal.toLocaleString('es-AR')}`;
        total.classList.add('precio-total-carrito');

        // Discount code box
        let discountApplied = false;

        const discountContainer = document.createElement('div');
        discountContainer.classList.add('contenedor_codigo');

        const inputCode = document.createElement('input');
        inputCode.type = 'text';
        inputCode.placeholder = 'Enter your discount code';
        inputCode.classList.add('input_codigo');

        const btnApply = document.createElement('button');
        btnApply.textContent = 'Apply';
        btnApply.classList.add('btn_aplicar_codigo');

        const codeMessage = document.createElement('p');
        codeMessage.classList.add('mensaje_codigo');

        inputCode.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                btnApply.click();
            }
        });

        btnApply.addEventListener('click', () => {
            const code = inputCode.value.trim().toUpperCase();

            if (discountApplied) {
                codeMessage.textContent = 'You have already applied a discount code.';
                return;
            }

            if (code === 'HIKARI10') {
                discountApplied = true;
                localStorage.setItem('descuentoHikari', 'true');
                const discountedTotal = grandTotal * 0.9;
                const savings = grandTotal - discountedTotal;

                const subtotal = document.createElement('p');
                subtotal.classList.add('precio_subtotal');
                subtotal.textContent = `Subtotal: $${grandTotal.toLocaleString('es-AR')}`;

                const discount = document.createElement('p');
                discount.classList.add('precio_descuento');
                discount.textContent = `-$${savings.toLocaleString('es-AR')} (10% discount)`;

                total.textContent = `Total: $${discountedTotal.toLocaleString('es-AR')}`;
                total.before(subtotal, discount);

                codeMessage.classList.remove('mensaje_exito', 'mensaje_error');
                codeMessage.classList.add('mensaje_exito');
                codeMessage.textContent = 'Code applied!';
                inputCode.disabled = true;
                btnApply.disabled = true;
            } else {
                codeMessage.textContent = 'Invalid code.';
                codeMessage.classList.add('mensaje_codigo_error');
            }
        });

        discountContainer.append(inputCode, btnApply, codeMessage);

        const installmentsMessage = document.createElement('p');
        installmentsMessage.classList.add('mensaje-cuotas');

        if (grandTotal >= 200000) {
            installmentsMessage.textContent = 'You can pay in 3 or 6 interest-free installments';
        } else {
            const remaining = 200000 - grandTotal;
            installmentsMessage.textContent = `Pay in 3 interest-free installments. Add $${remaining.toLocaleString('es-AR')} more to unlock 6 installments.`;
        }

        const btnCheckout = document.createElement('button');
        btnCheckout.textContent = 'Checkout';
        btnCheckout.classList.add('btn-accion', 'btn-finalizar');

        const secondaryButtonsContainer = document.createElement('div');
        secondaryButtonsContainer.classList.add('acciones-secundarias');

        const btnContinue = document.createElement('button');
        btnContinue.textContent = 'Continue shopping';
        btnContinue.classList.add('btn-accion', 'btn-secundario');

        const btnClearCart = document.createElement('button');
        btnClearCart.textContent = 'Clear cart';
        btnClearCart.classList.add('btn-accion', 'btn-vaciar');

        btnClearCart.addEventListener('click', () => {
            cart.length = 0;
            updateMiniCart();
            localStorage.removeItem('cartHikari');
            localStorage.removeItem('descuentoHikari');
            modal.close();
            modal.remove();
        });

        secondaryButtonsContainer.append(btnClearCart, btnContinue);

        // Checkout + form
        btnCheckout.addEventListener('click', () => {

            const form = document.createElement('form');
            form.classList.add('form_checkout');

            // SHIPPING DETAILS
            const shippingTitle = document.createElement('h3');
            shippingTitle.textContent = 'Shipping Details';

            const inputFirstName = document.createElement('input');
            inputFirstName.type = 'text';
            inputFirstName.name = 'nombre';
            inputFirstName.placeholder = 'First name';
            inputFirstName.required = true;

            const inputLastName = document.createElement('input');
            inputLastName.type = 'text';
            inputLastName.name = 'apellido';
            inputLastName.placeholder = 'Last name';
            inputLastName.required = true;

            const inputEmail = document.createElement('input');
            inputEmail.type = 'email';
            inputEmail.name = 'email';
            inputEmail.placeholder = 'hikari@gmail.com';
            inputEmail.required = true;

            const inputPhone = document.createElement('input');
            inputPhone.type = 'tel';
            inputPhone.name = 'telefono';
            inputPhone.placeholder = 'Phone number';
            inputPhone.required = true;

            const inputAddress = document.createElement('input');
            inputAddress.placeholder = 'Shipping address';
            inputAddress.name = 'direccion';
            inputAddress.required = true;

            const inputZip = document.createElement('input');
            inputZip.type = 'text';
            inputZip.name = 'codigo postal';
            inputZip.placeholder = 'Zip code';
            inputZip.required = true;

            const inputProvince = document.createElement('input');
            inputProvince.type = 'text';
            inputProvince.name = 'provincia';
            inputProvince.placeholder = 'Province';
            inputProvince.required = true;

            const inputCity = document.createElement('input');
            inputCity.type = 'text';
            inputCity.name = 'ciudad';
            inputCity.placeholder = 'City';
            inputCity.required = true;


            // PAYMENT DETAILS
            const paymentTitle = document.createElement('h3');
            paymentTitle.textContent = 'Payment Details';

            const selectPayment = document.createElement('select');
            selectPayment.name = 'metodoPago';
            selectPayment.required = true;

            const paymentOptions = ['Select payment method', 'Credit Card', 'Debit Card', 'Bank Transfer'];
            paymentOptions.forEach((text, index) => {
                const opt = document.createElement('option');
                opt.value = index === 0 ? "" : text;
                opt.textContent = text;
                selectPayment.append(opt);
            });

            // Container for card details and installments
            const cardContainer = document.createElement('div');

            const inputCardNumber = document.createElement('input');
            inputCardNumber.type = 'text';
            inputCardNumber.name = 'numero tarjeta';
            inputCardNumber.placeholder = 'Card number (16 digits)';

            const inputExpiry = document.createElement('input');
            inputExpiry.type = 'text';
            inputExpiry.name = 'vencimiento';
            inputExpiry.placeholder = 'Expiry date (MM/YY)';

            const inputCVV = document.createElement('input');
            inputCVV.type = 'text';
            inputCVV.name = 'codigo seguridad';
            inputCVV.placeholder = 'CVV (3 digits)';

            // Installments selector
            const selectInstallments = document.createElement('select');
            selectInstallments.name = 'cuotas';

            [1, 3].forEach(c => {
                const opt = document.createElement('option');
                opt.value = c;
                opt.textContent = c === 1
                    ? '1 payment'
                    : `${c} interest-free installments`;
                selectInstallments.append(opt);
            });

            const opt6 = document.createElement('option');
            opt6.value = 6;
            opt6.textContent = '6 interest-free installments';

            if (grandTotal < 200000) {
                opt6.disabled = true;
                opt6.textContent = '6 installments (available from $200,000)';
            }

            selectInstallments.append(opt6);

            // Validations
            inputCardNumber.addEventListener('blur', (e) => {
                const value = e.currentTarget.value.trim();
                if (value.length !== 16 || isNaN(value)) {
                    e.currentTarget.setCustomValidity('Card number must be 16 digits.');
                } else {
                    e.currentTarget.setCustomValidity('');
                }
                e.currentTarget.reportValidity();
            });

            inputExpiry.addEventListener('blur', (e) => {
                const value = e.currentTarget.value.trim();
                if (value.length !== 5 || value[2] !== '/') {
                    e.currentTarget.setCustomValidity('Valid format: MM/YY');
                } else {
                    e.currentTarget.setCustomValidity('');
                }
                e.currentTarget.reportValidity();
            });

            inputCVV.addEventListener('blur', (e) => {
                const value = e.currentTarget.value.trim();
                if (value.length !== 3 || isNaN(value)) {
                    e.currentTarget.setCustomValidity('CVV must be 3 digits.');
                } else {
                    e.currentTarget.setCustomValidity('');
                }
                e.currentTarget.reportValidity();
            });

            selectPayment.addEventListener('change', () => {
                cardContainer.replaceChildren();
                cardContainer.removeAttribute('class');

                const payment = selectPayment.value;

                if (payment === 'Credit Card' || payment === 'Debit Card') {
                    cardContainer.classList.add('contenedor-tarjeta');
                    // Required fields - debit and credit
                    inputCardNumber.required = true;
                    inputExpiry.required = true;
                    inputCVV.required = true;

                    cardContainer.append(inputCardNumber, inputExpiry, inputCVV);

                    // If credit card
                    if (payment === 'Credit Card') {
                        cardContainer.append(selectInstallments);
                    }
                }

                // If bank transfer
                else if (payment === 'Bank Transfer') {
                    inputCardNumber.required = false;
                    inputExpiry.required = false;
                    inputCVV.required = false;

                    const transferDetails = document.createElement('div');
                    transferDetails.classList.add('datosTransferencia');

                    const transferTitle = document.createElement('p');
                    transferTitle.textContent = 'Bank transfer details:';

                    const transferList = document.createElement('ul');

                    const details = [
                        'Bank: Santander',
                        'CBU: 0000003100895477142987',
                        'Alias: HIKARI.LIGHTS',
                        'Account holder: Studio Hikari'
                    ];

                    details.forEach(detail => {
                        const li = document.createElement('li');
                        li.textContent = detail;
                        transferList.append(li);
                    });

                    const notice = document.createElement('p');
                    notice.classList.add('avisoTransferencia');
                    notice.textContent =
                        'Please send the payment receipt within 48 hours to hikari.studio@gmail.com. ' +
                        'After that period, the reservation will be automatically cancelled.';

                    transferDetails.append(transferTitle, transferList, notice);
                    cardContainer.append(transferDetails);
                }

                else {
                    inputCardNumber.required = false;
                    inputExpiry.required = false;
                    inputCVV.required = false;
                }
            });

            // Action buttons
            const buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('botones_form');

            const btnPay = document.createElement('button');
            btnPay.textContent = 'Confirm Purchase';
            btnPay.type = 'submit';
            btnPay.classList.add('btn-accion', 'btn-confirmar');

            const btnBack = document.createElement('button');
            btnBack.textContent = 'Back to Cart';
            btnBack.type = 'button';
            btnBack.classList.add('btn-accion', 'btn-volver');

            // Back to cart
            btnBack.addEventListener('click', () => {
                modal.close();
                viewCart();
            });

            // Build the form
            form.append(
                shippingTitle, inputFirstName, inputLastName, inputEmail, inputPhone, inputAddress, inputZip,
                inputProvince, inputCity,paymentTitle, selectPayment, cardContainer, buttonsContainer);
            buttonsContainer.append(btnBack, btnPay);

            modalContent.replaceWith(form);

            // Submit
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const formData = new FormData(form);

                const firstName = formData.get('nombre');
                const email = formData.get('email');

                // Clear cart and close
                cart.length = 0;
                updateMiniCart();
                localStorage.removeItem('cartHikari');

                const feedback = document.createElement('div');

                const thankYouTitle = document.createElement('h3');
                thankYouTitle.textContent = `Thank you ${firstName} for trusting Hikari to light up your space!`;

                const message = document.createElement('p');
                message.textContent = `We'll send a confirmation email to ${email} with all the details about your order.`;

                feedback.append(thankYouTitle, message);

                form.replaceWith(feedback);

                setTimeout(() => {
                    modal.close();
                }, 15000);
            });
        });

        btnContinue.addEventListener('click', () => {
            modal.close();
        });

        // Discount in cart
        if (localStorage.getItem('descuentoHikari')) {
            discountApplied = true;
            const discountedTotal = grandTotal * 0.9;
            const savings = grandTotal - discountedTotal;

            const subtotal = document.createElement('p');
            subtotal.classList.add('precio_subtotal');
            subtotal.textContent = `Subtotal: $${grandTotal.toLocaleString('es-AR')}`;

            const discount = document.createElement('p');
            discount.classList.add('precio_descuento');
            discount.textContent = `-$${savings.toLocaleString('es-AR')} (10% discount)`;

            total.textContent = `Total: $${discountedTotal.toLocaleString('es-AR')}`;
            modalContent.append(title, list, subtotal, discount, total, discountContainer, installmentsMessage, secondaryButtonsContainer, btnCheckout);
        } else {
            modalContent.append(title, list, total, discountContainer, installmentsMessage, secondaryButtonsContainer, btnCheckout);
        }
    }

    document.body.append(modal);
    modal.showModal();

    modal.addEventListener('close', () => modal.remove());
}


// Category filter
const filterContainer = document.createElement('div');
filterContainer.id = 'filtro';

const selectCategories = document.createElement('select');

const optionAll = document.createElement('option');
optionAll.value = '';
optionAll.textContent = 'View all';
selectCategories.append(optionAll);

const uniqueCategories = [...new Set(products.map(p => p.category))];
uniqueCategories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    selectCategories.append(option);
});

const btnFilter = document.createElement('button');
btnFilter.textContent = 'Filter';

btnFilter.addEventListener('click', () => {
    const selectedCategory = selectCategories.value;
    displayProducts(selectedCategory);
    floatingBanner(selectedCategory);
});

filterContainer.append(selectCategories, btnFilter);
sectionTitle.insertAdjacentElement('afterend', filterContainer);

// Top section with clickable category banners
document.querySelectorAll('.banner_categoria')
    .forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.cat;
            displayProducts(category);
            floatingBanner(category);
            document.querySelector('#seccion_productos')
                .scrollIntoView({ behavior: 'smooth' });
        });
    });

loadCartFromStorage();
displayProducts();


// Hamburger menu
const btnHamburger = document.querySelector('#btn_hamburguesa');
const menuUl = document.querySelector('#menu ul');
btnHamburger.addEventListener('click', () => {
    menuUl.classList.toggle('menu-abierto');
});
