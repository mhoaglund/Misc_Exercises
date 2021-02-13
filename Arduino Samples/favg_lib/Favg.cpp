#include "Arduino.h"
#include "Favg.h"

Favg::Favg(int dim1, int dim2, int drift, bool limit)
{
    _dim1 = dim1;
    _dim2 = dim2;
    _ratelock = limit;
    driftRate = drift;
    frames = new int*[dim1];  
    for(int i=0;i<dim1;i++){    
        frames[i] = new int[dim2];    
    }
    frameAverage = new int[dim2];
    init();
}

void Favg::init(){
    _elapsed = 0;
    for (int i=0; i<_dim1; i++)
    {
        for (int j = 0; j<_dim2; j++)
        {
        frames[i][j] = 0;
        }
    }
    for(int k=0; k<_dim2; k++){
        frameAverage[k] = 0;
    }
}

void Favg::toggleRateLimit(bool setting){
    _ratelock = setting;
}

void Favg::increment(int input[]){
    if(_elapsed <= _dim1){
        _elapsed++;
    }
    //TODO: note about minimum array dimensions for header
    int endind = _dim1 - 2;
    for (int i=endind; i>-1; i--)
    {
        int targetIndex = i+1;
        for (int j = 0; j<_dim2; j++)
        {
        frames[i+1][j] = frames[i][j];
        }
    }
    //Update frame zero
    for(int k=0; k<_dim2; k++){
        frames[0][k] = input[k];
    }
    if(_elapsed < (_dim1)){
        return;
    }
    int tempBaseline[_dim2]; //contains averages if we can make them
    for(int k=0; k<_dim2; k++){
        int sum = 0;
        for(int l=0; l<_dim1; l++){
            sum = sum + frames[l][k];
        }
        tempBaseline[k] = sum/_dim1;
        if(_ratelock && _elapsed > _dim1){
            int diff = tempBaseline[k] - frameAverage[k];
            if(abs(diff) < driftRate){
            frameAverage[k]=tempBaseline[k];
            } else {
                if(diff > 0){
                    frameAverage[k] = frameAverage[k] + driftRate;
                }
                if(diff < 0){
                    frameAverage[k] = frameAverage[k] - driftRate;
                }
            }
        } else {
            frameAverage[k]=tempBaseline[k];
        }
    }
}