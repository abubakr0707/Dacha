const btnFavorites = document.querySelectorAll('[data-name="add-to-favorites"]');
const notFavIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
</svg>
`;
const favIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
</svg>
`;

const dachas = [];

btnFavorites.forEach((element) => {
    element.addEventListener('click', handleFavorites);
});

function handleFavorites(evt) {
    const btn = evt.target;
    const dachaCard = btn.closest('.card');
    btn.classList.toggle('active');
    if (btn.classList.contains('active')) {
        btn.innerHTML = favIcon;
        dachaCard.dataset.favorite = true;
        dachaCard.dataset.id = crypto.randomUUID();
    } else {
        btn.innerHTML = notFavIcon;
        dachaCard.dataset.favorite = false;
    }

    // Получаем данные карточки внутри которого находится кнопка избранных
    const dachaName = dachaCard.querySelector('.card-content-title').textContent.trim();
    const dachaPriceText = dachaCard.querySelector('.card-content-title.price').textContent;
    let dachaPrice;
    // Регулярное выражение для поиска числа
    const priceRegex = /от (\d{1,3}(?: \d{3})*(?:\.\d{2})?) ₽/;

    // Используем метод match для поиска совпадений
    const result = dachaPriceText.match(priceRegex);

    // Если найдено совпадение, извлекаем число из результатов
    if (result && result[1]) {
        dachaPrice = parseFloat(result[1].replace(/\s/g, '').replace(',', '.'));
    } else {
        console.log('Число не найдено');
    }

    if (dachaCard.dataset.favorite == 'true') {
        // Формируем данные дачи для дальнейшего добавления в массив
        const dacha = {
            id: dachaCard.dataset.id,
            name: dachaName,
            options: ['5 спальных мест', 'Настольный теннис', 'Баня', 'Бассейн'],
            priceFrom: {
                value: dachaPrice,
                durationUnit: 'daily',
            },
        };
        dachas.push(dacha);
    } else {
        const dachaId = dachaCard.dataset.id;
        let deleteDachaIndex;
        for (let index = 0; index < dachas.length; index++) {
            const dacha = dachas[index];
            console.log(dacha);
            if (dacha.id == dachaId) {
                deleteDachaIndex = index;
                break;
            }
        }
        dachas.splice(deleteDachaIndex, 1);
        console.log(dachaId);
    }

    console.log('dachi', dachas);
}
