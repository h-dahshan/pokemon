var queryString = decodeURIComponent(window.location.search);
var character_index = queryString.substring(1);
function SelectLevel(e) {
    var queryString = "?" + character_index + "&" + e.id
    window.location.href = "game.html" + queryString;
}