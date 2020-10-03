class Speaker {

    constructor(){

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this._audioCtx = new AudioContext();

        //Create a gain, which will allow us to control the volume
        this._gain  = this._audioCtx.createGain();
        this._finish = this._audioCtx.destination;

        this._gain.connect(this._finish);
    }

    play(frequency){

        if(this._audioCtx && !this._oscillator){

            this._oscillator = this._audioCtx.createOscillator();

            //Set the frequency
            this._oscillator.frequency.setValueAtTime(frequency || 440, this._audioCtx.currentTime);

            //Square wave
            this._oscillator.type="square";

            this._oscillator.connect(this._gain);
            this._oscillator.start();

        }
    }

    stop(){

        if(this._oscillator){

            this._oscillator.stop();
            this._oscillator.disconnect();
            this._oscillator = null;
        }
    }
}
export default Speaker;