////(function (w) {
////    w.addEventListener('load', function () {
////        const btn_left = document.getElementById('btn-left'),
////            btn_right = document.getElementById('btn-right'),
////            content = document.getElementById('con');
////        const content_scroll_width = content.scrollWidth;
////        let content_scoll_left = content.scrollLeft;
////        btn_right.addEventListener('click', () => {
////            content_scoll_left += 132;
////            if (content_scoll_left >= 2244) { content_scoll_left = 2244 }
////            if (content_scoll_left >= content_scroll_width) { content_scoll_left = content_scroll_width; }
////            content.scrollLeft = content_scoll_left;
////        });
////        btn_left.addEventListener('click', () => {
////            content_scoll_left -= 132;
////            if (content_scoll_left <= 0) {
////                content_scoll_left = 0;
////            }
////            content.scrollLeft = content_scoll_left;
////        });
////    });
////})(window);

(function (w) {
    w.addEventListener('load', function () {
        const btn_left = document.getElementById('btn-left'),
            btn_right = document.getElementById('btn-right'),
            content = document.getElementById('b');
        const content_scroll_width = content.scrollWidth;
        let content_scoll_left = content.scrollLeft;
        btn_right.addEventListener('click', () => {
            content_scoll_left -= 148;
            if (content_scoll_left >= 2244) { content_scoll_left = 2244 }
            if (content_scoll_left >= content_scroll_width) { content_scoll_left = content_scroll_width; }
            content.scrollLeft = content_scoll_left;
            // document.getElementById("b").scrollLeft -= 100;
        });
        btn_left.addEventListener('click', () => {
            content_scoll_left += 148;
            if (content_scoll_left <= 0) {
                content_scoll_left = 0;
            }
            content.scrollLeft = content_scoll_left;
            // document.getElementById("b").scrollLeft += 100;

        });
    });
})(window);

