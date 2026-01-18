fetch('../03_JSON/RAKUGAKI.json')
    .then(res => res.json())
    .then(data => {
        const gallery = document.getElementById('thumbnail');

        // 逆順にする
        const artsReversed = data.arts.slice().reverse();

        artsReversed.forEach(art => {
            // 画像を包むボックスを作成
            const box = document.createElement('div');
            box.className = 'img-box';

            const img = document.createElement('img');
            img.src = Array.isArray(art.image) ?
                art.image[0] // 複数なら1枚目
                :
                art.image; // 1枚ならそのまま

            img.alt = `art-${art.id}`;

            // クリックで個別ページに飛ぶ (?id=〇 自動付与)
            img.addEventListener('click', () => {
                window.location.href = `04-rakugaki-kobetsu page.html?id=${art.id}`;
            });

            // ドラッグ禁止
            img.addEventListener('dragstart', e => e.preventDefault());

            // 右クリック禁止
            img.addEventListener('contextmenu', e => e.preventDefault());

            // ボックスに img を追加
            box.appendChild(img);
            // ギャラリーに追加
            gallery.appendChild(box);
        });
    })
    .catch(err => console.error('JSON読み込みエラー:', err));
