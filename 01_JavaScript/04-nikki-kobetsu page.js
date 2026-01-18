fetch('../03_JSON/nikki.json')
    .then(res => res.json())
    .then(files => {
        const list = document.getElementById('daylist');
        const titleElement = document.getElementById('diary-title');
        const contentElement = document.getElementById('diary-text');

        files.forEach(fileObj => {
            // titleElement と contentElement に反映
            if (titleElement && fileObj.title) {
                titleElement.textContent = fileObj.title;
            }

            if (contentElement && fileObj.text) { // ← ここを fileObj.text に変更
                contentElement.innerHTML = fileObj.text.replace(/\n/g, '<br>'); // ← ここを追加
            }



            // 日付リストに追加
            const li = document.createElement('li');
            li.textContent = `${fileObj.date || '日付不明'}：${fileObj.title || ''}`;
            list.appendChild(li);
        });
    })
    .catch(err => console.error('JSON読み込みエラー:', err));
