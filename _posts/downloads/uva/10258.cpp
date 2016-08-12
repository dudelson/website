#include <iostream>
#include <cstring>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>

using namespace std;

typedef vector<int> vi;

int solved[101][10], penalty[101][10];

inline bool mySort(int i, int j) {
    int isolve=0, ip=0, jsolve=0, jp=0;
    for(int a=0; a<10; a++) if(solved[i][a]) {
	ip += penalty[i][a];
	isolve++;
    }
    for(int a=0; a<10; a++) if(solved[j][a]) {
	jp += penalty[j][a];
	jsolve++;
    }
    if(isolve > jsolve) return true;
    else if(isolve < jsolve) return false;
    else {
	if(ip < jp) return true;
	else if(ip > jp) return false;
	else return i < j;
    }
}

int t, id, p, n;
char L;
vi participants;
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    cin >> n;
    string s;
    getline(cin, s);
    getline(cin, s);
    while(n--) {
	memset(solved, 0, sizeof(int)*101*10);
	memset(penalty, 0, sizeof(int)*101*10);
	participants.clear();
	while(getline(cin, s), s.size()>0) {
	    stringstream ss(s);
	    ss >> id >> p >> t >> L;
	    if(L=='I' && !solved[id][p]) penalty[id][p]+=20;
	    else if(L=='C') {
		if(!solved[id][p]) penalty[id][p]+=t;
		solved[id][p] = 1;
	    }
	    if(find(participants.begin(), participants.end(), id) == participants.end())
		participants.push_back(id);
	}
	sort(participants.begin(), participants.end(), mySort);
	for(int k : participants) {
	    int s=0, p=0;
	    for(int i=0; i<10; i++)
		if(solved[k][i]) {
		    p+=penalty[k][i];
		    s++;
		}
	    printf("%d %d %d\n", k, s, p);
	}
	if(n > 0) printf("\n");
    }
	
    return 0;
}
