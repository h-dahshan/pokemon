// Getting ID of Character Selected From Heros Page
// Event Listener Added on Heros' Tags in HTML
function SelectHero(e) {
    var queryString = "?" + e.id
    window.location.href = "level.html" + queryString;
}