acc1 = env.accounts[5]
addr = address(env.accounts[6])

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

it('transfer for IT', async function(){
        let ttx1 = await broadcast(transfer({ amount: 10000000, recipient: addr, fee:500000}, env.accounts[7]))
        //var ttx = signTx(ttx1, A[0]["seed"])
        //await broadcast(ttx1)
        await waitForTx(ttx1.id)
        console.log( JSON.stringify(ttx1) )
})
