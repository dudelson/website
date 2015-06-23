#include <iostream>

typedef long long ll;

using namespace std;

ll size, p, x, y;
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    while(cin >> size >> p, size||p) {
	// start x and y at the center of the grid
	ll x = size/2+1, y=size/2+1;
	// these vars keep track of where we are in the spiral
	ll I=1, i=I, pmo=1, J=1, j=J, why=true;
	while(--p > 0) { // simulate!
	    if(why) {
		y += pmo;
	    } else {
		x += pmo;
	    }
	    i--; j--;
	    if(i==0) {
		I+=2;
		i = I;
		pmo *= -1;
	    }
	    if(j==0) {
		if(!why) J += 1;
		j = J;
		why = !why;
	    }
	}
	cout << "Line = " << y << ", column = " << x << ".\n";
    }
	
    return 0;
}
