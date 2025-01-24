document.addEventListener('DOMContentLoaded', function () {
    var sections = document.querySelectorAll('.content'); // 假设右侧内容部分有这个类名
    var navSections = document.querySelectorAll('.subnav');
    var progressBar = document.querySelector('.progress-bar');

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

    // 修正后的 checkActiveSection 函数
    function checkActiveSection() {
        // 移除所有导航项的 active 类
        navSections.forEach(nav => nav.classList.remove('active'));

        // 遍历所有 section，检查当前视窗内的激活区域
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const sectionRect = section.getBoundingClientRect();
            const navSection = Array.from(navSections).find(nav => nav.getAttribute('data-section') === section.id);

            // 判断 section 是否在视窗内
            const isInView =
                sectionRect.top <= 15 && // 距离顶部小于 1px
                sectionRect.bottom > 0; // 距离底部大于 0px

            if (isInView && navSection) {
                navSection.classList.add('active');
                return; // 找到激活区域后退出循环
            }
        }
    }

    window.addEventListener('scroll', function () {
        var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        updateProgressBar(scrollPos);
        checkActiveSection();
    });

    // 页面加载时立即检查一次
    var initialScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    updateProgressBar(initialScrollPos);
    checkActiveSection();

    // 点击导航标题时添加高亮效果
    const navTitles = document.querySelectorAll('.subnav-title-1, .subnav-title-2');
    navTitles.forEach(title => {
        title.addEventListener('click', function (event) {
            event.preventDefault(); // 阻止默认行为

            // 直接从 data-target 获取目标元素的选择器
            const targetSelector = this.getAttribute('data-target');
            const targetElement = document.querySelector(targetSelector);

            if (targetElement) {
                // 平滑滚动到目标内容区
                targetElement.scrollIntoView({ behavior: 'smooth' });

                // 确保父级 .subnav 的 active 类被正确设置
                const parentSubnav = this.closest('.subnav');
                parentSubnav.classList.add('active');

                // 移除其他.subnav 的 active 类
                navSections.forEach(nav => {
                    if (nav !== parentSubnav) {
                        nav.classList.remove('active');
                    }
                });

                // 添加 active 类以触发动画
                this.classList.add('active');

                // 设置标志位，确保动画不会被重复触发
                let isAnimating = true;

                const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
                updateProgressBar(scrollPos);
                checkActiveSection();

                // 动画完成后移除 active 类
                setTimeout(() => {
                    if (isAnimating) {
                        this.classList.remove('active');
                        isAnimating = false; // 重置标志位
                    }
                }, 1200); // 动画持续时间（与 CSS 动画时间一致）

            } else {
                console.error("Target element not found for selector:", targetSelector);
            }
        });
    });

    // 监听窗口大小调整事件
    window.addEventListener('resize', () => {
        // 更新 sectionPositions 和其他依赖于窗口尺寸的变量
        sectionPositions = Array.from(sections).map(section => ({
            top: section.offsetTop,
            bottom: section.offsetTop + section.offsetHeight
        }));

        // 重新调用 updateProgressBar 函数来更新进度条
        var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        updateProgressBar(scrollPos);
        checkActiveSection();
    });
});