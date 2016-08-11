#include <iostream>
#include <map>
#include <string>
using namespace std;

map<string, string> p;
map<string, int> r, sizes;
inline string getSet(const string &s) {
    if(p.find(s) == p.end()) {
	p[s] = s;
	r[s] = 0;
	sizes[s] = 1;
	return s;
    }
    return p[s] == s ? s : (p[s] = getSet(p[s]));
}
inline bool sameSet(string s, string t) {
    return getSet(s) == getSet(t);
}
inline void joinSet(string s, string t) {
    if(sameSet(s, t)) return;
    string a = getSet(s), b = getSet(t);
    if(r[a] < r[b]) {
	p[a] = b;
	sizes[b] += sizes[a];
    } else {
	p[b] = a;
	sizes[a] += sizes[b];
	if(r[a] == r[b]) r[a]++;
    }
}

int n, f;
string s, t;
int main() {
    cin >> n;
    while(n--) {
	p.clear(); r.clear(); sizes.clear();
	cin >> f;
	while(f--) {
	    cin >> s >> t;
	    joinSet(s, t);
	    cout << sizes[getSet(s)] << '\n';
	}
    }
	
    return 0;
}
