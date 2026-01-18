// DOM要素取得
const illustCheckbox = document.getElementById('illust');
const rakugakiCheckbox = document.getElementById('RAKUGAKI');
const listEl = document.getElementById('thumbnail');
const radioBox = document.getElementById('radioBox'); // ラジオボタンエリア

// JSON読み込み関数
async function loadJson(path) {
    const res = await fetch(path);
    const json = await res.json();
    return json.arts || [];
}

// ラジオボタン生成
async function generateRadios() {
    const illustData = await loadJson('../03_JSON/illust.json');
    const rakugakiData = await loadJson('../03_JSON/RAKUGAKI.json');

    const excludeTags = ['illust', 'RAKUGAKI'];
    const tagsSet = new Set();

    illustData.forEach(a => a.tag.forEach(t => {
        if (!excludeTags.includes(t)) tagsSet.add(t.trim());
    }));
    rakugakiData.forEach(a => a.tag.forEach(t => {
        if (!excludeTags.includes(t)) tagsSet.add(t.trim());
    }));

    radioBox.innerHTML = ''; // 生成前にクリア

    tagsSet.forEach(tag => {
        const label = document.createElement('label');

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'tag';
        radio.value = tag;

        // 選択時にギャラリー更新
        radio.addEventListener('change', updateList);

        label.appendChild(radio);
        label.appendChild(document.createTextNode(tag));
        radioBox.appendChild(label);
    });
}

// URLパラメータでチェック状態を初期化
function initFromUrl() {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const tag = params.get('tag');

    if (category === 'illust') illustCheckbox.checked = true;
    if (category === 'RAKUGAKI') rakugakiCheckbox.checked = true;

    if (tag) {
        const radio = radioBox.querySelector(`input[value="${tag}"]`);
        if (radio) radio.checked = true;
    }
}

// ギャラリー更新
async function updateList() {
    const checkedRadio = radioBox.querySelector('input[name="tag"]:checked');
    const selectedTag = checkedRadio ? checkedRadio.value.trim() : null;

    const selectedCategories = [];
    if (illustCheckbox.checked) selectedCategories.push('illust');
    if (rakugakiCheckbox.checked) selectedCategories.push('RAKUGAKI');

    listEl.innerHTML = '';

    if (selectedCategories.length === 0) {
        listEl.textContent = "カテゴリを選んでください";
        return;
    }

    // 選択カテゴリのJSONをまとめて取得
    let items = [];
    if (illustCheckbox.checked) items = items.concat(await loadJson('../03_JSON/illust.json'));
    if (rakugakiCheckbox.checked) items = items.concat(await loadJson('../03_JSON/rakugaki.json'));

    // タグで絞り込み
    if (selectedTag) {
        items = items.filter(item => item.tag.some(tag => tag.trim() === selectedTag));
    }

    if (items.length === 0) {
        listEl.textContent = "該当する項目はありません";
        return;
    }

    // ギャラリー描画
    items.forEach(art => {
        const box = document.createElement('div');
        box.className = 'img-box';

        const img = document.createElement('img');
        img.src = Array.isArray(art.image) ? art.image[0] : art.image;
        img.alt = art.title || '';
        img.style.width = '100%';
        img.style.height = '100%';

        // 個別ページ遷移
        img.addEventListener('click', () => {
            if (art.tag.includes('illust')) {
                window.location.href = `04-illust-kobetsu page.html?id=${art.id}`;
            } else if (art.tag.includes('RAKUGAKI')) {
                window.location.href = `04-RAKUGAKI-kobetsu page.html?id=${art.id}`;
            }
        });

        // 保存禁止
        img.addEventListener('dragstart', e => e.preventDefault());
        img.addEventListener('contextmenu', e => e.preventDefault());

        box.appendChild(img);
        listEl.appendChild(box);
    });
}

// 初期化
window.addEventListener('DOMContentLoaded', async () => {
    await generateRadios();
    initFromUrl();

    // チェックボックス変更で更新
    illustCheckbox.addEventListener('change', updateList);
    rakugakiCheckbox.addEventListener('change', updateList);

    // 初期表示
    updateList();
});

// 戻るボタンでもギャラリー更新
window.addEventListener('pageshow', () => {
    updateList();
});
