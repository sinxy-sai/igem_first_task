document.querySelectorAll('.article .sidenav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // document.querySelector(this.getAttribute('href')).scrollIntoView({
        //     behavior: 'smooth'
        // });
        scrollToElement(document.querySelector(this.getAttribute('href')));
    });
});

function scrollToElement(elem) {
    const { top } = elem.getBoundingClientRect();
    const scrollY = top + window.scrollY - 80;
    window.scrollTo({
        top: scrollY,
        behavior: 'smooth'
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const sidenav = document.querySelector('.article .sidenav');
    const article = document.querySelector('.article');
    const footer = document.querySelector('.endfooter');
    const originalWidth = sidenav.offsetWidth + 'px'
    if (!sidenav || !article || !footer) {
        console.warn("SideNav, Article, or Footer element not found.");
        return;
    }

    let isFixed = false; // 标志变量
    let fixedTop = 80; // 固定定位时的顶部偏移量

    document.addEventListener('scroll', () => {
        const articleRect = article.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        const sidenavRect = sidenav.getBoundingClientRect();

        // 当 sidenav 的顶部到达视口顶部 80px 时，固定 sidenav
        if (articleRect.top <= fixedTop && !isFixed) {
            sidenav.style.position = 'fixed';
            sidenav.style.top = `${fixedTop}px`;
            sidenav.style.width = originalWidth; // 保持宽度不变
            sidenav.style.right = '90px';
            isFixed = true;
        }

        // 如果 sidenav 已经固定，但滚动到 footer 时，也需要解除固定
        if (footerRect.top <= window.innerHeight && isFixed && article.clientHeight + articleRect.top - 80 < sidenav.clientHeight) {
            sidenav.style.position = 'relative';
            sidenav.style.top = `${article.clientHeight - sidenav.clientHeight - 100}px`;  /*11125()-100-640*/
            sidenav.style.right = '0px';
            sidenav.style.width = originalWidth;
            isFixed = false;
        }
        if (!isFixed && article.clientHeight + articleRect.top - 80 >= sidenav.clientHeight) {
            sidenav.style.position = 'fixed';
            sidenav.style.top = `${fixedTop}px`;
            sidenav.style.width = originalWidth;
            sidenav.style.right = '90px';
            isFixed = true;
        }

        if (articleRect.top > fixedTop) {
            sidenav.style.position = 'relative';
            sidenav.style.top = '0px';
            sidenav.style.width = originalWidth;
            sidenav.style.right = '0px';
            isFixed = false;
        }
        // console.log(article.clientHeight);
        // console.log(sidenav.clientHeight);
        // console.log(articleRect.top);
    });
});

const sections = document.querySelectorAll('.article section');
const sectionIds = [];
sections.forEach(section => {
    sectionIds.push(section.id);
});
// console.log(sectionIds[0].slice(0, 8));

// console.log(sectionIds);


document.addEventListener('scroll', function () {
    for (let i = 0; i < sectionIds.length; i++) {
        const section = document.getElementById(sectionIds[i]);
        if (i === sectionIds.length - 1) {
            if (section.getBoundingClientRect().top < 90) {
                document.querySelectorAll('.sidesubnav').forEach(anchor => {
                    anchor.classList.remove('show');
                })
                document.querySelector(`a[href="#${sectionIds[i].slice(0, 8)}"]+.sidesubnav`).classList.add('show');
                document.querySelectorAll('.article .sidenav a').forEach(anchor => {
                    anchor.classList.remove('active');
                });
                document.querySelector(`.article .sidenav a[href="#${section.id}"]`).classList.add('active');
            }
        }
        else {
            const nextSection = document.getElementById(sectionIds[i + 1]);
            if (section.getBoundingClientRect().top < 90 && nextSection
                .getBoundingClientRect().top > 90) {
                document.querySelectorAll('.sidesubnav').forEach(anchor => {
                    anchor.classList.remove('show');
                })
                document.querySelector(`a[href="#${sectionIds[i].slice(0, 8)}"]+.sidesubnav`).classList.add('show');
                document.querySelectorAll('.article .sidenav a').forEach(anchor => {
                    anchor.classList.remove('active');
                });
                document.querySelector(`.article .sidenav a[href="#${section.id}"]`).classList.add('active');
            }
        }
    }
})

