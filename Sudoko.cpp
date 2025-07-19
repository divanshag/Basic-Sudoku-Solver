#include<bits/stdc++.h>
using namespace std;
void Print(int board[][9],int n){
    for(int i=0;i<n;i++){
        for(int j=0;j<n;j++){
            cout<<board[i][j]<<" ";
        }
        cout<<endl;
    }
    cout<<endl;
}
bool isValid(int board[][9],int i,int j, int num,int n){
    // first we write row and column check list and subarray check list
    for(int x=0;x<n;x++){
        if(board[i][x]==num || board[x][j]==num){
            return false;
        }
    }
    int rn=sqrt(n);
    int si = i - i % rn;
    int sj = j - j % rn;
    for(int x=si;x<si+rn;x++){
        for(int y=sj;y<sj+rn;y++){
            if(board[x][y]==num){
                return false;
            }
        }
    }
    return true;
}
bool sudoko_solver(int board[][9],int i,int j,int n){
    // if all rows are covered
    if(i==n){
        Print(board,n);
        return true;
    }
    // if column of some row is totally covered
    if(j==n){
        return sudoko_solver(board,i+1,0,n);
    }
    // if already some value exists
    if(board[i][j]!=0){
        return sudoko_solver(board,i,j+1,n);
    }
    for(int num=1;num<=9;num++){
        // if filling of number is possible
        if(isValid(board,i,j,num,n)){
            board[i][j]=num;
            bool subAns = sudoko_solver(board,i,j+1,n);
            if(subAns){
                return true;
            }
            // if ans is not true we need to revist(backtrack) and reevalueate the answer
            board[i][j]=0;
        }
    }
    return false;
}
int main(){
    int n=9;
    int board[9][9]={
        {5, 3, 0, 0, 7, 0, 0, 0, 0},
        {6, 0, 0, 1, 9, 5, 0, 0, 0},
        {0, 9, 8, 0, 0, 0, 0, 6, 0},
        {8, 0, 0, 0, 6, 0, 0, 0, 3},
        {4, 0, 0, 8, 0, 3, 0, 0, 1},
        {7, 0, 0, 0, 2, 0, 0, 0, 6},
        {0, 6, 0, 0, 0, 0, 2, 8, 0},
        {0, 0, 0, 4, 1, 9, 0, 0, 5},
        {0, 0, 0, 0, 8, 0, 0, 7, 9}
    };
    sudoko_solver(board,0,0,n);
    return 0;
}