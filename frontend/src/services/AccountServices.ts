
export async function GetUserBalance(userId: number) : Promise<string> 
{
    const url: string =  `http://localhost:5277/${userId}/balance`;
    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        // body: JSON.stringify(
        //     {
        //         qwe: "qweqwe",
        //     }
        // )
    });
    
    const result = await response.json();
    
    if(response.ok)
    {
        return result.balance;
    }
    else
    {
        throw new Error("user balance service had an error")
    }
}

export interface IAccountDetails {
    username: string;
    fiat: number;
    lastSignedIn: Date;
    balance: number;
    pnl: number;
}

export async function GetAccountDetails(userId: number) : Promise <IAccountDetails>
{
    const url: string = `http://localhost:5277/${userId}/AccountDetails`;
    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
    });
    
    if (response.ok)
    {
        const result = await response.json();
        
        return {
            username: result.username,
            fiat: result.fiat,
            lastSignedIn: new Date(result.lastSignedIn),
            balance: result.balance,
            pnl: result.pnl
        };
    }
    else
    {
        throw new Error("user balance service had an error")
    }
}