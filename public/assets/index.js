$(function () {
    const videos = $('.gallery-item');
    videos.hover(
        function () {
            // over
            $(this).children('video')[0].muted = true;
            $(this).children('video')[0].play();
        },
        function () {
            // out
            $(this).children('video')[0].pause();
            $(this).children('video')[0].currentTime = 0;
        }
    );

    videos.click(function () {
        let url = $(this).children('video').attr('src');
        // let name = $(this).children('p').text;
        window.location.href = `/video?url=${url}`;
    });
});
