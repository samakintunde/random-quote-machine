$(document).ready(function() {
    var swatch = [
        '#FFAAAA',
        '#550000',
        '#9974AA',
        '#280339',
        '#FFDEAA',
        '#553400',
        '#827FB2',
        '#0B083B',
        '#9ED78F',
        '#0F4800',
        '#748BA7',
        '#FFAEAC',
        '#4D0200',
        '#FF4900',
        '#040100',
        '#0E54B4',
        '#B6D4FE',
        '#E5004D',
        '#FFAFCA',
        '#CCF8E6',
        '#004E2F',
        '#FFCCB6',
        '#531E07',
        '#D7A9B4',
        '#42111D'
    ];

    $('#get-quote').on('click', function(e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
            success: function(data) {
                var post = data.shift();
                $('#author').text("-" + post.title);
                $('#content').html('"' + post.content + '"');
            },
            cache: false,
        });
    });    
    
    $("#get-tweet").on("click", function(e) {
        e.preventDefault();
        window.open("https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + data.content + "-" + data.title);
    });
});
