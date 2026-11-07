// 從 src.html 產生兩頁：index.html（我家）與 sister/index.html（姐姐家）
// src.html 裡 <!--me-->…<!--/me--> 只給我家，<!--sis-->…<!--/sis--> 只給姐姐家，其餘兩頁共用。
// 用法：node build.js
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'src.html'), 'utf8');

function render(keep, drop) {
  return src
    .replace(new RegExp(`<!--${drop}-->[\\s\\S]*?<!--/${drop}-->\\r?\\n?`, 'g'), '')
    .replace(new RegExp(`<!--/?${keep}-->\\r?\\n?`, 'g'), '');
}

fs.writeFileSync(path.join(__dirname, 'index.html'), render('me', 'sis'));
fs.mkdirSync(path.join(__dirname, 'sister'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'sister', 'index.html'), render('sis', 'me').replace(/src="route\.jpg"/g, 'src="../route.jpg"'));
console.log('built index.html, sister/index.html');
