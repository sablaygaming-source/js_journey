

def func()-> None : #5

    exVal = [1,2,3]
    i:int

    i = 0
    x = 1
    print(f"initial value {exVal=}")
    while i < len(exVal):#3
        if exVal[i] > x :#4
            x = exVal[i]

        #4
        i +=1
    #3

    print(f"result is {x=}\nexit program..")
    
#5

func( )