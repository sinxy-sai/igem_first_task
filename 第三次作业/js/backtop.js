document.querySelectorAll('.backtop').forEach(function (el) {
    el.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const article = document.querySelector('.article');
    const backtop = document.querySelector('.backtop');

    // 页面加载时初始化按钮状态
    initializeBacktopVisibility(article, backtop);

    // 监听滚动事件
    document.addEventListener('scroll', function () {
        updateBacktopVisibility(article, backtop);
    });
});

function initializeBacktopVisibility(article, backtop) {
    const articleTop = article.offsetTop;
    const viewportBottom = window.innerHeight;

    if (viewportBottom >= articleTop) {
        // 如果页面加载时，article的顶部在视口底部或以上，直接显示按钮
        backtop.classList.add('backtop-slide-in');
    } else {
        // 否则，按钮保持隐藏
        backtop.style.opacity = "0";
        backtop.style.height = "0";
    }
}

function updateBacktopVisibility(article, backtop) {
    const articleTop = article.offsetTop;
    const scrollTop = window.scrollY;
    const viewportBottom = scrollTop + window.innerHeight;

    if (viewportBottom >= articleTop) {
        // 视口底部超过article顶部，显示按钮
        if (!backtop.classList.contains('backtop-slide-in')) {
            backtop.classList.add('backtop-slide-in');
            backtop.classList.remove('backtop-slide-out');
        }
    } else {
        // 视口底部未超过article顶部，隐藏按钮
        if (backtop.classList.contains('backtop-slide-in')) {
            backtop.classList.add('backtop-slide-out');
            backtop.classList.remove('backtop-slide-in');
        }
    }
}