#include <iostream>
#include <vector>
using namespace std;


#define maxn (int)(1e6)+1
vector< vector<int> > a(maxn);
int n, m, k, v;
int main() {
    while(cin >> n >> m) {
	fill(a.begin(), a.end(), vector<int>());
	for(int i=0; i<n; i++) {
	    int x;
	    cin >> x;
	    a[x].push_back(i+1);
	}
	for(int i=0; i<m; i++) {
	    cin >> k >> v;
	    if(k > (int)a[v].size()) cout << "0\n";
	    else cout << a[v][k-1] << '\n';
	}
    }
	
    return 0;
}
