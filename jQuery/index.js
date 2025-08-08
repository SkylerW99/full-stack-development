$('h1').css("color","red");
$('input').on("keypress",(event) => {
    $('h1').text(event.key);
});