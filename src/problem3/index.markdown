### Current code

```tsx
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100
      case 'Ethereum':
        return 50
      case 'Arbitrum':
        return 30
      case 'Zilliqa':
        return 20
      case 'Neo':
        return 20
      default:
        return -99
    }
  }

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      if (lhsPriority > -99) {
        if (balance.amount <= 0) {
          return true;
        }
      }
      return false
    }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      if (leftPriority > rightPriority) {
        return -1;
      } else if (rightPriority > leftPriority) {
        return 1;
      }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
    key={index}
    amount={balance.amount}
    usdValue={usdValue}
    formattedAmount={balance.formatted}
    />
  )
  })

  return (
    <div {...rest}>
    {rows}
    </div>
  )
}
```

### Investigate:

#### 1. Incorrect Filtering Condition in useMemo
```typescript
const sortedBalances = useMemo(() => {
  return balances.filter((balance: WalletBalance) => {
    const balancePriority = getPriority(balance.blockchain);
    if (lhsPriority > -99) { // lhsPriority is undefined
      if (balance.amount <= 0) {
        return true;
      }
    }
    return false;
  }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
    const leftPriority = getPriority(lhs.blockchain);
    const rightPriority = getPriority(rhs.blockchain);
    if (leftPriority > rightPriority) {
      return -1;
    } else if (rightPriority > leftPriority) {
      return 1;
    }
  });
}, [balances,   prices]);
```
- The variable `lhsPriority` does not exist, which results in an error
- The condition in `filter` is misleading—it only includes balances with `amount <= 0`, which may not be the intended behavior.


Fix:
- Replace lhsPriority with `balancePriority`.
- Ensure balances with `amount > 0` are also considered if needed

### 2. Redundant formattedBalances Mapping
```tsx
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  return {
    ...balance,
    formatted: balance.amount.toFixed()
  }
})
```
- This extra mapping is unnecessary since `formatted` is only used within `rows` and could be computed inline.
Fix:

- Move the `.toFixed()` conversion directly into `rows` when needed.

### 3. Incorrect Type Casting in rows Mapping
```typescript
const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {...}
```
- `sortedBalances` is an array of `WalletBalance`, not `FormattedWalletBalance`, so `formatted` is missing.
- Type assertion here is misleading and could lead to runtime errors.
Fix:
- Either ensure that `formattedBalances` is used, or calculate `formatted` inline.

### 4.Unstable Dependencies in useMemo
Issue:
- `useMemo` depends on `balances` and `prices`, but `prices` is unused in the function.
- If `prices` updates frequently, it will cause unnecessary recomputation.

Fix:
- Remove `prices` from the dependency array.

### 5. Inefficient Sorting Logic
Issue:
- sort() does not return a new array if elements are equal.
- The comparison function should return 0 in the else case.

Fix:
- Explicitly return 0 for equal priorities.

### 6.Using index as Key in .map()
```typescript
key={index}
```
- Using index as a key can lead to UI inconsistencies if the array changes.

Fix:
- Use balance.currency (or a unique identifier).

### Refactored Code:
```tsx
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    const priorities: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
    return priorities[blockchain] ?? -99;
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
      .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
  }, [balances]);

  return (
    <div {...rest}>
      {sortedBalances.map((balance) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            className={classes.row}
            key={balance.currency}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.amount.toFixed()}
          />
        );
      })}
    </div>
  );
};


```
