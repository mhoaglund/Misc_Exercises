//TODO: allow users to pass in a condition for stopping iteration and an optional lambda for ticking it

class HundredPrisoners{
    constructor(settings){
        this.population = settings.population
        this.record = []
        this.on_success = settings.success
        this.on_failure = settings.failure
        this.on_open = settings.on_open
        this.on_result = settings.on_result
        this.hydrate(this.population)
        if(settings.mode === "static"){ //Static iteration mode means run x number of iterations and finish.
            for(var x = 0; x < 100; x++){
                this.iterate()
            }
            this.evaluate() //TODO roll these together
            this.on_result
        }
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

    /**
     * Run the problem from beginning to end.
     */
    iterate(){ //TODO: offer configurable solution method, e.g. random chance vs optimal vs whatever else
        var success = false
        var should_continue = true
        var current_prisoner = 0
        while (should_continue){
            for(var prisoner in this.prisoners){
                current_prisoner = this.prisoners[prisoner]
                var latest_drawer = current_prisoner
                var found = 0
                var opened_drawers = 0
                var current_history = [latest_drawer]
            
                while (found != current_prisoner && found != -1){
                    found = this.open_drawer(latest_drawer, this.drawers)[1]
                    current_history.push(found)
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
            this.on_success(current_history)
            console.log("Successful Run.")
            this.record.push(1)
        }

        else{
            this.on_failure(current_history)
            console.log("Failed Run.")
            this.record.push(0)
        }
        this.hydrate();
    }

    /**
     * A prisoner opens a drawer
     * @param {*} id the number of the drawer to open
     * @param {*} drawers ...from this array of drawers (why pass this?)
     * @param {*} recurrent whether or not to pass back a 'paginated' result so to speak
     */
    open_drawer(id, drawers, recurrent = true){
        var result = drawers[id]
        this.on_open([id, result])
        if(recurrent) return [id, result]
        else return result
    }

    /**
     * Evaluate the success rate of the elapsed iterations.
     * @param {*} verbose whether or not to include detailed data
     */
    evaluate(verbose){ 
        if(verbose) console.log(this.record)
        var counts = {}
        this.record.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
        this.on_result(counts)
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
