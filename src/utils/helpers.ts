import { ChainId, Token } from "@uniswap/sdk";

const token_list_mainnet = {
  DAI: new Token(
    ChainId.MAINNET,
    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    18,
    "DAI",
    "Dai Stablecoin"
  ),
  USDC: new Token(
    ChainId.MAINNET,
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    6,
    "USDC",
    "USD//C"
  ),
  USDT: new Token(
    ChainId.MAINNET,
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    6,
    "USDT",
    "Tether USD"
  ),
  COMP: new Token(
    ChainId.MAINNET,
    "0xc00e94Cb662C3520282E6f5717214004A7f26888",
    18,
    "COMP",
    "Compound"
  ),
  MKR: new Token(
    ChainId.MAINNET,
    "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
    18,
    "MKR",
    "Maker"
  ),
  AMPL: new Token(
    ChainId.MAINNET,
    "0xD46bA6D942050d489DBd938a2C909A5d5039A161",
    9,
    "AMPL",
    "Ampleforth"
  ),
  WBTC: new Token(
    ChainId.MAINNET,
    "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    8,
    "WBTC",
    "Wrapped BTC"
  ),
  AAVE: new Token(
    ChainId.MAINNET,
    "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    18,
    "AAVE",
    "AAVE"
  ),
  BAT: new Token(
    ChainId.MAINNET,
    "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
    18,
    "BAT",
    "Basic Attention"
  ),
  BUSD: new Token(
    ChainId.MAINNET,
    "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
    18,
    "BUSD",
    "Binance USD stablecoin"
  ),
  CRV: new Token(
    ChainId.MAINNET,
    "0xD533a949740bb3306d119CC777fa900bA034cd52",
    18,
    "CRV",
    "Curve"
  ),
  ENJ: new Token(
    ChainId.MAINNET,
    "0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c",
    18,
    "ENJ",
    "Enjin"
  ),
  GUSD: new Token(
    ChainId.MAINNET,
    "0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd",
    2,
    "GUSD",
    "Gemini Dollar"
  ),
  KNC: new Token(
    ChainId.MAINNET,
    "0xdd974D5C2e2928deA5F71b9825b8b646686BD200",
    18,
    "KNC",
    "KyberNetwork"
  ),
  LINK: new Token(
    ChainId.MAINNET,
    "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    18,
    "LINK",
    "ChainLink"
  ),
  MANA: new Token(
    ChainId.MAINNET,
    "0x0F5D2fB29fb7d3CFeE444a200298f468908cC942",
    18,
    "MANA",
    "Decentraland"
  ),
  REN: new Token(
    ChainId.MAINNET,
    "0x408e41876cCCDC0F92210600ef50372656052a38",
    18,
    "REN",
    "Republic"
  ),
  SNX: new Token(
    ChainId.MAINNET,
    "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
    18,
    "SNX",
    "Synthetix Network"
  ),
  SUSD: new Token(
    ChainId.MAINNET,
    "0x57Ab1ec28D129707052df4dF418D58a2D46d5f51",
    18,
    "SUSD",
    "Synth sUSD"
  ),
  TUSD: new Token(
    ChainId.MAINNET,
    "0x0000000000085d4780B73119b644AE5ecd22b376",
    18,
    "TUSD",
    "TrueUSD"
  ),
  UNI: new Token(
    ChainId.MAINNET,
    "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    18,
    "UNI",
    "UniSwap"
  ),
  WETH: new Token(
    ChainId.MAINNET,
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    18,
    "WETH",
    "Wrapped Ether"
  ),
  YFI: new Token(
    ChainId.MAINNET,
    "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
    18,
    "YFI",
    "yearn.finance"
  ),
  ZRX: new Token(
    ChainId.MAINNET,
    "0xE41d2489571d322189246DaFA5ebDe1F4699F498",
    18,
    "ZRX",
    "0x"
  ),
  BAL: new Token(
    ChainId.MAINNET,
    "0xba100000625a3754423978a60c9317c58a424e3D",
    18,
    "BAL",
    "Balancer"
  ),
};

const token_list = {
  [ChainId.MAINNET]: token_list_mainnet,
};
export const TOKEN_LIST: any = token_list[1];

export function parseUsers(payload: any) {
  const healthFactorMax = 1; //liquidation can happen when less than 1
  const allowedLiquidation = 0.5; //50% of a borrowed asset can be liquidated
  const profit_threshold = 0.1 * 10 ** 18; //in eth. A bonus below this will be ignored
  const loans: any[] = [];

  payload.users.forEach((user: any, i: number) => {
    let totalBorrowed = 0;
    let totalCollateral = 0;
    let totalCollateralThreshold = 0;
    let max_borrowedSymbol;
    let max_borrowedPrincipal = 0;
    let max_borrowedPriceInEth = 0;
    let max_collateralSymbol;
    let max_collateralBonus = 0;
    let max_collateralPriceInEth = 0;

    user.borrowReserve.forEach((borrowReserve: any, i: number) => {
      const priceInEth = borrowReserve.reserve.price.priceInEth;
      const principalBorrowed = borrowReserve.currentTotalDebt;
      totalBorrowed +=
        (priceInEth * principalBorrowed) / 10 ** borrowReserve.reserve.decimals;
      if (principalBorrowed > max_borrowedPrincipal)
        max_borrowedSymbol = borrowReserve.reserve.symbol;
      max_borrowedPrincipal = principalBorrowed;
      max_borrowedPriceInEth = priceInEth;
    });

    user.collateralReserve.forEach((collateralReserve: any, i: number) => {
      const priceInEth = collateralReserve.reserve.price.priceInEth;
      const principalATokenBalance = collateralReserve.currentATokenBalance;
      totalCollateral +=
        (priceInEth * principalATokenBalance) /
        10 ** collateralReserve.reserve.decimals;
      totalCollateralThreshold +=
        (priceInEth *
          principalATokenBalance *
          (collateralReserve.reserve.reserveLiquidationThreshold / 10000)) /
        10 ** collateralReserve.reserve.decimals;
      if (
        collateralReserve.reserve.reserveLiquidationBonus > max_collateralBonus
      ) {
        max_collateralSymbol = collateralReserve.reserve.symbol;
        max_collateralBonus = collateralReserve.reserve.reserveLiquidationBonus;
        max_collateralPriceInEth = priceInEth;
      }
    });
    const healthFactor = totalCollateralThreshold / totalBorrowed;

    console.log("healthFactor", healthFactor, user.id);

    if (healthFactor <= healthFactorMax) {
      loans.push({
        user_id: user.id,
        healthFactor: healthFactor,
        max_collateralSymbol: max_collateralSymbol,
        max_borrowedSymbol: max_borrowedSymbol,
        max_borrowedPrincipal: max_borrowedPrincipal,
        max_borrowedPriceInEth: max_borrowedPriceInEth,
        max_collateralBonus: max_collateralBonus / 10000,
        max_collateralPriceInEth: max_collateralPriceInEth,
      });
    }
  });

  //filter out loans under a threshold that we know will not be profitable (liquidation_threshold)
  // loans = loans.filter(loan => loan.max_borrowedPrincipal * allowedLiquidation * (loan.max_collateralBonus - 1) * loan.max_borrowedPriceInEth / 10 ** TOKEN_LIST[loan.max_borrowedSymbol].decimals >= profit_threshold)
  return loans;
}
