#include <iostream>
#include <vector>
#include <set>
using namespace std;

int t, b, ng, nb;
multiset<int> green, blue;
int main() {
    cin >> t;
    for(int tt=0; tt<t; tt++) {
	if(tt > 0) cout << '\n';
	green.clear();
	blue.clear();
	cin >> b >> ng >> nb;
	for(int i=0; i<ng; i++) {
	    int x;
	    cin >> x;
	    green.insert(x);
	}
	for(int i=0; i<nb; i++) {
	    int x;
	    cin >> x;
	    blue.insert(x);
	}
	while(!green.empty() && !blue.empty()) {
	    vector<int> gw, bw;
	    int fights = min(b, (int)min(green.size(), blue.size()));
	    for(int i=0; i<fights; i++) {
		auto tg = green.end(), tb = blue.end(); tg--; tb--;
		int gs = *tg, bs = *tb;
		green.erase(tg); blue.erase(tb);
		if(gs > bs) {
		    gw.push_back(gs-bs);
		} else if(bs > gs) {
		    bw.push_back(bs-gs);
		}
	    }
	    for(auto i : gw) green.insert(i);
	    for(auto i : bw) blue.insert(i);
	}
	if(green.empty() && !blue.empty()) {
	    cout << "blue wins\n";
	    for(multiset<int>::reverse_iterator it=blue.rbegin(); it!=blue.rend(); it++)
		cout << *it << '\n';
	} else if(!green.empty() && blue.empty()) {
	    cout << "green wins\n";
	    for(multiset<int>::reverse_iterator it=green.rbegin(); it!=green.rend(); it++)
		cout << *it << '\n';
	} else cout << "green and blue died\n";
    }
}
