export default class Sound {

    playSound(src) {

        var audio = new Audio(src);
        audio.play();
    }

}