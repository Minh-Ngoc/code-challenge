/*
    - Blockchain properties have not been declared in the WalletBalance interface.
    => Solution: Define a BlockChainType enum with possible blockchain values like 'Osmosis', 
    'Ethereum', etc. Update the WalletBalance interface to use this enum type for the blockchain property.
*/
enum BlockChainType {
    Osmosis = "Osmosis",
    Ethereum = "Ethereum",
    Arbitrum = "Arbitrum",
    Zilliqa = "Zilliqa",
    Neo = "Neo",
}

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: BlockChainType;
}

/*
    - The getPriority function is called multiple times in filter and sort. 
    This is inefficient, especially when dealing with a large number of balances. 
    The same priorities are calculated repeatedly for the same blockchain.
        => Solution: Create a new interface that inherits from WalletBalance and 
        add a new property called priority and a temporary variable to store the value of the balance 
        when using a map to iterate over each value of the balance and priority will store the value 
        that will be getPriority function used with arguments about the value of the balance.
*/
interface BalancesWithPriority extends WalletBalance {
    currency: string;
    amount: number;
    priority: number;
}

/*
    - interface FormattedWalletBalance can be removed because the formatted property can be processed directly, 
    so it can be removed to avoid complicating the problem.
*/ 
interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
}

/*
    - BoxProps: It's unclear what the BoxProps type is, as it's not defined in the provided code
        => Declare the BoxProps interface or remove extends from BoxProps of the Props interface
*/
interface Props extends BoxProps { }

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    const getPriority = (blockchain: any): number => {
        switch (blockchain) {
            case "Osmosis":
                return 100;
            case "Ethereum":
                return 50;
            case "Arbitrum":
                return 30;
            case "Zilliqa":
                return 20;
            case "Neo":
                return 20;
            default:
                return -99;
        }
    };

    const sortedBalances = useMemo(() => {
        const balancesWithPriority = balances.map((balance: WalletBalance) => ({
            ...balance,
            priority: getPriority(balance.blockchain),
        }));

        /* 
            - lhsPriority which is not defined anywhere in the code, leading to a runtime error.
                => Solution: Fix variable name to BalancePriority inside logic to avoid undefined variable error.
        */
        return balancesWithPriority
            .filter(
                (balance: BalancesWithPriority) =>
                    balance.priority > -99 && balance.amount <= 0
            )
            .sort((lhs: BalancesWithPriority, rhs: BalancesWithPriority) =>
                lhs > rhs ? -1 : 1
            );
    }, [balances, prices]);

    /* 
        - The sortedBalances array is mapped twice to create formattedBalances and rows.
        This results in unnecessary iterations over the same data.
            => Solution: Combine the mapping into a single step to avoid redundant iterations.
    
        - The balance should be of type BalancesWithPriority, as it is in the original code, to avoid any type errors. 
    */
        const rows = sortedBalances.map(
        (balance: BalancesWithPriority, index: number) => {
            const usdValue = prices[balance.currency] * balance.amount;
            return (
                <WalletRow
                    className= { classes.row }
                    key = { index }
                    amount = { balance.amount }
                    usdValue = { usdValue }
                    formattedAmount = { balance.amount.toFixed() }
                />
            );
        }
    );

    return <div { ...rest } > { rows } </div>;
};
