#include <iostream>
#include <queue>
#include <string>
#include <utility>
using namespace std;

#define mp make_pair

int qn, p, k;
string s;
priority_queue< pair< pair<int, int>, int> > q;
int main() {
    while(true) {
	cin >> s;
	if(s == "#") break;
	cin >> qn >> p;
	q.push(mp(mp(-p, -qn), -p));
    }
    cin >> k;
    while(k--) {
	auto t = q.top();q.pop();
	cout << -t.first.second << '\n';
	t.first.first += t.second;
	q.push(t);
    }
    return 0;
}
