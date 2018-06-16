class HundredPrisoners{
    constructor(settings){
        this.population = settings.population
        this.record = []
        this.hydrate(this.population)
    }
    /**
     * Build the array of drawers and assign numbers to prisoners
     * @param {*} pop population
     */
    hydrate(pop = this.population){
        var temp = []
        for(var i = 0; i < pop; i++) {
            temp.push(i);
        }
        this.drawers = this.shuffle(temp.slice())
        this.prisoners = this.shuffle(temp.slice())
        console.log(this.drawers)
        console.log(this.prisoners)
    }

    iterate(){
        var success = false
        var should_continue = true
        while (should_continue){
            for(var prisoner in this.prisoners){
                var current_prisoner = this.prisoners[prisoner]
                var latest_drawer = current_prisoner
                var found = 0
                var opened_drawers = 0
            
                while (found != current_prisoner && found != -1){
                    found = this.open_drawer(latest_drawer, this.drawers)[1]
                    latest_drawer = found
                    var opened_drawers = opened_drawers + 1
                    if (found == current_prisoner){
                        success = true
                    }
                    if (opened_drawers > this.population / 2){
                        found = -1
                    }
                }

                if (!success){
                    should_continue = false
                    break;
                }
            }
            should_continue = false
        }
        if (success){
            console.log("Successful Run.")
            this.record.push(1)
        }

        else{
            console.log("Failed Run.")
            this.record.push(0)
        }
        this.hydrate();
    }

    /**
     * A prisoner opens a drawer
     * @param {*} id the number of the drawer to open
     * @param {*} drawers ...from this array of drawers
     * @param {*} recurrent whether or not to pass back a 'paginated' result so to speak
     */
    open_drawer(id, drawers, recurrent = true){
        if(recurrent) return [id, drawers[id-1]]
        else return drawers[id-1]
    }

    evaluate(){ 
        console.log(this.record)
        var counts = {}
        this.record.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
        console.log(counts)
    }

    /**
     * Shuffles array in place.
     * @param {Array} a items An array containing the items.
     */
    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
}

_settings = {
    "population": 100,

}

var hundp1 = new HundredPrisoners(_settings);
hundp1.iterate();

for(var x = 0; x < 100; x++){
    hundp1.iterate()
}
hundp1.evaluate()