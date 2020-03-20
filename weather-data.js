//weather constructor
function Weather(cityName, description) {
    
    this.cityName = cityName;
    this.description = description;
    this._temperature = '';
}

//adding a property 'temperature' to the weather prototype.
Object.defineProperty(Weather.prototype, 'temperature', {
    get: function() {
        
        return this._temperature;
    },
    set: function(value) {
        
        this._temperature = value + 'C.';
    }
});