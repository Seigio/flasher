function toggleNavbar(){
    console.log('test');
    var hamburgerMenu = document.getElementById('hamburgerMenu');
    var menuStyle = document.getElementById('menu-options').style;

    if (menuStyle.display == 'block'){
        menuStyle.display = 'none';
    } else {
        menuStyle.display = 'block';
    }
}