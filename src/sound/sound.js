export default class Sound {

    playSound(src, menu) {

        if(menu.onSound){
            var audio = new Audio(src);
            audio.play();
        }
    }
}