import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { SignerWithAddress } from "hardhat-deploy-ethers/src/signers";
import { BigNumber } from "ethers";
import { Swapper, IWAVAX, PeachPool } from "../typechain";
import { expect } from "chai";
import { ROUTER_ADDRESS, FACTORY_ADDRESS } from "../constants";

dotenv.config();

const WAVAX_ADDRESS: string = process.env.WAVAX_ADDRESS as string;
const AVALANCHE_NODE_URL: string = process.env.AVALANCHE_MAINNET_URL as string;
const PNG_ADDRESS = "0x60781C2586D68229fde47564546784ab3fACA982"
const MY_TOKEN_ADDRESS = "0x000000000000000000000000000000000000dEaD";
const USDT_E_ADDRESS = "0xc7198437980c041c805A1EDcbA50c1Ce5db95118";

const RINKEBEY_DAI = "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa";
const RINKEBEY_WETH = "0xc778417E063141139Fce010982780140Aa0cD5Ab";

describe("Swappity swap", function () {

    let swapper: Swapper;
    let account1: SignerWithAddress;

    beforeEach(async function () {
        await ethers.provider.send(
            "hardhat_reset",
            [
                {
                    forking: {
                        jsonRpcUrl: AVALANCHE_NODE_URL,
                        blockNumber: 2975762,
                    },
                },
            ],
        );

        let accounts = await ethers.getSigners()

        // @ts-ignore
        account1 = accounts[0]

        // Here we get the factory for our Swapper contrat and we deploy it on the forked network
        const swapperFactory = await ethers.getContractFactory("Swapper")
        swapper = await swapperFactory.deploy(process.env.WAVAX_ADDRESS as string, "0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106");
    });

    it("should swap wavax for png", async function () {
        const DEPOSIT_NUMBER = "25000";

        // We get an instance of the wavax contract
        const wavaxTokenContract = await ethers.getContractAt("IWAVAX", WAVAX_ADDRESS)

        // // @ts-ignore
        const pngTokenContract = await ethers.getContractAt("IWAVAX", PNG_ADDRESS)
        // makes sure owner has enough WAVAX balance
        if ((await wavaxTokenContract.balanceOf(account1.address)).lt(DEPOSIT_NUMBER)) {
            await wavaxTokenContract.deposit({
                value: BigNumber.from(DEPOSIT_NUMBER)
                    .sub(await wavaxTokenContract.balanceOf(account1.address))
            })
        }
        const testBalance = await wavaxTokenContract.balanceOf(account1.address);
        // console.log('testBalance: ');
        
        // // We tell Wavax contract that we are cool with Swapper contract using our Wavax on our behalve
        // await wavaxTokenContract.approve(swapper.address, ethers.constants.MaxUint256);

        //  Check balance before the swap
        const wavaxBalanceBefore = await wavaxTokenContract.balanceOf(account1.address);
        const pngBalanceBefore = await pngTokenContract.balanceOf(account1.address);
        console.log('wavaxBalanceBefore: ', wavaxBalanceBefore);
        

        expect(wavaxBalanceBefore).eq(DEPOSIT_NUMBER);
        expect(pngBalanceBefore).eq(0);

        // We call Swapper contract to make a swap from Wavax to Png. I chose some weird values for the swap cause it's just for the sack of this tutorial.
        await swapper.swap(100, [WAVAX_ADDRESS, PNG_ADDRESS], "0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367", 1000000000, 1807909162115);

        // // Check balance after
        // const wavaxBalanceAfter = await wavaxTokenContract.balanceOf(account1.address);
        // const pngBalanceAfter = await pngTokenContract.balanceOf(account1.address);

        // expect(wavaxBalanceAfter).lt(wavaxBalanceBefore);
        // expect(pngBalanceAfter).gt(pngBalanceBefore);
    });
});


describe("liquidity", function () {
    let peachPool: PeachPool
    let account1: SignerWithAddress;

    beforeEach(async function () {
        await ethers.provider.send(
            "hardhat_reset",
            [
                {
                    forking: {
                        jsonRpcUrl: AVALANCHE_NODE_URL,
                        blockNumber: 2975762,
                    }
                }
            ]
        )

        const accounts = await ethers.getSigners();
        // console.log('accounts: ', accounts);

        // @ts-ignore
        account1 = accounts[0];
        // console.log(account1);

        // address _factory, address _router, address _peachToken, address _WAVAX

        const PeachPoolFactory = await ethers.getContractFactory("PeachPool");
        // console.log('PeachPoolFactory: ', PeachPoolFactory);

        peachPool = await PeachPoolFactory.deploy(FACTORY_ADDRESS[43114], ROUTER_ADDRESS[43114], USDT_E_ADDRESS, WAVAX_ADDRESS);
    })

    //   @params addLiquidityAVAX
    //     address token,
    //     uint256 amountTokenDesired,
    //     uint256 amountTokenMin,
    //     uint256 amountAVAXMin,
    //     address to,
    //     uint256 deadline
    it("should initilize PeachPool", async function () {
        console.log('PeachPool: ', peachPool);
        console.log('-------------');

        // we need to send some USDT.E first, before we provide liquidity   
        // peachPool.addLiquidityAvax(USDT_E_ADDRESS);
    })
})
