document.addEventListener('DOMContentLoaded', function () {
    var sections = document.querySelectorAll('.content'); // 假设右侧内容部分有这个类名
    var navSections = document.querySelectorAll('.subnav');
    var progressBar = document.querySelector('.progress-bar');

    // 计算每个section的顶部和底部位置
    var sectionPositions = Array.from(sections).map(section => ({
        top: section.offsetTop,
        bottom: section.offsetTop + section.offsetHeight
    }));

    function updateProgressBar(scrollTop) {
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollableHeight = documentHeight - windowHeight;

        // 如果文档高度小于等于窗口高度，直接返回，避免除以零
        if (scrollableHeight <= 0) return;

        // 计算滚动比例并转换成百分比
        let progress = (scrollTop / scrollableHeight) * 100;

        // 强制设置为100%，当用户滚动到底部时
        if (scrollTop + windowHeight >= documentHeight) {
            progress = 100;
        }

        // 使用 Math.min 和 Math.max 来确保 progress 在 0 到 100 之间
        progressBar.style.height = `${Math.min(100, Math.max(0, progress))}%`;
    }

    function checkActiveSection(scrollPos) {
        // 移除所有导航项的 active 类
        navSections.forEach(nav => nav.classList.remove('active'));

        // 找到当前最接近的 section 并激活对应的导航项
        for (let i = 0; i < sections.length; i++) {
            if (scrollPos >= sectionPositions[i].top && scrollPos < sectionPositions[i].bottom) {
                let correspondingNav = Array.from(navSections).find(nav =>
                    nav.getAttribute('data-section') === sections[i].id
                );
                if (correspondingNav) {
                    correspondingNav.classList.add('active');
                }
                break;
            }
        }
    }

    // 使用节流函数限制滚动事件频率
    function throttle(fn, wait) {
        let time = Date.now();
        return function (...args) {
            if ((time + wait - Date.now()) < 0) {
                fn(...args);
                time = Date.now();
            }
        };
    }


    window.addEventListener('scroll', throttle(function () {
        var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        updateProgressBar(scrollPos);
        checkActiveSection(scrollPos);
    }, 50)); // 每250毫秒最多触发一次

    // 页面加载时立即检查一次
    var initialScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    updateProgressBar(initialScrollPos);
    checkActiveSection(initialScrollPos);

    // 点击导航标题跳转到相应的内容区
    document.querySelectorAll('.subnav-title-1, .subnav-title-2').forEach(title => {
        title.addEventListener('click', function (event) {
            event.preventDefault();

            // 直接从 data-target 获取目标元素的 ID
            const data_targetId = this.getAttribute('data-target');
            let targetElementId;
            if (data_targetId.includes('-')) {
                targetElementId = `${data_targetId}`; // 对应 .content-title-2
            } else {
                targetElementId = `#section${data_targetId[8]}`; // 对应 .content-title-1
            }
            const targetElement = document.querySelector(targetElementId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });

                // 更新当前激活的导航项
                navSections.forEach(nav => nav.classList.remove('active'));
                this.closest('.subnav').classList.add('active');

                // 更新进度条的位置
                setTimeout(() => {
                    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
                    updateProgressBar(scrollPos);
                    checkActiveSection(scrollPos);
                }, 300);
            } else {
                console.error("Target element not found for target ID:", targetElementId);
            }
        });
    });


    window.addEventListener('resize', () => {
        // 更新 sectionPositions 和其他依赖于窗口尺寸的变量
        sectionPositions = Array.from(sections).map(section => ({
            top: section.offsetTop,
            bottom: section.offsetTop + section.offsetHeight
        }));

        // 重新调用 updateProgressBar 函数来更新进度条
        var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        updateProgressBar(scrollPos);
    });

});

document