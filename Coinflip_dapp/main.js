var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(abi, "0xD4b4494c60D55F096326E95B8f22E8715CC5e32c", {from: accounts[0]});
      console.log(contractInstance);
      $("#heads_img").show();
      $("#tails_img").hide();
      displayPoolBalance();
    });
    $("#flip_button").click(flip);
    $("#add_pool_button").click(addToPool);
    $("#withdraw_button_owner").click(ownerWithdraw);
    $("#withdraw_button_player").click(playerWithdraw);
});


function flip(){
  var amount = $("#amount_input").val();
  config = {
    value: web3.utils.toWei(amount, "ether")
  }

  contractInstance.methods.flip().send(config)
  .on("transactionHash", function(hash){
    console.log(hash);
  })
  .on("confirmation", function(confirmationNr){
    console.log(confirmationNr);
  })
  .on("receipt", function(receipt){
    console.log(receipt);
    var outcome = receipt.events.outcome.returnValues.outcome;
    console.log(outcome);
    displayOutcome(outcome);
    displayPoolBalance();
  })

}

function displayPoolBalance(){
  contractInstance.methods.balance().call().then(function(res){
    $("#poolsize_output").text(web3.utils.fromWei(res, "ether") + " ETH");
  });
}

function addToPool(){
  var amount = $("#pool_input").val();
  config = {
    value: web3.utils.toWei(amount, "ether")
  }
  contractInstance.methods.addToPool().send(config)
  .on("transactionHash", function(hash){
    console.log(hash);
  })
  .on("confirmation", function(confirmationNr){
    console.log(confirmationNr);
  })
  .on("receipt", function(receipt){
    console.log(receipt);
    displayPoolBalance();
  })

}

function ownerWithdraw(){
  contractInstance.methods.ownerWithdraw().send()
  .on("transactionHash", function(hash){
    console.log(hash);
  })
  .on("confirmation", function(confirmationNr){
    console.log(confirmationNr);
  })
  .on("receipt", function(receipt){
    console.log(receipt);
    displayPoolBalance();
  })
}

function playerWithdraw(){
  contractInstance.methods.playerWithdraw().send()
  .on("transactionHash", function(hash){
    console.log(hash);
  })
  .on("confirmation", function(confirmationNr){
    console.log(confirmationNr);
  })
  .on("receipt", function(receipt){
    console.log(receipt);
    displayPoolBalance();
  })
}

function displayOutcome(outcome){
  if (outcome === "heads") {
    $("#outcome_output").text("Heads - you win!");
    $("#heads_img").show();
    $("#tails_img").hide();
  }
  else {
    $("#outcome_output").text("Tails - you loose!");
    $("#heads_img").hide();
    $("#tails_img").show();
  }

}
