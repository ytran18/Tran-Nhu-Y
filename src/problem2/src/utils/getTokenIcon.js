import {
    IconBLUR, IconBUSD, IconETH, IconUSD, IconbNEO, IconMoney, IconGMX, IconSTEVMOS, IconLUNA,
    IconRATOM, IconSTRD, IconEVMOS, IconIBCX, IconIRIS, IconampLUNA, IconKUJI, IconSTOSMO, 
    IconUSDC, IconaxlUSDC, IconATOM, IconSTATOM, IconOSMO, IconrSWTH, IconSTLUNA, IconLSI,
    IconOKB, IconOKT, IconSWTH, IconUSC, IconWBTC, IconwstETH, IconYieldUSD, IconZIL 
} from '@icon/index';

const iconMap = {
    'BLUR': IconBLUR,
    'BUSD': IconBUSD,
    'ETH': IconETH,
    'USD': IconUSD,
    'bNEO': IconbNEO,
    'GMX' :IconGMX,
    'STEVMOS' :IconSTEVMOS,
    'LUNA' :IconLUNA,
    'RATOM' :IconRATOM,
    'STRD' :IconSTRD,
    'EVMOS' :IconEVMOS,
    'IBCX' :IconIBCX,
    'IRIS' :IconIRIS,
    'ampLUNA' :IconampLUNA,
    'KUJI' :IconKUJI,
    'STOSMO' :IconSTOSMO,
    'USDC' :IconUSDC,
    'axlUSDC' :IconaxlUSDC,
    'ATOM' :IconATOM,
    'STATOM' :IconSTATOM,
    'OSMO' :IconOSMO,
    'rSWTH' :IconrSWTH,
    'STLUNA' :IconSTLUNA,
    'LSI' :IconLSI,
    'OKB' :IconOKB,
    'OKT' :IconOKT,
    'SWTH' :IconSWTH,
    'USC' :IconUSC,
    'WBTC' :IconWBTC,
    'wstETH' :IconwstETH,
    'YieldUSD' :IconYieldUSD,
    'ZIL' :IconZIL,
};

// get token icon with token label
export const getTokenIcon = (key) => {
    if (iconMap.hasOwnProperty(key)) return iconMap[key];
    return IconMoney;
};