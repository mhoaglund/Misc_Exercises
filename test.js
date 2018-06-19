
$(document).ready(function () {
    var success_mu = '<div class="successblock"></div>'
    var failure_mu = '<div class="failblock"></div>'
    var open_mu = '<div class="openblock"></div>'
    var drawers = 0
    var hundp1 = new HundredPrisoners(
        {
            population: 100,
            iterations: 100,
            mode: "static",
            success: function(report){
                $('body').append(success_mu)
            },
            failure: function(report){
                $('body').append(failure_mu)
            },
            on_open: function(report){
                //This gets called a lot. Up to pop*(pop/2)
                drawers++
            },
            on_result: function(report){
                console.log(report)
                console.log(drawers)
            }
        }
    );
})
