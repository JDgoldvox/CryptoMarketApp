
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

class AccountDetails {
    public username: string = "";
    public fiat: string = "";
    public lastSignedIn: string = "";
    public balance: string = "";
    public pnl: string = "";
}

export async function GetAccountDetails(userId: number) : Promise <AccountDetails>
{
    let accountDetails: AccountDetails = new AccountDetails();
    
    const url: string = `http://localhost:5277/${userId}/AccountDetails`;
    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
    });
    
    if (response.ok)
    {
        const result = await response.json();

        accountDetails.username = result.username;
        accountDetails.fiat = result.fiat;
        accountDetails.lastSignedIn = result.lastSignedIn;
        accountDetails.balance = result.balance; 
        accountDetails.pnl = result.pnl;
        
        return accountDetails;
    }
    else
    {
        throw new Error("user balance service had an error")
    }
}