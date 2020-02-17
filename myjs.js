/* initializing the board */
var arr=[
    ['-','-','-'],
    ['-','-','-'],
    ['-','-','-']
];
///console.log(arr);

var agent_action=minimax_decision(arr); /// minimax returns an array [maxvalue, actionrow, actioncol]
///performing the action received from minimax_decision
clickme(agent_action[1],agent_action[2],'O');

function generate_id(row, col){
    return row+''+col;
}

function clickme(row,col,ch){
    var id=generate_id(row, col);
    var elm=document.getElementById(id);
    
    if(elm.readonly){
        console.log('already filled up');
    }
    else{
        ///performing the action here
        arr[row][col]=ch;
        
        ///updating the html gui here
        elm.value=ch;
        elm.readonly=true;
        if(ch=='X') elm.style.backgroundColor='Yellow';
        else if(ch=='O') elm.style.backgroundColor='Aqua';
    }
    
    ///checking the game over condition
    if(terminal_test(arr)==true){
        ///calling the utility value
        var utilval=utility(arr);

        var elm=document.getElementById('res');
        
        if(utilval==0) res.innerHTML='Draw';
        else if(utilval==1) res.innerHTML='AI Agent wins';
        else if(utilval==-1) res.innerHTML='You win';
        
        var elms=document.querySelectorAll('input[type="button"]');
        
        for(var item=0;item<elms.length;item++) elms[item].readonly=true;
    }
    else if(terminal_test(arr)==false && ch=='X'){
        var agent_action=minimax_decision(arr);
        clickme(agent_action[1],agent_action[2],'O');
    }
}

function terminal_test(curboard){
    var utilval=utility(curboard);
    if(utilval==1 || utilval==-1){
        return true;
    }
    else{
        for(var r=0;r<3;r++){
            for(var c=0;c<3;c++){
                if(curboard[r][c]=='-') return false;
            }
        }
        
        ///if all filled up then draw
        return true;
    }
}

function utility(arr){
    ///searching the rows, columns and corners
    //return 0=draw, 1=O win, -1=O lose
    for(var x=0;x<3;x++){
        ///vertical checking
        if(arr[x][0]==arr[x][1] && arr[x][1]==arr[x][2]){
            if(arr[x][0]=='X') return -1;
            else if(arr[x][0]=='O') return 1;
        } 
        
        ///horizontal checking
        if(arr[0][x]==arr[1][x] && arr[1][x]==arr[2][x]){
            if(arr[0][x]=='X') return -1;
            else if(arr[0][x]=='O') return 1;
        } 
    }
    
    ///primary diagonal/corner checking
    if(arr[0][0]==arr[1][1] && arr[1][1]==arr[2][2]){
        if(arr[1][1]=='X') return -1;
        else if(arr[1][1]=='O') return 1;
    }
    
    ///secondary diagonal/corner checking
    if(arr[0][2]==arr[1][1] && arr[1][1]==arr[2][0]){
        if(arr[1][1]=='X') return -1;
        else if(arr[1][1]=='O') return 1;
    } 
    
    return 0;
}

//-----------------------------------------your changes of codes after this line-----------------------------

/* starting minimax algorithm from here */
function minimax_decision(arr){
    console.log('------------------MINIMAX Started-------------------------');
    
    ///initializing value
    var maxval=-1000;  
    var actionrow=-1;
    var actioncol=-1;
    
    for(var r=0;r<3;r++){
        for(var c=0;c<3;c++){
            ///if the cell is empty then you can play otherwise ignore
            if(arr[r][c]=='-'){
                ///applying the action
                arr[r][c]='O';
                var calcmin=min_value(arr);
                console.log(arr);
                console.log(calcmin);
                
                /// unapplying the action to apply the new action in the next loop
                arr[r][c]='-';
                
                if(calcmin>maxval){
                    maxval=calcmin;
                    actionrow=r;
                    actioncol=c;
                }
            }
        }
    }
    console.log('------------------MINIMAX Ended-------------------------');
    return [maxval, actionrow, actioncol];
}

function min_value(board){
    //console.log(terminal_test(board));
    
    ///checking for terminal
    if(terminal_test(board)==true) return utility(board);
    else{
        ///otherwise calculating the minimun from all the child nodes maximum value
        var minval=1000;
        for(var r=0;r<3;r++){
            for(var c=0;c<3;c++){
                if(board[r][c]=='-'){
                    board[r][c]='X';
                    var calcmax=max_value(board);
                    board[r][c]='-';
                    
                    if(calcmax<minval){
                        minval=calcmax;
                    }
                }
            }
        }
        return minval;
    }
}

function max_value(board){
    //console.log(terminal_test(board));
    
    ///testing terminal here
    if(terminal_test(board)==true) return utility(board);
    else{
        ///otherwise calculating the maximum from all the child nodes minimum value
        var maxval1=-1000;
        for(var r=0;r<3;r++){
            for(var c=0;c<3;c++){
                if(board[r][c]=='-'){
                    board[r][c]='O';
                    var calcmin1=min_value(board);
                    board[r][c]='-';
                    
                    if(calcmin1>maxval1){
                        maxval1=calcmin1;
                    }
                }
            }
        }
        return maxval1;
    }
}