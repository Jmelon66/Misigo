class Solution {
    public:
        vector<bool> isArraySpecial(vector<int>& nums, vector<vector<int>>& queries) {
            vector<vector<int>> re = {{0,0}};
            vector<bool> answer = {};
            for(auto x : queries){
                int i = x[0]+1,s = x[0]+1,n = re.size(),j=0;
                bool f = true;
                vector<int> left = re[0];
                for(;i<=x[1];i++){
                    while(j)
                    if((nums[i]+nums[i-1])%2!=1){
                        f=false;
                        break;
                    }
                }
                answer.push_back(f);
            }
            return answer;
        }
    };