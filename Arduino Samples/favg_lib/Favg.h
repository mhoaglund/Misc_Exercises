#ifndef Favg_h
#define Favg_h

#include "Arduino.h"

class Favg
{
  public:
    Favg(int dim1, int dim2, int drift);
    void init();
    //Array input must be size dim2.
    void increment(int input[]);
    int * rateLockedFrameAverage;
    int * frameAverage;
    int driftRate;
  private:
    int _dim1;
    int _dim2;
    int ** frames;
    int _elapsed;
};

#endif

