acc1 = env.accounts[5]
addr = address(env.accounts[8])

it('transfer', async function(){
        let ttx1 = await broadcast(transfer({ amount: 50000000, recipient: addr, fee:500000}, acc1))
        //var ttx = signTx(ttx1, A[0]["seed"])
        //await broadcast(ttx1)
        await waitForTx(ttx1.id)
        console.log( JSON.stringify(ttx1) )
})

it('data tx', async function(){
    let obj = {"action":"go-left", "mood":"stable"}
    let strObj = JSON.stringify(obj)

    let tx = await broadcast(data({data:[{key:"desc", value:strObj}],fee:500000}, acc1))
    await waitForTx(tx.id)
    console.log( JSON.stringify(tx) )
})

it('data tx 2', async function(){

    let tx = await broadcast(data({data:[{key:"item_A_coupon_price", value:300000}],fee:500000}, acc1))
    await waitForTx(tx.id)
    console.log( JSON.stringify(tx) )
})

it('transfer for IT', async function(){
        let ttx1 = await broadcast(transfer({ amount: 10000000, recipient: addr, fee:500000}, env.accounts[5]))
        //var ttx = signTx(ttx1, A[0]["seed"])
        //await broadcast(ttx1)
        await waitForTx(ttx1.id)
        console.log( JSON.stringify(ttx1) )
})

it('multisig transfer', async function(){
        let txSign1 = transfer({amount:100000000, recipient: address(env.accounts[4]), fee:500000}, env.accounts[5])
        let txSign2 = transfer(txSign1, env.accounts[6])

        let tx = await broadcast(txSign2)
        await waitForTx(tx.id)

        console.log(JSON.stringify(tx))
})

it('deploys dapp script', async function(){
        let ttx = setScript({ script: compile(file("multiPurchase.ride")), fee:1400000}, env.accounts[5])
        let ttx2 = setScript(ttx, env.accounts[6])
        await broadcast(ttx2)
        await waitForTx(ttx2.id)
})

it('dapp invoke purchase', async function(){
        let signed = invokeScript({
                dApp: address(env.accounts[5]),
                call: {
                        function:"purchase",
                        args:[{type:"string", value:"A"}]
                },
                payment: [{amount:300000, asset:null}],
                fee:5000000
                }, env.accounts[8])


        let tx = await broadcast(signed)
        await waitForTx(tx.id)
        console.log(JSON.stringify(tx))
})
