class Renderer{

    constructor(scale){

        //The original implementation of the Chip-8 language used a 64x32-pixel monochrome display
        this._cols = 64;
        this._rows = 32;
        this._scale = scale;

        this._canvas = document.querySelector('canvas');
        this._ctx = this._canvas.getContext('2d');

        this._canvas._width = this._cols * this._scale;
        this._canvas._height = this._rows * this._scale;
        this._display = new Array(this._cols *  this._rows); //Display array 2048 pixels
    }

    clear(){

        //Restarting matrix
        this._display = new Array(this._cols *  this._rows);
    }

    setPixel(x, y){

        //Containing pixel overflow
        if(x > this._cols){
            x -= this._cols;
        }else if(x < 0){
            x += this._cols;
        }

        if(y > this._rows){
            y -= this._rows;
        }else if(y < 0){
            y += this._rows;
        }

        let pixelLoc  = x + (y * this._cols);
        this._display[pixelLoc] ^= 1;

        return !this._display[pixelLoc]; //if true pixel off else nothing off
    }

    render(){ //Render the pixels. 60 times per second

        //Clear the display every render
        this._ctx.clearRect(0, 0, this._canvas._width, this._canvas._height);

        //Cycle through the matrix
        for(let i=0; i<this._cols * this._rows; i++){

            //Get the xy position of the pixel 'i'
            let x = (i % this._cols) * this._scale;
            let y = Math.floor(i/this._cols) * this._scale;

            if(this._display[i]){ //If the value at this._display[i] == 1, then draw a pixel

                this._ctx.fillStyle = '#000'; //Set the pixel color to black
                this._ctx.fillRect(x, y, this._scale, this._scale); //Place a pixel at position (x, y) with defined width and height
            }
        }
    }

    testRender() {
        this.setPixel(0, 0);
        this.setPixel(5, 2);
    }
}
export default Renderer;