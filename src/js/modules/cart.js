const minusBtn = document.querySelector('.minus-btn');

if (minusBtn) {
    const minusBtns = document.querySelectorAll('.minus-btn');
    const plusBtns = document.querySelectorAll('.plus-btn');

    const prettyString = (value) => {
        const value1 = +value % 10;
        if (value > 10 && value < 20) return `${value} товаров`;
        if (value === '') return '';
        switch (value1) {
            case 1:
                return `${value} товар`;
            case 2:
            case 3:
            case 4:
                return `${value} товара`;
            default:
                return `${value} товаров`;
        }
    }

    const updateFormData = () => {
        const cartCards = document.querySelectorAll('.cart-card')
        const formInputList = document.querySelector('.cart-form__products-list');
        formInputList.innerHTML = '';

        let i = 0;
        let html = '';

        cartCards.forEach((card) => {
            i++;
            const name = card.querySelector('.cart-card__title').textContent.trim();
            const number = card.querySelector('.cart-card__input').value.trim();
            const resultNumber = prettyString(number);

            html += `
    <li class="cart-form__products-item">
                <input type="text" class="cart-form__product-number" name="product-${i}-number" readonly value="${resultNumber}">
                <input type="text" class="cart-form__product-name" name="product-${i}-name" readonly value="${name}">
              </li>
    `;
            formInputList.innerHTML = html;
        });
    }

    updateFormData();


    const inputs = document.querySelectorAll('.cart-card__input');
    minusBtns.forEach((minusBtn) => {
        minusBtn.addEventListener('click', () => {
            const input = minusBtn.closest('.cart-card__input-block').querySelector('input');
            if (input.value == 1) {
                const confirmDeletedModal = document.querySelector('.modal-confirm-deleted');
                showModal(confirmDeletedModal)
            }
            if (input.value > 1) {
                input.value = +input.value - 1;
                updateFormData();
            }
        })
    })

    plusBtns.forEach((plusBtn) => {
        const input = plusBtn.closest('.cart-card__input-block').querySelector('input');
        plusBtn.addEventListener('click', () => {
            input.value = +input.value + 1;
            updateFormData();
        })
    })

    inputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D+/, '');
            updateFormData();
        })
    })

    const selector = document.getElementById("tel");
    const im = new Inputmask("+7 (999) 999-99-99");
    im.mask(selector);
}


