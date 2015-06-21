#include <iostream>
#include <vector>

using namespace std;

typedef long long ll;

#define maxn 1000

ll N, n;
char big[maxn][maxn], little[maxn][maxn];
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    while(cin >> N >> n, N||n) {
	for(int i=0; i<N; i++)
	    for(int j=0; j<N; j++)
		cin >> big[i][j];
	for(int i=0; i<n; i++)
	    for(int j=0; j<n; j++)
		cin >> little[i][j];
	int q = 0;
	while(true) {
	    // brute-force count
	    ll c = 0;
	    for(int i=0; i<N-n+1; i++) {
		for(int j=0; j<N-n+1; j++) {
		    bool d = true, e = true;
		    for(int a=0; a<n; a++) {
			for(int b=0; b<n; b++) {
			    if(big[i+a][j+b] != little[a][b]) {
				e = false;
				break;
			    }
			}
			if(!e) {
			    d = false;
			    break;
			}
		    }
		    if(d) c++;
		}
	    }
	    cout << c;
	    if(q==3) break;
	    cout << " ";
	    // rotate little
	    char v[maxn][maxn];
	    for(int i=0; i<n; i++) 
		for(int j=0; j<n; j++) 
		    v[j][n-i-1] = little[i][j];
	    for(int i=0; i<n; i++) 
		for(int j=0; j<n; j++) 
		    little[i][j] = v[i][j];
	    q++;
	}
	cout << "\n";
    }
	
    return 0;
}
