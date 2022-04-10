export enum ChainId {
    RINKEBY = 4,
    FUJI = 43113,
    AVALANCHE = 43114
}

// Trader JOE addresses

export const FACTORY_ADDRESS: { [chainId in ChainId]: string } = {
    [ChainId.RINKEBY]: '0x86f83be9770894d8e46301b12E88e14AdC6cdb5F',
    [ChainId.FUJI]: '0x7eeccb3028870540EEc3D88C2259506f2d34fEE0',
    [ChainId.AVALANCHE]: '0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10'
}

export const ROUTER_ADDRESS: { [chainId in ChainId]: string } = {
    [ChainId.RINKEBY]: '0x7E2528476b14507f003aE9D123334977F5Ad7B14',
    [ChainId.FUJI]: '0x5db0735cf88F85E78ed742215090c465979B5006',
    [ChainId.AVALANCHE]: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4'
}