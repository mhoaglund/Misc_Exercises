#ifndef Favg_h
#define Favg_h

#include "Arduino.h"

class Favg
{

  private:
    int _dim1;
    int _dim2;
    int ** frames;
    int _elapsed;
    bool _ratelock;

  public:
    Favg(int dim1, int dim2, int drift, bool limit);
    void init();
    //Array input must be size dim2.
    void increment(int input[]);
    void toggleRateLimit(bool setting);
    int driftRate;
    //int rateLockedFrameAverage[];
    int * frameAverage;
};

#endif

