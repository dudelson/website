#include <iostream>
#include <vector>
#include <bitset>
#include <string>
#include <algorithm>
using namespace std;

bitset<26> awake;
vector< vector<int> > v(26);
int n, m;
string s;
int main() {
end:
    while(cin >> n >> m) {
	getline(cin, s);
	fill(v.begin(), v.end(), vector<int>());
	awake.reset();

	getline(cin, s);
	for(char c : s) {
	    awake.set(c-'A');
	}
	for(int i=0; i<m; i++) {
	    getline(cin, s);
	    int a = s[0]-'A', b = s[1]-'A';
	    v[a].push_back(b); v[b].push_back(a);
	}
	int years = 0;
	while(awake.count() < n) {
	    vector<int> wokeup;
	    for(int cur=0; cur<26; cur++) {
		if(awake[cur]) continue;
		int awake_neighbors = 0;
		for(int neighbor : v[cur]) if(awake[neighbor]) awake_neighbors++;
		if(awake_neighbors >= 3) wokeup.push_back(cur);
	    }

	    if(wokeup.empty()) {
		cout << "THIS BRAIN NEVER WAKES UP\n";
		goto end;
	    }

	    for(int i : wokeup) awake.set(i);
	    years++;
	}
	cout << "WAKE UP IN, " << years << ", YEARS\n";
    }
	
    return 0;
}
