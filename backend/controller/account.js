const mongoose = require("mongoose");
const Account = require("../models/accounts");

// 🔥🔥🔥🔥
const getBalance = async (req, res) => {
  try {
    const data = await Account.findOne({ userId: req.userId });
    res.json({
      balance: data.balance,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

/*
body - 
{
  to : string,
  amount : number,
}

*/

// 🔥🔥🔥🔥
const transferAmount = async (req, res) => {
  const { to, amount } = req.body;
  if (amount <= 0) {
    return res.status(400).json({ message: "Invalid Operation" });
  }
  const senderUserIdObject = new mongoose.Types.ObjectId(req.userId);
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // check sender's balance
    const senderAccount = await Account.findOne({ userId: senderUserIdObject });
    if (senderAccount.balance < amount) {
      throw new Error("Insufficient balance");
    }

    // console.log(`senderAccount\n${senderAccount}`);

    // check for reciever does exist
    const recieverAccount = await Account.findOne({
      userId: to,
    });
    // console.log(recieverAccount);
    if (!recieverAccount) {
      throw new Error("Invalid account");
    }

    // Start monetary Transaction
    await Account.findOneAndUpdate(
      { userId: senderUserIdObject },
      { $inc: { balance: -amount } },
      { runValidators: true }
    );

    await Account.findOneAndUpdate(
      { userId: to },
      { $inc: { balance: amount } },
      { runValidators: true }
    );
    // when everything is fine
    await session.commitTransaction();
    res.status(200).json({
      message: "Transfer successful",
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({
      message: error.message,
    });
  } finally {
    await session.endSession();
  }
};

module.exports = {
  getBalance,
  transferAmount,
};
