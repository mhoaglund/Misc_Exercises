import random
from itertools import groupby

record = []
def optimal_search(drawers, prisoners, population):
    success = False
    should_continue = True
    while should_continue:
        for prisoner in prisoners:
            current_prisoner = prisoner
            latest_drawer = current_prisoner
            found = 0
            opened_drawers = 0
            
            while found != current_prisoner and found != -1:
                #TODO: introduce variation on recursive element here?
                found = open_drawer(latest_drawer, drawers)
                latest_drawer = found
                opened_drawers = opened_drawers + 1
                if found == current_prisoner:
                    success = True
                if opened_drawers > population / 2:
                    found = -1

            if success is False:
                should_continue = False
                break

        should_continue = False
    if success:
        print "Successful Run."
        record.append(1)
    else:
        print "Failed Run."
        record.append(0)

def open_drawer_recur(id, drawers):
    return (id, drawers[id-1])

def open_drawer(id, drawers):
    return drawers[id-1]

def iterate(population):
    optimal_search(
        random.sample(range(1,population+1), population), 
        random.sample(range(1,population+1), population),
        population
        )

def evaluate_probs():
    print "Wins: ", record.count(1)
    print "Losses: ", record.count(0)
    return

for x in range(0,100):
    iterate(100)

evaluate_probs()