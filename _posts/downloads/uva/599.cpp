#include <iostream>
#include <vector>
#include <map>
#include <utility>
using namespace std;

/* begin UFDS implementation */
int nSets;
map<char, char> p;
map<char, int> r, sizes;
inline void init() {
    nSets = 0;
    p.clear(); r.clear(); sizes.clear();
}
inline char getSet(char i) {
    if(p.find(i) == p.end()) {
	p[i] = i;
	r[i] = 0;
	sizes[i] = 1;
	nSets++;
	return i;
    }
    return (p[i] == i) ? i : (p[i] = getSet(p[i]));
}
inline bool sameSet(char i, char j) {
    return getSet(i) == getSet(j);
}
inline void joinSet(char i, char j) {
    if(sameSet(i, j)) return;
    nSets--;
    char a = getSet(i), b = getSet(j);
    if(r[a] < r[b]) {
	p[a] = b;
	sizes[b] += sizes[a];
    }
    else {
	p[b] = a;
	sizes[a] += sizes[b];
	if(r[a] == r[b]) r[a]++;
    }
}
/* end UDFS implementation */

int t;
vector< pair<char, char> > edges;
string s;
int main() {
    cin >> t; getline(cin, s);
    while(t--) {
	edges.clear();
	while(getline(cin, s), s[0]!='*') 
	    edges.push_back(make_pair(s[1], s[3]));
	getline(cin, s);
	init();
	for(char c : s) if(c != ',') getSet(c);
	for(auto e : edges) joinSet(e.first, e.second);
	int acorns = 0;
	for(auto pp : p) if(pp.first == pp.second && sizes[pp.first] == 1) acorns++;
	cout << "There are " << nSets-acorns << " tree(s) and " << acorns << " acorn(s).\n";
    }
	
    return 0;
}
