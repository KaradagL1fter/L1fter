import Moralis from 'moralis';

function NativeBalance({ nativeBalance, address }) {
  console.log('SSR');
  console.log(nativeBalance);
  console.log(address);
  return (
    <div>
      <h3>Wallet: {address}</h3>
      <h3>Native Balance: {nativeBalance} ETH</h3>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   await Moralis.start({
//     apiKey: process.env.MORALIS_API_KEY,
//     serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
//     appId: process.env.NEXT_PUBLIC_APP_ID,
//   });

//   const address = '0x3A118b96E5b9728486f90c6d462cdCA0fC38a688';

//   const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
//     address,
//   });
//   //   console.log(nativeBalance);
//   return {
//     props: { address, nativeBalance: nativeBalance.result.balance.ether },
//   };
// }

export default NativeBalance;
