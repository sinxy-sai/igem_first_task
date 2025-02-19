document.addEventListener('scroll', function () {
    const item = document.querySelector('.news .left-content ul');
    if (isElementInViewport(item)) {
        item.classList.add('news-slide-in');
        // 只执行一次，所以移除事件监听器
        document.removeEventListener('scroll', arguments.callee);
    }
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0
    );
}