import Loan from "../models/Loan.js";
import RWAToken from "../models/RWAToken.js";

const MAX_LTV = 0.6; // 60% Loan-to-Value

export const createLoan = async (walletAddress, tokenId, amount) => {
   const token = await RWAToken.findById(tokenId);
   if (!token || token.walletAddress !== walletAddress) {
      throw new Error("Invalid token");
   }

   const maxLoan = token.valuation * MAX_LTV;
   if (amount > maxLoan) {
      throw new Error(`Loan exceeds allowed LTV. Max: ${maxLoan}`);
   }

   const loan = new Loan({
      walletAddress,
      tokenId,
      loanAmount: amount,
      status: "active"
   });

   await loan.save();
   return loan;
};

export const repayLoan = async (walletAddress, loanId) => {
   const loan = await Loan.findById(loanId);
   if (!loan || loan.walletAddress !== walletAddress) {
      throw new Error("Invalid loan");
   }

   loan.status = "repaid";
   await loan.save();
   return loan;
};

export const getLoansForUser = async (walletAddress) => {
   return await Loan.find({ walletAddress });
};
