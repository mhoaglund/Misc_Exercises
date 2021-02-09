#include "Arduino.h"
#include "Morse.h"

Favg::Favg(int dim1, int dim2, int drift)
{
    _dim1 = dim1;
    _dim2 = dim2;
    driftRate = drift;
    frames = new int*[dim1];  
    for(i=0;i<dim1;i++){    
        frames[i] = new int[dim2];    
    }
    rateLockedFrameAverage = new int[dim2];
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
        rateLockedFrameAverage[k] = 0;
        frameAverage[k] = 0;
    }
}

void Favg::increment(int input[]){
    if(_elapsed <= _dim1){
        _elapsed++;
    }
    //TODO: note about minimum array dimensions for header
    int endind = dim1 - 2;
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
        frames[k] = input[k];
    }
    if(_elapsed < _dim1){
        return;
    }
    int tempBaseline[_dim2];
    for(int k=0; k<_dim2; k++){
        int sum = 0;
        for(int l=0; l<_dim1; l++){
            sum = sum + frames[l][k];
        }
        tempBaseline[k] = sum/_dim1;
        frameAverage[k]=tempBaseline[k];
        if(elapsed == _dim1){
            rateLockedFrameAverage[k]=tempBaseline[k];
        } else {
            int diff = rateLockedFrameAverage[k] - tempBaseline[k];
            if(diff < driftRate){
            rateLockedFrameAverage[k]=tempBaseline[k];
            } else {
            int flag = (diff > 0) ? 1 : -1;
            rateLockedFrameAverage[k] += (driftRate * flag);
            }
        }

    }
}