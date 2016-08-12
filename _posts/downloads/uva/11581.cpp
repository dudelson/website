#include <cstdio>
#include <vector>

using namespace std;

typedef pair<int, int> pii;

int n, g[3][3], gg[3][3];
int main() {
    //ios_base::sync_with_stdio(false);
    //cin.tie(NULL);

    // used to make computing f(g) easier
    vector< pii > sides;
    sides.push_back(make_pair(0, 1));
    sides.push_back(make_pair(0, -1));
    sides.push_back(make_pair(1, 0));
    sides.push_back(make_pair(-1, 0));

    scanf("%d", &n);
    while(n--) {
	for(int i=0; i<3; i++) {
	    for(int j=0; j<3; j++) {
		char c = '\n';
		while(c == '\n') scanf("%c", &c);
		g[i][j] = c-'0';
	    }
	}
	int k = 0;
	while(true) {
	    // if the current iteration of g is the
	    // "zero grid" then we're done simulating
	    bool all_zeros = true;
	    for(int i=0; i<3; i++) 
		for(int j=0; j<3; j++)
		    if(g[i][j] != 0) all_zeros = false;
	    if(all_zeros) break;
	    k++;
	    // compute f(g)
	    for(int i=0; i<3; i++) {
		for(int j=0; j<3; j++) {
		    gg[i][j] = 0;
		    for(auto p : sides) {
			if(0 <= j+p.first && j+p.first < 3 &&
			   0 <= i+p.second && i+p.second < 3) {
			    gg[i][j] ^= g[i+p.second][j+p.first];
			}
		    }
		}
	    }
	    for(int i=0; i<3; i++) 
		for(int j=0; j<3; j++) 
		    g[i][j] = gg[i][j];
	}

	printf("%d\n", k-1);
    }
	
    return 0;
}
