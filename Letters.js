

var letters =/[a-zA-Z]/;

function Letter(char){
    this.char= char.toUpperCase();
    this.guess=false;
    this.displayLetter =function(){
        if(this.guess === false && (this.char.search(letters) !== -1)){
            return "_";
        }else{
            return this.char;
        };
    };
    this.checkLetter =function(character){
        if(character === this.char){
            this.guess=true;
        };
    };
};

module.exports = Letter;