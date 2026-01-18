fetch('../03_JSON/illust.json')
    .then(res => res.json())
    .then(data => {
        const gallery = document.getElementById('thumbnail');

        const artsReversed = data.arts.slice().reverse();

        artsReversed.forEach(art => {

            const box = document.createElement('div');
            box.className = 'img-box';

            const img = document.createElement('img');

            const src = Array.isArray(art.image) ?
                art.image[0] :
                art.image;

            img.src = src;
            img.alt = `art-${art.id}`;

            img.addEventListener('click', () => {
                location.href = `04-illust-kobetsu page.html?id=${art.id}`;
            });

            img.addEventListener('dragstart', e => e.preventDefault());
            img.addEventListener('contextmenu', e => e.preventDefault());

            box.appendChild(img);
            gallery.appendChild(box);
        });
    })
    .catch(err => {
        console.error('JSON読み込みエラー:', err);
    });
