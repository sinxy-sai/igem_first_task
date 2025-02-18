const img = document.querySelector('.banner img');
let i = 0
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const h1 = document.querySelector('.banner h1');
const p = document.querySelector('.banner p');
const images = [
    {
        url: './images/banner1.jpg',
        title: '横琴花海',
        text: '珠海横琴花海长廊：来一场浪漫的花海之旅吧!'
    }
    ,
    {
        url: './images/banner2.jpg',
        title: '理工楼',
        text: '建于桑海之上，坐看桑田变化!'
    }
    ,
    {
        url: './images/banner3.jpg',
        title: '行政楼',
        text: '巍峨壮丽，古韵今风相融，恰似岁月沉淀的智慧殿堂。'
    }
    ,
    {
        url: './images/banner4.jpg',
        title: '日月贝',
        text: '如璀璨明珠镶嵌于南海之滨，其造型独特，融合日月之灵韵，于光影变幻间诉说着海洋的浪漫与城市的梦想'
    }
]
next.addEventListener('click', function () {
    i++;
    if (i > images.length - 1) {
        i = 0;
    }
    change();
})
prev.addEventListener('click', function () {
    i--;
    if (i < 0) {
        i = images.length - 1;
    }
    change();
})
const indicators = document.querySelectorAll('.banner ul li');
function change() {
    img.style.opacity = 0; // 先将图片透明度设置为 0
    setTimeout(() => {
        img.src = images[i].url; // 更新图片源
        h1.innerHTML = images[i].title; // 更新文本内容
        p.innerHTML = images[i].text; // 更新文本内容
        setTimeout(() => {
            img.style.opacity = 1; // 恢复透明度为 1
        }, 100); // 确保透明度变化生效
    }, 400);
    indicators.forEach((indicator, index) => {
        if (index === i) {
            indicator.classList.add('active'); // 当前指示器设置为 active
        } else {
            indicator.classList.remove('active'); // 其他指示器移除 active
        }
    });
}
change();
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function () {
        i = index;
        change();
    });
});

//let num = setInterval(change, 4000); // 直接调用 change 函数
const banner = document.querySelector('.banner')
let num = setInterval(function () {
    i++;
    if (i > images.length - 1) {
        i = 0;
    }
    change();
}, 2000)
banner.addEventListener('mouseenter', function () {
    clearInterval(num)
})
banner.addEventListener('mouseleave', function () {
    clearInterval(num)
    num = setInterval(function () {
        i++;
        if (i > images.length - 1) {
            i = 0;
        }
        change();
    }, 2000)
})

