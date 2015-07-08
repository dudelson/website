#include <iostream>
#include <bitset>
using namespace std;

#define maxn 1000001
int n, m, s, t, r;
bitset<maxn> sch;
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    while(cin >> n >> m, n||m) {
	bool good = true;
	sch.reset();
	for(int i=0; i<n; i++) {
	    cin >> s >> t;
	    if(!good) continue;
	    for(int j=s; j<t; j++) {
		if(sch[j]) good = false;
		else sch.set(j);
	    }
	}
	for(int i=0; i<m; i++) {
	    cin >> s >> t >> r;
	    if(!good) continue;
	    bool dobreak = false;
	    int ps = s, pt = t;
	    while(!dobreak && good) {
		for(int j=ps; j<pt; j++) {
		    if(j >= maxn) {
			dobreak = true;
			break;
		    } else if(sch[j]) {
			good = false;
			break;
		    } else sch.set(j);
		}
		ps += r; pt += r;
	    }
	}
	cout << (good ? "NO " : "") << "CONFLICT\n";
    }
	
    return 0;
}
