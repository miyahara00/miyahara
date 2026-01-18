document.addEventListener('DOMContentLoaded', () => {
    fetch('../03_json/nikki.json')
        .then(res => {
            if (!res.ok) throw new Error('nikki.json 読み込み失敗');
            return res.json();
        })
        .then(posts => {
            posts.reverse(); // 古い日記が下になる

            const titleList = document.getElementById('titlelist');

            posts.forEach(post => {
                const li = document.createElement('li');

                const a = document.createElement('a');
                a.textContent = post.title || 'タイトルなし';
                li.appendChild(a);

                const dateSpan = document.createElement('span');
                dateSpan.textContent = post.date ? ` ${post.date}` : '';
                li.appendChild(dateSpan);

                // クリックで個別ページに飛ぶ (?id=〇 自動付与)
                a.addEventListener('click', () => {
                    window.location.href = `04-nikki-kobetsu page.html?id=${post.id}`;
                });

                titleList.appendChild(li);
            });

        })
        .catch(err => console.error(err));
});
